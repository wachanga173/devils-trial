// ai.js - Adaptive Devil AI (Online Reinforcement Learning & Dynamic Creativity Engine)
// Real-time telemetry analysis, continuous online learning, and hybrid (random + predicted) trap selection.
class DevilAI {
    constructor() {
        // Player Behavior Telemetry
        this.telemetry = {
            totalFrames: 0,
            movingFrames: 0,
            idleFrames: 0,
            jumpCount: 0,
            rushDistance: 0,
            deaths: [],
            reactionTimes: []
        };

        // ML Feature Vector: [rushScore, hesitationScore, jumpFrequency, recklessScore]
        this.weights = {
            RUSHER: [0.45, -0.3, 0.2, 0.5],
            CAUTIOUS: [-0.4, 0.5, -0.2, -0.4],
            HOPPER: [0.1, -0.1, 0.7, 0.2],
            BALANCED: [0.0, 0.0, 0.0, 0.0]
        };

        // Online Reinforcement Learning Hyperparameters
        this.learningRate = 0.08;
        this.learningEpochs = 0;
        this.playerSkillEstimate = 1.0; // 1.0 (Beginner) -> 3.0 (Master)

        // Trap Efficacy Registry (Online Adaptation)
        // High efficacy traps get prioritized for counters; ineffective traps get demoted to foster AI creativity
        this.trapEfficacy = {
            collapsing_floor: 1.0,
            piston_crusher: 1.0,
            rolling_ball: 1.0,
            hidden_spike: 1.0,
            dropping_spike: 1.0,
            spinning_saw: 1.0,
            moving_platform: 1.0,
            spring_pad: 1.0,
            troll_portal: 1.0,
            sliding_door: 1.0
        };

        this.learningHistory = [];
        this.currentProfile = "ANALYZING...";
        this.confidence = 0;
        this.activeCounterStrategy = "Detecting player psychology...";
        this.creativityLevel = 1.0;
        this.deployedTrapsCurrentRun = [];
    }

    resetRunTelemetry() {
        this.telemetry.totalFrames = 0;
        this.telemetry.movingFrames = 0;
        this.telemetry.idleFrames = 0;
        this.telemetry.jumpCount = 0;
        this.telemetry.rushDistance = 0;
        this.deployedTrapsCurrentRun = [];
    }

    recordFrame(player, input) {
        this.telemetry.totalFrames++;
        const speed = Math.abs(player.vx);

        if (speed > 0.5) {
            this.telemetry.movingFrames++;
            if (player.facing > 0) {
                this.telemetry.rushDistance += speed;
            }
        } else {
            this.telemetry.idleFrames++;
        }

        if (input.jumpPressed) {
            this.telemetry.jumpCount++;
        }

        // Re-classify player profile every 60 frames (~1 sec)
        if (this.telemetry.totalFrames % 60 === 0) {
            this.classifyPlayer();
        }
    }

    /**
     * Continuous Online Reinforcement Learning on Player Death:
     * 1. Boosts efficacy score of the lethal trap.
     * 2. Reinforces ML feature weights correlating to player's demise.
     * 3. Logs learning epoch and updates counter strategy.
     */
    recordDeath(reason, x, y, levelId, trapType = null) {
        this.telemetry.deaths.push({
            reason,
            trapType: trapType || reason,
            x,
            y,
            levelId,
            timeAlive: this.telemetry.totalFrames
        });

        const fatalType = trapType || reason;
        if (fatalType && this.trapEfficacy[fatalType] !== undefined) {
            // Lethal trap proved effective against current player habits
            this.trapEfficacy[fatalType] = Math.min(3.5, this.trapEfficacy[fatalType] + 0.35);
        }

        // Online Weight Adaptation (Perceptron / Reinforcement update)
        const durationSec = Math.max(1, this.telemetry.totalFrames / 60);
        const movingRatio = this.telemetry.movingFrames / Math.max(1, this.telemetry.totalFrames);
        const idleRatio = this.telemetry.idleFrames / Math.max(1, this.telemetry.totalFrames);
        const jumpsPerSec = this.telemetry.jumpCount / durationSec;
        const rushRate = this.telemetry.rushDistance / Math.max(1, this.telemetry.totalFrames);

        // Adjust weights online based on what punished the player
        if (fatalType === 'collapsing_floor' || fatalType === 'piston_crusher' || rushRate > 0.7) {
            this.weights.RUSHER[0] += this.learningRate * 0.4;
            this.weights.RUSHER[3] += this.learningRate * 0.4;
        }
        if (fatalType === 'rolling_ball' || idleRatio > 0.45) {
            this.weights.CAUTIOUS[1] += this.learningRate * 0.4;
        }
        if (fatalType === 'dropping_spike' || jumpsPerSec > 1.2) {
            this.weights.HOPPER[2] += this.learningRate * 0.5;
        }

        this.learningEpochs++;
        this.learningHistory.push({
            epoch: this.learningEpochs,
            level: levelId,
            profile: this.currentProfile,
            fatalTrap: fatalType,
            totalDeaths: this.telemetry.deaths.length
        });

        this.classifyPlayer();
    }

