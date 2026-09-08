// levelGenerator.js - Creative Procedural Level Generator with Diverse Maps and Fair Rhythmic Speeds
// Features 7 distinct archetypes with creative traps (crawling ducts, spring launches, step pyramids, twin routes)
class AILevelGenerator {
    constructor() {
        this.archetypes = [
            'CRAWL_TUNNEL',    // 840x480: Low clearance razor ducts (Jump low saws, crawl on all fours under high saws!)
            'TOWER_ASCENT',    // 840x960: Vertical climb to hidden peak door with smooth rhythmic elevators
            'PYRAMID_TEMPLE',  // 960x480: Stepped temple with spring pad launches & moving ferries
            'CAVERN_DESCENT',  // 840x960: Subterranean drop to crypt with timing shafts & crawl alcoves
            'TWIN_PATHS',      // 1000x480: High road (jump puzzle) vs Low road (crawl duct)
            'RAZOR_GAUNTLET',  // 1300x480: Rhythmic oscillating saw gauntlet with crawl passages
            'DOUBLE_TROLL'     // 840x480: Deceptive runaway door and psychological counters
        ];
    }

    /**
     * Quantified Progressive Difficulty Rating D(L)
     * Scales variety and challenge without crazy hyperspeeds!
     */
    getDifficultyMultiplier(levelNumber) {
        if (levelNumber <= 1) return 1.0;
        if (levelNumber === 2) return 1.15;
        if (levelNumber === 3) return 1.35;
        if (levelNumber === 4) return 1.55;
        return parseFloat((1.55 + Math.min(2.0, (levelNumber - 4) * 0.20)).toFixed(2));
    }

    /**
     * Generates a new level tailored to the player's profile and current level index
     * @param {number} levelNumber (e.g. 5, 6, 7...)
     * @param {DevilAI} aiModel
     * @returns {Object} Complete level definition
     */
    generateLevel(levelNumber, aiModel) {
        const profile = aiModel ? aiModel.currentProfile : 'BALANCED';
        const archetype = this.archetypes[(levelNumber - 5 + this.archetypes.length) % this.archetypes.length];

        const themes = ['inferno', 'midnight', 'toxic'];
        const theme = themes[(levelNumber - 1) % themes.length];

        const titles = {
            CRAWL_TUNNEL: [
                "The Razor Duct", "Crawl or Bleed", "Low Ceiling Terror", "The Scramble", "Ventilation Maze"
            ],
            TOWER_ASCENT: [
                "The Devil's Spire", "Climb or Fall", "Apex Treachery", "Summit of Agony", "Vertical Ascent"
            ],
            PYRAMID_TEMPLE: [
                "The Stepped Altar", "Springboard Sanctuary", "The Temple Run", "Pyramid of Doom", "Bouncer Bastion"
            ],
            CAVERN_DESCENT: [
                "The Abyssal Crypt", "Descent into Darkness", "The Deep Shaft", "Subterranean Shafts", "Freefall Folly"
            ],
            TWIN_PATHS: [
                "The Fork in the Dark", "High Road, Low Crawl", "Two Ways to Die", "Dichotomy", "The Divergence"
            ],
            RAZOR_GAUNTLET: [
                "The Razor's Edge", "Buzzsaw Boulevard", "Lethal Precision", "The Grinding Hall", "Steel Gauntlet"
            ],
            DOUBLE_TROLL: [
                "The Double Bluff", "Overthinking It", "Mind Games", "The Devil's Bargain"
            ]
        };

        const titleList = titles[archetype] || ["Devil's Trial"];
        const title = titleList[(levelNumber + Math.floor(Math.random() * titleList.length)) % titleList.length];

        switch (archetype) {
            case 'CRAWL_TUNNEL':
                return this.generateCrawlTunnel(levelNumber, profile, theme, title);
            case 'TOWER_ASCENT':
                return this.generateTowerAscent(levelNumber, profile, theme, title);
            case 'PYRAMID_TEMPLE':
                return this.generatePyramidTemple(levelNumber, profile, theme, title);
            case 'CAVERN_DESCENT':
                return this.generateCavernDescent(levelNumber, profile, theme, title);
            case 'TWIN_PATHS':
                return this.generateTwinPaths(levelNumber, profile, theme, title);
            case 'RAZOR_GAUNTLET':
                return this.generateRazorGauntlet(levelNumber, profile, theme, title);
            case 'DOUBLE_TROLL':
            default:
                return this.generateDoubleTroll(levelNumber, profile, theme, title);
        }
    }

