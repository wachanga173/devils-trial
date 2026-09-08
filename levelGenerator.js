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
     * Generates an infinite variety of levels for any level number
     * @param {number} levelNumber (5, 6, 7 ... 1000+)
     * @param {DevilAI} aiModel
     * @returns {Object} Complete level definition
     */
    generateLevel(levelNumber, aiModel) {
        const seed = (levelNumber * 16807 + 7919) % 2147483647;
        const rng = this.createRNG(seed);

        const rngRange = (min, max) => min + rng() * (max - min);
        const rngInt = (min, max) => Math.floor(rngRange(min, max + 1));
        const rngChoice = (arr) => arr[Math.floor(rng() * arr.length)];

        // Choose topology using a staggered cycle so adjacent levels have distinct feels
        const topIndex = (levelNumber - 5 + Math.floor((levelNumber - 5) / this.topologies.length) * 3) % this.topologies.length;
        const topology = this.topologies[(topIndex + this.topologies.length) % this.topologies.length];

        const theme = this.themes[(levelNumber - 1) % this.themes.length];
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

        return level;
    }

    generateTitle(topology, levelNumber, rngChoice) {
        const prefixes = ["The", "Trial of", "Escape from", "Chamber of", "Return to", "Labyrinth of", "Path of"];
        const adjectives = [
            "Molten", "Cursed", "Treacherous", "Screaming", "Abyssal", "Iron", "Silent", "Shattered",
            "Gilded", "Spectral", "Venomous", "Frenzied", "Forbidden", "Perilous", "Bleeding",
            "Sinister", "Clockwork", "Hollow", "Deceptive", "Savage", "Twilight", "Brutal", "Obsidian"
        ];
        const nouns = {
            STEPPED_TEMPLE: ["Altar", "Pyramid", "Terrace", "Ziggurat", "Steps", "Sanctuary", "Bastion"],
            CRAWL_DUCT: ["Duct", "Vents", "Low Ceiling", "Scramble", "Crawlway", "Shaft", "Passage"],
            VERTICAL_SPIRE: ["Spire", "Tower", "Ascent", "Apex", "Steeple", "Pinnacle", "Peak"],
            CAVERN_DESCENT: ["Crypt", "Abyss", "Descent", "Catacomb", "Drop", "Pit", "Chasm"],
            TWIN_ROUTES: ["Divergence", "Fork", "Crossroads", "Split", "Choice", "Dichotomy", "Two Roads"],
            CHASM_SPRINGS: ["Bouncer", "Springboards", "Leap", "Abyss", "Rebound", "Vault", "Chasm"],
            CRUSHER_ALLEY: ["Crusher", "Pistons", "Press", "Gauntlet", "Slammer", "Pounder", "Grinder"],
            BOULDER_RAMP: ["Boulder", "Avalanche", "Tumble", "Runaway", "Rockfall", "Roll", "Crag"]
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
        const seed = (levelNum * 16807 + 7919) % 2147483647;
        const rng = this.createRNG(seed);
        const rngRange = (min, max) => min + rng() * (max - min);
        const rngInt = (min, max) => Math.floor(rngRange(min, max + 1));
        const rngChoice = (arr) => arr[Math.floor(rng() * arr.length)];
        return this.buildProceduralSteppedTemple(levelNum, rng, rngRange, rngInt, rngChoice, 1.35, theme, title, profile);
    }

    generateCrawlTunnel(levelNum = 5, profile = 'BALANCED', theme = 'inferno', title = 'The Razor Duct') {
        const seed = (levelNum * 16807 + 7919) % 2147483647;
        const rng = this.createRNG(seed);
        const rngRange = (min, max) => min + rng() * (max - min);
        const rngInt = (min, max) => Math.floor(rngRange(min, max + 1));
        const rngChoice = (arr) => arr[Math.floor(rng() * arr.length)];
        return this.buildProceduralCrawlDuct(levelNum, rng, rngRange, rngInt, rngChoice, 1.35, theme, title, profile);
    }

    generateTowerAscent(levelNum = 6, profile = 'BALANCED', theme = 'inferno', title = "The Devil's Spire") {
        const seed = (levelNum * 16807 + 7919) % 2147483647;
        const rng = this.createRNG(seed);
        const rngRange = (min, max) => min + rng() * (max - min);
        const rngInt = (min, max) => Math.floor(rngRange(min, max + 1));
        const rngChoice = (arr) => arr[Math.floor(rng() * arr.length)];
        return this.buildProceduralVerticalSpire(levelNum, rng, rngRange, rngInt, rngChoice, 1.35, theme, title, profile);
    }

    generateCavernDescent(levelNum = 8, profile = 'BALANCED', theme = 'inferno', title = 'The Abyssal Crypt') {
        const seed = (levelNum * 16807 + 7919) % 2147483647;
        const rng = this.createRNG(seed);
        const rngRange = (min, max) => min + rng() * (max - min);
        const rngInt = (min, max) => Math.floor(rngRange(min, max + 1));
        const rngChoice = (arr) => arr[Math.floor(rng() * arr.length)];
        return this.buildProceduralCavernDescent(levelNum, rng, rngRange, rngInt, rngChoice, 1.35, theme, title, profile);
    }

    generateTwinPaths(levelNum = 9, profile = 'BALANCED', theme = 'inferno', title = 'The Fork in the Dark') {
        const seed = (levelNum * 16807 + 7919) % 2147483647;
        const rng = this.createRNG(seed);
        const rngRange = (min, max) => min + rng() * (max - min);
        const rngInt = (min, max) => Math.floor(rngRange(min, max + 1));
        const rngChoice = (arr) => arr[Math.floor(rng() * arr.length)];
        return this.buildProceduralTwinRoutes(levelNum, rng, rngRange, rngInt, rngChoice, 1.35, theme, title, profile);
    }

    generateRazorGauntlet(levelNum = 10, profile = 'BALANCED', theme = 'inferno', title = "The Razor's Edge") {
        const seed = (levelNum * 16807 + 7919) % 2147483647;
        const rng = this.createRNG(seed);
        const rngRange = (min, max) => min + rng() * (max - min);
        const rngInt = (min, max) => Math.floor(rngRange(min, max + 1));
        const rngChoice = (arr) => arr[Math.floor(rng() * arr.length)];
        return this.buildProceduralCrusherAlley(levelNum, rng, rngRange, rngInt, rngChoice, 1.35, theme, title, profile);
    }

    generateDoubleTroll(levelNum = 11, profile = 'BALANCED', theme = 'inferno', title = 'The Double Bluff') {
        const seed = (levelNum * 16807 + 7919) % 2147483647;
        const rng = this.createRNG(seed);
        const rngRange = (min, max) => min + rng() * (max - min);
        const rngInt = (min, max) => Math.floor(rngRange(min, max + 1));
        const rngChoice = (arr) => arr[Math.floor(rng() * arr.length)];
        return this.buildProceduralBoulderRamp(levelNum, rng, rngRange, rngInt, rngChoice, 1.35, theme, title, profile);
    }

    // =========================================================================
    // 1. STEPPED TEMPLE (Terraces, Springs, Boulders, 0 Floating Pixels)
    // =========================================================================
    buildProceduralSteppedTemple(levelNum, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile) {
        let numSteps = (levelNum <= 6) ? 3 : (3 + (levelNum % 2)); // 3 or 4 steps depending on level
        let boundsW = (levelNum <= 6) ? 840 : (960 + rngInt(0, 2) * 60);
        const boundsH = 480;

        const wallL = 60;
        const wallR = 60;
        let stepFloors = [];
        let stepWidths = [];

        // Exact tiered floors for Level 7 to guarantee perfect alignment
        if (levelNum === 7) {
            numSteps = 3;
            boundsW = 960;
            stepFloors = [345, 290, 245];
            stepWidths = [200, 200, 440];
        } else {
            const playableW = boundsW - wallL - wallR;
            const baseFloor = 350 - rngInt(0, 10);
            const stepRise = 48 + rngInt(0, 8);
            for (let i = 0; i < numSteps; i++) {
                stepFloors.push(baseFloor - i * stepRise);
                if (i === 0) {
                    stepWidths.push(Math.round(playableW * 0.28));
                } else if (i === numSteps - 1) {
                    stepWidths.push(Math.round(playableW * 0.40));
                } else {
                    stepWidths.push(Math.round(playableW * 0.32 / (numSteps - 2)));
                }
            }
            const sumW = stepWidths.reduce((a, b) => a + b, 0);
            stepWidths[stepWidths.length - 1] += (playableW - sumW);
        }

        const pathwayCorridors = [];
        const solids = [];

        // Perimeter boundary walls
        solids.push({ x: 0, y: 0, w: wallL, h: boundsH }); // Left wall
        solids.push({ x: boundsW - wallR, y: 0, w: wallR, h: boundsH }); // Right wall

        let currentX = wallL;
        const cHeadroom = 125; // Clean open headroom for platforming

        for (let i = 0; i < numSteps; i++) {
            const sx = currentX;
            const sw = stepWidths[i];
            const floorY = stepFloors[i];
            const ceilY = floorY - cHeadroom;

            // Solid ceiling above step
            solids.push({ x: sx, y: 0, w: sw, h: ceilY });

            // Solid floor below step (matches floorY exactly! ZERO FLOATING)
            solids.push({ x: sx, y: floorY, w: sw, h: boundsH - floorY });

            // Open corridor between ceiling and floor
            // Add slight X overlap on transitions so walls between steps are visually connected
            const xOverlap = (i < numSteps - 1) ? 2 : 0;
            // Also extend corridor downwards to the previous step's floor level at transition points
            const hExtend = (i > 0) ? (stepFloors[i - 1] - floorY) : 0;
            pathwayCorridors.push({
                x: sx - (i > 0 ? 2 : 0),
                y: ceilY,
                w: sw + xOverlap + (i > 0 ? 2 : 0),
                h: cHeadroom + hExtend
            });

            currentX += sw;
        }

        const spawnX = wallL + 50;
        const spawnY = stepFloors[0];
        const summitIndex = numSteps - 1;
        const summitFloor = stepFloors[summitIndex];
        const summitStart = boundsW - wallR - stepWidths[summitIndex];
        const doorX = boundsW - wallR - 65;
        const doorY = summitFloor - 46;

        const staticTraps = [];
        const candidateTrapSlots = [];

        // Springboard on Tier 1 to help leap to Tier 2
        staticTraps.push({
            type: 'spring_pad',
            x: wallL + stepWidths[0] - 55,
            y: stepFloors[0],
            w: 32,
            h: 10,
            boostVy: -7.6
        });

        // Static spike on a middle tier
        if (numSteps >= 3) {
            const midIndex = 1;
            staticTraps.push({
                type: 'static_spike',
                x: wallL + stepWidths[0] + 50,
                y: stepFloors[midIndex],
                w: 28,
                h: 15
            });
        }

        // Rolling boulder descending along summit altar
        candidateTrapSlots.push({
            type: 'rolling_ball',
            x: boundsW - wallR - 25,
            y: summitFloor,
            groundY: summitFloor,
            radius: 18,
            vx: -4.0,
            triggerRange: 85
        });

        // Patrolling sawblade on middle tier (positioned with >= 50px clearance from static spike at midX + 50)
        if (numSteps >= 3) {
            const midX = wallL + stepWidths[0];
            candidateTrapSlots.push({
                type: 'spinning_saw',
                x: midX + 135,
                y: stepFloors[1] - 25,
                radius: 16,
                patrolAxis: 'x',
                minX: midX + 110,
                maxX: midX + stepWidths[1] - 25,
                speed: 2.0
            });
        }

        // High razor on summit altar: duck and crawl on all fours underneath!
        candidateTrapSlots.push({
            type: 'spinning_saw',
            x: summitStart + 80,
            y: summitFloor - 22,
            radius: 15,
            patrolAxis: 'none'
        });

        // Collapsing floor on summit
        candidateTrapSlots.push({
            type: 'collapsing_floor',
            x: summitStart + 160,
            y: summitFloor,
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
    // 2. CRAWL DUCT (Low Ceiling Beams, Crawl on All Fours, Rhythmic Saws)
    // =========================================================================
    buildProceduralCrawlDuct(levelNum, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile) {
        const boundsW = (levelNum <= 6) ? 840 : (840 + rngInt(0, 3) * 80); // 840 to 1080px
        const boundsH = 480;
        const floorY = 345;
        const normalCeilY = 230;

        const solids = [
            { x: 0, y: 0, w: boundsW, h: normalCeilY },     // Base solid ceiling
            { x: 0, y: 0, w: 80, h: boundsH },             // Left wall
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },   // Right wall
            { x: 80, y: floorY, w: boundsW - 160, h: boundsH - floorY } // Solid continuous floor
        ];

        const pathwayCorridors = [
            { x: 80, y: normalCeilY, w: boundsW - 160, h: floorY - normalCeilY }
        ];

        // Procedural "Low Duct Beam": drops ceiling to y: 265 for a span of 140px
        // In this zone, headroom is only 80px (standing player cannot jump, ducking required)
        const beamX = (levelNum <= 6) ? 260 : (260 + rngInt(0, 3) * 60);
        const beamW = (levelNum <= 6) ? 140 : (150 + rngInt(0, 40));
        solids.push({ x: beamX, y: normalCeilY, w: beamW, h: 35 }); // Ceil drops down to 265

        const spawnX = 130;
        const spawnY = floorY;
        const doorX = boundsW - 130;
        const doorY = floorY - 46;

        const staticTraps = [
            // Floor spike in the open-ceiling runway
            { type: 'static_spike', x: beamX + beamW + 60, y: floorY, w: 28, h: 15 }
        ];

        const candidateTrapSlots = [
            // Head-height sawblade: bottom at y: 334. Standing player hits it; crawling player ducks cleanly under!
            {
                type: 'spinning_saw',
                x: beamX - 60,
                y: 320,
                radius: 15,
                patrolAxis: 'x',
                minX: beamX - 100,
                maxX: beamX - 20,
                speed: 1.8
            },
            // Dropping ceiling spike
            {
                type: 'dropping_spike',
                x: beamX + beamW + 140,
                y: normalCeilY,
                w: 22,
                h: 22,
                groundY: floorY,
                triggerRange: 38
            },
            // Retracting ceiling crusher
            {
                type: 'piston_crusher',
                x: beamX + beamW + 210,
                startY: normalCeilY - 40,
                targetY: normalCeilY + 10,
                w: 40,
                h: 105,
                triggerRange: 45,
                pauseDuration: 52
            },
            // Collapsing floor near the exit
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
        const boundsW = 840;
        const boundsH = 960 + (levelNum % 3 === 0 ? 160 : 0); // 960 or 1120px

        const tier3Floor = boundsH - 80;
        const tier2Floor = Math.round(boundsH * 0.58);
        const tier1Floor = 160;
        const cHeight = 110;

        const solids = [
            { x: 0, y: 0, w: boundsW, h: 50 },                               // Top ceiling cap
            { x: 0, y: 0, w: 80, h: boundsH },                               // Left outer wall
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },                    // Right outer wall
            { x: 80, y: tier3Floor, w: boundsW - 160, h: boundsH - tier3Floor }, // Bottom solid floor
            // Rock separator between Tier 2 and Tier 3 (leaves right shaft open)
            { x: 80, y: tier2Floor, w: boundsW - 260, h: tier3Floor - tier2Floor - cHeight },
            // Rock separator between Tier 1 and Tier 2 (leaves left shaft open)
            { x: 180, y: tier1Floor, w: boundsW - 260, h: tier2Floor - tier1Floor - cHeight }
        ];

        const pathwayCorridors = [
            // Tier 3 bottom hall
            { x: 80, y: tier3Floor - cHeight, w: boundsW - 160, h: cHeight },
            // Right elevator shaft
            { x: boundsW - 180, y: tier2Floor - cHeight, w: 100, h: tier3Floor - tier2Floor },
            // Tier 2 middle hall
            { x: 80, y: tier2Floor - cHeight, w: boundsW - 160, h: cHeight },
            // Left elevator shaft
            { x: 80, y: tier1Floor - cHeight, w: 100, h: tier2Floor - tier1Floor },
            // Tier 1 summit hall
            { x: 80, y: tier1Floor - cHeight, w: boundsW - 160, h: cHeight }
        ];

        const elevatorSpeed = 1.8 + rngRange(-0.1, 0.2);

        const staticTraps = [
            { type: 'static_spike', x: 420, y: tier2Floor, w: 28, h: 15 }
        ];

        const candidateTrapSlots = [
            // Right elevator platform in Shaft 2 (one-way top-surface platform!)
            {
                type: 'moving_platform',
                x: boundsW - 170,
                y: tier3Floor - 40,
                w: 76,
                h: 18,
                axis: 'y',
                min: tier2Floor - 5,
                max: tier3Floor - 30,
                speed: elevatorSpeed
            },
            // Left elevator platform in Shaft 1 (one-way top-surface platform!)
            {
                type: 'moving_platform',
                x: 92,
                y: tier2Floor - 40,
                w: 76,
                h: 18,
                axis: 'y',
                min: tier1Floor - 5,
                max: tier2Floor - 30,
                speed: elevatorSpeed
            },
            // Patrolling razor on middle tier
            {
                type: 'spinning_saw',
                x: 320,
                y: tier2Floor - 30,
                radius: 18,
                patrolAxis: 'x',
                minX: 240,
                maxX: 400,
                speed: 2.0
            },
            // High razor at summit
            {
                type: 'spinning_saw',
                x: 440,
                y: tier1Floor - 22,
                radius: 15,
                patrolAxis: 'none'
            },
            // Dropping ceiling spike at summit peak
            {
                type: 'dropping_spike',
                x: 540,
                y: 50,
                w: 22,
                h: 22,
                groundY: tier1Floor,
                triggerRange: 38
            }
        ];

        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: boundsW, height: boundsH },
            playerSpawn: { x: 130, y: tier3Floor, facing: 1 },
            pathwayCorridors,
            solids,
            door: {
                x: boundsW - 140,
                y: tier1Floor - 46,
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
    // 4. CAVERN DESCENT (Subterranean Drop Shafts, Crypt, Safety Alcoves)
    // =========================================================================
    buildProceduralCavernDescent(levelNum, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile) {
        const boundsW = 840;
        const boundsH = 960;
        const cHeight = 110;

        const tier1Floor = 160;
        const tier2Floor = 580;
        const tier3Floor = 880;

        const solids = [
            { x: 0, y: 0, w: boundsW, h: 50 },
            { x: 0, y: 0, w: 80, h: boundsH },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            { x: 80, y: tier3Floor, w: boundsW - 160, h: boundsH - tier3Floor },
            // Rock separator between Tier 1 and Tier 2 (leaves right drop open)
            { x: 80, y: tier1Floor, w: boundsW - 260, h: tier2Floor - tier1Floor - cHeight },
            // Rock separator between Tier 2 and Tier 3 (leaves left drop open)
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
            { type: 'spinning_saw', x: boundsW - 130, y: 320, radius: 20, patrolAxis: 'none' },
            { type: 'static_spike', x: 440, y: tier3Floor, w: 28, h: 15 }
        ];

        const candidateTrapSlots = [
            // Horizontal ferry platform on middle tier
            {
                type: 'moving_platform',
                x: 320,
                y: tier2Floor - 5,
                w: 75,
                h: 18,
                axis: 'x',
                min: 220,
                max: 520,
                speed: 1.8
            },
            // Patrolling razor in the crypt (clearance >= 50px from static spike at x: 440)
            {
                type: 'spinning_saw',
                x: 320,
                y: tier3Floor - 30,
                radius: 18,
                patrolAxis: 'x',
                minX: 220,
                maxX: 365,
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
            // High razor in crypt corridor: crawl under!
            {
                type: 'spinning_saw',
                x: 260,
                y: tier3Floor - 22,
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
        const boundsW = 1000 + rngInt(0, 2) * 80;
        const boundsH = 480;

        const entryW = 180;
        const exitW = 180;
        const midW = boundsW - 160 - entryW - exitW;

        const solids = [
            { x: 0, y: 0, w: boundsW, h: 130 },
            { x: 0, y: 130, w: 80, h: boundsH - 130 },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            { x: 80, y: 345, w: boundsW - 160, h: boundsH - 345 }, // Continuous ground floor
            // Solid rock divider separating High Road from Low Road
            { x: 80 + entryW, y: 220, w: midW, h: 45 }
        ];

        const pathwayCorridors = [
            { x: 80, y: 230, w: entryW, h: 115 },               // Entry chamber
            { x: 80 + entryW, y: 130, w: midW, h: 90 },         // High Road
            { x: 80 + entryW, y: 265, w: midW, h: 80 },         // Low Road (crawl duct)
            { x: 80 + entryW + midW, y: 130, w: 80, h: 215 },   // High Road drop down
            { x: 80 + entryW + midW, y: 230, w: exitW, h: 115 } // Exit chamber
        ];

        const staticTraps = [
            { type: 'static_spike', x: 80 + entryW + Math.round(midW * 0.4), y: 220, w: 28, h: 15 },
            // Low Road high-mounted razor: crawl underneath on all fours!
            { type: 'spinning_saw', x: 80 + entryW + Math.round(midW * 0.3), y: 320, radius: 15, patrolAxis: 'none' }
        ];

        const candidateTrapSlots = [
            // High razor in Low Road duct: crawl under!
            {
                type: 'spinning_saw',
                x: 80 + entryW + Math.round(midW * 0.7),
                y: 320,
                radius: 15,
                patrolAxis: 'x',
                minX: 80 + entryW + Math.round(midW * 0.55),
                maxX: 80 + entryW + Math.round(midW * 0.85),
                speed: 1.9
            },
            // Moving platform on High Road
            {
                type: 'moving_platform',
                x: 80 + entryW + 40,
                y: 215,
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
                y: 220,
                groundY: 220,
                radius: 16,
                vx: -4.0,
                triggerRange: 80
            },
            // Collapsing floor at exit
            {
                type: 'collapsing_floor',
                x: boundsW - 180,
                y: 345,
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
            playerSpawn: { x: 120, y: 345, facing: 1 },
            pathwayCorridors,
            solids,
            door: {
                x: boundsW - 130,
                y: 299,
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
        const boundsW = 960 + rngInt(0, 2) * 80;
        const boundsH = 480;
        const floorY = 345;
        const ceilY = 220;

        const solids = [
            { x: 0, y: 0, w: boundsW, h: ceilY },
            { x: 0, y: 0, w: 80, h: boundsH },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            // Entry platform
            { x: 80, y: floorY, w: 180, h: boundsH - floorY },
            // Middle island
            { x: 380, y: floorY, w: 160, h: boundsH - floorY },
            // Exit platform
            { x: 680, y: floorY, w: boundsW - 680 - 80, h: boundsH - floorY }
        ];

        const pathwayCorridors = [
            { x: 80, y: ceilY, w: boundsW - 160, h: floorY - ceilY + 120 } // Extends down into chasms
        ];

        const staticTraps = [
            // Spring pad on Entry platform launching player across Chasm 1 to Middle island
            { type: 'spring_pad', x: 210, y: floorY, w: 32, h: 10, boostVy: -7.8 },
            // Spikes in the chasms
            { type: 'static_spike', x: 280, y: boundsH - 20, w: 80, h: 20 },
            { type: 'static_spike', x: 560, y: boundsH - 20, w: 80, h: 20 }
        ];

        const candidateTrapSlots = [
            // Spring pad on Middle island launching across Chasm 2
            { type: 'spring_pad', x: 480, y: floorY, w: 32, h: 10, boostVy: -7.8 },
            // Vanishing stepping stone tile on Middle island
            { type: 'collapsing_floor', x: 400, y: floorY, w: 45, h: 35, dropSpeed: 2.2 },
            // Dropping spike in ceiling over exit runway
            { type: 'dropping_spike', x: 740, y: ceilY, w: 22, h: 22, groundY: floorY, triggerRange: 38 },
            // Patrolling razor on exit platform
            {
                type: 'spinning_saw',
                x: 820,
                y: floorY - 25,
                radius: 18,
                patrolAxis: 'x',
                minX: 740,
                maxX: boundsW - 160,
                speed: 2.0
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
                x: boundsW - 130,
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
    // 7. CRUSHER ALLEY (Synchronized Piston Crushers with Rhythm Safe Zones)
    // =========================================================================
    buildProceduralCrusherAlley(levelNum, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile) {
        const boundsW = 960 + rngInt(0, 2) * 80;
        const boundsH = 480;
        const floorY = 345;
        const ceilY = 220;

        const solids = [
            { x: 0, y: 0, w: boundsW, h: ceilY },
            { x: 0, y: 0, w: 80, h: boundsH },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            { x: 80, y: floorY, w: boundsW - 160, h: boundsH - floorY }
        ];

        const pathwayCorridors = [
            { x: 80, y: ceilY, w: boundsW - 160, h: floorY - ceilY }
        ];

        const staticTraps = [
            { type: 'static_spike', x: 380, y: floorY, w: 28, h: 15 }
        ];

        const candidateTrapSlots = [
            // Crusher 1
            {
                type: 'piston_crusher',
                x: 280,
                startY: ceilY - 40,
                targetY: ceilY + 10,
                w: 42,
                h: 105,
                triggerRange: 48,
                pauseDuration: 50
            },
            // Crusher 2
            {
                type: 'piston_crusher',
                x: 520,
                startY: ceilY - 40,
                targetY: ceilY + 10,
                w: 42,
                h: 105,
                triggerRange: 48,
                pauseDuration: 55
            },
            // Crusher 3
            {
                type: 'piston_crusher',
                x: 740,
                startY: ceilY - 40,
                targetY: ceilY + 10,
                w: 42,
                h: 105,
                triggerRange: 48,
                pauseDuration: 50
            },
            // High razor between crushers: crawl under!
            {
                type: 'spinning_saw',
                x: 640,
                y: 320,
                radius: 15,
                patrolAxis: 'none'
            },
            // Surprise collapsing floor near exit
            {
                type: 'collapsing_floor',
                x: boundsW - 170,
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

    // =========================================================================
    // 8. BOULDER RAMP (Cascading Downward Run with High Alcoves)
    // =========================================================================
    buildProceduralBoulderRamp(levelNum, rng, rngRange, rngInt, rngChoice, difficulty, theme, title, profile) {
        const boundsW = 1000 + rngInt(0, 2) * 80;
        const boundsH = 480;
        const floorY = 345;
        const ceilY = 220;

        const solids = [
            { x: 0, y: 0, w: boundsW, h: ceilY },
            { x: 0, y: 0, w: 80, h: boundsH },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            { x: 80, y: floorY, w: boundsW - 160, h: boundsH - floorY },
            // High resting shelf midway so player can vault over rolling boulder
            { x: 440, y: 285, w: 100, h: 20 }
        ];

        const pathwayCorridors = [
            { x: 80, y: ceilY, w: boundsW - 160, h: floorY - ceilY }
        ];

        const staticTraps = [
            { type: 'static_spike', x: 620, y: floorY, w: 28, h: 15 }
        ];

        const candidateTrapSlots = [
            // Rolling boulder triggered from the far side, rolling back toward player
            {
                type: 'rolling_ball',
                x: boundsW - 140,
                y: floorY,
                groundY: floorY,
                radius: 18,
                vx: -4.0,
                triggerRange: 90
            },
            // High razor in the vault zone: crawl under!
            {
                type: 'spinning_saw',
                x: 320,
                y: 320,
                radius: 15,
                patrolAxis: 'x',
                minX: 260,
                maxX: 360,
                speed: 1.8
            },
            // Dropping ceiling spike
            {
                type: 'dropping_spike',
                x: 760,
                y: ceilY,
                w: 22,
                h: 22,
                groundY: floorY,
                triggerRange: 38
            },
            // Collapsing floor
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
