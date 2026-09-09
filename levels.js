// levels.js - Handcrafted Levels with Hybrid Adaptive & Dynamic Candidate Traps
const THEMES = {
    inferno: {
        name: "Inferno Ochre (Classic)",
        bgColor: "#be7808",      // Warm mustard exterior
        pathColor: "#ebb04b",    // Cutout tunnel corridor
        spikeColor: "#742504",    // Crimson/dark brown spikes
        doorFrameColor: "#473628",
        doorInnerColor: "#d9d5cd",
        playerColor: "#111111"
    },
    midnight: {
        name: "Midnight Cyber",
        bgColor: "#0c121e",
        pathColor: "#1c2e4a",
        spikeColor: "#00e5ff",
        doorFrameColor: "#17263c",
        doorInnerColor: "#80d8ff",
        playerColor: "#ffffff"
    },
    toxic: {
        name: "Toxic Cavern",
        bgColor: "#161021",
        pathColor: "#381f54",
        spikeColor: "#39ff14",
        doorFrameColor: "#28133f",
        doorInnerColor: "#ccff90",
        playerColor: "#f5f5f5"
    },
    bloodstone: {
        name: "Bloodstone Citadel",
        bgColor: "#2b0a0a",
        pathColor: "#571616",
        spikeColor: "#ff1744",
        doorFrameColor: "#3d0b0b",
        doorInnerColor: "#ff8a80",
        playerColor: "#ffffff"
    },
    neon: {
        name: "Cyber Synth",
        bgColor: "#090918",
        pathColor: "#1a1638",
        spikeColor: "#ff007f",
        doorFrameColor: "#2a1b4e",
        doorInnerColor: "#00f0ff",
        playerColor: "#ffffff"
    },
    abyssal: {
        name: "Abyssal Crypt",
        bgColor: "#0d1b1e",
        pathColor: "#1d353a",
        spikeColor: "#ffd600",
        doorFrameColor: "#13282b",
        doorInnerColor: "#b2ebf2",
        playerColor: "#ffffff"
    }
};