    // --- ARCHETYPE 1: CRAWL TUNNEL (840x480 - High Razors to Crawl Under, Low Razors to Jump!) ---
    generateCrawlTunnel(levelNum, profile, theme, title) {
        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: 840, height: 480 },
            playerSpawn: { x: 120, y: 345, facing: 1 },

            pathwayCorridors: [
                { x: 80, y: 230, w: 680, h: 115 } // Floor at y: 345, ceiling at 230
            ],

            solids: [
                { x: 0, y: 0, w: 840, h: 230 },   // Solid ceiling
                { x: 0, y: 0, w: 80, h: 480 },    // Left wall
                { x: 760, y: 0, w: 80, h: 480 },  // Right wall
                { x: 80, y: 345, w: 680, h: 135 } // 100% Solid floor
            ],

            door: { x: 710, y: 299, w: 32, h: 46, open: true, shiftsMax: 2, shiftDirection: -1, shiftDistance: 85 },

            staticTraps: [
                // Floor spike midway
                { type: 'static_spike', x: 420, y: 345, w: 28, h: 15 },
                // High-mounted razor at head height: bottom at y: 334. Standing player hits it; CRAWLING player ducks under!
                { type: 'spinning_saw', x: 260, y: 320, radius: 15, patrolAxis: 'none' }
            ],

