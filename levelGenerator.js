// levelGenerator.js - Endless Parametric Procedural Level Generator for Devil's Trial
// Generates infinite unique, varied, and fair levels (Level 5 to 1000+) using seeded PRNG.
// Mathematical alignment guarantee: open corridors and solid floors match pixel-for-pixel (0 floating pixels).
// Anti-Checkmate guarantee: all dynamic and candidate traps pass through the mutual exclusion matrix.

class AILevelGenerator {
    constructor() {
        this.topologies = [
            'CRAWL_DUCT',       // Low ceiling ducts with alternating high/low sawblades
            'VERTICAL_SPIRE',   // Multi-story climb with rhythmic one-way elevators
            'STEPPED_TEMPLE',   // Stepped altars with springboards, descending boulders, 0-floating floors
            'CAVERN_DESCENT',   // Subterranean plunge with safety alcoves & ferries
            'TWIN_ROUTES',      // High-road jump ledges vs low-road claustrophobic crawl duct
            'CHASM_SPRINGS',    // Wide abyss with islands, vanishing tiles & springboards
            'CRUSHER_ALLEY',    // Synchronized rhythmic piston crusher timing gauntlet
            'BOULDER_RAMP'      // Tiered descent with cascading rolling boulders & buffer walls
        ];

        this.themes = ['inferno', 'midnight', 'toxic', 'bloodstone', 'neon', 'abyssal'];
    }