    /**
     * Continuous Online Adaptation on Stage Clear:
     * Penalizes traps that failed to stop the player, forcing the AI to become more
     * creative and deploy surprising combinations!
     */
    recordStageClear(levelId, durationFrames) {
        // Demote traps that player bypassed easily
        for (const trapType of this.deployedTrapsCurrentRun) {
            if (this.trapEfficacy[trapType] !== undefined) {
                this.trapEfficacy[trapType] = Math.max(0.4, this.trapEfficacy[trapType] * 0.88);
            }
        }

        this.playerSkillEstimate = Math.min(3.0, this.playerSkillEstimate + 0.12);
        this.creativityLevel = Math.min(2.5, 1.0 + (levelId * 0.1) + (this.playerSkillEstimate * 0.2));
        this.learningEpochs++;
        this.classifyPlayer();
    }

    classifyPlayer() {
        if (this.telemetry.totalFrames < 30 && this.telemetry.deaths.length === 0) {
            this.currentProfile = "LEARNING";
            this.confidence = 50;
            return;
        }

        const durationSec = Math.max(1, this.telemetry.totalFrames / 60);
        const movingRatio = this.telemetry.movingFrames / Math.max(1, this.telemetry.totalFrames);
        const idleRatio = this.telemetry.idleFrames / Math.max(1, this.telemetry.totalFrames);
        const jumpsPerSec = this.telemetry.jumpCount / durationSec;
        const rushRate = this.telemetry.rushDistance / Math.max(1, this.telemetry.totalFrames);

        // Feature vector extraction
        const features = [
            rushRate * 2.0 - 1.0,         // Rush score
            idleRatio * 2.0 - 1.0,        // Hesitation score
            jumpsPerSec * 1.5 - 0.5,      // Jump frequency
            movingRatio > 0.8 ? 1.0 : -0.5 // Reckless speed
        ];

        // Softmax dot-product classification
        const scores = {};
        for (const [profile, w] of Object.entries(this.weights)) {
            let dot = 0;
            for (let i = 0; i < 4; i++) {
                dot += features[i] * w[i];
            }
            scores[profile] = dot;
        }

        // Find highest score
        let bestProfile = "BALANCED";
        let maxScore = -999;
        for (const [p, score] of Object.entries(scores)) {
            if (score > maxScore) {
                maxScore = score;
                bestProfile = p;
            }
        }

        this.currentProfile = bestProfile;
        this.confidence = Math.min(98, Math.max(65, Math.floor(Math.abs(maxScore) * 35 + 60)));

        // Determine AI Counter-Strategy
        switch (this.currentProfile) {
            case "RUSHER":
                this.activeCounterStrategy = "Deploying early sinkholes, sudden crushers & razor bottlenecks";
                break;
            case "CAUTIOUS":
                this.activeCounterStrategy = "Deploying chasing rolling boulders & moving hazards to force panic";
                break;
            case "HOPPER":
                this.activeCounterStrategy = "Deploying overhead stalactites & airborne razors into jump trajectory";
                break;
            default:
                this.activeCounterStrategy = "Balancing unpredictable surprise hazards across corridor";
                break;
        }
    }

