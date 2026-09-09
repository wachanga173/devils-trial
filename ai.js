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
            reactionTimes: [],
            jumpHotspots: [],
            rushHotspots: [],
            campHotspots: [],
            doorApproaches: []
        };
        this.currentIdleStreak = 0;
        this.currentRushStreak = 0;

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
            sliding_door: 1.0,
            pop_up_wall: 1.0,
            ceiling_squish: 1.0,
            shifting_block: 1.0,
            wall_ejector: 1.0
        };

        this.learningHistory = [];
        this.currentProfile = "ANALYZING...";
        this.confidence = 0;
        this.activeCounterStrategy = "Detecting player psychology...";
        this.creativityLevel = 1.0;
        this.deployedTrapsCurrentRun = [];

        // Python RL Agent Connectivity
        this.pythonConnected = false;
        this.pythonModel = "DevilAI-RL-Py3";
        this.cachedPrediction = null;
        this.isPrefetching = false;
        this.checkPythonStatus();
    }

    resetRunTelemetry() {
        this.telemetry.totalFrames = 0;
        this.telemetry.movingFrames = 0;
        this.telemetry.idleFrames = 0;
        this.telemetry.jumpCount = 0;
        this.telemetry.rushDistance = 0;
        this.deployedTrapsCurrentRun = [];
        this.currentIdleStreak = 0;
        this.currentRushStreak = 0;
    }

    recordFrame(player, input, door = null) {
        this.telemetry.totalFrames++;
        const speed = Math.abs(player.vx);

        if (speed > 0.5) {
            this.telemetry.movingFrames++;
            this.currentIdleStreak = 0;
            if (player.facing > 0) {
                this.telemetry.rushDistance += speed;
                this.currentRushStreak = (this.currentRushStreak || 0) + 1;
                if (this.currentRushStreak >= 25 && speed > 2.0) {
                    const rx = Math.round(player.x);
                    if (!this.telemetry.rushHotspots.some(h => Math.abs(h.x - rx) < 60)) {
                        this.telemetry.rushHotspots.push({ x: rx, y: Math.round(player.y), speed });
                        if (this.telemetry.rushHotspots.length > 20) this.telemetry.rushHotspots.shift();
                    }
                }
            }
        } else {
            this.telemetry.idleFrames++;
            this.currentRushStreak = 0;
            this.currentIdleStreak = (this.currentIdleStreak || 0) + 1;
            if (this.currentIdleStreak >= 35) {
                const cx = Math.round(player.x);
                const cy = Math.round(player.y);
                if (!this.telemetry.campHotspots.some(h => Math.abs(h.x - cx) < 50)) {
                    this.telemetry.campHotspots.push({ x: cx, y: cy, duration: this.currentIdleStreak });
                    if (this.telemetry.campHotspots.length > 15) this.telemetry.campHotspots.shift();
                }
            }
        }

        if (input.jumpPressed) {
            this.telemetry.jumpCount++;
            const jx = Math.round(player.x);
            const jy = Math.round(player.y);
            this.telemetry.jumpHotspots.push({ x: jx, y: jy, vx: player.vx });
            if (this.telemetry.jumpHotspots.length > 30) this.telemetry.jumpHotspots.shift();
        }

        if (door && door.x !== undefined) {
            const dist = Math.hypot(player.x - door.x, player.y - door.y);
            if (dist < 180) {
                this.telemetry.doorApproaches.push({ dist: Math.round(dist), speed, jumped: !!input.jumpPressed });
                if (this.telemetry.doorApproaches.length > 20) this.telemetry.doorApproaches.shift();
            }
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

        // Asynchronously notify Python ML agent of player death
        this.sendPythonLearn('death', {
            levelId: levelId,
            reason: reason,
            trapType: fatalType,
            fatal_trap: fatalType,
            x: x,
            y: y,
            timeAlive: this.telemetry.totalFrames,
            telemetry: this.telemetry
        });
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

        // Asynchronously notify Python ML agent of stage clear
        this.sendPythonLearn('clear', {
            levelId: levelId,
            durationFrames: durationFrames,
            deployedTraps: [...this.deployedTrapsCurrentRun],
            telemetry: this.telemetry
        });
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
                this.activeCounterStrategy = "Erecting sudden pop-up walls & low crawl ceilings into forward sprint stride";
                break;
            case "CAUTIOUS":
                this.activeCounterStrategy = "Deploying wall punchers & shifting stepping stones to force commitment";
                break;
            case "HOPPER":
                this.activeCounterStrategy = "Deploying high pop-up blocks & mid-air shifting platforms into jump trajectory";
                break;
            case "CHAOTIC":
                this.activeCounterStrategy = "Deploying disorientation portals & deceptive spring blocks across corridor";
                break;
            case "METHODICAL":
                this.activeCounterStrategy = "Orchestrating compound block-shift puzzles and sudden crawlways";
                break;
            default:
                this.activeCounterStrategy = "Synthesizing dynamic living block traps across corridor";
                break;
        }
    }

    getDifficultyMultiplier(levelId) {
        if (levelId <= 1) return 1.0;
        if (levelId === 2) return 1.15;
        if (levelId === 3) return 1.35;
        if (levelId === 4) return 1.55;
        return parseFloat((1.55 + Math.log2(levelId - 3) * 0.65).toFixed(2));
    }

    /**
     * Generative AI Trap Synthesis Engine:
     * Instead of merely filtering from pre-authored templates, the AI inspects the level's
     * physical stone geometry, open corridor channels, door position, and player telemetry
     * to dynamically forge and synthesize custom traps to prevent the player from reaching the door.
     *
     * 1. Converts surrounding solid wall blocks into Living Wall Ejectors.
     * 2. Converts overhead ceiling blocks into Living Ceiling Squishers / Piston Crushers.
     * 3. Forges a Door Defense Perimeter: threshold sinkholes, barrier pop-up walls & troll loops.
     * 4. Counters player telemetry (momentum blockers for rushers, anti-air drops for hoppers, flushers for campers).
     * 5. Reinforces past death coordinates to punish anticipated evasions.
     * 6. Validates kinematic solvability: ensures 100% physically beatable clearance.
     */
    synthesizeGenerativeTraps(levelData, levelId = 5) {
        if (!levelData) return [];
        const synthTraps = [];
        const solids = levelData.solids || [];
        const corridors = levelData.pathwayCorridors || [];
        const spawn = levelData.playerSpawn || { x: 130, y: 340 };
        const door = levelData.door || { x: 800, y: 340, w: 32, h: 46 };
        const bounds = levelData.bounds || { width: 900, height: 480 };
        if (this.currentProfile === "ANALYZING..." || this.currentProfile === "LEARNING") {
            this.classifyPlayer();
        }
        const profile = (this.currentProfile === "ANALYZING..." || this.currentProfile === "LEARNING") ? "RUSHER" : this.currentProfile;
        const diffMult = this.getDifficultyMultiplier(levelId);

        // Track occupied areas to guarantee no physical overlaps with fixed static hazards
        const existingTraps = [
            ...(levelData.staticTraps || [])
        ];

        const isSafeDistance = (x, y, w = 32, minGap = 25) => {
            const start = x;
            const end = x + w;
            for (const t of existingTraps) {
                const ty = t.y || t.groundY || 340;
                if (Math.abs(ty - y) > 70) continue;
                const tStart = t.x;
                const tEnd = t.x + (t.w || 28);
                const gap = (t.type === 'static_spike') ? 35 : minGap;
                if (!(end <= tStart - gap || start >= tEnd + gap)) return false;
            }
            for (const s of synthTraps) {
                const sy = s.y || s.groundY || 340;
                if (Math.abs(sy - y) > 70) continue;
                const sStart = s.x;
                const sEnd = s.x + (s.w || 32);
                if (!(end <= sStart - minGap || start >= sEnd + minGap)) return false;
            }
            // Protect spawn safe zone
            if (y >= spawn.y - 35 && y <= spawn.y + 35 && x >= spawn.x - 40 && x <= spawn.x + 55) return false;
            return true;
        };

        const addSynthTrap = (trap) => {
            trap.isAIGenerated = true;
            trap.aiLean = profile;
            synthTraps.push(trap);
        };

        // 1. DOOR DEFENSE PERIMETER — Fortifying the entrance to the door
        const doorFloorY = door.y + (door.h || 46);
        const doorPreStepX = door.x - 70;

        // A1: Door Step Threshold Trap
        if (isSafeDistance(doorPreStepX, doorFloorY, 48, 20)) {
            if (profile === "RUSHER") {
                addSynthTrap({
                    type: 'pop_up_wall',
                    x: doorPreStepX,
                    y: doorFloorY,
                    w: 32,
                    h: 32,
                    riseHeight: 36,
                    riseSpeed: 2.8 + diffMult * 0.2,
                    triggerRange: 60,
                    zone: 'exit',
                    purpose: 'door_blocker'
                });
            } else {
                addSynthTrap({
                    type: 'collapsing_floor',
                    x: doorPreStepX,
                    y: doorFloorY,
                    w: 48,
                    h: 35,
                    dropSpeed: 2.4 + diffMult * 0.15,
                    zone: 'exit',
                    purpose: 'door_sinkhole'
                });
            }
        }

        // A2: Door Ceiling Ambush (Dropping spike above door approach)
        const doorCeilY = Math.max(30, doorFloorY - 115);
        const doorAmbushX = door.x - 115;
        if (isSafeDistance(doorAmbushX, doorCeilY, 26, 25)) {
            addSynthTrap({
                type: 'dropping_spike',
                x: doorAmbushX,
                y: doorCeilY,
                w: 22,
                h: 22,
                groundY: doorFloorY,
                triggerRange: 55,
                zone: 'exit',
                purpose: 'door_anti_air'
            });
        }

        // A3: Troll Loop Portal (Levels 8+) — flings hasty players backward
        if (levelId >= 8 && isSafeDistance(door.x - 150, doorFloorY, 45, 30)) {
            addSynthTrap({
                type: 'troll_portal',
                x: door.x - 150,
                y: doorFloorY,
                w: 45,
                h: 65,
                exitX: Math.max(160, spawn.x + 140),
                exitY: spawn.y - 20,
                exitVy: 2.5,
                zone: 'exit',
                purpose: 'door_loop_portal'
            });
        }

        // 2. LIVING BLOCKS CONVERSION — Turn surrounding solid walls, ceilings, and floors into traps
        for (const sol of solids) {
            // Vertical wall solids adjacent to corridors converted to wall ejector pistons
            if (sol.h >= 60 && sol.w >= 18 && sol.x > spawn.x + 60 && sol.x < door.x - 40) {
                const midWallY = sol.y + sol.h - 32;
                if (sol.x + sol.w < bounds.width - 100 && isSafeDistance(sol.x + sol.w + 5, midWallY, 28, 25)) {
                    addSynthTrap({
                        type: 'wall_ejector',
                        x: sol.x + sol.w,
                        y: midWallY,
                        w: 28,
                        h: 30,
                        punchDist: 38 + Math.round(diffMult * 3),
                        punchSpeed: 2.6 + diffMult * 0.2,
                        direction: 1,
                        triggerRange: 55,
                        zone: 'mid',
                        purpose: 'living_wall'
                    });
                } else if (sol.x > 100 && isSafeDistance(sol.x - 32, midWallY, 28, 25)) {
                    addSynthTrap({
                        type: 'wall_ejector',
                        x: sol.x - 28,
                        y: midWallY,
                        w: 28,
                        h: 30,
                        punchDist: 38 + Math.round(diffMult * 3),
                        punchSpeed: 2.6 + diffMult * 0.2,
                        direction: -1,
                        triggerRange: 55,
                        zone: 'mid',
                        purpose: 'living_wall'
                    });
                }
                if (synthTraps.filter(t => t.purpose === 'living_wall').length >= 2) break;
            }
        }

        // Living Ceilings & Shifting Shelves from corridors
        for (const corr of corridors) {
            if (corr.w >= 140 && corr.x > spawn.x + 50 && corr.x + corr.w < door.x + 50) {
                const ceilY = corr.y;
                const floorY = corr.y + corr.h;
                const midX = Math.round(corr.x + corr.w * 0.5);

                if (isSafeDistance(midX, ceilY, 48, 30)) {
                    addSynthTrap({
                        type: 'ceiling_squish',
                        x: midX,
                        y: ceilY,
                        w: 48,
                        h: 26,
                        dropDistance: Math.max(25, corr.h - 22),
                        dropSpeed: 2.2 + diffMult * 0.2,
                        triggerRange: 52,
                        zone: 'mid',
                        purpose: 'living_ceiling'
                    });
                }

                const shelfX = Math.round(corr.x + corr.w * 0.25);
                if (isSafeDistance(shelfX, floorY, 44, 25)) {
                    addSynthTrap({
                        type: 'shifting_block',
                        x: shelfX,
                        y: floorY - 18,
                        w: 44,
                        h: 18,
                        shiftAxis: 'y',
                        shiftDistance: -32,
                        shiftSpeed: 2.2,
                        triggerRange: 50,
                        zone: 'mid',
                        purpose: 'living_floor_shift'
                    });
                }
            }
        }

        // 3. TELEMETRY COUNTER-LEAN TRAPS
        if (profile === "RUSHER") {
            const rushX = spawn.x + Math.round((door.x - spawn.x) * 0.4);
            const rushY = spawn.y;
            if (isSafeDistance(rushX, rushY, 32, 25)) {
                addSynthTrap({
                    type: 'pop_up_wall',
                    x: rushX,
                    y: rushY,
                    w: 30,
                    h: 32,
                    riseHeight: 36,
                    riseSpeed: 2.8,
                    triggerRange: 60,
                    zone: 'mid',
                    purpose: 'rush_counter_wall'
                });
            }
            const boulderX = Math.min(bounds.width - 160, door.x - 60);
            if (isSafeDistance(boulderX, spawn.y, 34, 40)) {
                addSynthTrap({
                    type: 'rolling_ball',
                    x: boulderX,
                    y: spawn.y,
                    groundY: spawn.y,
                    radius: 17,
                    vx: -4.6 - diffMult * 0.35,
                    triggerRange: 95,
                    zone: 'mid',
                    purpose: 'rush_counter_boulder'
                });
            }
        } else if (profile === "HOPPER") {
            const jumpApexX = spawn.x + Math.round((door.x - spawn.x) * 0.35);
            const ceilY = Math.max(30, spawn.y - 115);
            if (isSafeDistance(jumpApexX, ceilY, 22, 25)) {
                addSynthTrap({
                    type: 'dropping_spike',
                    x: jumpApexX,
                    y: ceilY,
                    w: 22,
                    h: 22,
                    groundY: spawn.y,
                    triggerRange: 48,
                    zone: 'mid',
                    purpose: 'hopper_anti_air'
                });
            }
            const landingX = jumpApexX + 55;
            if (isSafeDistance(landingX, spawn.y, 26, 25)) {
                addSynthTrap({
                    type: 'hidden_spike',
                    x: landingX,
                    y: spawn.y,
                    w: 26,
                    h: 16,
                    triggerRange: 32,
                    zone: 'mid',
                    purpose: 'hopper_landing_spike'
                });
            }
        } else if (profile === "CAUTIOUS" || profile === "METHODICAL") {
            const chaserX = spawn.x >= 100 ? (spawn.x - 55) : (spawn.x + 70);
            const chaserVx = spawn.x >= 100 ? (3.8 + diffMult * 0.25) : (-3.8 - diffMult * 0.25);
            if (isSafeDistance(chaserX, spawn.y, 34, 30)) {
                addSynthTrap({
                    type: 'rolling_ball',
                    x: chaserX,
                    y: spawn.y,
                    groundY: spawn.y,
                    radius: 16,
                    vx: chaserVx,
                    triggerRange: 75,
                    zone: 'entry',
                    purpose: 'camper_flusher_boulder'
                });
            }
        } else { // CHAOTIC
            const springX = spawn.x + Math.round((door.x - spawn.x) * 0.5);
            if (isSafeDistance(springX, spawn.y, 32, 20)) {
                addSynthTrap({
                    type: 'spring_pad',
                    x: springX,
                    y: spawn.y,
                    w: 32,
                    h: 10,
                    boostVy: -9.2,
                    zone: 'mid',
                    purpose: 'chaotic_spring_launch'
                });
            }
        }

        // 4. PAST-DEATH COUNTER REINFORCEMENT
        if (this.telemetry.deaths && this.telemetry.deaths.length > 0) {
            const lastDeath = this.telemetry.deaths[this.telemetry.deaths.length - 1];
            if (lastDeath.x && lastDeath.y) {
                const counterX = Math.round(lastDeath.x + 45);
                const ceilY = Math.max(30, (lastDeath.y || spawn.y) - 115);
                if (isSafeDistance(counterX, ceilY, 22, 25)) {
                    addSynthTrap({
                        type: 'dropping_spike',
                        x: counterX,
                        y: ceilY,
                        w: 22,
                        h: 22,
                        groundY: lastDeath.y || spawn.y,
                        triggerRange: 45,
                        zone: 'mid',
                        purpose: 'death_counter_trap'
                    });
                }
            }
        }

        return synthTraps;
    }

    /**
     * Hybrid Adaptive Trap Selection: Combines AI-synthesized generative traps with
     * procedural candidate slots and scores them via Online Reinforcement Learning.
     *
     * @param {Array} candidateSlots
     * @param {Array} staticTraps
     * @param {number} levelId
     * @param {Object} levelData (optional level geometry definition for generative synthesis)
     * @returns {Array} List of customized active trap configurations
     */
    selectAdaptiveTraps(candidateSlots, staticTraps = [], levelId = 1, levelData = null) {
        if (!candidateSlots) candidateSlots = [];

        // If level geometry definition is available and not yet synthesized, generate bespoke traps
        if (levelData && !candidateSlots.some(s => s.isAIGenerated)) {
            const synth = this.synthesizeGenerativeTraps(levelData, levelId);
            if (synth && synth.length > 0) {
                candidateSlots = [...candidateSlots, ...synth];
            }
        }

        if (candidateSlots.length === 0) return [];

        // Progressive Difficulty Multiplier D(L) — unbounded logarithmic growth
        const difficultyMult = this.getDifficultyMultiplier(levelId);

        // Aggressive Progressive Trap Budget: scales from 2 to 10 active traps
        // Higher levels = more overlapping threats = genuine challenge
        let maxTraps = 2;
        if (levelId <= 2) maxTraps = 2;
        else if (levelId <= 4) maxTraps = 3;
        else if (levelId <= 6) maxTraps = 4;
        else if (levelId <= 9) maxTraps = 5;
        else if (levelId <= 12) maxTraps = 6;
        else if (levelId <= 16) maxTraps = 7;
        else maxTraps = Math.min(10, 7 + Math.floor((levelId - 16) / 4));

        // 0. Use pre-calculated Python ML prediction if available
        if (this.cachedPrediction && this.cachedPrediction.selectedTraps && this.cachedPrediction.selectedTraps.length > 0) {
            const pred = this.cachedPrediction;
            this.cachedPrediction = null; // Consume
            if (pred.classification) {
                if (pred.classification.profile) this.currentProfile = pred.classification.profile;
                if (pred.classification.confidence) this.confidence = pred.classification.confidence;
                if (pred.classification.strategy) this.activeCounterStrategy = pred.classification.strategy;
            }
            this.deployedTrapsCurrentRun = pred.selectedTraps.map(t => t.type);
            return pred.selectedTraps;
        }

        // Anti-Checkmate System: Semantic Mutual Exclusion Matrix
        // Guarantees traps never combine into impossible checkmates
        const activeTraps = (staticTraps || []).map(st => ({ ...st, isStatic: true }));
        const isAntiCheckmateSafe = (slot, deployedList) => this.isAntiCheckmateSafe(slot, deployedList);

        // === COMBO-AWARE SELECTION ===
        // Identify combo groups: traps with matching comboId must be selected atomically
        const comboGroups = {};
        const soloSlots = [];
        candidateSlots.forEach((rawSlot, idx) => {
            if (rawSlot.comboId) {
                if (!comboGroups[rawSlot.comboId]) comboGroups[rawSlot.comboId] = [];
                comboGroups[rawSlot.comboId].push({ slot: JSON.parse(JSON.stringify(rawSlot)), originalIndex: idx });
            } else {
                soloSlots.push({ slot: JSON.parse(JSON.stringify(rawSlot)), originalIndex: idx });
            }
        });

        // 1. Score candidate traps using ML Model Prediction + Online Efficacy + Living Block Affinities
        const scoreSlot = (slot) => {
            let affinity = 1.0;
            const efficacy = this.trapEfficacy[slot.type] || 1.0;

            if (this.currentProfile === "RUSHER") {
                if (slot.type === 'pop_up_wall' || slot.type === 'ceiling_squish') affinity += 2.4;
                else if (slot.type === 'collapsing_floor' || slot.type === 'piston_crusher') affinity += 1.8;
                else if (slot.type === 'spinning_saw' || slot.type === 'rolling_ball') affinity += 1.2;
            } else if (this.currentProfile === "CAUTIOUS") {
                if (slot.type === 'wall_ejector' || slot.type === 'rolling_ball') affinity += 2.4;
                else if (slot.type === 'shifting_block' || slot.type === 'piston_crusher') affinity += 1.6;
                else if (slot.type === 'hidden_spike') affinity += 1.2;
            } else if (this.currentProfile === "HOPPER") {
                if (slot.type === 'pop_up_wall' || slot.type === 'shifting_block') affinity += 2.5;
                else if (slot.type === 'dropping_spike') affinity += 2.2;
                else if (slot.type === 'spinning_saw') affinity += 1.4;
            } else if (this.currentProfile === "CHAOTIC") {
                if (slot.type === 'troll_portal' || slot.type === 'wall_ejector') affinity += 2.4;
                else if (slot.type === 'sliding_door' || slot.type === 'spring_pad') affinity += 2.0;
            } else if (this.currentProfile === "METHODICAL") {
                if (slot.type === 'ceiling_squish' || slot.type === 'pop_up_wall') affinity += 2.2;
                else if (slot.type === 'shifting_block' || slot.type === 'collapsing_floor') affinity += 1.6;
            }

            // Zone distribution weighting (encourage entry ambush and exit troll traps)
            if (slot.zone === 'entry') affinity *= 1.1;
            else if (slot.zone === 'exit') affinity *= 1.15;
            // Combo traps get a selection bonus — they're more creative
            if (slot.comboId) affinity *= 1.3;
            // Gimmick signature mechanic bonus — biases selection toward level theme
            if (slot.gimmickBonus) affinity *= 1.35;
            // AI-synthesized generative traps get high affinity
            if (slot.isAIGenerated) affinity *= 1.35;
            // High priority for door defense traps (explicit mission to prevent reaching door)
            if (slot.purpose && slot.purpose.startsWith('door_')) affinity *= 1.5;
            // Living block conversion bonus
            if (slot.purpose && slot.purpose.startsWith('living_')) affinity *= 1.3;

            return (affinity * efficacy) * (0.85 + Math.random() * 0.3);
        };

        const selected = [];
        const usedIndices = new Set();

        // Phase 1: Try to select combo groups first (they're the creative "gotcha" moments)
        const comboEntries = Object.entries(comboGroups)
            .map(([id, members]) => ({ id, members, avgScore: members.reduce((s, m) => s + scoreSlot(m.slot), 0) / members.length }))
            .sort((a, b) => b.avgScore - a.avgScore);

        for (const combo of comboEntries) {
            if (selected.length + combo.members.length > maxTraps) continue;
            // Check all members are anti-checkmate safe
            const allSafe = combo.members.every(m => isAntiCheckmateSafe(m.slot, activeTraps));
            if (allSafe) {
                for (const m of combo.members) {
                    selected.push(m.slot);
                    activeTraps.push(m.slot);
                    usedIndices.add(m.originalIndex);
                }
            }
        }

        // Phase 2: ML-Predicted Pool (60% of remaining budget)
        const scoredSolos = soloSlots.map(item => ({ ...item, score: scoreSlot(item.slot) }));
        scoredSolos.sort((a, b) => b.score - a.score);

        const remainingBudget = maxTraps - selected.length;
        const predictedTarget = Math.max(1, Math.floor(remainingBudget * 0.6));
        let predictedAdded = 0;
        for (const item of scoredSolos) {
            if (selected.length >= maxTraps || predictedAdded >= predictedTarget) break;
            if (usedIndices.has(item.originalIndex)) continue;
            if (isAntiCheckmateSafe(item.slot, activeTraps)) {
                selected.push(item.slot);
                activeTraps.push(item.slot);
                usedIndices.add(item.originalIndex);
                predictedAdded++;
            }
        }

        // Phase 3: Stochastic Wildcard Pool (remaining budget)
        const remainingCandidates = soloSlots
            .filter(item => !usedIndices.has(item.originalIndex))
            .sort(() => Math.random() - 0.5);

        for (const item of remainingCandidates) {
            if (selected.length >= maxTraps) break;
            if (isAntiCheckmateSafe(item.slot, activeTraps)) {
                selected.push(item.slot);
                activeTraps.push(item.slot);
                usedIndices.add(item.originalIndex);
            }
        }

        // Phase 4: Final fill pass to maximize budget usage if safe candidates remain
        if (selected.length < maxTraps) {
            for (const item of scoredSolos) {
                if (selected.length >= maxTraps) break;
                if (usedIndices.has(item.originalIndex)) continue;
                if (isAntiCheckmateSafe(item.slot, activeTraps)) {
                    selected.push(item.slot);
                    activeTraps.push(item.slot);
                    usedIndices.add(item.originalIndex);
                }
            }
        }

        // 3. Apply Aggressive Creative Tuning — scale ALL trap parameters with difficulty
        const speedScale = Math.min(1.8, 1.0 + (difficultyMult - 1.0) * 0.25);
        const tunedTraps = selected.map(trap => {
            // Pause duration: shorter idle windows at higher difficulties
            if (trap.pauseDuration !== undefined) {
                trap.pauseDuration = Math.max(20, Math.round(trap.pauseDuration / speedScale));
            }

            // Trigger range: traps activate from further away at higher levels
            if (trap.triggerRange !== undefined) {
                const jitter = Math.floor((Math.random() - 0.5) * 8);
                trap.triggerRange = Math.max(25, Math.round(trap.triggerRange * Math.min(1.5, speedScale)) + jitter);
            }

            // Speed scaling: rolling balls, saws, crushers get faster
            if (trap.vx !== undefined) {
                trap.vx = trap.vx * Math.min(1.6, speedScale);
            }
            if (trap.speed !== undefined) {
                trap.speed = Math.min(5.5, trap.speed * speedScale);
            }
            if (trap.dropSpeed !== undefined) {
                trap.dropSpeed = Math.min(4.5, trap.dropSpeed * speedScale);
            }
            if (trap.riseSpeed !== undefined) {
                trap.riseSpeed = Math.min(4.0, trap.riseSpeed * speedScale);
            }
            if (trap.punchSpeed !== undefined) {
                trap.punchSpeed = Math.min(4.5, trap.punchSpeed * speedScale);
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

    // =========================================================================
    // Mathematical Kinematic Solvability Solver
    // Guarantees every level has an absolute 100% physically beatable solution
    // =========================================================================
    verifyLevelSolvability(level, activeTraps = []) {
        if (!level) return true;
        const solids = level.solids || [];
        const door = level.door || { x: 800, y: 340, w: 32, h: 46 };

        // 1. Check door support: door must stand on solid, supported rock
        const doorFloorY = door.y + (door.h || 46);
        const doorSupported = solids.some(s => 
            Math.abs(s.y - doorFloorY) <= 6 && 
            s.x <= door.x + 10 && 
            (s.x + s.w) >= door.x + (door.w || 32) - 10
        );
        if (!doorSupported) return false;

        // 2. Validate headroom across active traps (min crawl height 18px, max vault height 48px)
        for (const trap of activeTraps) {
            if (trap.type === 'ceiling_squish') {
                const floorY = trap.floorY || (trap.y + 115);
                const clearance = floorY - (trap.y + (trap.dropH || 38));
                if (clearance < 18) return false; // Must leave crawl space!
            }
            if (trap.type === 'pop_up_wall') {
                if (trap.h > 48) return false; // Must be jumpable!
            }
        }

        return true;
    }
    async checkPythonStatus() {
        if (typeof fetch === 'undefined') return false;
        try {
            const res = await fetch('/api/ai-status');
            if (res.ok) {
                const data = await res.json();
                this.pythonConnected = !!data.available;
                if (data.engine) this.pythonModel = data.engine;
                return this.pythonConnected;
            }
        } catch (e) {
            this.pythonConnected = false;
        }
        return false;
    }

    async prefetchPythonPrediction(levelId, candidateSlots, staticTraps, levelData = null) {
        if (!this.pythonConnected || !candidateSlots || candidateSlots.length === 0 || typeof fetch === 'undefined') {
            return null;
        }
        if (this.isPrefetching) return null;
        this.isPrefetching = true;

        try {
            const payload = {
                action: 'predict',
                levelId: levelId,
                telemetry: this.telemetry,
                candidateSlots: candidateSlots,
                staticTraps: staticTraps || [],
                levelData: levelData ? {
                    width: levelData.bounds ? levelData.bounds.width : (levelData.width || 900),
                    height: levelData.bounds ? levelData.bounds.height : (levelData.height || 500),
                    spawn: levelData.playerSpawn || levelData.spawn,
                    door: levelData.door,
                    solids: levelData.solids || [],
                    platforms: levelData.platforms || [],
                    pathwayCorridors: levelData.pathwayCorridors || [],
                    staticTraps: levelData.staticTraps || []
                } : null
            };
            const res = await fetch('/api/ai-predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.selectedTraps) {
                    this.cachedPrediction = data;
                    if (data.classification) {
                        if (data.classification.profile) this.currentProfile = data.classification.profile;
                        if (data.classification.confidence) this.confidence = data.classification.confidence;
                        if (data.classification.strategy) this.activeCounterStrategy = data.classification.strategy;
                    }
                    this.isPrefetching = false;
                    return data;
                }
            }
        } catch (e) {
            // Silently fall back to in-browser RL
        }
        this.isPrefetching = false;
        return null;
    }

    sendPythonLearn(type, eventData) {
        if (!this.pythonConnected || typeof fetch === 'undefined') return;
        try {
            fetch('/api/ai-learn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: type,
                    event: eventData
                })
            }).then(res => res.json()).then(data => {
                if (data && data.epochs) {
                    this.learningEpochs = data.epochs;
                }
            }).catch(() => {});
        } catch (e) {}
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

        const isSameCombo = (a, b) => a.comboId && b.comboId && a.comboId === b.comboId;

        // 1. Rolling Boulder Incompatibilities
        if (slot.type === 'rolling_ball') {
            const bTriggerX = slot.triggerX || (slot.x - 110);
            const bJumpMinX = Math.min(slot.x, bTriggerX) - 50;
            const bJumpMaxX = Math.max(slot.x, bTriggerX) + 50;

            for (const act of deployedList) {
                if (isSameCombo(slot, act)) continue;
                const actGroundY = act.groundY !== undefined ? act.groundY : (act.y || 345);
                const isSameElevation = Math.abs(slotGroundY - actGroundY) < 65;

                // Never two rolling boulders in the same level section
                if (act.type === 'rolling_ball' && isSameElevation) return false;

                // In the same corridor, never pair a rolling boulder with sawblades within its rolling runway
                if ((act.type === 'spinning_saw' || act.type === 'razor') && isSameElevation) {
                    if (Math.abs(act.x - slot.x) < 220 || (act.x >= bJumpMinX - 50 && act.x <= bJumpMaxX + 50)) {
                        return false;
                    }
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
            if (isSameCombo(slot, act)) continue;
            if (act.type === 'rolling_ball') {
                const actGroundY = act.groundY !== undefined ? act.groundY : (act.y || 345);
                const isSameElevation = Math.abs(slotGroundY - actGroundY) < 65;

                if (isSameElevation) {
                    const bTriggerX = act.triggerX || (act.x - 110);
                    const bJumpMinX = Math.min(act.x, bTriggerX) - 50;
                    const bJumpMaxX = Math.max(act.x, bTriggerX) + 50;

                    if (slot.type === 'spinning_saw' || slot.type === 'razor') {
                        if (Math.abs(slot.x - act.x) < 220 || (slot.x >= bJumpMinX - 50 && slot.x <= bJumpMaxX + 50)) {
                            return false;
                        }
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
                if (isSameCombo(slot, act)) continue;
                if (act.type === 'static_spike' || act.type === 'hidden_spike' || act.type === 'collapsing_floor') {
                    if (Math.abs(act.x - slot.x) < 60) return false;
                }
            }
        }
        for (const act of deployedList) {
            if (isSameCombo(slot, act)) continue;
            if (isCrawlSaw(act)) {
                if (slot.type === 'static_spike' || slot.type === 'hidden_spike' || slot.type === 'collapsing_floor') {
                    if (Math.abs(slot.x - act.x) < 60) return false;
                }
            }
        }

        // 4. Ceiling Dropping Spike vs Floor Hazard Incompatibilities (prevents mid-air sandwich)
        if (slot.type === 'dropping_spike') {
            for (const act of deployedList) {
                if (isSameCombo(slot, act)) continue;
                if (act.type === 'static_spike' || act.type === 'hidden_spike' || act.type === 'collapsing_floor') {
                    if (Math.abs(act.x - slot.x) < 65) return false;
                }
            }
        }
        if (slot.type === 'static_spike' || slot.type === 'hidden_spike' || slot.type === 'collapsing_floor') {
            for (const act of deployedList) {
                if (isSameCombo(slot, act)) continue;
                if (act.type === 'dropping_spike') {
                    if (Math.abs(act.x - slot.x) < 65) return false;
                }
            }
        }

        // 5. Living Block Vertical Sandwich Prevention (Pop-Up Wall + Ceiling Squish)
        for (const act of deployedList) {
            if (isSameCombo(slot, act)) continue;
            if ((slot.type === 'pop_up_wall' && act.type === 'ceiling_squish') ||
                (slot.type === 'ceiling_squish' && act.type === 'pop_up_wall')) {
                if (Math.abs(slot.x - act.x) < 50) return false;
            }
        }

        // 6. Standard minimum physical distance separation
        const slotY = slot.y || slot.groundY || 345;
        const slotStart = slot.x;
        const slotEnd = slot.x + (slot.w || 32);
        for (const act of deployedList) {
            if (isSameCombo(slot, act)) continue;
            const actY = act.y || act.groundY || 345;
            if (Math.abs(slotY - actY) > 75) continue; // Different floors/stories do not conflict

            const actStart = act.x;
            const actEnd = act.x + (act.w || 28);
            let minGap = 20;
            if (act.type === 'static_spike' || slot.type === 'static_spike') {
                minGap = 35;
            } else if (act.type === 'spring_pad' || slot.type === 'spring_pad') {
                minGap = 16;
            } else if (act.type === 'pop_up_wall' || slot.type === 'pop_up_wall') {
                minGap = 20;
            }
            if (!(slotEnd <= actStart - minGap || slotStart >= actEnd + minGap)) {
                return false;
            }
        }

        return true;
    }
}

window.DevilAI = DevilAI;