    /**
     * High-entropy deterministic PRNG (Mulberry32)
     */
    createRNG(seed) {
        let s = seed | 0;
        return function() {
            s = (s + 0x6D2B79F5) | 0;
            let t = Math.imul(s ^ (s >>> 15), 1 | s);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    /**
     * MurmurHash3 32-bit integer finalizer for uniform pseudo-random distributions
     */
    hashInt(x) {
        x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
        x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
        x = (x >>> 16) ^ x;
        return x >>> 0;
    }

    /**
     * Determines the topology archetype for any level ensuring zero back-to-back repeats.
     */
    getTopology(levelNumber) {
        const numTop = this.topologies.length;
        let prevIdx = this.hashInt(4) % numTop;
        let curIdx = prevIdx;
        for (let l = 5; l <= levelNumber; l++) {
            const h = this.hashInt(l);
            curIdx = h % numTop;
            if (curIdx === prevIdx) {
                curIdx = (curIdx + 1 + ((h >>> 4) % (numTop - 1))) % numTop;
                if (curIdx === prevIdx) curIdx = (curIdx + 1) % numTop;
            }
            prevIdx = curIdx;
        }
        return this.topologies[curIdx];
    }

    /**
     * Quantified Progressive Difficulty Rating D(L)
     * Scales variety and puzzle complexity without hypersonic speed spikes.
     */
    getDifficultyMultiplier(levelNumber) {
        if (levelNumber <= 1) return 1.0;
        if (levelNumber === 2) return 1.15;
        if (levelNumber === 3) return 1.35;
        if (levelNumber === 4) return 1.55;
        return parseFloat((1.55 + Math.min(2.5, (levelNumber - 4) * 0.15)).toFixed(2));
    }

    /**
     * Generates an infinite variety of levels for any level number.
     * Guarantees NO TWO MAPS ARE EVER THE SAME while preserving pixel-perfect alignment.
     * @param {number} levelNumber (5, 6, 7 ... 1000+)
     * @param {DevilAI} aiModel
     * @returns {Object} Complete level definition
     */
    generateLevel(levelNumber, aiModel) {
        // High-entropy seed mixing levelNumber with prime factors for distinct pseudo-random sequences
        const seed = (Math.imul(levelNumber, 1597334677) ^ (levelNumber * 16807 + 7919)) >>> 0;
        const rng = this.createRNG(seed);

        const rngRange = (min, max) => min + rng() * (max - min);
        const rngInt = (min, max) => Math.floor(rngRange(min, max + 1));
        const rngChoice = (arr) => arr[Math.floor(rng() * arr.length)];

        // Dynamic non-repeating topology sequence with zero back-to-back repetitions
        const topology = this.getTopology(levelNumber);

        // Rotating thematic color scheme
        const themeIndex = (levelNumber * 3 + rngInt(0, 5)) % this.themes.length;
        const theme = this.themes[themeIndex];
        const title = this.generateTitle(topology, levelNumber, rngChoice);
        const difficulty = this.getDifficultyMultiplier(levelNumber);
        const profile = aiModel ? aiModel.currentProfile : 'BALANCED';

        let level;
        switch (topology) {
            case 'STEPPED_TEMPLE':
                level = this.buildProceduralSteppedTemple(levelNumber, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile);
                break;
            case 'VERTICAL_SPIRE':
                level = this.buildProceduralVerticalSpire(levelNumber, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile);
                break;
            case 'CAVERN_DESCENT':
                level = this.buildProceduralCavernDescent(levelNumber, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile);
                break;
            case 'TWIN_ROUTES':
                level = this.buildProceduralTwinRoutes(levelNumber, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile);
                break;
            case 'CHASM_SPRINGS':
                level = this.buildProceduralChasmSprings(levelNumber, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile);
                break;
            case 'CRUSHER_ALLEY':
                level = this.buildProceduralCrusherAlley(levelNumber, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile);
                break;
            case 'BOULDER_RAMP':
                level = this.buildProceduralBoulderRamp(levelNumber, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile);
                break;
            case 'CRAWL_DUCT':
            default:
                level = this.buildProceduralCrawlDuct(levelNumber, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile);
                break;
        }

        // Anti-Checkmate mutual exclusion filter
        if (aiModel && aiModel.validateTrapSafety && level.candidateTrapSlots) {
            const safeSlots = [];
            for (const slot of level.candidateTrapSlots) {
                if (aiModel.validateTrapSafety(slot, safeSlots)) {
                    safeSlots.push(slot);
                }
            }
            level.candidateTrapSlots = safeSlots;
        }

        return level;
    }

    generateTitle(topology, levelNumber, rngChoice) {
        const prefixes = ["The", "Trial of", "Escape from", "Chamber of", "Return to", "Labyrinth of", "Path of", "Gauntlet of", "Crypt of", "Sanctum of"];
        const adjectives = [
            "Molten", "Cursed", "Treacherous", "Screaming", "Abyssal", "Iron", "Silent", "Shattered",
            "Gilded", "Spectral", "Venomous", "Frenzied", "Forbidden", "Perilous", "Bleeding",
            "Sinister", "Clockwork", "Hollow", "Deceptive", "Savage", "Twilight", "Brutal", "Obsidian",
            "Infernal", "Vindictive", "Phantom", "Relentless", "Tortured", "Malevolent", "Glacial",
            "Smoldering", "Dreadful", "Vicious", "Wicked", "Cataclysmic", "Spiteful", "Forsaken"
        ];
        const nouns = {
            STEPPED_TEMPLE: ["Altar", "Pyramid", "Terrace", "Ziggurat", "Steps", "Sanctuary", "Bastion", "Summit", "Plateau"],
            CRAWL_DUCT: ["Duct", "Vents", "Low Ceiling", "Scramble", "Crawlway", "Shaft", "Passage", "Trench", "Conduit"],
            VERTICAL_SPIRE: ["Spire", "Tower", "Ascent", "Apex", "Steeple", "Pinnacle", "Peak", "Belfry", "Citadel"],
            CAVERN_DESCENT: ["Crypt", "Abyss", "Descent", "Catacomb", "Drop", "Pit", "Chasm", "Vault", "Fissure"],
            TWIN_ROUTES: ["Divergence", "Fork", "Crossroads", "Split", "Choice", "Dichotomy", "Two Roads", "Forkway"],
            CHASM_SPRINGS: ["Bouncer", "Springboards", "Leap", "Abyss", "Rebound", "Vault", "Chasm", "Archipelago"],
            CRUSHER_ALLEY: ["Crusher", "Pistons", "Press", "Gauntlet", "Slammer", "Pounder", "Grinder", "Pneumatics"],
            BOULDER_RAMP: ["Boulder", "Avalanche", "Tumble", "Runaway", "Rockfall", "Roll", "Crag", "Cascade"]
        };

        const prefix = rngChoice(prefixes);
        const adj = rngChoice(adjectives);
        const nounList = nouns[topology] || ["Trial", "Gauntlet", "Hall"];
        const noun = rngChoice(nounList);

        if (prefix === "The") {
            return `The ${adj} ${noun}`;
        } else {
            return `${prefix} the ${adj} ${noun}`;
        }
    }

    // --- Backward compatibility wrapper methods ---
    generatePyramidTemple(levelNum = 7, profile = 'BALANCED', theme = 'inferno', title = 'The Stepped Altar') {
        return this.generateLevel(levelNum, { currentProfile: profile });
    }
    generateCrawlTunnel(levelNum = 5, profile = 'BALANCED', theme = 'inferno', title = 'The Razor Duct') {
        return this.generateLevel(levelNum, { currentProfile: profile });
    }
    generateTowerAscent(levelNum = 6, profile = 'BALANCED', theme = 'inferno', title = "The Devil's Spire") {
        return this.generateLevel(levelNum, { currentProfile: profile });
    }
    generateCavernDescent(levelNum = 8, profile = 'BALANCED', theme = 'inferno', title = 'The Abyssal Crypt') {
        return this.generateLevel(levelNum, { currentProfile: profile });
    }
    generateTwinPaths(levelNum = 9, profile = 'BALANCED', theme = 'inferno', title = 'The Fork in the Dark') {
        return this.generateLevel(levelNum, { currentProfile: profile });
    }
    generateRazorGauntlet(levelNum = 10, profile = 'BALANCED', theme = 'inferno', title = "The Razor's Edge") {
        return this.generateLevel(levelNum, { currentProfile: profile });
    }
    generateDoubleTroll(levelNum = 11, profile = 'BALANCED', theme = 'inferno', title = 'The Double Bluff') {
        return this.generateLevel(levelNum, { currentProfile: profile });
    }

    // =========================================================================
    // 1. STEPPED TEMPLE (Terraces, Springs, Boulders, 0 Floating Pixels)
    // =========================================================================
    buildProceduralSteppedTemple(levelNum, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile) {
        const numSteps = 3 + ((levelNum + rngInt(0, 2)) % 3); // 3, 4, or 5 steps
        const boundsW = 860 + rngInt(0, 380); // 860 to 1240px continuous
        const boundsH = 480;

        const wallL = 50 + rngInt(0, 25);
        const wallR = 50 + rngInt(0, 25);
        const playableW = boundsW - wallL - wallR;

        const baseFloor = 340 + rngInt(-8, 8);
        const cHeadroom = 115 + rngInt(0, 10);
        const maxRise = Math.floor((baseFloor - cHeadroom - 35) / Math.max(1, numSteps - 1));
        const stepRise = Math.min(maxRise, 30 + rngInt(0, 12)); // guarantees top step has at least 35px solid ceiling
        const isPyramid = rng() > 0.55 && numSteps >= 4;

        const stepFloors = [];
        const stepWidths = [];

        // Distribute step widths dynamically
        let remainingW = playableW;
        for (let i = 0; i < numSteps; i++) {
            if (isPyramid) {
                const mid = Math.floor(numSteps / 2);
                const distFromMid = Math.abs(i - mid);
                stepFloors.push(baseFloor - (mid - distFromMid) * stepRise);
            } else {
                stepFloors.push(baseFloor - i * stepRise);
            }

            if (i === numSteps - 1) {
                stepWidths.push(remainingW);
            } else {
                const wFrac = (0.8 / numSteps) + rngRange(-0.05, 0.05);
                const w = Math.round(playableW * wFrac);
                stepWidths.push(w);
                remainingW -= w;
            }
        }

        const pathwayCorridors = [];
        const solids = [];

        // Outer boundary walls
        solids.push({ x: 0, y: 0, w: wallL, h: boundsH });
        solids.push({ x: boundsW - wallR, y: 0, w: wallR, h: boundsH });

        let currentX = wallL;

        for (let i = 0; i < numSteps; i++) {
            const sx = currentX;
            const sw = stepWidths[i];
            const floorY = stepFloors[i];
            const ceilY = Math.max(30, floorY - cHeadroom);

            // Solid ceiling above step (guaranteed positive height >= 30px)
            solids.push({ x: sx, y: 0, w: sw, h: ceilY });

            // Solid floor below step: matches floorY to the pixel (ZERO FLOATING)
            solids.push({ x: sx, y: floorY, w: sw, h: boundsH - floorY });

            // Open corridor strictly between ceiling and floor
            pathwayCorridors.push({
                x: sx,
                y: ceilY,
                w: sw,
                h: floorY - ceilY
            });

            // Transition shaft connecting step i-1 and step i
            if (i > 0) {
                const prevFloor = stepFloors[i - 1];
                const prevCeil = prevFloor - cHeadroom;
                const transitionCeil = Math.min(ceilY, prevCeil);
                const transitionFloor = Math.max(floorY, prevFloor);
                pathwayCorridors.push({
                    x: sx - 4,
                    y: transitionCeil,
                    w: 8,
                    h: transitionFloor - transitionCeil
                });
            }

            currentX += sw;
        }

        const spawnX = wallL + 50;
        const spawnY = stepFloors[0];
        const lastStepIdx = numSteps - 1;
        const doorFloor = stepFloors[lastStepIdx];
        const doorX = boundsW - wallR - 65;
        const doorY = doorFloor - 46;

        const staticTraps = [];
        const candidateTrapSlots = [];

        // Spring pad on Step 1 to assist leaping to Step 2
        staticTraps.push({
            type: 'spring_pad',
            x: wallL + stepWidths[0] - 50,
            y: stepFloors[0],
            w: 32,
            h: 10,
            boostVy: -7.8
        });

        // Middle step static spike
        const midStep = Math.floor(numSteps / 2);
        let midX = wallL;
        for (let k = 0; k < midStep; k++) midX += stepWidths[k];
        staticTraps.push({
            type: 'static_spike',
            x: midX + Math.round(stepWidths[midStep] * 0.4),
            y: stepFloors[midStep],
            w: 28,
            h: 15
        });

        // Rolling boulder from higher tier
        const highestStep = isPyramid ? Math.floor(numSteps / 2) : numSteps - 1;
        let highX = wallL;
        for (let k = 0; k < highestStep; k++) highX += stepWidths[k];
        candidateTrapSlots.push({
            type: 'rolling_ball',
            x: highX + Math.round(stepWidths[highestStep] * 0.7),
            y: stepFloors[highestStep],
            groundY: stepFloors[highestStep],
            radius: 16 + rngInt(0, 3),
            vx: -3.8 - difficulty * 0.4,
            triggerRange: 85
        });

        // Retracting crusher on summit
        candidateTrapSlots.push({
            type: 'piston_crusher',
            x: highX + Math.round(stepWidths[highestStep] * 0.3),
            startY: stepFloors[highestStep] - cHeadroom - 30,
            targetY: stepFloors[highestStep] - cHeadroom + 15,
            w: 38,
            h: 95,
            triggerRange: 45,
            pauseDuration: 50
        });

        // Collapsing floor near the exit
        candidateTrapSlots.push({
            type: 'collapsing_floor',
            x: doorX - 60,
            y: doorFloor,
            w: 48,
            h: 35,
            dropSpeed: 2.2
        });

        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: boundsW, height: boundsH },
            playerSpawn: { x: spawnX, y: spawnY, facing: 1 },
            pathwayCorridors,
            solids,
            door: {
                x: doorX,
                y: doorY,
                w: 32,
                h: 46,
                open: true,
                shiftsMax: 2,
                shiftDirection: -1,
                shiftDistance: 80 + rngInt(0, 15)
            },
            staticTraps,
            candidateTrapSlots
        };
    }

