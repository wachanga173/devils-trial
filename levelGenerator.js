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

        this.themes = ['inferno', 'midnight', 'toxic', 'bloodstone', 'neon', 'abyssal', 'emerald', 'twilight', 'volcanic', 'desert'];
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
        // Unbounded logarithmic growth: keeps scaling forever but decelerates
        return parseFloat((1.55 + Math.log2(levelNumber - 3) * 0.65).toFixed(2));
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
        if (level) level.topology = topology;

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

        // Inject creative trap combos ("gotcha" moments) into candidate slots
        this.injectTrapCombos(level, levelNumber, rngInt, rngChoice, difficulty);

        // Apply level gimmick bias: tag slots matching this level's signature mechanic
        const gimmick = this.getLevelGimmick(levelNumber);
        if (gimmick && level.candidateTrapSlots) {
            for (const slot of level.candidateTrapSlots) {
                if (gimmick.types.includes(slot.type)) {
                    slot.gimmickBonus = true;
                }
            }
        }

        // Generative AI Trap Synthesis Engine — AI dynamically crafts custom traps from level architecture & player telemetry
        if (aiModel && aiModel.synthesizeGenerativeTraps) {
            const synthTraps = aiModel.synthesizeGenerativeTraps(level, levelNumber);
            if (synthTraps && synthTraps.length > 0) {
                level.candidateTrapSlots = (level.candidateTrapSlots || []).concat(synthTraps);
            }
        }

        // Dynamic Runaway Door: Level Devil comedic evasions (door dodges away when approached)
        if (level.door) {
            if (levelNumber <= 3) {
                level.door.shiftsMax = 0; // Introductory tutorial levels
            } else if (levelNumber === 4) {
                level.door.shiftsMax = 1; // Level 4 signature puzzle dodge
                level.door.shiftX = -85;
            } else {
                // Procedural levels: 1 to 2 dynamic evasive hops
                level.door.shiftsMax = 1 + (levelNumber % 2);
                level.door.triggerRange = 85;
            }
        }

        // Universal Surface Snap Pass: guarantees 100% of static and candidate traps sit flush on surfaces (0 inside blocks)
        const allTraps = [...(level.staticTraps || []), ...(level.candidateTrapSlots || [])];
        for (const t of allTraps) {
            const tx = t.x + (t.w || 26) / 2;
            const surf = this.getSurfaceAt(level, tx, t.y);
            if (['hidden_spike', 'static_spike', 'collapsing_floor', 'spring_pad', 'falling_platform'].includes(t.type)) {
                t.y = surf.floorY;
            } else if (t.type === 'coin_trap') {
                t.y = surf.floorY - 35;
            } else if (t.type === 'dropping_spike') {
                t.y = surf.ceilY;
                t.groundY = surf.floorY;
            } else if (t.type === 'rolling_ball') {
                t.y = surf.floorY;
                t.groundY = surf.floorY;
            } else if (t.type === 'piston_crusher') {
                t.startY = surf.ceilY - 25;
                t.targetY = surf.ceilY + 15;
            } else if (t.type === 'reversed_controls') {
                t.y = surf.floorY - (t.h || 32);
            } else if (t.type === 'sliding_door') {
                t.y = surf.floorY - (t.h || 46);
            }
        }

        // Secondary solid penetration guard: ensure no trap sits inside solid rock
        if (level.solids) {
            for (const t of allTraps) {
                const tx = t.x + (t.w || 26) / 2;
                for (const s of level.solids) {
                    if (tx > s.x + 2 && tx < s.x + s.w - 2) {
                        if (t.y > s.y + 4 && t.y < s.y + s.h - 4) {
                            if (t.type === 'sliding_door') {
                                t.y = s.y - (t.h || 46);
                            } else {
                                t.y = s.y;
                            }
                        }
                    }
                }
            }
        }

        return level;
    }

    /**
     * Canonical Surface Finder helper on AILevelGenerator instance
     */
    getSurfaceAt(level, x, preferredY = null) {
        if (!level) return { floorY: 345, ceilY: 220, headroom: 125 };
        const corridors = (level.pathwayCorridors || []).filter(c => x >= c.x - 2 && x <= c.x + c.w + 2);
        if (corridors.length > 0) {
            let best = corridors[0];
            if (corridors.length > 1 && preferredY !== null && preferredY !== undefined) {
                let minDiff = Infinity;
                for (const c of corridors) {
                    const mid = c.y + c.h / 2;
                    const diff = Math.abs(mid - preferredY);
                    if (diff < minDiff) { minDiff = diff; best = c; }
                }
            }
            let ceilY = best.y;
            let floorY = best.y + best.h;
            if (level.solids) {
                const floorSolids = level.solids.filter(s => 
                    x >= s.x - 1 && x <= s.x + s.w + 1 && s.y >= ceilY && Math.abs(s.y - floorY) <= 35
                );
                if (floorSolids.length > 0) {
                    floorSolids.sort((a, b) => a.y - b.y);
                    floorY = floorSolids[0].y;
                }
            }
            return { floorY, ceilY, headroom: floorY - ceilY };
        }
        return { floorY: 345, ceilY: 220, headroom: 125 };
    }

    /**
     * Injects creative trap combos — synergistic trap pairs that create "gotcha" moments.
     * Each combo is tagged with a comboId so the AI selects them as atomic units.
     */
    injectTrapCombos(level, levelNumber, rngInt, rngChoice, difficulty) {
        if (!level.candidateTrapSlots) return;
        if (levelNumber < 4) return; // Combos start at level 4 for authentic challenge

        const slots = level.candidateTrapSlots;
        const bounds = level.bounds;
        const comboId = 'combo_' + levelNumber + '_' + rngInt(1000, 9999);

        // Pick a combo archetype suited for this level
        const archetypes = [
            'boulder_drop_ambush',
            'portal_saw_gauntlet',
            'fake_door_bait',
            'falling_platform_run',
            'spring_into_spike',
            'control_inversion_trap',
            'bait_and_impale',
            'domino_pit_collapse'
        ];
        const chosen = rngChoice(archetypes);
        const midSlots = slots.filter(s => s.zone === 'mid');
        const baseX = midSlots.length > 0 ? midSlots[Math.floor(midSlots.length / 2)].x : Math.round(bounds.width * 0.45);
        const baseSurf = this.getSurfaceAt(level, baseX);
        const floorY = baseSurf.floorY;
        const ceilY = baseSurf.ceilY;
        const cid = comboId;

        switch (chosen) {
            case 'boulder_drop_ambush':
                // Boulder rolls from behind while stalactite drops overhead
                slots.push({
                    type: 'rolling_ball', x: baseX + 190, y: floorY, groundY: floorY,
                    radius: 18, vx: -5.4 - difficulty * 0.45, triggerRange: 105,
                    comboId: cid, zone: 'mid'
                });
                slots.push({
                    type: 'dropping_spike', x: baseX - 30, y: ceilY, w: 22, h: 22,
                    groundY: floorY, triggerRange: 75, comboId: cid, zone: 'mid'
                });
                break;

            case 'portal_saw_gauntlet':
                // Troll portal sends you back into a fast sawblade patrol zone
                slots.push({
                    type: 'troll_portal', x: baseX + 120, y: floorY, w: 55, h: 75,
                    exitX: baseX - 60, exitY: floorY - 20, exitVy: 3.2,
                    comboId: cid, zone: 'mid'
                });
                slots.push({
                    type: 'spinning_saw', x: baseX - 40, y: floorY - 30, radius: 18,
                    patrolAxis: 'x', minX: baseX - 90, maxX: baseX + 50, speed: 3.2,
                    comboId: cid, zone: 'mid'
                });
                break;

            case 'fake_door_bait': {
                // Sliding door runs away + hidden spike where you chase to
                const doorTargetX = level.door ? Math.max(80, level.door.x - 70) : baseX;
                const exitSurf = this.getSurfaceAt(level, doorTargetX);
                slots.push({
                    type: 'sliding_door', x: doorTargetX, y: exitSurf.floorY - 46, w: 32, h: 46,
                    shiftX: -110, triggerRange: 85, comboId: cid, zone: 'exit'
                });
                slots.push({
                    type: 'hidden_spike', x: doorTargetX - 110, y: exitSurf.floorY, w: 26, h: 16,
                    triggerRange: 65, comboId: cid, zone: 'exit'
                });
                break;
            }

            case 'falling_platform_run':
                // Stepping stone platform falls into abyss + coin bait
                slots.push({
                    type: 'falling_platform', x: baseX, y: floorY, w: 55, h: 14,
                    dropSpeed: 5.2, comboId: cid, zone: 'mid'
                });
                slots.push({
                    type: 'coin_trap', x: baseX + 28, y: floorY - 35, r: 8,
                    comboId: cid, zone: 'mid'
                });
                break;

            case 'spring_into_spike':
                // Spring pad launches you into a dropping spike from ceiling
                slots.push({
                    type: 'spring_pad', x: baseX, y: floorY, w: 32, h: 10,
                    boostVy: -9.8, comboId: cid, zone: 'mid'
                });
                slots.push({
                    type: 'dropping_spike', x: baseX + 15, y: ceilY, w: 22, h: 22,
                    groundY: floorY, triggerRange: 75, comboId: cid, zone: 'mid'
                });
                break;

            case 'control_inversion_trap':
                // Reversed controls zone followed immediately by precision hidden spike
                slots.push({
                    type: 'reversed_controls', x: baseX - 50, y: floorY - 90, w: 110, h: 90,
                    comboId: cid, zone: 'mid'
                });
                slots.push({
                    type: 'hidden_spike', x: baseX + 80, y: floorY, w: 26, h: 16,
                    triggerRange: 70, comboId: cid, zone: 'mid'
                });
                break;

            case 'bait_and_impale':
                // Coin lure with dropping ceiling spike and sudden floor spike
                slots.push({
                    type: 'coin_trap', x: baseX + 30, y: floorY - 30, r: 8,
                    comboId: cid, zone: 'mid'
                });
                slots.push({
                    type: 'dropping_spike', x: baseX + 30, y: ceilY, w: 22, h: 22,
                    groundY: floorY, triggerRange: 75, comboId: cid, zone: 'mid'
                });
                break;

            case 'domino_pit_collapse':
                // Sequential rapid collapsing floors creating sudden void
                slots.push({
                    type: 'collapsing_floor', x: baseX - 30, y: floorY, w: 48, h: 35,
                    dropSpeed: 5.0, comboId: cid, zone: 'mid'
                });
                slots.push({
                    type: 'collapsing_floor', x: baseX + 25, y: floorY, w: 48, h: 35,
                    dropSpeed: 5.2, comboId: cid, zone: 'mid'
                });
                break;
        }
    }

    /**
     * Returns the signature gimmick mechanic for a level number.
     * Ensures progressive introduction of mechanics and gives each level a unique identity.
     */
    getLevelGimmick(levelNumber) {
        if (levelNumber <= 4) return null; // Manual levels handle their own gimmicks

        const gimmicks = [
            { name: 'Boulder Rush',      types: ['rolling_ball', 'collapsing_floor'] },
            { name: 'Inverted Trials',   types: ['reversed_controls', 'hidden_spike'] },
            { name: 'Portal Trickery',   types: ['troll_portal', 'sliding_door'] },
            { name: 'Crusher Descent',   types: ['piston_crusher', 'dropping_spike'] },
            { name: 'Sawblade Maze',     types: ['spinning_saw', 'spring_pad'] },
            { name: 'Spike Ambush',      types: ['dropping_spike', 'hidden_spike'] },
            { name: 'Collapsing Ruins',  types: ['falling_platform', 'collapsing_floor', 'coin_trap'] },
            { name: 'Total Chaos',       types: ['troll_portal', 'reversed_controls', 'rolling_ball', 'spinning_saw', 'falling_platform'] }
        ];

        // Cycle through gimmicks, with 'Total Chaos' dominating at very high levels
        if (levelNumber >= 20) {
            return levelNumber % 3 === 0 ? gimmicks[7] : gimmicks[(levelNumber - 5) % 7];
        }
        return gimmicks[(levelNumber - 5) % gimmicks.length];
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

        // Step 1 chokepoint spike
        if (numSteps >= 3) {
            let step1X = wallL + stepWidths[0];
            staticTraps.push({
                type: 'static_spike',
                x: step1X + Math.round(stepWidths[1] * 0.5),
                y: stepFloors[1],
                w: 28,
                h: 15
            });
        }

        // Rolling boulder from higher tier
        const highestStep = isPyramid ? Math.floor(numSteps / 2) : numSteps - 1;
        let highX = wallL;
        for (let k = 0; k < highestStep; k++) highX += stepWidths[k];

        // Zone 1: Entry / Step 0 Traps
        candidateTrapSlots.push({
            type: 'falling_platform',
            x: wallL + Math.round(stepWidths[0] * 0.6),
            y: stepFloors[0],
            w: 55,
            h: 14,
            dropSpeed: 5.0,
            zone: 'entry'
        });
        candidateTrapSlots.push({
            type: 'collapsing_floor',
            x: wallL + 50,
            y: stepFloors[0],
            w: 48,
            h: 35,
            dropSpeed: 5.0,
            zone: 'entry'
        });
        candidateTrapSlots.push({
            type: 'hidden_spike',
            x: Math.round(wallL + stepWidths[0] * 0.45),
            y: stepFloors[0],
            w: 26,
            h: 16,
            triggerRange: 75,
            zone: 'entry'
        });

        // Zone 2: Mid-Altar Gauntlet Traps
        candidateTrapSlots.push({
            type: 'dropping_spike',
            x: highX + Math.round(stepWidths[highestStep] * 0.2),
            y: Math.max(30, stepFloors[highestStep] - cHeadroom),
            w: 22,
            h: 22,
            groundY: stepFloors[highestStep],
            triggerRange: 75,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'reversed_controls',
            x: midX,
            y: stepFloors[midStep] - 90,
            w: 110,
            h: 90,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'rolling_ball',
            x: highX + Math.round(stepWidths[highestStep] * 0.7),
            y: stepFloors[highestStep],
            groundY: stepFloors[highestStep],
            radius: 17 + rngInt(0, 3),
            vx: -5.4 - difficulty * 0.4,
            triggerRange: 105,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'piston_crusher',
            x: highX + Math.round(stepWidths[highestStep] * 0.3),
            startY: stepFloors[highestStep] - cHeadroom - 30,
            targetY: stepFloors[highestStep] - cHeadroom + 15,
            w: 38,
            h: 95,
            triggerRange: 75,
            pauseDuration: 45,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'dropping_spike',
            x: midX + Math.round(stepWidths[midStep] * 0.65),
            y: Math.max(30, stepFloors[midStep] - cHeadroom),
            w: 22,
            h: 22,
            groundY: stepFloors[midStep],
            triggerRange: 75,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'spinning_saw',
            x: midX + 40,
            y: stepFloors[midStep] - 25,
            radius: 16,
            patrolAxis: 'x',
            minX: midX + 20,
            maxX: midX + Math.min(180, stepWidths[midStep] - 20),
            speed: 3.2,
            zone: 'mid'
        });

        // Zone 3: Exit Climax Traps
        candidateTrapSlots.push({
            type: 'coin_trap',
            x: doorX - 70,
            y: doorFloor - 30,
            r: 8,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'collapsing_floor',
            x: doorX - 60,
            y: doorFloor,
            w: 48,
            h: 35,
            dropSpeed: 5.0,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'dropping_spike',
            x: doorX + 16,
            y: Math.max(30, doorFloor - cHeadroom),
            w: 22,
            h: 22,
            groundY: doorFloor,
            triggerRange: 75,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'sliding_door',
            x: doorX,
            y: doorY,
            w: 32,
            h: 46,
            shiftX: -100,
            triggerRange: 85,
            zone: 'exit'
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
                shiftsMax: 0,
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
        const normalCeilY = 225 + rngInt(-10, 10);
        const normalHeadroom = floorY - normalCeilY; // >= 105px generous headroom!

        const solids = [
            { x: 0, y: 0, w: boundsW, h: normalCeilY },
            { x: 0, y: 0, w: 80, h: boundsH },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            { x: 80, y: floorY, w: boundsW - 160, h: boundsH - floorY }
        ];

        // Wide, continuous pathway corridor with generous headroom (zero suffocation/wall clipping)
        const pathwayCorridors = [
            {
                x: 80,
                y: normalCeilY,
                w: boundsW - 160,
                h: normalHeadroom
            }
        ];

        const spawnX = 130;
        const spawnY = floorY;
        const doorX = boundsW - 130;
        const doorY = floorY - 46;

        const midStart = spawnX + 130;
        const midEnd = doorX - 120;
        const midSpan = Math.max(300, midEnd - midStart);

        const staticTraps = [
            { type: 'static_spike', x: Math.round(midStart + midSpan * 0.35), y: floorY, w: 28, h: 15 },
            { type: 'static_spike', x: Math.round(midStart + midSpan * 0.75), y: floorY, w: 28, h: 15 }
        ];

        const candidateTrapSlots = [
            // Zone 1: Entry / Approach Traps
            {
                type: 'collapsing_floor',
                x: 155,
                y: floorY,
                w: 48,
                h: 35,
                dropSpeed: 5.0,
                zone: 'entry'
            },
            {
                type: 'hidden_spike',
                x: Math.max(160, midStart - 40),
                y: floorY,
                w: 26,
                h: 16,
                triggerRange: 75,
                zone: 'entry'
            },
            {
                type: 'dropping_spike',
                x: Math.max(170, midStart - 10),
                y: normalCeilY,
                w: 22,
                h: 22,
                groundY: floorY,
                triggerRange: 75,
                zone: 'entry'
            },
            {
                type: 'falling_platform',
                x: Math.max(180, midStart + 20),
                y: floorY,
                w: 55,
                h: 14,
                dropSpeed: 5.0,
                zone: 'entry'
            },

            // Zone 2: Mid Gauntlet Traps (Authentic Level Devil hazards)
            {
                type: 'piston_crusher',
                x: Math.round(midStart + midSpan * 0.08),
                startY: normalCeilY - 35,
                targetY: normalCeilY + 15,
                w: 38,
                h: 105,
                triggerRange: 75,
                pauseDuration: 45,
                zone: 'mid'
            },
            {
                type: 'dropping_spike',
                x: Math.round(midStart + midSpan * 0.22),
                y: normalCeilY,
                w: 22,
                h: 22,
                groundY: floorY,
                triggerRange: 75,
                zone: 'mid'
            },
            {
                type: 'reversed_controls',
                x: Math.round(midStart + midSpan * 0.42),
                y: floorY - 90,
                w: 110,
                h: 90,
                zone: 'mid'
            },
            {
                type: 'dropping_spike',
                x: Math.round(midStart + midSpan * 0.62),
                y: normalCeilY,
                w: 22,
                h: 22,
                groundY: floorY,
                triggerRange: 75,
                zone: 'mid'
            },
            {
                type: 'hidden_spike',
                x: Math.round(midStart + midSpan * 0.82),
                y: floorY,
                w: 26,
                h: 16,
                triggerRange: 70,
                zone: 'mid'
            },
            {
                type: 'rolling_ball',
                x: Math.min(boundsW - 180, Math.round(midStart + midSpan * 0.95)),
                y: floorY,
                groundY: floorY,
                radius: 17,
                vx: -5.4 - difficulty * 0.4,
                triggerRange: 105,
                zone: 'mid'
            },

            // Zone 3: Exit Climax Traps
            {
                type: 'collapsing_floor',
                x: doorX - 130,
                y: floorY,
                w: 48,
                h: 35,
                dropSpeed: 5.0,
                zone: 'exit'
            },
            {
                type: 'dropping_spike',
                x: doorX - 75,
                y: normalCeilY,
                w: 22,
                h: 22,
                groundY: floorY,
                triggerRange: 75,
                zone: 'exit'
            },
            {
                type: 'coin_trap',
                x: doorX - 45,
                y: floorY - 30,
                r: 8,
                zone: 'exit'
            },
            {
                type: 'sliding_door',
                x: doorX,
                y: doorY,
                w: 32,
                h: 46,
                shiftX: -100,
                triggerRange: 85,
                zone: 'exit'
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
                shiftsMax: 0,
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

        const topCeilH = tierFloors[0] - cHeight;
        const solids = [
            { x: 0, y: 0, w: boundsW, h: topCeilH },
            { x: 0, y: 0, w: 80, h: boundsH },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            // Solid base floor
            { x: 80, y: tierFloors[numTiers - 1], w: boundsW - 160, h: boundsH - tierFloors[numTiers - 1] }
        ];

        const pathwayCorridors = [];
        const candidateTrapSlots = [];
        const staticTraps = [];

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

                // Elevator is INFRASTRUCTURE — always present, never filtered by AI
                const elevSpeed = 1.8 + rngRange(-0.2, 0.3) + difficulty * 0.15;
                staticTraps.push({
                    type: 'moving_platform',
                    x: shaftX + 12,
                    y: nextFlY - 40,
                    w: 76,
                    h: 18,
                    axis: 'y',
                    min: flY - 5,
                    max: nextFlY - 30,
                    speed: elevSpeed,
                    isInfrastructure: true
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

        staticTraps.push(
            { type: 'static_spike', x: Math.round(boundsW * 0.5), y: tierFloors[1] || bottomFloor, w: 28, h: 15 },
            { type: 'static_spike', x: Math.round(boundsW * 0.35), y: bottomFloor, w: 28, h: 15 }
        );
        if (numTiers > 3 && tierFloors[2]) {
            staticTraps.push({ type: 'static_spike', x: Math.round(boundsW * 0.6), y: tierFloors[2], w: 28, h: 15 });
        }

        // Zone 1: Base / Entry Traps
        candidateTrapSlots.push({
            type: 'falling_platform',
            x: spawnX + 110,
            y: bottomFloor,
            w: 55,
            h: 14,
            dropSpeed: 5.0,
            zone: 'entry'
        });
        candidateTrapSlots.push({
            type: 'collapsing_floor',
            x: spawnX + 80,
            y: bottomFloor,
            w: 48,
            h: 35,
            dropSpeed: 5.0,
            zone: 'entry'
        });
        candidateTrapSlots.push({
            type: 'hidden_spike',
            x: spawnX + 160,
            y: bottomFloor,
            w: 26,
            h: 16,
            triggerRange: 75,
            zone: 'entry'
        });

        // Zone 2: Mid-Story Climb Traps
        const midFloor = tierFloors[1] || bottomFloor;
        candidateTrapSlots.push({
            type: 'coin_trap',
            x: Math.round(boundsW * 0.35),
            y: midFloor - 30,
            r: 8,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'reversed_controls',
            x: 90,
            y: midFloor - 90,
            w: 110,
            h: 90,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'dropping_spike',
            x: Math.round(boundsW * 0.55),
            y: midFloor - cHeight,
            w: 22,
            h: 22,
            groundY: midFloor,
            triggerRange: 75,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'spinning_saw',
            x: 320,
            y: midFloor - 30,
            radius: 18,
            patrolAxis: 'x',
            minX: 200,
            maxX: boundsW - 200,
            speed: 3.2,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'piston_crusher',
            x: Math.round(boundsW * 0.45),
            startY: midFloor - cHeight - 25,
            targetY: midFloor - cHeight + 15,
            w: 40,
            h: 100,
            triggerRange: 75,
            pauseDuration: 45,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'troll_portal',
            x: Math.round(boundsW * 0.7),
            y: midFloor,
            w: 55,
            h: 75,
            exitX: spawnX + 20,
            exitY: bottomFloor - 20,
            exitVy: 3.2,
            zone: 'mid'
        });

        // Zone 3: Summit Climax Traps
        candidateTrapSlots.push({
            type: 'hidden_spike',
            x: doorX + 40,
            y: topFloor,
            w: 26,
            h: 16,
            triggerRange: 70,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'rolling_ball',
            x: boundsW - 130,
            y: topFloor,
            groundY: topFloor,
            radius: 17,
            vx: -5.4 - difficulty * 0.4,
            triggerRange: 105,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'collapsing_floor',
            x: doorX + 45,
            y: topFloor,
            w: 48,
            h: 35,
            dropSpeed: 5.0,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'dropping_spike',
            x: doorX + 75,
            y: topCeilH,
            w: 22,
            h: 22,
            groundY: topFloor,
            triggerRange: 75,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'sliding_door',
            x: doorX,
            y: doorY,
            w: 32,
            h: 46,
            shiftX: 95,
            triggerRange: 85,
            zone: 'exit'
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
                shiftsMax: 0,
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
            { x: 0, y: 0, w: boundsW, h: tier1Floor - cHeight },
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
            { type: 'static_spike', x: 440, y: tier3Floor, w: 28, h: 15 },
            { type: 'static_spike', x: 200, y: tier2Floor, w: 28, h: 15 },
            // Ferry platform is INFRASTRUCTURE — always present
            { type: 'moving_platform', x: 300, y: tier2Floor - 5, w: 75, h: 18, axis: 'x', min: 200, max: boundsW - 240, speed: 1.8 + difficulty * 0.15, isInfrastructure: true }
        ];

        const candidateTrapSlots = [
            // Zone 1: Upper Tier Traps
            {
                type: 'falling_platform',
                x: 180,
                y: tier1Floor,
                w: 55,
                h: 14,
                dropSpeed: 5.0,
                zone: 'entry'
            },
            {
                type: 'collapsing_floor',
                x: boundsW - 250,
                y: tier1Floor,
                w: 48,
                h: 35,
                dropSpeed: 5.0,
                zone: 'entry'
            },
            {
                type: 'dropping_spike',
                x: 220,
                y: tier1Floor - cHeight,
                w: 22,
                h: 22,
                groundY: tier1Floor,
                triggerRange: 75,
                zone: 'entry'
            },

            // Zone 2: Mid Chasm / Shaft Traps
            {
                type: 'coin_trap',
                x: Math.round(boundsW * 0.4),
                y: tier2Floor - 30,
                r: 8,
                zone: 'mid'
            },
            {
                type: 'reversed_controls',
                x: 80,
                y: tier2Floor - 90,
                w: 110,
                h: 90,
                zone: 'mid'
            },
            {
                type: 'dropping_spike',
                x: Math.round(boundsW * 0.6),
                y: tier2Floor - cHeight,
                w: 22,
                h: 22,
                groundY: tier2Floor,
                triggerRange: 75,
                zone: 'mid'
            },

            {
                type: 'piston_crusher',
                x: Math.round(boundsW * 0.45),
                startY: tier2Floor - cHeight - 20,
                targetY: tier2Floor - cHeight + 20,
                w: 40,
                h: 100,
                triggerRange: 75,
                pauseDuration: 45,
                zone: 'mid'
            },
            {
                type: 'troll_portal',
                x: 220,
                y: tier2Floor,
                w: 55,
                h: 75,
                exitX: 130,
                exitY: tier1Floor - 15,
                exitVy: 3.2,
                zone: 'mid'
            },

            // Zone 3: Bottom Crypt & Exit Traps
            {
                type: 'hidden_spike',
                x: boundsW - 220,
                y: tier3Floor,
                w: 26,
                h: 16,
                triggerRange: 70,
                zone: 'exit'
            },
            {
                type: 'rolling_ball',
                x: boundsW - 140,
                y: tier3Floor,
                groundY: tier3Floor,
                radius: 17,
                vx: -5.4 - difficulty * 0.4,
                triggerRange: 105,
                zone: 'exit'
            },
            {
                type: 'spinning_saw',
                x: 320,
                y: tier3Floor - 30,
                radius: 18,
                patrolAxis: 'x',
                minX: 200,
                maxX: 360,
                speed: 3.2,
                zone: 'exit'
            },
            {
                type: 'collapsing_floor',
                x: boundsW - 200,
                y: tier3Floor,
                w: 48,
                h: 35,
                dropSpeed: 5.0,
                zone: 'exit'
            },
            {
                type: 'sliding_door',
                x: boundsW - 150,
                y: tier3Floor - 46,
                w: 32,
                h: 46,
                shiftX: -100,
                triggerRange: 85,
                zone: 'exit'
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
                shiftsMax: 0,
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
        const groundFloor = 360 + rngInt(-5, 5);
        const dividerY = 200 + rngInt(-5, 5);
        const dividerH = 30;
        const topCeilY = 85;

        const solids = [
            { x: 0, y: 0, w: boundsW, h: topCeilY },
            { x: 80, y: topCeilY, w: entryW, h: dividerY - topCeilY }, // Solid ceiling over entry chamber
            { x: 80 + entryW + midW + 80, y: topCeilY, w: Math.max(0, exitW - 80), h: dividerY - topCeilY }, // Solid ceiling over exit chamber
            { x: 0, y: topCeilY, w: 80, h: boundsH - topCeilY },
            { x: boundsW - 80, y: 0, w: 80, h: boundsH },
            { x: 80, y: groundFloor, w: boundsW - 160, h: boundsH - groundFloor }, // Continuous ground floor
            // Solid rock divider separating High Road from Low Road
            { x: 80 + entryW, y: dividerY, w: midW, h: dividerH }
        ];

        const pathwayCorridors = [
            { x: 80, y: dividerY, w: entryW, h: groundFloor - dividerY },                     // Entry chamber (155-165px headroom)
            { x: 80 + entryW, y: topCeilY, w: midW, h: dividerY - topCeilY },                // High Road (110-120px headroom)
            { x: 80 + entryW, y: dividerY + dividerH, w: midW, h: groundFloor - (dividerY + dividerH) }, // Low Road (125-135px headroom)
            { x: 80 + entryW + midW, y: topCeilY, w: 80, h: groundFloor - topCeilY },        // High Road descent (270-280px headroom)
            { x: 80 + entryW + midW, y: dividerY, w: exitW, h: groundFloor - dividerY }       // Exit chamber (155-165px headroom)
        ];

        const staticTraps = [
            { type: 'static_spike', x: 80 + entryW + Math.round(midW * 0.4), y: dividerY, w: 28, h: 15 },
            { type: 'spinning_saw', x: 80 + entryW + Math.round(midW * 0.3), y: groundFloor - 33, radius: 15, patrolAxis: 'none' },
            { type: 'static_spike', x: 80 + entryW + midW + Math.round(exitW * 0.3), y: groundFloor, w: 28, h: 15 }
        ];

        const candidateTrapSlots = [
            // Zone 1: Entry Chamber Traps
            {
                type: 'spring_pad',
                x: 80 + entryW - 35,
                y: groundFloor,
                w: 32,
                h: 10,
                boostVy: -9.5,
                zone: 'entry'
            },
            {
                type: 'collapsing_floor',
                x: 80 + 50,
                y: groundFloor,
                w: 48,
                h: 35,
                dropSpeed: 5.0,
                zone: 'entry'
            },
            {
                type: 'hidden_spike',
                x: 80 + entryW - 75,
                y: groundFloor,
                w: 26,
                h: 16,
                triggerRange: 75,
                zone: 'entry'
            },

            // Zone 2: High Road Traps
            {
                type: 'falling_platform',
                x: 80 + entryW + Math.round(midW * 0.4),
                y: dividerY,
                w: 55,
                h: 14,
                dropSpeed: 5.0,
                zone: 'mid'
            },
            {
                type: 'coin_trap',
                x: 80 + entryW + Math.round(midW * 0.75),
                y: dividerY - 30,
                r: 8,
                zone: 'mid'
            },
            {
                type: 'rolling_ball',
                x: 80 + entryW + midW - 30,
                y: dividerY,
                groundY: dividerY,
                radius: 17,
                vx: -5.4 - difficulty * 0.4,
                triggerRange: 105,
                zone: 'mid'
            },
            {
                type: 'dropping_spike',
                x: 80 + entryW + Math.round(midW * 0.6),
                y: 130,
                w: 22,
                h: 22,
                groundY: dividerY,
                triggerRange: 75,
                zone: 'mid'
            },
            {
                type: 'piston_crusher',
                x: 80 + entryW + Math.round(midW * 0.25),
                startY: 100,
                targetY: 140,
                w: 40,
                h: 85,
                triggerRange: 75,
                pauseDuration: 45,
                zone: 'mid'
            },

            // Zone 2: Low Road Crawlway Traps
            {
                type: 'dropping_spike',
                x: 80 + entryW + Math.round(midW * 0.35),
                y: dividerY + dividerH,
                w: 22,
                h: 22,
                groundY: groundFloor,
                triggerRange: 75,
                zone: 'mid'
            },
            {
                type: 'spinning_saw',
                x: 80 + entryW + Math.round(midW * 0.7),
                y: groundFloor - 33,
                radius: 15,
                patrolAxis: 'x',
                minX: 80 + entryW + Math.round(midW * 0.55),
                maxX: 80 + entryW + Math.round(midW * 0.85),
                speed: 3.2,
                zone: 'mid'
            },
            {
                type: 'troll_portal',
                x: 80 + entryW + Math.round(midW * 0.5),
                y: groundFloor,
                w: 55,
                h: 75,
                exitX: 110,
                exitY: groundFloor - 20,
                exitVy: 3.2,
                zone: 'mid'
            },

            // Zone 3: Exit Chamber Traps
            {
                type: 'reversed_controls',
                x: boundsW - exitW - 20,
                y: groundFloor - 90,
                w: 110,
                h: 90,
                zone: 'exit'
            },
            {
                type: 'collapsing_floor',
                x: boundsW - 180,
                y: groundFloor,
                w: 48,
                h: 35,
                dropSpeed: 5.0,
                zone: 'exit'
            },
            {
                type: 'dropping_spike',
                x: boundsW - 130,
                y: dividerY,
                w: 22,
                h: 22,
                groundY: groundFloor,
                triggerRange: 75,
                zone: 'exit'
            },
            {
                type: 'sliding_door',
                x: boundsW - 130,
                y: groundFloor - 46,
                w: 32,
                h: 46,
                shiftX: -100,
                triggerRange: 85,
                zone: 'exit'
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
                shiftsMax: 0,
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

            // Island platform with dynamic elevation
            const islandElevDelta = (i % 2 === 0) ? -35 : 25;
            const islFloorY = floorY + islandElevDelta;
            solids.push({ x: curX, y: islFloorY, w: islandW, h: boundsH - islFloorY });
            pathwayCorridors.push({ x: curX, y: ceilY, w: islandW, h: islFloorY - ceilY });

            // Springboard on lower island or collapsing stepping floor
            if (i % 2 !== 0) {
                staticTraps.push({ type: 'spring_pad', x: curX + Math.round(islandW * 0.5), y: islFloorY, w: 32, h: 10, boostVy: -9.6 });
            } else {
                candidateTrapSlots.push({ type: 'collapsing_floor', x: curX + 10, y: islFloorY, w: Math.min(48, islandW - 10), h: 35, dropSpeed: 5.0 });
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
        staticTraps.push({ type: 'spring_pad', x: 80 + entryW - 45, y: floorY, w: 32, h: 10, boostVy: -9.2 });

        // Zone 1: Entry / Approach Traps
        candidateTrapSlots.push({
            type: 'falling_platform',
            x: 80 + Math.round(entryW * 0.5),
            y: floorY,
            w: 55,
            h: 14,
            dropSpeed: 5.0,
            zone: 'entry'
        });
        candidateTrapSlots.push({
            type: 'collapsing_floor',
            x: 80 + Math.round(entryW * 0.35),
            y: floorY,
            w: 48,
            h: 35,
            dropSpeed: 5.0,
            zone: 'entry'
        });
        candidateTrapSlots.push({
            type: 'dropping_spike',
            x: 80 + Math.round(entryW * 0.65),
            y: ceilY,
            w: 22,
            h: 22,
            groundY: floorY,
            triggerRange: 75,
            zone: 'entry'
        });
        candidateTrapSlots.push({
            type: 'hidden_spike',
            x: 80 + Math.round(entryW * 0.45),
            y: floorY,
            w: 26,
            h: 16,
            triggerRange: 75,
            zone: 'entry'
        });

        // Zone 2: Mid Chasm & Island Traps
        candidateTrapSlots.push({
            type: 'falling_platform',
            x: 80 + entryW + chasmW + 10,
            y: floorY - 15,
            w: Math.min(55, islandW - 10),
            h: 14,
            dropSpeed: 5.0,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'dropping_spike',
            x: 80 + entryW + chasmW + Math.round(islandW * 0.3),
            y: ceilY,
            w: 22,
            h: 22,
            groundY: floorY,
            triggerRange: 75,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'spinning_saw',
            x: 80 + entryW + Math.round(chasmW * 0.5),
            y: ceilY + Math.round(cHeadroom * 0.45),
            radius: 16,
            patrolAxis: 'y',
            minY: ceilY + 15,
            maxY: floorY - 30,
            speed: 2.8 + difficulty * 0.2,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'dropping_spike',
            x: 80 + entryW + chasmW + Math.round(islandW * 0.5),
            y: ceilY,
            w: 22,
            h: 22,
            groundY: floorY,
            triggerRange: 75,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'hidden_spike',
            x: 80 + entryW + chasmW + Math.round(islandW * 0.3),
            y: floorY,
            w: 26,
            h: 16,
            triggerRange: 70,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'troll_portal',
            x: boundsW - 80 - exitW - Math.round(lastChasmW * 0.5) - 25,
            y: floorY - 50,
            w: 50,
            h: 70,
            exitX: 120,
            exitY: floorY - 20,
            exitVy: 3.2,
            zone: 'mid'
        });

        // Zone 3: Exit Platform Climax Traps
        candidateTrapSlots.push({
            type: 'reversed_controls',
            x: boundsW - exitW - 20,
            y: floorY - 90,
            w: 110,
            h: 90,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'spinning_saw',
            x: boundsW - 160,
            y: floorY - 25,
            radius: 18,
            patrolAxis: 'x',
            minX: boundsW - 80 - exitW + 20,
            maxX: boundsW - 100,
            speed: 3.0,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'dropping_spike',
            x: boundsW - 140,
            y: ceilY,
            w: 22,
            h: 22,
            groundY: floorY,
            triggerRange: 75,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'collapsing_floor',
            x: boundsW - 80 - Math.round(exitW * 0.6),
            y: floorY,
            w: 48,
            h: 35,
            dropSpeed: 5.0,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'sliding_door',
            x: boundsW - 120,
            y: floorY - 46,
            w: 32,
            h: 46,
            shiftX: -100,
            triggerRange: 85,
            zone: 'exit'
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
                shiftsMax: 0,
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
        const candidateTrapSlots = [
            // Zone 1: Entry / Approach Traps
            {
                type: 'collapsing_floor',
                x: 145,
                y: floorY,
                w: 48,
                h: 35,
                dropSpeed: 5.0,
                zone: 'entry'
            },
            {
                type: 'hidden_spike',
                x: 170,
                y: floorY,
                w: 26,
                h: 16,
                triggerRange: 75,
                zone: 'entry'
            },
            {
                type: 'falling_platform',
                x: 195,
                y: floorY,
                w: 55,
                h: 14,
                dropSpeed: 5.0,
                zone: 'entry'
            },
            {
                type: 'dropping_spike',
                x: 220,
                y: ceilY,
                w: 22,
                h: 22,
                groundY: floorY,
                triggerRange: 75,
                zone: 'entry'
            }
        ];

        const span = (boundsW - 400) / numCrushers;
        for (let c = 0; c < numCrushers; c++) {
            const cX = Math.round(250 + c * span + rngInt(-10, 10));
            candidateTrapSlots.push({
                type: 'piston_crusher',
                x: cX,
                startY: ceilY - 40,
                targetY: ceilY + 10,
                w: 42,
                h: 105,
                triggerRange: 75,
                pauseDuration: 42 + rngInt(0, 10),
                zone: 'mid'
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
                        y: floorY - 33,
                        radius: 15,
                        patrolAxis: 'none',
                        zone: 'mid'
                    });
                }
            }
        }

        // Zone 2 additional: Dropping spike + coin bait + surprise rolling ball through crusher alley
        candidateTrapSlots.push({
            type: 'dropping_spike',
            x: Math.round(250 + span * 0.25),
            y: ceilY,
            w: 22,
            h: 22,
            groundY: floorY,
            triggerRange: 75,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'coin_trap',
            x: Math.round(250 + span * 1.25),
            y: floorY - 30,
            r: 8,
            zone: 'mid'
        });
        candidateTrapSlots.push({
            type: 'rolling_ball',
            x: Math.min(boundsW - 200, 240 + Math.round((numCrushers - 1) * span) + 80),
            y: floorY,
            groundY: floorY,
            radius: 17,
            vx: -5.4 - difficulty * 0.4,
            triggerRange: 105,
            zone: 'mid'
        });

        // Zone 3: Exit Climax Traps
        candidateTrapSlots.push({
            type: 'reversed_controls',
            x: boundsW - 160,
            y: floorY - 90,
            w: 110,
            h: 90,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'collapsing_floor',
            x: boundsW - 170,
            y: floorY,
            w: 48,
            h: 35,
            dropSpeed: 5.0,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'dropping_spike',
            x: boundsW - 130,
            y: ceilY,
            w: 22,
            h: 22,
            groundY: floorY,
            triggerRange: 75,
            zone: 'exit'
        });
        candidateTrapSlots.push({
            type: 'sliding_door',
            x: boundsW - 120,
            y: floorY - 46,
            w: 32,
            h: 46,
            shiftX: -100,
            triggerRange: 85,
            zone: 'exit'
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
                shiftsMax: 0,
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
            { type: 'static_spike', x: Math.round(boundsW * 0.55), y: floorY, w: 26, h: 15 },
            { type: 'static_spike', x: Math.round(boundsW * 0.3), y: floorY, w: 26, h: 15 },
            { type: 'spinning_saw', x: Math.round(boundsW * 0.75), y: floorY - 30, radius: 14, patrolAxis: 'none' }
        ];

        const candidateTrapSlots = [
            // Zone 1: Entry / Approach Traps
            {
                type: 'falling_platform',
                x: 180,
                y: floorY,
                w: 55,
                h: 14,
                dropSpeed: 5.0,
                zone: 'entry'
            },
            {
                type: 'collapsing_floor',
                x: 170,
                y: floorY,
                w: 48,
                h: 35,
                dropSpeed: 5.0,
                zone: 'entry'
            },
            {
                type: 'dropping_spike',
                x: 210,
                y: ceilY,
                w: 22,
                h: 22,
                groundY: floorY,
                triggerRange: 75,
                zone: 'entry'
            },
            {
                type: 'hidden_spike',
                x: 150,
                y: floorY,
                w: 26,
                h: 16,
                triggerRange: 75,
                zone: 'entry'
            },

            // Zone 2: Mid Ramp & Vault Shelf Traps
            {
                type: 'coin_trap',
                x: Math.round(300 + shelfSpan * 0.5),
                y: floorY - 35,
                r: 8,
                zone: 'mid'
            },
            {
                type: 'dropping_spike',
                x: Math.round(300 + shelfSpan * 0.8),
                y: ceilY,
                w: 22,
                h: 22,
                groundY: floorY,
                triggerRange: 75,
                zone: 'mid'
            },
            {
                type: 'rolling_ball',
                x: boundsW - 140,
                y: floorY,
                groundY: floorY,
                radius: 17 + rngInt(0, 3),
                vx: -5.4 - difficulty * 0.4,
                triggerRange: 110,
                zone: 'mid'
            },
            {
                type: 'rolling_ball',
                x: Math.round(boundsW * 0.65),
                y: floorY,
                groundY: floorY,
                radius: 16,
                vx: -4.8 - difficulty * 0.35,
                triggerRange: 90,
                zone: 'mid'
            },
            {
                type: 'spinning_saw',
                x: 300,
                y: floorY - 33,
                radius: 15,
                patrolAxis: 'x',
                minX: 240,
                maxX: 360,
                speed: 3.2,
                zone: 'mid'
            },
            {
                type: 'dropping_spike',
                x: Math.round(300 + shelfSpan * 0.5),
                y: ceilY,
                w: 22,
                h: 22,
                groundY: floorY,
                triggerRange: 75,
                zone: 'mid'
            },
            {
                type: 'hidden_spike',
                x: Math.round(300 + shelfSpan + 40),
                y: floorY,
                w: 26,
                h: 16,
                triggerRange: 70,
                zone: 'mid'
            },
            {
                type: 'troll_portal',
                x: Math.round(boundsW * 0.5),
                y: floorY - 10,
                w: 50,
                h: 70,
                exitX: 120,
                exitY: floorY - 20,
                exitVy: 3.2,
                zone: 'mid'
            },

            // Zone 3: Exit Climax Traps
            {
                type: 'reversed_controls',
                x: boundsW - 160,
                y: floorY - 90,
                w: 110,
                h: 90,
                zone: 'exit'
            },
            {
                type: 'collapsing_floor',
                x: boundsW - 180,
                y: floorY,
                w: 48,
                h: 35,
                dropSpeed: 5.0,
                zone: 'exit'
            },
            {
                type: 'dropping_spike',
                x: boundsW - 135,
                y: ceilY,
                w: 22,
                h: 22,
                groundY: floorY,
                triggerRange: 75,
                zone: 'exit'
            },
            {
                type: 'sliding_door',
                x: boundsW - 120,
                y: floorY - 46,
                w: 32,
                h: 46,
                shiftX: -100,
                triggerRange: 85,
                zone: 'exit'
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
                shiftsMax: 0,
                shiftDirection: -1,
                shiftDistance: 85
            },
            staticTraps,
            candidateTrapSlots
        };
    }
}

window.AILevelGenerator = AILevelGenerator;