const LEVELS = [
    // --- LEVEL 1: THE DESCENT (Hybrid Random + Predicted Traps) ---
    {
        id: 1,
        title: "The Descent",
        theme: "inferno",
        bounds: { width: 840, height: 480 },
        playerSpawn: { x: 520, y: 200, facing: 1 },

        pathwayCorridors: [
            { x: 440, y: 135, w: 220, h: 65 },  // Upper tunnel (floor at y: 200)
            { x: 570, y: 200, w: 90, h: 145 },  // Right drop shaft
            { x: 160, y: 240, w: 500, h: 105 }  // Lower corridor (floor at y: 345)
        ],

        solids: [
            { x: 0, y: 0, w: 840, h: 135 },
            { x: 0, y: 135, w: 440, h: 105 },
            { x: 220, y: 200, w: 350, h: 40 },
            { x: 0, y: 240, w: 160, h: 240 },
            { x: 660, y: 135, w: 180, h: 345 },
            { x: 160, y: 345, w: 500, h: 135 } // 100% Continuous floor (160 - 660)
        ],

        door: { x: 205, y: 299, w: 32, h: 46, open: true, shiftsMax: 1, shiftDirection: 1, shiftDistance: 85 },

        staticTraps: [
            { type: 'static_spike', x: 400, y: 345, w: 28, h: 15 }
        ],

        // Rich candidate pool for Level 1: AI picks a combination of predicted and random surprise traps!
        candidateTrapSlots: [
            { type: 'collapsing_floor', x: 275, y: 345, w: 48, h: 35, dropSpeed: 2.2 },
            { type: 'piston_crusher', x: 310, startY: 200, targetY: 240, w: 36, h: 105, triggerRange: 45, pauseDuration: 50 },
            { type: 'dropping_spike', x: 490, y: 240, w: 20, h: 22, groundY: 345, triggerRange: 35 },
            { type: 'rolling_ball', x: 630, y: 345, groundY: 345, radius: 16, vx: -3.8, triggerRange: 80 },
            { type: 'hidden_spike', x: 550, y: 345, w: 26, h: 16, triggerRange: 35 },
            { type: 'collapsing_floor', x: 575, y: 345, w: 48, h: 35, dropSpeed: 2.2 }
        ]
    },

    // --- LEVEL 2: THE ROLLING DEVIL BOULDER ---
    {
        id: 2,
        title: "The Rolling Boulder",
        theme: "inferno",
        bounds: { width: 840, height: 480 },
        playerSpawn: { x: 130, y: 345, facing: 1 },

        pathwayCorridors: [
            { x: 80, y: 230, w: 680, h: 115 }   // Clean open corridor (floor at y: 345)
        ],

        solids: [
            { x: 0, y: 0, w: 840, h: 230 },     // Solid ceiling
            { x: 0, y: 0, w: 80, h: 480 },      // Left wall
            { x: 760, y: 0, w: 80, h: 480 },    // Right wall
            { x: 80, y: 345, w: 680, h: 135 }   // 100% Continuous solid floor (80 - 760)
        ],

        door: { x: 700, y: 299, w: 32, h: 46, open: true, shiftsMax: 1, shiftDirection: -1, shiftDistance: 85 },

        staticTraps: [
            { type: 'static_spike', x: 340, y: 345, w: 28, h: 15 }
        ],

        candidateTrapSlots: [
            // Rolling boulder along ground y: 345
            { type: 'rolling_ball', x: 730, y: 345, groundY: 345, radius: 18, vx: -4.8, triggerRange: 90 },
            // Retracting ceiling crusher
            { type: 'piston_crusher', x: 480, startY: 190, targetY: 240, w: 40, h: 105, triggerRange: 50, pauseDuration: 55 },
            // Vanishing floor gaps
            { type: 'collapsing_floor', x: 230, y: 345, w: 50, h: 35, dropSpeed: 2.2 },
            { type: 'collapsing_floor', x: 430, y: 345, w: 50, h: 35, dropSpeed: 2.2 },
            // Emerging floor spike
            { type: 'hidden_spike', x: 590, y: 345, w: 26, h: 16, triggerRange: 36 },
            // Patrolling razor buzzsaw
            { type: 'spinning_saw', x: 560, y: 315, radius: 18, patrolAxis: 'x', minX: 520, maxX: 620, speed: 2.5 }
        ]
    },

    // --- LEVEL 3: THE TROLL PORTAL LOOP ---
    {
        id: 3,
        title: "The Portal Loop",
        theme: "midnight",
        bounds: { width: 840, height: 480 },
        playerSpawn: { x: 130, y: 345, facing: 1 },

        pathwayCorridors: [
            { x: 80, y: 230, w: 680, h: 115 },  // Main corridor (floor at y: 345, ceiling at 230)
            { x: 110, y: 150, w: 50, h: 80 },  // Simultaneous upper chute opening at the beginning!
            { x: 610, y: 345, w: 55, h: 80 }   // Trap chute opening near the door
        ],

        solids: [
            { x: 0, y: 0, w: 110, h: 230 },     // Ceiling left
            { x: 110, y: 0, w: 50, h: 150 },    // Top cap above upper chute opening
            { x: 160, y: 0, w: 680, h: 230 },   // Ceiling right
            { x: 0, y: 0, w: 80, h: 480 },      // Left wall
            { x: 760, y: 0, w: 80, h: 480 },    // Right wall
            { x: 80, y: 345, w: 530, h: 135 },  // Floor before chute (80 to 610)
            { x: 665, y: 345, w: 95, h: 135 },  // Floor under door (665 to 760)
            { x: 610, y: 425, w: 55, h: 55 }    // Safety floor at bottom of chute
        ],

        door: { x: 705, y: 299, w: 32, h: 46, open: true, shiftsMax: 2, shiftDirection: -1, shiftDistance: 90 },

        staticTraps: [
            { type: 'troll_portal', x: 605, y: 345, w: 65, h: 80, exitX: 135, exitY: 215, exitVy: 3.5 },
            { type: 'static_spike', x: 240, y: 345, w: 28, h: 15 },
            { type: 'static_spike', x: 510, y: 345, w: 28, h: 15 }
        ],

        candidateTrapSlots: [
            // Ceiling stalactite dropping from ceiling (y: 230 to 345) - shatters into rubble upon impact!
            { type: 'dropping_spike', x: 410, y: 230, w: 22, h: 22, groundY: 345, triggerRange: 40 },
            // Retracting ceiling crusher
            { type: 'piston_crusher', x: 350, startY: 190, targetY: 240, w: 40, h: 105, triggerRange: 46, pauseDuration: 50 },
            // Vertical oscillating razor buzzsaw
            { type: 'spinning_saw', x: 330, y: 280, radius: 18, patrolAxis: 'y', minY: 250, maxY: 315, speed: 2.2 },
            // Vanishing floor tile midway
            { type: 'collapsing_floor', x: 350, y: 345, w: 45, h: 35, dropSpeed: 2.2 }
        ]
    },

    // --- LEVEL 4: THE FICKLE RUNAWAY DOOR ---
    {
        id: 4,
        title: "Where Are You Going?",
        theme: "toxic",
        bounds: { width: 840, height: 480 },
        playerSpawn: { x: 130, y: 345, facing: 1 },

        pathwayCorridors: [
            { x: 80, y: 230, w: 680, h: 115 }
        ],

        solids: [
            { x: 0, y: 0, w: 840, h: 230 },
            { x: 0, y: 0, w: 80, h: 480 },
            { x: 760, y: 0, w: 80, h: 480 },
            { x: 80, y: 345, w: 680, h: 135 } // 100% Continuous solid floor
        ],

        door: { x: 680, y: 299, w: 32, h: 46, open: true, shiftsMax: 2, shiftDirection: -1, shiftDistance: 95 },

        staticTraps: [
            { type: 'static_spike', x: 310, y: 345, w: 28, h: 15 }
        ],

        candidateTrapSlots: [
            // Door runs away when player approaches!
            { type: 'sliding_door', x: 680, y: 299, w: 32, h: 46, shiftX: -110, triggerRange: 75 },
            // Retracting crusher
            { type: 'piston_crusher', x: 490, startY: 190, targetY: 240, w: 40, h: 105, triggerRange: 50, pauseDuration: 50 },
            // Rolling boulder
            { type: 'rolling_ball', x: 730, y: 345, groundY: 345, radius: 18, vx: -5.0, triggerRange: 85 },
            // Vanishing floor tiles
            { type: 'collapsing_floor', x: 200, y: 345, w: 55, h: 35, dropSpeed: 2.2 },
            { type: 'collapsing_floor', x: 410, y: 345, w: 55, h: 35, dropSpeed: 2.2 },
            // Patrolling razor
            { type: 'spinning_saw', x: 580, y: 315, radius: 18, patrolAxis: 'x', minX: 520, maxX: 630, speed: 2.8 }
        ]
    },

    // --- LEVEL 5: THE CATACOMB DUCT ---
    {
        id: 5,
        title: "The Catacomb Duct",
        theme: "bloodstone",
        bounds: { width: 840, height: 480 },
        playerSpawn: { x: 130, y: 345, facing: 1 },

        pathwayCorridors: [
            { x: 80, y: 230, w: 200, h: 115 },
            { x: 280, y: 327, w: 160, h: 18 },  // Low crawl duct: exactly 18px headroom (requires crawling on all fours!)
            { x: 440, y: 230, w: 320, h: 115 }
        ],

        solids: [
            { x: 0, y: 0, w: 840, h: 230 },
            { x: 280, y: 230, w: 160, h: 97 },  // Low duct ceiling beam (hangs down to y: 327)
            { x: 0, y: 0, w: 80, h: 480 },
            { x: 760, y: 0, w: 80, h: 480 },
            { x: 80, y: 345, w: 680, h: 135 }   // 100% Continuous floor
        ],

        door: { x: 700, y: 299, w: 32, h: 46, open: true, shiftsMax: 2, shiftDirection: -1, shiftDistance: 85 },

        staticTraps: [
            // Head-height razor before duct entrance (bottom at y: 327 = 18px above floor, safe to crawl under!)
            { type: 'spinning_saw', x: 230, y: 312, radius: 15, patrolAxis: 'none' },
            // Spikes right outside duct exit
            { type: 'static_spike', x: 490, y: 345, w: 28, h: 15 }
        ],

        candidateTrapSlots: [
            // Retracting ceiling crusher
            { type: 'piston_crusher', x: 550, startY: 190, targetY: 240, w: 40, h: 105, triggerRange: 50, pauseDuration: 50 },
            // Rolling boulder
            { type: 'rolling_ball', x: 730, y: 345, groundY: 345, radius: 18, vx: -4.8, triggerRange: 85 },
            // Collapsing floor
            { type: 'collapsing_floor', x: 610, y: 345, w: 50, h: 35, dropSpeed: 2.2 }
        ]
    },

    // --- LEVEL 6: THE SPITEFUL SPIRE ---
    {
        id: 6,
        title: "The Spiteful Spire",
        theme: "neon",
        bounds: { width: 840, height: 480 },
        playerSpawn: { x: 130, y: 375, facing: 1 },

        pathwayCorridors: [
            { x: 80, y: 260, w: 320, h: 115 },
            { x: 420, y: 150, w: 220, h: 115 },
            { x: 160, y: 50, w: 240, h: 105 },
            { x: 580, y: 50, w: 180, h: 105 }
        ],

        solids: [
            { x: 0, y: 0, w: 80, h: 480 },
            { x: 760, y: 0, w: 80, h: 480 },
            { x: 0, y: 0, w: 840, h: 50 },
            { x: 80, y: 375, w: 320, h: 105 },  // Lower floor
            { x: 400, y: 440, w: 360, h: 40 },  // Pit bottom floor
            { x: 420, y: 265, w: 220, h: 175 }, // Mid platform (floor at 265)
            { x: 160, y: 155, w: 240, h: 110 }, // Top summit floor (floor at 155)
            { x: 580, y: 155, w: 180, h: 110 }  // Exit ledge floor (floor at 155)
        ],

        door: { x: 690, y: 109, w: 32, h: 46, open: true, shiftsMax: 2, shiftDirection: -1, shiftDistance: 70 },

        staticTraps: [
            // Moving elevator ferry up to mid ledge
            { type: 'moving_platform', x: 380, y: 320, w: 60, h: 14, minX: 350, maxX: 430, speed: 2.0, isOneWay: true },
            // Troll portal chute near mid tier: teleports back to entry!
            { type: 'troll_portal', x: 480, y: 265, w: 55, h: 75, exitX: 135, exitY: 340, exitVy: 2.0 },
            // Static spikes on summit
            { type: 'static_spike', x: 250, y: 155, w: 28, h: 15 }
        ],

        candidateTrapSlots: [
            // Moving platform ferry across top summit gap
            { type: 'moving_platform', x: 440, y: 155, w: 60, h: 14, minX: 410, maxX: 560, speed: 2.5, isOneWay: true },
            // Dropping stalactite on summit
            { type: 'dropping_spike', x: 310, y: 50, w: 22, h: 22, groundY: 155, triggerRange: 40 },
            // Rolling boulder on summit
            { type: 'rolling_ball', x: 380, y: 155, groundY: 155, radius: 16, vx: -4.4, triggerRange: 75 },
            // Collapsing floor near door
            { type: 'collapsing_floor', x: 620, y: 155, w: 45, h: 35, dropSpeed: 2.2 }
        ]
    },

    // --- LEVEL 7: THE TWIN DECEPTIONS ---
    {
        id: 7,
        title: "The Twin Deceptions",
        theme: "abyssal",
        bounds: { width: 840, height: 480 },
        playerSpawn: { x: 130, y: 345, facing: 1 },

        pathwayCorridors: [
            { x: 80, y: 230, w: 150, h: 115 },
            { x: 230, y: 120, w: 380, h: 105 }, // High Road (floor at 225, ceiling at 120)
            { x: 230, y: 255, w: 380, h: 90 },  // Low Road crawl corridor (floor at 345, ceiling at 255)
            { x: 610, y: 120, w: 150, h: 225 }
        ],

        solids: [
            { x: 0, y: 0, w: 840, h: 120 },
            { x: 0, y: 0, w: 80, h: 480 },
            { x: 760, y: 0, w: 80, h: 480 },
            { x: 80, y: 120, w: 150, h: 110 },
            { x: 230, y: 225, w: 380, h: 30 },  // Horizontal divider: High Road floor (225) & Low Road ceiling (255)
            { x: 80, y: 345, w: 680, h: 135 }   // Solid floor
        ],

        door: { x: 690, y: 299, w: 32, h: 46, open: true, shiftsMax: 2, shiftDirection: -1, shiftDistance: 95 },

        staticTraps: [
            // Spring pad in entry to vault to High Road
            { type: 'spring_pad', x: 185, y: 345, w: 32, h: 10, boostVy: -8.8 },
            // Low Road head-height crawl razor (bottom at y: 327 = 18px above floor, must crawl on all fours!)
            { type: 'spinning_saw', x: 330, y: 312, radius: 15, patrolAxis: 'none' },
            // High Road spikes
            { type: 'static_spike', x: 390, y: 225, w: 28, h: 15 }
        ],

        candidateTrapSlots: [
            // Low Road patrolling razor
            { type: 'spinning_saw', x: 470, y: 312, radius: 15, patrolAxis: 'x', minX: 420, maxX: 530, speed: 2.2 },
            // High Road rolling boulder
            { type: 'rolling_ball', x: 570, y: 225, groundY: 225, radius: 16, vx: -4.5, triggerRange: 80 },
            // Collapsing floor at exit
            { type: 'collapsing_floor', x: 630, y: 345, w: 48, h: 35, dropSpeed: 2.2 },
            // Runaway door
            { type: 'sliding_door', x: 690, y: 299, w: 32, h: 46, shiftX: -110, triggerRange: 75 }
        ]
    },

    // --- LEVEL 8: THE DEVIL'S TRIAL ---
    {
        id: 8,
        title: "The Devil's Trial",
        theme: "inferno",
        bounds: { width: 840, height: 480 },
        playerSpawn: { x: 130, y: 345, facing: 1 },

        pathwayCorridors: [
            { x: 80, y: 230, w: 680, h: 115 }
        ],

        solids: [
            { x: 0, y: 0, w: 840, h: 230 },
            { x: 0, y: 0, w: 80, h: 480 },
            { x: 760, y: 0, w: 80, h: 480 },
            { x: 80, y: 345, w: 680, h: 135 }
        ],

        door: { x: 700, y: 299, w: 32, h: 46, open: true, shiftsMax: 3, shiftDirection: -1, shiftDistance: 95 },

        staticTraps: [
            { type: 'static_spike', x: 270, y: 345, w: 28, h: 15 },
            { type: 'static_spike', x: 480, y: 345, w: 28, h: 15 }
        ],

        candidateTrapSlots: [
            // Rolling boulder
            { type: 'rolling_ball', x: 730, y: 345, groundY: 345, radius: 18, vx: -5.0, triggerRange: 90 },
            // Piston crusher
            { type: 'piston_crusher', x: 370, startY: 190, targetY: 240, w: 40, h: 105, triggerRange: 48, pauseDuration: 45 },
            // Dropping spike
            { type: 'dropping_spike', x: 430, y: 230, w: 22, h: 22, groundY: 345, triggerRange: 40 },
            // Collapsing floor
            { type: 'collapsing_floor', x: 570, y: 345, w: 50, h: 35, dropSpeed: 2.2 },
            // Patrolling razor
            { type: 'spinning_saw', x: 610, y: 315, radius: 18, patrolAxis: 'x', minX: 550, maxX: 640, speed: 2.8 }
        ]
    }
];