    // =========================================================================
    buildProceduralCrawlDuct(levelNum, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile) {
        const boundsW = 880 + rngInt(0, 360); // 880 to 1240px continuous
        const boundsH = 480;
        const floorY = 340 + rngInt(-10, 10);
        const normalCeilY = 220 + rngInt(-15, 15);
        const normalHeadroom = floorY - normalCeilY;

        const solids = [
            { x: 0, y: 0, w: boundsW, h: normalCeilY },
            { x: 0, y: 0, w: 80, h: boundsH },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            { x: 80, y: floorY, w: boundsW - 160, h: boundsH - floorY }
        ];

        // Procedural generation of 1, 2, or 3 low-ceiling ducts requiring crawling
        const numBeams = 1 + ((levelNum + rngInt(0, 2)) % 3); // 1, 2, or 3 beams
        const beamSegments = [];
        const playableStart = 220;
        const playableEnd = boundsW - 200;
        const span = (playableEnd - playableStart) / numBeams;

        for (let b = 0; b < numBeams; b++) {
            const bX = Math.round(playableStart + b * span + rngInt(10, 30));
            const bW = rngInt(120, 190);
            // Deduct headroom to leave 18px of low crawl duct space (forces crawling on all fours without clipping!)
            const dropH = Math.max(20, normalHeadroom - 18);
            beamSegments.push({ x: bX, w: bW, dropH: dropH });
            solids.push({ x: bX, y: normalCeilY, w: bW, h: dropH });
        }

        // Carve pathway corridors matching the ceiling profile
        const pathwayCorridors = [];
        let curX = 80;

        for (const beam of beamSegments) {
            if (beam.x > curX) {
                pathwayCorridors.push({
                    x: curX,
                    y: normalCeilY,
                    w: beam.x - curX,
                    h: normalHeadroom
                });
            }
            pathwayCorridors.push({
                x: beam.x,
                y: normalCeilY + beam.dropH,
                w: beam.w,
                h: floorY - (normalCeilY + beam.dropH)
            });
            curX = beam.x + beam.w;
        }

        if (curX < boundsW - 80) {
            pathwayCorridors.push({
                x: curX,
                y: normalCeilY,
                w: (boundsW - 80) - curX,
                h: normalHeadroom
            });
        }

        const spawnX = 130;
        const spawnY = floorY;
        const doorX = boundsW - 130;
        const doorY = floorY - 46;

        const firstBeam = beamSegments[0];
        const staticTraps = [
            { type: 'static_spike', x: firstBeam.x + firstBeam.w + 50, y: floorY, w: 28, h: 15 }
        ];

        const candidateTrapSlots = [
            // Head-height sawblade before first beam: bottom at y: floorY - 18 (safe to crawl underneath with 6px margin!)
            {
                type: 'spinning_saw',
                x: firstBeam.x - 50,
                y: floorY - 33,
                radius: 15,
                patrolAxis: 'x',
                minX: firstBeam.x - 90,
                maxX: firstBeam.x - 20,
                speed: 1.8 + difficulty * 0.2
            },
            // Dropping ceiling spike
            {
                type: 'dropping_spike',
                x: firstBeam.x + firstBeam.w + 120,
                y: normalCeilY,
                w: 22,
                h: 22,
                groundY: floorY,
                triggerRange: 38
            },
            // Retracting ceiling crusher
            {
                type: 'piston_crusher',
                x: firstBeam.x + firstBeam.w + 180,
                startY: normalCeilY - 35,
                targetY: normalCeilY + 15,
                w: 40,
                h: 105,
                triggerRange: 45,
                pauseDuration: 52
            },
            // Collapsing floor near exit
            {
                type: 'collapsing_floor',
                x: doorX - 65,
                y: floorY,
                w: 48,
                h: 35,
                dropSpeed: 2.2
            }
        ];

        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: boundsW, height: boundsH },
            playerSpawn: { x: spawnX, y: spawnY, facing: 1 },
            pathwayCorridors,
            solids,
            door: {
                x: doorX,
                y: doorY,
                w: 32,
                h: 46,
                open: true,
                shiftsMax: 2,
                shiftDirection: -1,
                shiftDistance: 85
            },
            staticTraps,
            candidateTrapSlots
        };
    }

    // =========================================================================
    // 3. VERTICAL SPIRE (Multi-Story Ascent, Smooth One-Way Elevators)
    // =========================================================================
    buildProceduralVerticalSpire(levelNum, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile) {
        const boundsW = 840 + rngInt(0, 260); // 840 to 1100px continuous
        const numTiers = 3 + ((levelNum + rngInt(0, 2)) % 3); // 3, 4, or 5 stories
        const boundsH = 680 + numTiers * 160 + rngInt(0, 80);

        const cHeight = 110;
        const tierFloors = [];
        const floorSpacing = Math.round((boundsH - 180) / numTiers);

        for (let t = numTiers - 1; t >= 0; t--) {
            if (t === numTiers - 1) {
                tierFloors.push(boundsH - 80);
            } else if (t === 0) {
                tierFloors.push(160 + rngInt(0, 20));
            } else {
                tierFloors.push(boundsH - 80 - (numTiers - 1 - t) * floorSpacing + rngInt(-15, 15));
            }
        }
        tierFloors.reverse(); // Top tier is tierFloors[0], bottom is tierFloors[numTiers - 1]

        const solids = [
            { x: 0, y: 0, w: boundsW, h: 50 },
            { x: 0, y: 0, w: 80, h: boundsH },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            // Solid base floor
            { x: 80, y: tierFloors[numTiers - 1], w: boundsW - 160, h: boundsH - tierFloors[numTiers - 1] }
        ];

        const pathwayCorridors = [];
        const candidateTrapSlots = [];

        // Procedural shafts alternating between right and left sides
        for (let t = 0; t < numTiers; t++) {
            const flY = tierFloors[t];
            // Story corridor
            pathwayCorridors.push({
                x: 80,
                y: flY - cHeight,
                w: boundsW - 160,
                h: cHeight
            });

            if (t < numTiers - 1) {
                const nextFlY = tierFloors[t + 1];
                const isRightShaft = (t % 2 === 0);
                const shaftW = 100;
                const shaftX = isRightShaft ? boundsW - 180 : 80;
                const shelfX = isRightShaft ? 80 : 180;
                const shelfW = boundsW - 260;

                // Rock separator
                solids.push({
                    x: shelfX,
                    y: flY,
                    w: shelfW,
                    h: nextFlY - flY - cHeight
                });

                // Elevator vertical shaft
                pathwayCorridors.push({
                    x: shaftX,
                    y: flY - cHeight,
                    w: shaftW,
                    h: nextFlY - flY
                });

                // Elevator moving platform in shaft
                const elevSpeed = 1.8 + rngRange(-0.2, 0.3) + difficulty * 0.15;
                candidateTrapSlots.push({
                    type: 'moving_platform',
                    x: shaftX + 12,
                    y: nextFlY - 40,
                    w: 76,
                    h: 18,
                    axis: 'y',
                    min: flY - 5,
                    max: nextFlY - 30,
                    speed: elevSpeed
                });
            }
        }

        const bottomFloor = tierFloors[numTiers - 1];
        const topFloor = tierFloors[0];
        const spawnX = 130;
        const spawnY = bottomFloor;

        // Top tier shaft is on the right side (0 % 2 === 0), solid rock shelf is on the left ([80, boundsW - 180]).
        // Door sits firmly on the solid shelf with ZERO floating pixels!
        const doorX = 140;
        const doorY = topFloor - 46;

        const staticTraps = [
            { type: 'static_spike', x: Math.round(boundsW * 0.5), y: tierFloors[1] || bottomFloor, w: 28, h: 15 }
        ];

        // Patrolling razor on middle tier
        candidateTrapSlots.push({
            type: 'spinning_saw',
            x: 320,
            y: (tierFloors[1] || bottomFloor) - 30,
            radius: 18,
            patrolAxis: 'x',
            minX: 220,
            maxX: boundsW - 220,
            speed: 2.0
        });

        // Dropping spike on the summit approach
        candidateTrapSlots.push({
            type: 'dropping_spike',
            x: doorX + 75,
            y: 50,
            w: 22,
            h: 22,
            groundY: topFloor,
            triggerRange: 38
        });

        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: boundsW, height: boundsH },
            playerSpawn: { x: spawnX, y: spawnY, facing: 1 },
            pathwayCorridors,
            solids,
            door: {
                x: doorX,
                y: doorY,
                w: 32,
                h: 46,
                open: true,
                shiftsMax: 2,
                shiftDirection: 1,
                shiftDistance: 75
            },
            staticTraps,
            candidateTrapSlots
        };
    }

    // =========================================================================
    // 4. CAVERN DESCENT (Subterranean Drop Shafts, Crypt, Safety Alcoves)
    // =========================================================================
    buildProceduralCavernDescent(levelNum, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile) {
        const boundsW = 840 + rngInt(0, 320); // 840 to 1160px continuous
        const boundsH = 880 + rngInt(0, 260); // 880 to 1140px continuous
        const cHeight = 110 + rngInt(0, 20);

        const tier1Floor = 160 + rngInt(-15, 20);
        const tier2Floor = Math.round(boundsH * 0.53 + rngInt(-15, 15));
        const tier3Floor = boundsH - 80;

        const solids = [
            { x: 0, y: 0, w: boundsW, h: 50 },
            { x: 0, y: 0, w: 80, h: boundsH },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            { x: 80, y: tier3Floor, w: boundsW - 160, h: boundsH - tier3Floor },
            // Rock separator 1
            { x: 80, y: tier1Floor, w: boundsW - 260, h: tier2Floor - tier1Floor - cHeight },
            // Rock separator 2
            { x: 180, y: tier2Floor, w: boundsW - 260, h: tier3Floor - tier2Floor - cHeight }
        ];

        const pathwayCorridors = [
            { x: 80, y: tier1Floor - cHeight, w: boundsW - 160, h: cHeight },
            { x: boundsW - 180, y: tier1Floor - cHeight, w: 100, h: tier2Floor - tier1Floor },
            { x: 80, y: tier2Floor - cHeight, w: boundsW - 160, h: cHeight },
            { x: 80, y: tier2Floor - cHeight, w: 100, h: tier3Floor - tier2Floor },
            { x: 80, y: tier3Floor - cHeight, w: boundsW - 160, h: cHeight }
        ];

        const staticTraps = [
            { type: 'spinning_saw', x: boundsW - 130, y: Math.round((tier1Floor + tier2Floor) / 2), radius: 20, patrolAxis: 'none' },
            { type: 'static_spike', x: 440, y: tier3Floor, w: 28, h: 15 }
        ];

        const candidateTrapSlots = [
            // Horizontal ferry platform on middle tier
            {
                type: 'moving_platform',
                x: 300,
                y: tier2Floor - 5,
                w: 75,
                h: 18,
                axis: 'x',
                min: 200,
                max: boundsW - 240,
                speed: 1.8 + difficulty * 0.15
            },
            // Patrolling razor in the crypt
            {
                type: 'spinning_saw',
                x: 320,
                y: tier3Floor - 30,
                radius: 18,
                patrolAxis: 'x',
                minX: 200,
                maxX: 360,
                speed: 2.0
            },
            // Retracting ceiling crusher
            {
                type: 'piston_crusher',
                x: 580,
                startY: tier3Floor - 150,
                targetY: tier3Floor - 100,
                w: 40,
                h: 100,
                triggerRange: 45,
                pauseDuration: 55
            },
            // Crawl-under razor (bottom at tier3Floor - 18, safe for 12px crawl height)
            {
                type: 'spinning_saw',
                x: 260,
                y: tier3Floor - 33,
                radius: 15,
                patrolAxis: 'none'
            }
        ];

        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: boundsW, height: boundsH },
            playerSpawn: { x: 130, y: tier1Floor, facing: 1 },
            pathwayCorridors,
            solids,
            door: {
                x: boundsW - 150,
                y: tier3Floor - 46,
                w: 32,
                h: 46,
                open: true,
                shiftsMax: 2,
                shiftDirection: -1,
                shiftDistance: 85
            },
            staticTraps,
            candidateTrapSlots
        };
    }

    // =========================================================================
    // 5. TWIN ROUTES (High Road Jumps vs Low Road Crawlway)
    // =========================================================================
    buildProceduralTwinRoutes(levelNum, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile) {
        const boundsW = 920 + rngInt(0, 360); // 920 to 1280px continuous
        const boundsH = 480;

        const entryW = 150 + rngInt(0, 50);
        const exitW = 150 + rngInt(0, 50);
        const midW = boundsW - 160 - entryW - exitW;
        const groundFloor = 340 + rngInt(-10, 10);
        const dividerY = 215 + rngInt(-15, 15);
        const dividerH = 42 + rngInt(0, 12);

        const solids = [
            { x: 0, y: 0, w: boundsW, h: 130 },
            { x: 80, y: 130, w: entryW, h: 90 }, // Solid ceiling over entry chamber (prevents jumping into black rock!)
            { x: 0, y: 130, w: 80, h: boundsH - 130 },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            { x: 80, y: groundFloor, w: boundsW - 160, h: boundsH - groundFloor }, // Continuous ground floor
            // Solid rock divider separating High Road from Low Road
            { x: 80 + entryW, y: dividerY, w: midW, h: dividerH }
        ];

        const pathwayCorridors = [
            { x: 80, y: dividerY, w: entryW, h: groundFloor - dividerY },                     // Entry chamber
            { x: 80 + entryW, y: 130, w: midW, h: dividerY - 130 },                          // High Road
            { x: 80 + entryW, y: dividerY + dividerH, w: midW, h: groundFloor - (dividerY + dividerH) }, // Low Road (crawl duct)
            { x: 80 + entryW + midW, y: 130, w: 80, h: groundFloor - 130 },                  // High Road descent
            { x: 80 + entryW + midW, y: dividerY, w: exitW, h: groundFloor - dividerY }       // Exit chamber
        ];

        const staticTraps = [
            { type: 'static_spike', x: 80 + entryW + Math.round(midW * 0.4), y: dividerY, w: 28, h: 15 },
            { type: 'spinning_saw', x: 80 + entryW + Math.round(midW * 0.3), y: groundFloor - 33, radius: 15, patrolAxis: 'none' }
        ];

        const candidateTrapSlots = [
            // Patrolling razor in Low Road (crawl underneath with safe 6px clearance)
            {
                type: 'spinning_saw',
                x: 80 + entryW + Math.round(midW * 0.7),
                y: groundFloor - 33,
                radius: 15,
                patrolAxis: 'x',
                minX: 80 + entryW + Math.round(midW * 0.55),
                maxX: 80 + entryW + Math.round(midW * 0.85),
                speed: 1.9 + difficulty * 0.2
            },
            // Moving platform on High Road
            {
                type: 'moving_platform',
                x: 80 + entryW + 40,
                y: dividerY - 5,
                w: 70,
                h: 16,
                axis: 'x',
                min: 80 + entryW + 20,
                max: 80 + entryW + 150,
                speed: 1.8
            },
            // Rolling boulder along High Road
            {
                type: 'rolling_ball',
                x: 80 + entryW + midW - 30,
                y: dividerY,
                groundY: dividerY,
                radius: 16,
                vx: -4.0 - difficulty * 0.3,
                triggerRange: 80
            },
            // Collapsing floor at exit
            {
                type: 'collapsing_floor',
                x: boundsW - 180,
                y: groundFloor,
                w: 48,
                h: 35,
                dropSpeed: 2.2
            }
        ];

        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: boundsW, height: boundsH },
            playerSpawn: { x: 120, y: groundFloor, facing: 1 },
            pathwayCorridors,
            solids,
            door: {
                x: boundsW - 130,
                y: groundFloor - 46,
                w: 32,
                h: 46,
                open: true,
                shiftsMax: 2,
                shiftDirection: -1,
                shiftDistance: 85
            },
            staticTraps,
            candidateTrapSlots
        };
    }

    // =========================================================================
    // 6. CHASM SPRINGS (Floating Islands, Vanishing Stones & Spring Launchpads)
    // =========================================================================
    buildProceduralChasmSprings(levelNum, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile) {
        const numIslands = 2 + ((levelNum + rngInt(0, 3)) % 4); // 2, 3, 4, or 5 islands
        const boundsW = 900 + rngInt(0, 420); // 900 to 1320px continuous
        const boundsH = 480;
        const floorY = 340 + rngInt(-10, 10);
        const cHeadroom = 120 + rngInt(0, 20);
        const ceilY = floorY - cHeadroom;

        const solids = [
            { x: 0, y: 0, w: boundsW, h: ceilY },
            { x: 0, y: 0, w: 80, h: boundsH },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH }
        ];

        const pathwayCorridors = [];
        const staticTraps = [];
        const candidateTrapSlots = [];

        // Distribute islands and chasms
        const entryW = 150 + rngInt(0, 45);
        const exitW = 150 + rngInt(0, 45);
        const middleSpan = boundsW - 160 - entryW - exitW;
        const islandW = Math.round(middleSpan / (numIslands * 1.8));
        const chasmW = Math.round((middleSpan - (numIslands - 1) * islandW) / numIslands);

        // Entry platform
        solids.push({ x: 80, y: floorY, w: entryW, h: boundsH - floorY });
        pathwayCorridors.push({ x: 80, y: ceilY, w: entryW, h: floorY - ceilY });

        let curX = 80 + entryW;

        for (let i = 0; i < numIslands - 1; i++) {
            // Chasm void
            pathwayCorridors.push({ x: curX, y: ceilY, w: chasmW, h: boundsH - ceilY });
            staticTraps.push({ type: 'static_spike', x: curX + Math.round(chasmW * 0.2), y: boundsH - 18, w: Math.max(30, chasmW - 20), h: 18 });
            curX += chasmW;

            // Island platform
            solids.push({ x: curX, y: floorY, w: islandW, h: boundsH - floorY });
            pathwayCorridors.push({ x: curX, y: ceilY, w: islandW, h: floorY - ceilY });

            // Springboard on island
            if (i % 2 === 0) {
                staticTraps.push({ type: 'spring_pad', x: curX + Math.round(islandW * 0.6), y: floorY, w: 32, h: 10, boostVy: -7.8 });
            } else {
                candidateTrapSlots.push({ type: 'collapsing_floor', x: curX + 10, y: floorY, w: Math.min(48, islandW - 10), h: 35, dropSpeed: 2.2 });
            }
            curX += islandW;
        }

        // Final chasm
        const lastChasmW = (boundsW - 80 - exitW) - curX;
        pathwayCorridors.push({ x: curX, y: ceilY, w: lastChasmW, h: boundsH - ceilY });
        staticTraps.push({ type: 'static_spike', x: curX + 10, y: boundsH - 18, w: Math.max(30, lastChasmW - 20), h: 18 });

        // Exit platform
        solids.push({ x: boundsW - 80 - exitW, y: floorY, w: exitW, h: boundsH - floorY });
        pathwayCorridors.push({ x: boundsW - 80 - exitW, y: ceilY, w: exitW, h: floorY - ceilY });

        // Springboard on Entry platform
        staticTraps.push({ type: 'spring_pad', x: 80 + entryW - 45, y: floorY, w: 32, h: 10, boostVy: -7.8 });

        // Patrolling razor on exit platform
        candidateTrapSlots.push({
            type: 'spinning_saw',
            x: boundsW - 160,
            y: floorY - 25,
            radius: 18,
            patrolAxis: 'x',
            minX: boundsW - 80 - exitW + 20,
            maxX: boundsW - 100,
            speed: 2.0
        });

        // Dropping spike over exit
        candidateTrapSlots.push({
            type: 'dropping_spike',
            x: boundsW - 140,
            y: ceilY,
            w: 22,
            h: 22,
            groundY: floorY,
            triggerRange: 38
        });

        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: boundsW, height: boundsH },
            playerSpawn: { x: 120, y: floorY, facing: 1 },
            pathwayCorridors,
            solids,
            door: {
                x: boundsW - 120,
                y: floorY - 46,
                w: 32,
                h: 46,
                open: true,
                shiftsMax: 2,
                shiftDirection: -1,
                shiftDistance: 85
            },
            staticTraps,
            candidateTrapSlots
        };
    }

    // =========================================================================
    // 7. CRUSHER ALLEY (Synchronized Pneumatic Crushers & Crawl Ducts)
    // =========================================================================
    buildProceduralCrusherAlley(levelNum, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile) {
        const numCrushers = 2 + ((levelNum + rngInt(0, 3)) % 4); // 2, 3, 4, or 5 crushers
        const boundsW = 880 + rngInt(0, 420); // 880 to 1300px continuous
        const boundsH = 480;
        const floorY = 340 + rngInt(-10, 10);
        const cHeadroom = 115 + rngInt(0, 25);
        const ceilY = floorY - cHeadroom;

        const solids = [
            { x: 0, y: 0, w: boundsW, h: ceilY },
            { x: 0, y: 0, w: 80, h: boundsH },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            { x: 80, y: floorY, w: boundsW - 160, h: boundsH - floorY }
        ];

        const pathwayCorridors = [
            { x: 80, y: ceilY, w: boundsW - 160, h: floorY - ceilY }
        ];

        const staticTraps = [];
        const candidateTrapSlots = [];

        const span = (boundsW - 400) / numCrushers;
        for (let c = 0; c < numCrushers; c++) {
            const cX = Math.round(240 + c * span + rngInt(-15, 15));
            candidateTrapSlots.push({
                type: 'piston_crusher',
                x: cX,
                startY: ceilY - 40,
                targetY: ceilY + 10,
                w: 42,
                h: 105,
                triggerRange: 48,
                pauseDuration: 48 + rngInt(0, 15)
            });

            // Intermediate obstacle between crushers
            if (c < numCrushers - 1) {
                const midX = cX + Math.round(span * 0.5);
                if (c % 2 === 0) {
                    staticTraps.push({ type: 'static_spike', x: midX, y: floorY, w: 28, h: 15 });
                } else {
                    candidateTrapSlots.push({
                        type: 'spinning_saw',
                        x: midX,
                        y: floorY - 25,
                        radius: 15,
                        patrolAxis: 'none'
                    });
                }
            }
        }

        // Surprise collapsing floor near the exit
        candidateTrapSlots.push({
            type: 'collapsing_floor',
            x: boundsW - 170,
            y: floorY,
            w: 48,
            h: 35,
            dropSpeed: 2.2
        });

        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: boundsW, height: boundsH },
            playerSpawn: { x: 120, y: floorY, facing: 1 },
            pathwayCorridors,
            solids,
            door: {
                x: boundsW - 120,
                y: floorY - 46,
                w: 32,
                h: 46,
                open: true,
                shiftsMax: 2,
                shiftDirection: -1,
                shiftDistance: 85
            },
            staticTraps,
            candidateTrapSlots
        };
    }

    // =========================================================================
    // 8. BOULDER RAMP (Cascading Downward Run with High Alcoves)
    // =========================================================================
    buildProceduralBoulderRamp(levelNum, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile) {
        const boundsW = 920 + rngInt(0, 420); // 920 to 1340px continuous
        const boundsH = 480;
        const floorY = 340 + rngInt(-10, 10);
        const cHeadroom = 120 + rngInt(0, 25);
        const ceilY = floorY - cHeadroom;

        const solids = [
            { x: 0, y: 0, w: boundsW, h: ceilY },
            { x: 0, y: 0, w: 80, h: boundsH },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            { x: 80, y: floorY, w: boundsW - 160, h: boundsH - floorY }
        ];

        // Procedural high resting shelves so player can vault over boulders
        const numShelves = 1 + ((levelNum + rngInt(0, 2)) % 3); // 1, 2, or 3 shelves
        const shelfSpan = (boundsW - 400) / (numShelves + 1);

        for (let s = 0; s < numShelves; s++) {
            const shX = Math.round(300 + s * shelfSpan + rngInt(-25, 25));
            const shW = 90 + rngInt(0, 40);
            const shY = floorY - 55 - rngInt(0, 20);
            solids.push({ x: shX, y: shY, w: shW, h: 20 });
        }

        const pathwayCorridors = [
            { x: 80, y: ceilY, w: boundsW - 160, h: floorY - ceilY }
        ];

        const staticTraps = [
            { type: 'static_spike', x: Math.round(boundsW * 0.55), y: floorY, w: 28, h: 15 }
        ];

        const candidateTrapSlots = [
            // Rolling boulder rolling back toward player
            {
                type: 'rolling_ball',
                x: boundsW - 140,
                y: floorY,
                groundY: floorY,
                radius: 17 + rngInt(0, 3),
                vx: -4.0 - difficulty * 0.35,
                triggerRange: 90
            },
            // High razor in vault zone: crawl under (bottom at floorY - 18, safe 6px crawl clearance)
            {
                type: 'spinning_saw',
                x: 300,
                y: floorY - 33,
                radius: 15,
                patrolAxis: 'x',
                minX: 240,
                maxX: 360,
                speed: 1.8
            },
            // Dropping ceiling spike
            {
                type: 'dropping_spike',
                x: boundsW - 240,
                y: ceilY,
                w: 22,
                h: 22,
                groundY: floorY,
                triggerRange: 38
            },
            // Collapsing floor near exit
            {
                type: 'collapsing_floor',
                x: boundsW - 180,
                y: floorY,
                w: 48,
                h: 35,
                dropSpeed: 2.2
            }
        ];

        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: boundsW, height: boundsH },
            playerSpawn: { x: 120, y: floorY, facing: 1 },
            pathwayCorridors,
            solids,
            door: {
                x: boundsW - 120,
                y: floorY - 46,
                w: 32,
                h: 46,
                open: true,
                shiftsMax: 2,
                shiftDirection: -1,
                shiftDistance: 85
            },
            staticTraps,
            candidateTrapSlots
        };
    }
}

window.AILevelGenerator = AILevelGenerator;