    /**
     * Hybrid Adaptive Trap Selection (Random + ML Predicted) for ALL Levels (from Level 1 onwards):
     * 1. 50% ML-Predicted Traps (targeting observed player vulnerabilities & efficacy).
     * 2. 50% Stochastic Wildcard Traps (random surprise factor to prevent memorization).
     * 3. Modulates speed, delays, and trigger distances progressively by level difficulty.
     *
     * @param {Array} candidateSlots
     * @param {Array} staticTraps
     * @param {number} levelId
     * @returns {Array} List of customized active trap configurations
     */
    selectAdaptiveTraps(candidateSlots, staticTraps = [], levelId = 1) {
        if (!candidateSlots || candidateSlots.length === 0) return [];

        // Progressive Difficulty Multiplier D(L)
        let difficultyMult = 1.0;
        if (levelId === 1) difficultyMult = 1.0;
        else if (levelId === 2) difficultyMult = 1.15;
        else if (levelId === 3) difficultyMult = 1.35;
        else if (levelId === 4) difficultyMult = 1.55;
        else difficultyMult = 1.55 + Math.min(1.5, (levelId - 4) * 0.20);

        // Maximum dynamic trap count based on difficulty
        let maxTraps = 2;
        if (levelId === 1) {
            maxTraps = Math.random() < 0.5 ? 1 : 2; // Level 1: 1 or 2 dynamic traps
        } else if (levelId === 2) {
            maxTraps = 2;
        } else if (levelId === 3) {
            maxTraps = Math.random() < 0.5 ? 2 : 3;
        } else if (levelId === 4) {
            maxTraps = 3;
        } else {
            maxTraps = Math.min(5, 3 + Math.floor((levelId - 4) * 0.4));
        }

        // Anti-Checkmate System: Semantic Mutual Exclusion Matrix
        // Guarantees traps never combine into impossible checkmates (e.g. boulder + crawl razor, boulder + mid-air spike)
        const activeTraps = (staticTraps || []).map(st => ({ ...st, isStatic: true }));
        const isAntiCheckmateSafe = (slot, deployedList) => this.isAntiCheckmateSafe(slot, deployedList);


        // 1. Score candidate traps using ML Model Prediction + Online Efficacy
        const scoredSlots = candidateSlots.map((rawSlot, idx) => {
            const slot = JSON.parse(JSON.stringify(rawSlot)); // Clean clone
            let affinity = 1.0;

            const efficacy = this.trapEfficacy[slot.type] || 1.0;

            if (this.currentProfile === "RUSHER") {
                if (slot.type === 'collapsing_floor' || slot.type === 'piston_crusher') affinity += 1.8;
                if (slot.type === 'spinning_saw' || slot.type === 'rolling_ball') affinity += 1.0;
            } else if (this.currentProfile === "CAUTIOUS") {
                if (slot.type === 'rolling_ball') affinity += 2.2;
                if (slot.type === 'hidden_spike' || slot.type === 'moving_platform') affinity += 1.2;
            } else if (this.currentProfile === "HOPPER") {
                if (slot.type === 'dropping_spike') affinity += 2.5;
                if (slot.type === 'hidden_spike' || slot.type === 'spinning_saw') affinity += 1.4;
            }

            return {
                slot,
                originalIndex: idx,
                score: (affinity * efficacy) * (0.85 + Math.random() * 0.3)
            };
        });

        // 2. Separate into ML-Predicted Pool and Stochastic Wildcard Pool
        scoredSlots.sort((a, b) => b.score - a.score);

        const selected = [];
        const usedIndices = new Set();

        // 50% of slots allocated to ML Model Prediction
        const predictedCount = Math.max(1, Math.floor(maxTraps / 2));
        for (const item of scoredSlots) {
            if (selected.length >= predictedCount) break;
            if (isAntiCheckmateSafe(item.slot, activeTraps)) {
                selected.push(item.slot);
                activeTraps.push(item.slot);
                usedIndices.add(item.originalIndex);
            }
        }

        // 50% of slots allocated to Stochastic Randomness (Wildcards)
        const remainingCandidates = candidateSlots
            .map((rawSlot, idx) => ({ slot: JSON.parse(JSON.stringify(rawSlot)), idx }))
            .filter(item => !usedIndices.has(item.idx))
            .sort(() => Math.random() - 0.5); // Pure random shuffle

        for (const item of remainingCandidates) {
            if (selected.length >= maxTraps) break;
            if (isAntiCheckmateSafe(item.slot, activeTraps)) {
                selected.push(item.slot);
                activeTraps.push(item.slot);
                usedIndices.add(item.idx);
            }
        }

        // 3. Apply Creative Tuning (small trigger jitter & fair pause durations; NO crazy speeds!)
        const tunedTraps = selected.map(trap => {
            // Speeds remain at their balanced, readable designer values for fair platforming

            // Pause duration slight adjustment (less idle wait time without crazy velocity)
            if (trap.pauseDuration !== undefined) {
                trap.pauseDuration = Math.max(35, Math.round(trap.pauseDuration / Math.min(1.2, difficultyMult)));
            }

            // Small trigger distance unpredictability (creativity jitter)
            if (trap.triggerRange !== undefined) {
                const jitter = Math.floor((Math.random() - 0.5) * 6);
                trap.triggerRange = Math.max(25, trap.triggerRange + jitter);
            }

            return trap;
        });

        this.deployedTrapsCurrentRun = tunedTraps.map(t => t.type);
        return tunedTraps;
    }