/**
 * Dynamic Solid Floor Slicer:
 * Takes the continuous, unbroken solid floor and dynamically slices it ONLY
 * where an active VanishingFloorTrap is present.
 * Everywhere else in the level is 100% guaranteed solid ground!
 */
function getActiveLevelSolids(level, activeTraps) {
    const activeVanishingTraps = (activeTraps || []).filter(t => t instanceof VanishingFloorTrap);

    if (activeVanishingTraps.length === 0) {
        return [...level.solids];
    }

    const resolvedSolids = [];

    for (const solid of level.solids) {
        // Only slice horizontal floor slabs that match the trap Y level
        const cuttingTraps = activeVanishingTraps.filter(t => 
            Math.abs(t.initialY - solid.y) < 5 &&
            t.x + t.w > solid.x && t.x < solid.x + solid.w
        );

        if (cuttingTraps.length === 0) {
            resolvedSolids.push(solid);
        } else {
            cuttingTraps.sort((a, b) => a.x - b.x);

            let curX = solid.x;
            for (const trap of cuttingTraps) {
                if (trap.x > curX) {
                    resolvedSolids.push({
                        x: curX,
                        y: solid.y,
                        w: trap.x - curX,
                        h: solid.h
                    });
                }
                curX = Math.max(curX, trap.x + trap.w);
            }

            if (curX < solid.x + solid.w) {
                resolvedSolids.push({
                    x: curX,
                    y: solid.y,
                    w: (solid.x + solid.w) - curX,
                    h: solid.h
                });
            }
        }
    }

    return resolvedSolids;
}

window.THEMES = THEMES;
window.LEVELS = LEVELS;
window.getActiveLevelSolids = getActiveLevelSolids;