            candidateTrapSlots: [
                // High razor sawblade patrolling: crawl on all fours underneath!
                { type: 'spinning_saw', x: 340, y: 320, radius: 15, patrolAxis: 'x', minX: 300, maxX: 380, speed: 1.8 },
                // Dropping ceiling spike
                { type: 'dropping_spike', x: 510, y: 230, w: 20, h: 22, groundY: 345, triggerRange: 38 },
                // Retracting ceiling crusher with fair pause
                { type: 'piston_crusher', x: 580, startY: 190, targetY: 240, w: 38, h: 105, triggerRange: 45, pauseDuration: 55 },
                // Surprise collapsing floor near door
                { type: 'collapsing_floor', x: 645, y: 345, w: 48, h: 35, dropSpeed: 2.2 }
            ]
        };
    }

    // --- ARCHETYPE 2: TOWER ASCENT (840x960 - Vertical Climb with Smooth Rhythmic Lifts) ---
    generateTowerAscent(levelNum, profile, theme, title) {
        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: 840, height: 960 },
            playerSpawn: { x: 130, y: 880, facing: 1 },

            pathwayCorridors: [
                { x: 80, y: 770, w: 680, h: 110 },   // Tier 3 (Bottom corridor, floor at y: 880)
                { x: 660, y: 490, w: 100, h: 280 },  // Shaft 2 (Right elevator shaft)
                { x: 100, y: 490, w: 660, h: 110 },  // Tier 2 (Middle corridor, floor at y: 600)
                { x: 100, y: 160, w: 100, h: 330 },  // Shaft 1 (Left elevator shaft)
                { x: 100, y: 50, w: 660, h: 110 }    // Tier 1 (Summit peak, floor at y: 160) - Door at x: 700!
            ],

            solids: [
                { x: 0, y: 0, w: 840, h: 50 },       // Summit ceiling cap
                { x: 0, y: 0, w: 100, h: 770 },      // Upper left wall
                { x: 0, y: 770, w: 80, h: 190 },     // Lower left wall
                { x: 760, y: 0, w: 80, h: 960 },     // Right exterior wall
                { x: 80, y: 880, w: 680, h: 80 },    // Bottom floor
                { x: 200, y: 160, w: 560, h: 330 },  // Solid rock separating Tier 1 from Tier 2
                { x: 80, y: 600, w: 580, h: 170 }    // Solid rock separating Tier 2 from Tier 3
            ],

            door: { x: 700, y: 114, w: 32, h: 46, open: true, shiftsMax: 2, shiftDirection: -1, shiftDistance: 80 },

            staticTraps: [
                { type: 'static_spike', x: 420, y: 600, w: 28, h: 15 },
                { type: 'static_spike', x: 540, y: 160, w: 28, h: 15 }
            ],

            candidateTrapSlots: [
                // Vertical elevator platform in Shaft 2 (smooth, rhythmic speed 1.8)
                { type: 'moving_platform', x: 670, y: 840, w: 76, h: 18, axis: 'y', min: 595, max: 850, speed: 1.8 },
                // Patrolling razor buzzsaw on middle tier (speed 2.0)
                { type: 'spinning_saw', x: 300, y: 565, radius: 18, patrolAxis: 'x', minX: 220, maxX: 350, speed: 2.0 },
                // Lift in Shaft 1 (speed 1.8)
                { type: 'moving_platform', x: 112, y: 560, w: 76, h: 18, axis: 'y', min: 155, max: 560, speed: 1.8 },
                // High razor at summit: crawl underneath to reach door!
                { type: 'spinning_saw', x: 380, y: 138, radius: 15, patrolAxis: 'none' },
                // Dropping ceiling spike at summit
                { type: 'dropping_spike', x: 460, y: 50, w: 22, h: 22, groundY: 160, triggerRange: 38 }
            ]
        };
    }

    // --- ARCHETYPE 3: PYRAMID TEMPLE (960x480 - Stepped Altars & Spring Pad Launches) ---
    generatePyramidTemple(levelNum, profile, theme, title) {
        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: 960, height: 480 },
            playerSpawn: { x: 100, y: 345, facing: 1 },

            pathwayCorridors: [
                { x: 60, y: 230, w: 240, h: 115 },  // Tier 1 entry (floor at y: 345)
                { x: 260, y: 175, w: 240, h: 170 }, // Tier 2 step (floor at y: 290)
                { x: 460, y: 130, w: 440, h: 170 }  // Tier 3 summit altar (floor at y: 245)
            ],

            solids: [
                { x: 0, y: 0, w: 960, h: 130 },     // Solid ceiling
                { x: 0, y: 130, w: 60, h: 350 },    // Left exterior wall
                { x: 900, y: 0, w: 60, h: 480 },    // Right exterior wall
                { x: 60, y: 345, w: 200, h: 135 },  // Tier 1 floor (60 to 260 at y: 345)
                { x: 260, y: 290, w: 200, h: 190 }, // Tier 2 step floor (260 to 460 at y: 290)
                { x: 460, y: 245, w: 440, h: 235 }  // Tier 3 summit floor (460 to 900 at y: 245)
            ],

            door: { x: 840, y: 199, w: 32, h: 46, open: true, shiftsMax: 2, shiftDirection: -1, shiftDistance: 85 },

            staticTraps: [
                // Spring launch pad helping leap up to Tier 2!
                { type: 'spring_pad', x: 200, y: 345, w: 32, h: 10, boostVy: -7.5 },
                // Static spike on summit altar
                { type: 'static_spike', x: 620, y: 245, w: 28, h: 15 }
            ],

            candidateTrapSlots: [
                // Rolling boulder rolling along summit altar at fair speed (-4.2)
                { type: 'rolling_ball', x: 880, y: 245, groundY: 245, radius: 18, vx: -4.2, triggerRange: 85 },
                // Patrolling razor on Tier 2 step (speed 2.0)
                { type: 'spinning_saw', x: 360, y: 265, radius: 18, patrolAxis: 'x', minX: 300, maxX: 410, speed: 2.0 },
                // High razor on summit: crawl underneath!
                { type: 'spinning_saw', x: 740, y: 223, radius: 15, patrolAxis: 'none' },
                // Collapsing floor tile on summit
                { type: 'collapsing_floor', x: 520, y: 245, w: 48, h: 35, dropSpeed: 2.2 }
            ]
        };
    }

    // --- ARCHETYPE 4: CAVERN DESCENT (840x960 - Drop Shafts & Subterranean Crypt) ---
    generateCavernDescent(levelNum, profile, theme, title) {
        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: 840, height: 960 },
            playerSpawn: { x: 130, y: 160, facing: 1 },

            pathwayCorridors: [
                { x: 80, y: 50, w: 680, h: 110 },    // Tier 1 (Top entry hall, floor at y: 160)
                { x: 660, y: 160, w: 100, h: 330 },  // Drop shaft 1 (Right drop to Tier 2)
                { x: 100, y: 490, w: 660, h: 110 },  // Tier 2 (Middle cavern, floor at y: 600)
                { x: 100, y: 600, w: 100, h: 280 },  // Drop shaft 2 (Left drop to Tier 3)
                { x: 100, y: 770, w: 660, h: 110 }   // Tier 3 (Bottom crypt, floor at y: 880) - Door at x: 680!
            ],

            solids: [
                { x: 0, y: 0, w: 840, h: 50 },       // Top ceiling
                { x: 0, y: 0, w: 80, h: 600 },       // Upper left exterior wall
                { x: 0, y: 600, w: 100, h: 360 },    // Lower left exterior wall
                { x: 760, y: 0, w: 80, h: 960 },     // Right exterior wall
                { x: 100, y: 880, w: 660, h: 80 },   // Crypt floor
                { x: 80, y: 160, w: 580, h: 330 },   // Solid rock between Tier 1 and Tier 2
                { x: 200, y: 600, w: 560, h: 170 }   // Solid rock between Tier 2 and Tier 3
            ],

            door: { x: 680, y: 834, w: 32, h: 46, open: true, shiftsMax: 2, shiftDirection: -1, shiftDistance: 85 },

            staticTraps: [
                { type: 'static_spike', x: 420, y: 160, w: 28, h: 15 },
                { type: 'spinning_saw', x: 710, y: 280, radius: 20, patrolAxis: 'none' },
                { type: 'static_spike', x: 480, y: 880, w: 28, h: 15 }
            ],

            candidateTrapSlots: [
                // Horizontal ferry platform on Tier 2 (smooth speed 1.8)
                { type: 'moving_platform', x: 300, y: 595, w: 75, h: 18, axis: 'x', min: 220, max: 540, speed: 1.8 },
                // Patrolling razor on Tier 3 crypt (speed 2.0)
                { type: 'spinning_saw', x: 340, y: 845, radius: 18, patrolAxis: 'x', minX: 240, maxX: 390, speed: 2.0 },
                // Retracting ceiling crusher
                { type: 'piston_crusher', x: 580, startY: 730, targetY: 780, w: 40, h: 100, triggerRange: 45, pauseDuration: 55 },
                // High razor in crypt corridor: crawl under!
                { type: 'spinning_saw', x: 260, y: 855, radius: 15, patrolAxis: 'none' },
                // Dropping ceiling spike in top hall
                { type: 'dropping_spike', x: 280, y: 50, w: 22, h: 22, groundY: 160, triggerRange: 36 }
            ]
        };
    }

    // --- ARCHETYPE 5: TWIN PATHS (1000x480 - High Road Jump vs Low Road Crawl Duct) ---
    generateTwinPaths(levelNum, profile, theme, title) {
        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: 1000, height: 480 },
            playerSpawn: { x: 120, y: 345, facing: 1 },

            pathwayCorridors: [
                { x: 80, y: 230, w: 180, h: 115 },   // Entry chamber (floor at y: 345)
                { x: 260, y: 130, w: 460, h: 90 },   // High Road (upper corridor, floor at y: 220)
                { x: 260, y: 265, w: 460, h: 80 },   // Low Road (crawl duct, floor at y: 345, ceiling at 265)
                { x: 720, y: 130, w: 80, h: 215 },   // High Road drop down to exit chamber
                { x: 720, y: 230, w: 200, h: 115 }   // Exit chamber (floor at y: 345)
            ],

            solids: [
                { x: 0, y: 0, w: 1000, h: 130 },     // Solid ceiling
                { x: 0, y: 130, w: 80, h: 350 },     // Left wall
                { x: 920, y: 0, w: 80, h: 480 },     // Right wall
                { x: 80, y: 345, w: 840, h: 135 },   // Bottom solid floor
                { x: 260, y: 220, w: 460, h: 45 }    // Solid rock divider between High Road and Low Road!
            ],

            door: { x: 860, y: 299, w: 32, h: 46, open: true, shiftsMax: 2, shiftDirection: -1, shiftDistance: 85 },

            staticTraps: [
                // High Road spike
                { type: 'static_spike', x: 480, y: 220, w: 28, h: 15 },
                // Low Road high-mounted razor: crawl underneath on all fours!
                { type: 'spinning_saw', x: 440, y: 320, radius: 15, patrolAxis: 'none' }
            ],

            candidateTrapSlots: [
                // High razor in Low Road duct (speed 1.9): crawl under!
                { type: 'spinning_saw', x: 580, y: 320, radius: 15, patrolAxis: 'x', minX: 520, maxX: 630, speed: 1.9 },
                // Moving platform on High Road
                { type: 'moving_platform', x: 330, y: 215, w: 70, h: 16, axis: 'x', min: 280, max: 410, speed: 1.8 },
                // Rolling boulder along High Road (fair speed -4.0)
                { type: 'rolling_ball', x: 680, y: 220, groundY: 220, radius: 16, vx: -4.0, triggerRange: 80 },
                // Collapsing floor at exit chamber
                { type: 'collapsing_floor', x: 790, y: 345, w: 48, h: 35, dropSpeed: 2.2 }
            ]
        };
    }

    // --- ARCHETYPE 6: RAZOR GAUNTLET (1300x480 - Rhythmic Jump vs Crawl Obstacle Course) ---
    generateRazorGauntlet(levelNum, profile, theme, title) {
        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: 1300, height: 480 },
            playerSpawn: { x: 130, y: 345, facing: 1 },

            pathwayCorridors: [
                { x: 80, y: 230, w: 1140, h: 115 }  // Wide continuous running corridor
            ],

            solids: [
                { x: 0, y: 0, w: 1300, h: 230 },     // Solid ceiling
                { x: 0, y: 0, w: 80, h: 480 },       // Left wall
                { x: 1220, y: 0, w: 80, h: 480 },    // Right wall
                { x: 80, y: 345, w: 1140, h: 135 }   // 100% Continuous solid floor
            ],

            door: { x: 1160, y: 299, w: 32, h: 46, open: true, shiftsMax: 2, shiftDirection: -1, shiftDistance: 95 },

            staticTraps: [
                { type: 'static_spike', x: 420, y: 345, w: 28, h: 15 },
                { type: 'static_spike', x: 740, y: 345, w: 28, h: 15 }
            ],

            candidateTrapSlots: [
                // High razor 1 (crawl under! speed 2.0)
                { type: 'spinning_saw', x: 260, y: 320, radius: 16, patrolAxis: 'x', minX: 190, maxX: 310, speed: 2.0 },
                // Vertical oscillating razor 2 (speed 1.8)
                { type: 'spinning_saw', x: 580, y: 280, radius: 20, patrolAxis: 'y', minY: 250, maxY: 320, speed: 1.8 },
                // Retracting crusher (fair pause 50 frames)
                { type: 'piston_crusher', x: 900, startY: 190, targetY: 240, w: 40, h: 105, triggerRange: 48, pauseDuration: 50 },
                // Dropping ceiling spike with generous runway
                { type: 'dropping_spike', x: 650, y: 230, w: 22, h: 22, groundY: 345, triggerRange: 38 },
                // Rolling boulder (rolls along clean 250px runway, shatters against crusher block at x: 900!)
                { type: 'rolling_ball', x: 1180, y: 345, groundY: 345, radius: 18, vx: -4.2, triggerRange: 85 }
            ]
        };
    }

    // --- ARCHETYPE 7: DOUBLE TROLL (840x480 - Runaway Door & Clever Mind Games) ---
    generateDoubleTroll(levelNum, profile, theme, title) {
        return {
            id: levelNum,
            title: title,
            theme: theme,
            isAIGenerated: true,
            bounds: { width: 840, height: 480 },
            playerSpawn: { x: 130, y: 345, facing: 1 },

            pathwayCorridors: [
                { x: 80, y: 230, w: 680, h: 115 }
            ],

            solids: [
                { x: 0, y: 0, w: 840, h: 230 },
                { x: 0, y: 0, w: 80, h: 480 },
                { x: 760, y: 0, w: 80, h: 480 },
                { x: 80, y: 345, w: 680, h: 135 } // 100% Continuous floor
            ],

            door: { x: 680, y: 299, w: 32, h: 46, open: true, shiftsMax: 2, shiftDirection: -1, shiftDistance: 95 },

            staticTraps: [
                { type: 'static_spike', x: 360, y: 345, w: 28, h: 15 }
            ],

            candidateTrapSlots: [
                { type: 'sliding_door', x: 680, y: 299, w: 32, h: 46, shiftX: -110, triggerRange: 75 },
                { type: 'piston_crusher', x: 490, startY: 190, targetY: 240, w: 40, h: 105, triggerRange: 50, pauseDuration: 50 },
                { type: 'rolling_ball', x: 730, y: 345, groundY: 345, radius: 18, vx: -4.2, triggerRange: 85 },
                { type: 'collapsing_floor', x: 220, y: 345, w: 55, h: 35, dropSpeed: 2.2 },
                // High razor: crawl under!
                { type: 'spinning_saw', x: 570, y: 320, radius: 15, patrolAxis: 'x', minX: 520, maxX: 620, speed: 2.0 }
            ]
        };
    }
}

window.AILevelGenerator = AILevelGenerator;