    serializeTelemetry() {
        return {
            learningEpochs: this.learningEpochs,
            playerSkillEstimate: this.playerSkillEstimate,
            creativityLevel: this.creativityLevel,
            trapEfficacy: { ...this.trapEfficacy },
            weights: { ...this.weights },
            deathCount: this.telemetry.deaths ? this.telemetry.deaths.length : 0,
            learningHistory: (this.learningHistory || []).slice(-20)
        };
    }

    deserializeTelemetry(data) {
        if (!data || typeof data !== 'object') return;
        if (typeof data.learningEpochs === 'number') this.learningEpochs = data.learningEpochs;
        if (typeof data.playerSkillEstimate === 'number') this.playerSkillEstimate = data.playerSkillEstimate;
        if (typeof data.creativityLevel === 'number') this.creativityLevel = data.creativityLevel;
        if (data.trapEfficacy && typeof data.trapEfficacy === 'object') {
            this.trapEfficacy = { ...this.trapEfficacy, ...data.trapEfficacy };
        }
        if (data.weights && typeof data.weights === 'object') {
            this.weights = { ...this.weights, ...data.weights };
        }
        if (Array.isArray(data.learningHistory)) {
            this.learningHistory = [...data.learningHistory];
        }
    }

    /**
     * Semantic Anti-Checkmate Mutual Exclusion Validator
     * Evaluates a candidate trap slot against currently active/deployed traps
     * to guarantee levels are never physically impossible.
     */
    isAntiCheckmateSafe(slot, deployedList) {
        if (!slot || !deployedList) return true;
        const slotGroundY = slot.groundY !== undefined ? slot.groundY : (slot.y || 345);

        // 1. Rolling Boulder Incompatibilities
        if (slot.type === 'rolling_ball') {
            const bTriggerX = slot.triggerX || (slot.x - 110);
            const bJumpMinX = Math.min(slot.x, bTriggerX) - 50;
            const bJumpMaxX = Math.max(slot.x, bTriggerX) + 50;

            for (const act of deployedList) {
                const actGroundY = act.groundY !== undefined ? act.groundY : (act.y || 345);
                const isSameElevation = Math.abs(slotGroundY - actGroundY) < 65;

                // Never two rolling boulders in the same level section
                if (act.type === 'rolling_ball' && isSameElevation) return false;

                // In the same corridor, never pair a rolling boulder with sawblades
                if ((act.type === 'spinning_saw' || act.type === 'razor') && isSameElevation) {
                    return false;
                }

                // Cannot pair with dropping ceiling spikes in the boulder jump-evasion runway
                if (act.type === 'dropping_spike' && isSameElevation) {
                    if (Math.abs(act.x - bTriggerX) < 140) return false;
                    if (act.x >= bJumpMinX - 30 && act.x <= bJumpMaxX + 30) return false;
                }

                // Cannot pair with floor spikes in jump takeoff / landing zones
                if ((act.type === 'hidden_spike' || act.type === 'static_spike') && isSameElevation) {
                    if (act.x >= bJumpMinX && act.x <= bJumpMaxX) return false;
                    if (Math.abs(act.x - bTriggerX) < 85) return false;
                }

                // Cannot collapse floor in boulder jump evasion zone
                if (act.type === 'collapsing_floor' && isSameElevation) {
                    if (act.x >= bJumpMinX && act.x <= bJumpMaxX) return false;
                }
            }
        }

        // 2. Reciprocal checks: If an active trap is a rolling boulder on the same elevation, validate incoming slot
        for (const act of deployedList) {
            if (act.type === 'rolling_ball') {
                const actGroundY = act.groundY !== undefined ? act.groundY : (act.y || 345);
                const isSameElevation = Math.abs(slotGroundY - actGroundY) < 65;

                if (isSameElevation) {
                    const bTriggerX = act.triggerX || (act.x - 110);
                    const bJumpMinX = Math.min(act.x, bTriggerX) - 50;
                    const bJumpMaxX = Math.max(act.x, bTriggerX) + 50;

                    if (slot.type === 'spinning_saw' || slot.type === 'razor') {
                        return false;
                    }

                    if (slot.type === 'dropping_spike') {
                        if (Math.abs(slot.x - bTriggerX) < 140) return false;
                        if (slot.x >= bJumpMinX - 30 && slot.x <= bJumpMaxX + 30) return false;
                    }

                    if (slot.type === 'hidden_spike' || slot.type === 'static_spike') {
                        if (slot.x >= bJumpMinX && slot.x <= bJumpMaxX) return false;
                        if (Math.abs(slot.x - bTriggerX) < 85) return false;
                    }

                    if (slot.type === 'collapsing_floor') {
                        if (slot.x >= bJumpMinX && slot.x <= bJumpMaxX) return false;
                    }
                }
            }
        }

        // 3. Head-height Crawl Razor Incompatibilities (y around 305-335 forces crawling on all fours)
        const isCrawlSaw = (t) => (t.type === 'spinning_saw' || t.type === 'razor') && (t.y >= 305 && t.y <= 335);
        if (isCrawlSaw(slot)) {
            for (const act of deployedList) {
                if (act.type === 'static_spike' || act.type === 'hidden_spike' || act.type === 'collapsing_floor') {
                    if (Math.abs(act.x - slot.x) < 70) return false;
                }
            }
        }
        for (const act of deployedList) {
            if (isCrawlSaw(act)) {
                if (slot.type === 'static_spike' || slot.type === 'hidden_spike' || slot.type === 'collapsing_floor') {
                    if (Math.abs(slot.x - act.x) < 70) return false;
                }
            }
        }

        // 4. Ceiling Dropping Spike vs Floor Hazard Incompatibilities (prevents mid-air sandwich)
        if (slot.type === 'dropping_spike') {
            for (const act of deployedList) {
                if (act.type === 'static_spike' || act.type === 'hidden_spike' || act.type === 'collapsing_floor') {
                    if (Math.abs(act.x - slot.x) < 75) return false;
                }
            }
        }
        if (slot.type === 'static_spike' || slot.type === 'hidden_spike' || slot.type === 'collapsing_floor') {
            for (const act of deployedList) {
                if (act.type === 'dropping_spike') {
                    if (Math.abs(act.x - slot.x) < 75) return false;
                }
            }
        }

        // 5. Standard minimum physical distance separation (>= 50px buffer for statics, 35px for dynamics)
        // Only applies when sharing the same vertical corridor or elevation zone
        const slotY = slot.groundY !== undefined ? slot.groundY : (slot.y || 345);
        const slotStart = slot.x;
        const slotEnd = slot.x + (slot.w || 32);
        for (const act of deployedList) {
            const actY = act.groundY !== undefined ? act.groundY : (act.y || 345);
            if (Math.abs(slotY - actY) > 75) continue; // Different floors/stories do not conflict

            const actStart = act.x;
            const actEnd = act.x + (act.w || 28);
            const minGap = (act.isStatic || act.type === 'static_spike') ? 50 : 35;
            if (!(slotEnd <= actStart - minGap || slotStart >= actEnd + minGap)) {
                return false;
            }
        }

        return true;
    }
}

window.DevilAI = DevilAI;
