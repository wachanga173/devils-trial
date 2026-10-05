// levels.js - 200 Handcrafted Authentic Rage Trials for Devil's Trial
// 10 Progressive Chapters, 10 Themes, Escalating Alive Traps & Zero Generative AI.

const THEMES = {
    "inferno": {
        "name": "Inferno Ochre (Classic)",
        "bgColor": "#be7808",
        "pathColor": "#ebb04b",
        "spikeColor": "#742504",
        "doorFrameColor": "#473628",
        "doorInnerColor": "#d9d5cd",
        "playerColor": "#111111"
    },
    "midnight": {
        "name": "Midnight Cyber",
        "bgColor": "#0c121e",
        "pathColor": "#1c2e4a",
        "spikeColor": "#00e5ff",
        "doorFrameColor": "#17263c",
        "doorInnerColor": "#80d8ff",
        "playerColor": "#ffffff"
    },
    "toxic": {
        "name": "Toxic Cavern",
        "bgColor": "#161021",
        "pathColor": "#381f54",
        "spikeColor": "#39ff14",
        "doorFrameColor": "#28133f",
        "doorInnerColor": "#ccff90",
        "playerColor": "#f5f5f5"
    },
    "bloodstone": {
        "name": "Bloodstone Citadel",
        "bgColor": "#2b0a0a",
        "pathColor": "#571616",
        "spikeColor": "#ff1744",
        "doorFrameColor": "#3d0b0b",
        "doorInnerColor": "#ff8a80",
        "playerColor": "#ffffff"
    },
    "neon": {
        "name": "Cyber Synth",
        "bgColor": "#090918",
        "pathColor": "#1a1638",
        "spikeColor": "#ff007f",
        "doorFrameColor": "#2a1b4e",
        "doorInnerColor": "#00f0ff",
        "playerColor": "#ffffff"
    },
    "abyssal": {
        "name": "Abyssal Crypt",
        "bgColor": "#0d1b1e",
        "pathColor": "#1d353a",
        "spikeColor": "#ffd600",
        "doorFrameColor": "#13282b",
        "doorInnerColor": "#b2ebf2",
        "playerColor": "#ffffff"
    },
    "emerald": {
        "name": "Emerald Catacombs",
        "bgColor": "#0a2012",
        "pathColor": "#174426",
        "spikeColor": "#69f0ae",
        "doorFrameColor": "#0f301b",
        "doorInnerColor": "#b9f6ca",
        "playerColor": "#ffffff"
    },
    "twilight": {
        "name": "Twilight Void",
        "bgColor": "#1a0933",
        "pathColor": "#321261",
        "spikeColor": "#b388ff",
        "doorFrameColor": "#250d47",
        "doorInnerColor": "#d1c4e9",
        "playerColor": "#ffffff"
    },
    "volcanic": {
        "name": "Volcanic Magma",
        "bgColor": "#1f0a00",
        "pathColor": "#451700",
        "spikeColor": "#ff3d00",
        "doorFrameColor": "#331100",
        "doorInnerColor": "#ffe0b2",
        "playerColor": "#ffffff"
    },
    "desert": {
        "name": "Scorched Desert",
        "bgColor": "#3d250d",
        "pathColor": "#6b441d",
        "spikeColor": "#ff9100",
        "doorFrameColor": "#523212",
        "doorInnerColor": "#fff8e1",
        "playerColor": "#ffffff"
    }
};

const LEVELS = [
  {
    "id": 1,
    "chapter": "The Descent of Deception",
    "title": "The Descent",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 520,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 440,
        "y": 135,
        "w": 220,
        "h": 65
      },
      {
        "x": 570,
        "y": 200,
        "w": 90,
        "h": 145
      },
      {
        "x": 160,
        "y": 240,
        "w": 500,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 440,
        "h": 105
      },
      {
        "x": 220,
        "y": 200,
        "w": 350,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 160,
        "h": 240
      },
      {
        "x": 660,
        "y": 135,
        "w": 180,
        "h": 345
      },
      {
        "x": 160,
        "y": 345,
        "w": 500,
        "h": 135
      }
    ],
    "door": {
      "x": 205,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 0
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 400,
        "y": 345,
        "w": 28,
        "h": 15
      }
    ]
  },
  {
    "id": 2,
    "chapter": "The Descent of Deception",
    "title": "The Rolling Boulder",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 0
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 340,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4,
        "triggerRange": 95
      }
    ]
  },
  {
    "id": 3,
    "chapter": "The Descent of Deception",
    "title": "The Portal Loop",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 610,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 530,
        "h": 135
      },
      {
        "x": 665,
        "y": 345,
        "w": 95,
        "h": 135
      },
      {
        "x": 610,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 705,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 0
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 430,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "troll_portal",
        "x": 605,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.5
      }
    ]
  },
  {
    "id": 4,
    "chapter": "The Descent of Deception",
    "title": "Where Are You Going?",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 680,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": -1,
      "shiftDistance": 85
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 270,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 390,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.2
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 52
      }
    ]
  },
  {
    "id": 5,
    "chapter": "The Descent of Deception",
    "title": "The Pitfall Bridge",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": 1,
      "shiftDistance": 81
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.03
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 53
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.0442211055276385,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 6,
    "chapter": "The Descent of Deception",
    "title": "The Bait Landing",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": 1,
      "shiftDistance": 81
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.04
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 2.05
      }
    ]
  },
  {
    "id": 7,
    "chapter": "The Descent of Deception",
    "title": "The Ceiling Slam",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": -1,
      "shiftDistance": 81
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 2.05
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 53
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 2.05
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 2.05
      }
    ]
  },
  {
    "id": 8,
    "chapter": "The Descent of Deception",
    "title": "The Boulder Chase",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": -1,
      "shiftDistance": 81
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.06
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.06
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.06
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      }
    ]
  },
  {
    "id": 9,
    "chapter": "The Descent of Deception",
    "title": "Mind Warp",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": -1,
      "shiftDistance": 81
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 53
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 53
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.06
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 53
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      }
    ]
  },
  {
    "id": 10,
    "chapter": "The Descent of Deception",
    "title": "The Springboard Impaler",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": -1,
      "shiftDistance": 82
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.099497487437186,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.07
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -3.484572864321608,
        "triggerRange": 60
      }
    ]
  },
  {
    "id": 11,
    "chapter": "The Descent of Deception",
    "title": "Vanishing Stepping Stones",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": -1,
      "shiftDistance": 82
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.08
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      }
    ]
  },
  {
    "id": 12,
    "chapter": "The Descent of Deception",
    "title": "The Squeezing Duct",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": -1,
      "shiftDistance": 82
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.09
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 2.1
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      }
    ]
  },
  {
    "id": 13,
    "chapter": "The Descent of Deception",
    "title": "The Double Hop Door",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": -1,
      "shiftDistance": 82
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.1
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 52
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      }
    ]
  },
  {
    "id": 14,
    "chapter": "The Descent of Deception",
    "title": "The Apex Dropper",
    "theme": "inferno",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": -1,
      "shiftDistance": 82
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 52
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.1
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -3.7293467336683412,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      }
    ]
  },
  {
    "id": 15,
    "chapter": "The Descent of Deception",
    "title": "Twin Valleys",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": 1,
      "shiftDistance": 82
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.11
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 52
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.154773869346734,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 2.13
      }
    ]
  },
  {
    "id": 16,
    "chapter": "The Descent of Deception",
    "title": "The Dual Boulders",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": 1,
      "shiftDistance": 83
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.12
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 2.14
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      }
    ]
  },
  {
    "id": 17,
    "chapter": "The Descent of Deception",
    "title": "The Fake Exit",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": -1,
      "shiftDistance": 83
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 2.14
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 52
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 2.13
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 2.14
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 52
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      }
    ]
  },
  {
    "id": 18,
    "chapter": "The Descent of Deception",
    "title": "The Crushing Corridor",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": -1,
      "shiftDistance": 83
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.14
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.14
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.14
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.14
      }
    ]
  },
  {
    "id": 19,
    "chapter": "The Descent of Deception",
    "title": "The Inverted Leap",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": -1,
      "shiftDistance": 83
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 51
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 51
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.14
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 51
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      }
    ]
  },
  {
    "id": 20,
    "chapter": "The Descent of Deception",
    "title": "Inferno Climax",
    "theme": "inferno",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 1,
      "shiftDirection": -1,
      "shiftDistance": 83
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.210050251256281,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.15
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -3.578542713567839,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 2.17
      }
    ]
  },
  {
    "id": 21,
    "chapter": "The Midnight Gauntlet",
    "title": "Midnight Spire",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 84
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.16
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 51
      }
    ]
  },
  {
    "id": 22,
    "chapter": "The Midnight Gauntlet",
    "title": "Razor Alley",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 84
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.17
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 2.19
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 51
      }
    ]
  },
  {
    "id": 23,
    "chapter": "The Midnight Gauntlet",
    "title": "The Sinking Platform",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 84
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.18
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 51
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 2.2
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.24321608040201,
        "triggerRange": 75
      }
    ]
  },
  {
    "id": 24,
    "chapter": "The Midnight Gauntlet",
    "title": "Drop Shaft Roulette",
    "theme": "midnight",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 84
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 51
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.18
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -3.828844221105528,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 2.21
      }
    ]
  },
  {
    "id": 25,
    "chapter": "The Midnight Gauntlet",
    "title": "The Echo Boulder",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": 1,
      "shiftDistance": 84
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.19
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 51
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.265326633165829,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 2.22
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.19
      }
    ]
  },
  {
    "id": 26,
    "chapter": "The Midnight Gauntlet",
    "title": "The Phantom Step",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": 1,
      "shiftDistance": 84
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.2
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 2.23
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.2
      }
    ]
  },
  {
    "id": 27,
    "chapter": "The Midnight Gauntlet",
    "title": "Ceiling Stalactite Field",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 85
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 2.24
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 50
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 2.21
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 2.24
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 50
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 2.24
      }
    ]
  },
  {
    "id": 28,
    "chapter": "The Midnight Gauntlet",
    "title": "The Claustrophobic Trench",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 85
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.22
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.22
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.22
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.22
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 2.24
      }
    ]
  },
  {
    "id": 29,
    "chapter": "The Midnight Gauntlet",
    "title": "Reverse Orbit",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 85
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 50
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 50
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.23
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 50
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.3095477386934675,
        "triggerRange": 80
      }
    ]
  },
  {
    "id": 30,
    "chapter": "The Midnight Gauntlet",
    "title": "The Troll Chute II",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 85
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.320603015075377,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.23
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -3.6725125628140702,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 2.26
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 50
      }
    ]
  },
  {
    "id": 31,
    "chapter": "The Midnight Gauntlet",
    "title": "Piston Rhythm",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 85
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.24
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 50
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 2.27
      }
    ]
  },
  {
    "id": 32,
    "chapter": "The Midnight Gauntlet",
    "title": "The Hop-Over Betrayal",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 85
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.25
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 2.28
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 50
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      }
    ]
  },
  {
    "id": 33,
    "chapter": "The Midnight Gauntlet",
    "title": "The Double Drop",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 86
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.26
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 49
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 2.29
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.353768844221106,
        "triggerRange": 75
      }
    ]
  },
  {
    "id": 34,
    "chapter": "The Midnight Gauntlet",
    "title": "Buzzsaw Ballet",
    "theme": "midnight",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 86
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 49
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.27
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -3.928341708542714,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 2.3
      }
    ]
  },
  {
    "id": 35,
    "chapter": "The Midnight Gauntlet",
    "title": "The False Haven",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": 1,
      "shiftDistance": 86
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.27
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 49
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.375879396984924,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 2.31
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.27
      }
    ]
  },
  {
    "id": 36,
    "chapter": "The Midnight Gauntlet",
    "title": "High Road Trap",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": 1,
      "shiftDistance": 86
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.28
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 2.32
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.28
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 2.32
      }
    ]
  },
  {
    "id": 37,
    "chapter": "The Midnight Gauntlet",
    "title": "The Boulder Cascade",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 86
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 2.33
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 49
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 2.29
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 2.33
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 49
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 2.33
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      }
    ]
  },
  {
    "id": 38,
    "chapter": "The Midnight Gauntlet",
    "title": "Spring to Nowhere",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 87
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.3
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.3
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.3
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.3
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 2.33
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      }
    ]
  },
  {
    "id": 39,
    "chapter": "The Midnight Gauntlet",
    "title": "The Inverted Corridor",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 87
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 49
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 49
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.31
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 49
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.420100502512563,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.31
      }
    ]
  },
  {
    "id": 40,
    "chapter": "The Midnight Gauntlet",
    "title": "Midnight Fortress",
    "theme": "midnight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 87
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.431155778894472,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.31
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -3.766482412060301,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 2.35
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 49
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.31
      }
    ]
  },
  {
    "id": 41,
    "chapter": "Toxic Catacombs",
    "title": "Acid Trench",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 87
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.32
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 48
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 2.36
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.442211055276382,
        "triggerRange": 90
      }
    ]
  },
  {
    "id": 42,
    "chapter": "Toxic Catacombs",
    "title": "The Toxic Squeeze",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 87
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.33
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 2.37
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 48
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      }
    ]
  },
  {
    "id": 43,
    "chapter": "Toxic Catacombs",
    "title": "Hidden Fangs",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 87
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.34
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 48
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 2.38
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.464321608040201,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 44,
    "chapter": "Toxic Catacombs",
    "title": "The Acid Elevator",
    "theme": "toxic",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 88
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 48
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.35
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.027839195979899,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 2.39
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      }
    ]
  },
  {
    "id": 45,
    "chapter": "Toxic Catacombs",
    "title": "Sludge Boulders",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": 1,
      "shiftDistance": 88
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.35
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 48
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.4864321608040205,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 2.4
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.35
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      }
    ]
  },
  {
    "id": 46,
    "chapter": "Toxic Catacombs",
    "title": "The Corrosive Drop",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": 1,
      "shiftDistance": 88
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.36
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 2.41
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.36
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 2.41
      }
    ]
  },
  {
    "id": 47,
    "chapter": "Toxic Catacombs",
    "title": "Warped Reflexes",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 88
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 2.42
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 48
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 2.37
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 2.42
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 48
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 2.42
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      }
    ]
  },
  {
    "id": 48,
    "chapter": "Toxic Catacombs",
    "title": "The Triple Piston Gauntlet",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 88
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.38
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.38
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.38
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.38
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 2.43
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      }
    ]
  },
  {
    "id": 49,
    "chapter": "Toxic Catacombs",
    "title": "The Dissolving Stairway",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 88
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 47
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 47
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.39
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 47
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.530653266331658,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.39
      }
    ]
  },
  {
    "id": 50,
    "chapter": "Toxic Catacombs",
    "title": "Toxic Sawmill",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 89
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.541708542713568,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.39
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -3.860452261306533,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 2.44
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 47
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.39
      }
    ]
  },
  {
    "id": 51,
    "chapter": "Toxic Catacombs",
    "title": "The Bait Coin Fall",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 89
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.4
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 47
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 2.45
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.552763819095477,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 52,
    "chapter": "Toxic Catacombs",
    "title": "The Skittering Door",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 89
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.41
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 2.46
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 47
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      }
    ]
  },
  {
    "id": 53,
    "chapter": "Toxic Catacombs",
    "title": "Apex Ambush",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 89
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.42
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 47
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 2.47
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.574874371859297,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.42
      }
    ]
  },
  {
    "id": 54,
    "chapter": "Toxic Catacombs",
    "title": "The Double Cross",
    "theme": "toxic",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 89
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 47
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.43
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.127336683417085,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 2.48
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.585929648241206,
        "triggerRange": 80
      }
    ]
  },
  {
    "id": 55,
    "chapter": "Toxic Catacombs",
    "title": "Acid Spire",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": 1,
      "shiftDistance": 89
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.43
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 46
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.596984924623116,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 2.49
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.43
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 56,
    "chapter": "Toxic Catacombs",
    "title": "Piston Choke",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": 1,
      "shiftDistance": 90
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.44
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 2.5
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.44
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 2.5
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      }
    ]
  },
  {
    "id": 57,
    "chapter": "Toxic Catacombs",
    "title": "The Toxic Loop",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 90
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 2.51
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 46
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 2.45
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 2.51
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 46
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 2.51
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 58,
    "chapter": "Toxic Catacombs",
    "title": "Rolling Menace",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 90
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.46
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.46
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.46
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.46
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 2.52
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      }
    ]
  },
  {
    "id": 59,
    "chapter": "Toxic Catacombs",
    "title": "The Slippery Ledge",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 90
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 46
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 46
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.47
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 46
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.641206030150753,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.47
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 46
      }
    ]
  },
  {
    "id": 60,
    "chapter": "Toxic Catacombs",
    "title": "Toxic Citadel",
    "theme": "toxic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 90
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.6522613065326635,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.47
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -3.954422110552764,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 2.53
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 46
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.47
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      }
    ]
  },
  {
    "id": 61,
    "chapter": "Bloodstone Citadel",
    "title": "Crimson Chasm",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 91
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.48
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 46
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 2.54
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.663316582914573,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 62,
    "chapter": "Bloodstone Citadel",
    "title": "Sanguine Crushers",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 91
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.49
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 2.55
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 45
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      }
    ]
  },
  {
    "id": 63,
    "chapter": "Bloodstone Citadel",
    "title": "The Bloodstone Roll",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 91
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.5
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 45
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 2.56
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.685427135678392,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.5
      }
    ]
  },
  {
    "id": 64,
    "chapter": "Bloodstone Citadel",
    "title": "Vampiric Spikes",
    "theme": "bloodstone",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 91
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 45
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.51
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.226834170854272,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 2.57
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.696482412060302,
        "triggerRange": 80
      }
    ]
  },
  {
    "id": 65,
    "chapter": "Bloodstone Citadel",
    "title": "The Crimson Ladder",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": 1,
      "shiftDistance": 91
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.51
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 45
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.707537688442211,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 2.58
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.51
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 66,
    "chapter": "Bloodstone Citadel",
    "title": "The Vein of Saws",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": 1,
      "shiftDistance": 91
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.52
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 2.59
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.52
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 2.59
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      }
    ]
  },
  {
    "id": 67,
    "chapter": "Bloodstone Citadel",
    "title": "Blood Trapdoor",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 92
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 2.6
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 45
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 2.53
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 2.6
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 45
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 2.6
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 68,
    "chapter": "Bloodstone Citadel",
    "title": "The Inverted Altar",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 92
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.54
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.54
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.54
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.54
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 2.61
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      }
    ]
  },
  {
    "id": 69,
    "chapter": "Bloodstone Citadel",
    "title": "The Crying Ceiling",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 92
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 44
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 44
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.55
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 44
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.75175879396985,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.55
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 44
      }
    ]
  },
  {
    "id": 70,
    "chapter": "Bloodstone Citadel",
    "title": "Double Spike Leap",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 92
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.762814070351759,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.55
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -4.048391959798995,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 2.62
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 44
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.55
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      }
    ]
  },
  {
    "id": 71,
    "chapter": "Bloodstone Citadel",
    "title": "Bloodstone Squeeze",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 92
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.56
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 44
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 2.63
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.773869346733669,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 650,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.56
      }
    ]
  },
  {
    "id": 72,
    "chapter": "Bloodstone Citadel",
    "title": "The Fleeing Shrine",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 92
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.57
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 2.64
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 44
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.784924623115578,
        "triggerRange": 85
      }
    ]
  },
  {
    "id": 73,
    "chapter": "Bloodstone Citadel",
    "title": "Twin Blood Boulders",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 93
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.58
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 44
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 2.65
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.795979899497487,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.58
      },
      {
        "type": "reversed_controls",
        "x": 290,
        "y": 310,
        "w": 90,
        "h": 45
      }
    ]
  },
  {
    "id": 74,
    "chapter": "Bloodstone Citadel",
    "title": "The Crimson Spring",
    "theme": "bloodstone",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 93
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 44
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.59
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.3263316582914575,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 2.66
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.807035175879397,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 760,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.59
      }
    ]
  },
  {
    "id": 75,
    "chapter": "Bloodstone Citadel",
    "title": "The Hollow Floor",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": 1,
      "shiftDistance": 93
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.59
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 44
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.818090452261306,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 2.67
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.59
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "reversed_controls",
        "x": 275,
        "y": 290,
        "w": 90,
        "h": 55
      }
    ]
  },
  {
    "id": 76,
    "chapter": "Bloodstone Citadel",
    "title": "Stalactite Rain",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": 1,
      "shiftDistance": 93
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.6
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 2.68
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.6
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 2.68
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      },
      {
        "type": "reversed_controls",
        "x": 205,
        "y": 150,
        "w": 70,
        "h": 50
      }
    ]
  },
  {
    "id": 77,
    "chapter": "Bloodstone Citadel",
    "title": "The Bloody Trench",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 93
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 2.69
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 43
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 2.61
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 2.69
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 43
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 2.69
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "spinning_saw",
        "x": 560,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 530,
        "maxX": 590,
        "speed": 2.69
      }
    ]
  },
  {
    "id": 78,
    "chapter": "Bloodstone Citadel",
    "title": "The False Sanctuary",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 94
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.62
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.62
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.62
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.62
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 2.7
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "reversed_controls",
        "x": 330,
        "y": 280,
        "w": 170,
        "h": 60
      }
    ]
  },
  {
    "id": 79,
    "chapter": "Bloodstone Citadel",
    "title": "Citadel Gauntlet",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 94
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 43
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 43
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.63
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 43
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.862311557788945,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.63
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 43
      },
      {
        "type": "reversed_controls",
        "x": 380,
        "y": 290,
        "w": 120,
        "h": 55
      }
    ]
  },
  {
    "id": 80,
    "chapter": "Bloodstone Citadel",
    "title": "Bloodstone Overlord",
    "theme": "bloodstone",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 2,
      "shiftDirection": -1,
      "shiftDistance": 94
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.873366834170854,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.64
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -4.142361809045226,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 2.71
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 43
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.64
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 550,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 81,
    "chapter": "Cyber Synth Grid",
    "title": "Neon Pulse",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 94
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.64
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 43
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 2.72
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.884422110552764,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 650,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.64
      }
    ]
  },
  {
    "id": 82,
    "chapter": "Cyber Synth Grid",
    "title": "Digital Chasm",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 94
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.65
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 2.73
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 43
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.895477386934673,
        "triggerRange": 85
      }
    ]
  },
  {
    "id": 83,
    "chapter": "Cyber Synth Grid",
    "title": "The Cyber Squeeze",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 94
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.66
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 42
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 2.74
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.906532663316583,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.66
      },
      {
        "type": "reversed_controls",
        "x": 290,
        "y": 310,
        "w": 90,
        "h": 45
      }
    ]
  },
  {
    "id": 84,
    "chapter": "Cyber Synth Grid",
    "title": "Laser Razors",
    "theme": "neon",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 95
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 42
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.67
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.425829145728644,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 2.75
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.9175879396984925,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 760,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.67
      }
    ]
  },
  {
    "id": 85,
    "chapter": "Cyber Synth Grid",
    "title": "Inverted Grid",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": 1,
      "shiftDistance": 95
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.68
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 42
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.928643216080403,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 2.76
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.68
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "reversed_controls",
        "x": 275,
        "y": 290,
        "w": 90,
        "h": 55
      }
    ]
  },
  {
    "id": 86,
    "chapter": "Cyber Synth Grid",
    "title": "The Bit Drop",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": 1,
      "shiftDistance": 95
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.68
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 2.77
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.68
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 2.77
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      },
      {
        "type": "reversed_controls",
        "x": 205,
        "y": 150,
        "w": 70,
        "h": 50
      }
    ]
  },
  {
    "id": 87,
    "chapter": "Cyber Synth Grid",
    "title": "Data Boulder",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 95
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 2.78
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 42
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 2.69
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 2.78
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 42
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 2.78
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "spinning_saw",
        "x": 560,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 530,
        "maxX": 590,
        "speed": 2.78
      }
    ]
  },
  {
    "id": 88,
    "chapter": "Cyber Synth Grid",
    "title": "The Cyber Spire",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 95
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.7
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.7
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.7
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.7
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 2.79
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "reversed_controls",
        "x": 330,
        "y": 280,
        "w": 170,
        "h": 60
      }
    ]
  },
  {
    "id": 89,
    "chapter": "Cyber Synth Grid",
    "title": "Glitch Door",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 95
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 42
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 42
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.71
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 42
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.97286432160804,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.71
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 42
      },
      {
        "type": "reversed_controls",
        "x": 380,
        "y": 290,
        "w": 120,
        "h": 55
      }
    ]
  },
  {
    "id": 90,
    "chapter": "Cyber Synth Grid",
    "title": "Pixel Pitfalls",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 96
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.983919597989949,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.72
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -4.236331658291457,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 2.81
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 41
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.72
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 550,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 91,
    "chapter": "Cyber Synth Grid",
    "title": "The High-Frequency Saw",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 96
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.72
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 41
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 2.81
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.994974874371859,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 650,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.72
      }
    ]
  },
  {
    "id": 92,
    "chapter": "Cyber Synth Grid",
    "title": "Binary Crushers",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 96
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.73
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 2.82
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 41
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.006030150753769,
        "triggerRange": 85
      }
    ]
  },
  {
    "id": 93,
    "chapter": "Cyber Synth Grid",
    "title": "Vector Warp",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 96
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.74
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 41
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 2.83
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.017085427135679,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.74
      },
      {
        "type": "reversed_controls",
        "x": 290,
        "y": 310,
        "w": 90,
        "h": 45
      }
    ]
  },
  {
    "id": 94,
    "chapter": "Cyber Synth Grid",
    "title": "The Neon Springboard",
    "theme": "neon",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 96
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 41
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.75
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.525326633165829,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 2.84
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.028140703517588,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 760,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.75
      }
    ]
  },
  {
    "id": 95,
    "chapter": "Cyber Synth Grid",
    "title": "Corrupted Memory",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": 1,
      "shiftDistance": 97
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.76
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 41
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.039195979899498,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 2.85
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.76
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "reversed_controls",
        "x": 275,
        "y": 290,
        "w": 90,
        "h": 55
      }
    ]
  },
  {
    "id": 96,
    "chapter": "Cyber Synth Grid",
    "title": "Quantum Inversion",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": 1,
      "shiftDistance": 97
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.76
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 2.86
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.76
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 2.86
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      },
      {
        "type": "reversed_controls",
        "x": 205,
        "y": 150,
        "w": 70,
        "h": 50
      },
      {
        "type": "rolling_ball",
        "x": 550,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.050251256281407,
        "triggerRange": 85
      }
    ]
  },
  {
    "id": 97,
    "chapter": "Cyber Synth Grid",
    "title": "The Cyber Trench",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 97
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 2.87
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 40
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 2.77
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 2.87
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 40
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 2.87
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "spinning_saw",
        "x": 560,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 530,
        "maxX": 590,
        "speed": 2.87
      },
      {
        "type": "piston_crusher",
        "x": 610,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 40
      }
    ]
  },
  {
    "id": 98,
    "chapter": "Cyber Synth Grid",
    "title": "Subroutine Trap",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 97
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.78
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.78
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.78
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.78
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 2.88
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "reversed_controls",
        "x": 330,
        "y": 280,
        "w": 170,
        "h": 60
      },
      {
        "type": "spinning_saw",
        "x": 510,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 2.88
      }
    ]
  },
  {
    "id": 99,
    "chapter": "Cyber Synth Grid",
    "title": "Matrix Gauntlet",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 97
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 40
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 40
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.79
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 40
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.083417085427136,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.79
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 40
      },
      {
        "type": "reversed_controls",
        "x": 380,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "spinning_saw",
        "x": 590,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 560,
        "maxX": 620,
        "speed": 2.89
      }
    ]
  },
  {
    "id": 100,
    "chapter": "Cyber Synth Grid",
    "title": "Cyber Core Collapse",
    "theme": "neon",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 97
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.0944723618090455,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.8
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -4.330301507537689,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 2.9
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 40
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.8
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 550,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 200,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": 3.820854271356784,
        "triggerX": 360,
        "triggerRange": 60
      }
    ]
  },
  {
    "id": 101,
    "chapter": "Abyssal Deep Trench",
    "title": "The Deep Trenches",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 98
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.8
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 40
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 2.9
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.105527638190955,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 650,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.8
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 102,
    "chapter": "Abyssal Deep Trench",
    "title": "Benthic Crushers",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 98
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.81
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 2.91
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 40
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.116582914572865,
        "triggerRange": 85
      },
      {
        "type": "spinning_saw",
        "x": 480,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 2.91
      }
    ]
  },
  {
    "id": 103,
    "chapter": "Abyssal Deep Trench",
    "title": "Abyssal Stalactites",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 98
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.82
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 40
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 2.92
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.127638190954774,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.82
      },
      {
        "type": "reversed_controls",
        "x": 290,
        "y": 310,
        "w": 90,
        "h": 45
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 40
      }
    ]
  },
  {
    "id": 104,
    "chapter": "Abyssal Deep Trench",
    "title": "Sunken Stepping Stones",
    "theme": "abyssal",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 98
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 40
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.83
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.624824120603015,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 2.93
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.138693467336683,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 760,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.83
      },
      {
        "type": "piston_crusher",
        "x": 670,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 40
      }
    ]
  },
  {
    "id": 105,
    "chapter": "Abyssal Deep Trench",
    "title": "The Pressure Squeeze",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": 1,
      "shiftDistance": 98
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.84
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 39
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.149748743718593,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 2.94
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.84
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "reversed_controls",
        "x": 275,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      }
    ]
  },
  {
    "id": 106,
    "chapter": "Abyssal Deep Trench",
    "title": "Leviathan Boulder",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": 1,
      "shiftDistance": 98
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.84
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 2.95
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.84
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 2.95
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      },
      {
        "type": "reversed_controls",
        "x": 205,
        "y": 150,
        "w": 70,
        "h": 50
      },
      {
        "type": "rolling_ball",
        "x": 550,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.160804020100502,
        "triggerRange": 85
      }
    ]
  },
  {
    "id": 107,
    "chapter": "Abyssal Deep Trench",
    "title": "Troll Chasm",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 99
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 2.96
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 39
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 2.85
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 2.96
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 39
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 2.96
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "spinning_saw",
        "x": 560,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 530,
        "maxX": 590,
        "speed": 2.96
      },
      {
        "type": "piston_crusher",
        "x": 610,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 39
      }
    ]
  },
  {
    "id": 108,
    "chapter": "Abyssal Deep Trench",
    "title": "The Depth Inversion",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 99
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.86
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.86
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.86
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.86
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 2.97
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "reversed_controls",
        "x": 330,
        "y": 280,
        "w": 170,
        "h": 60
      },
      {
        "type": "spinning_saw",
        "x": 510,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 2.97
      }
    ]
  },
  {
    "id": 109,
    "chapter": "Abyssal Deep Trench",
    "title": "Echoing Saws",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 99
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 39
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 39
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.87
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 39
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.193969849246232,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.87
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 39
      },
      {
        "type": "reversed_controls",
        "x": 380,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "spinning_saw",
        "x": 590,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 560,
        "maxX": 620,
        "speed": 2.98
      }
    ]
  },
  {
    "id": 110,
    "chapter": "Abyssal Deep Trench",
    "title": "The Mariana Drop",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 99
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.205025125628141,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.88
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -4.42427135678392,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 2.99
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 39
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.88
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 550,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 200,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": 3.903768844221106,
        "triggerX": 360,
        "triggerRange": 60
      }
    ]
  },
  {
    "id": 111,
    "chapter": "Abyssal Deep Trench",
    "title": "The Sinking Trench",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 99
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.88
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 39
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 2.99
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.21608040201005,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 650,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.88
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 112,
    "chapter": "Abyssal Deep Trench",
    "title": "False Bottom",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 100
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.89
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 38
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.22713567839196,
        "triggerRange": 85
      },
      {
        "type": "spinning_saw",
        "x": 480,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3
      }
    ]
  },
  {
    "id": 113,
    "chapter": "Abyssal Deep Trench",
    "title": "Abyssal Ascent",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 100
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.9
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 38
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 3.01
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.238190954773869,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.9
      },
      {
        "type": "reversed_controls",
        "x": 290,
        "y": 310,
        "w": 90,
        "h": 45
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 38
      }
    ]
  },
  {
    "id": 114,
    "chapter": "Abyssal Deep Trench",
    "title": "The Deep Ambush",
    "theme": "abyssal",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 100
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 38
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.91
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.724321608040201,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 3.02
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.249246231155779,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 760,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.91
      },
      {
        "type": "piston_crusher",
        "x": 670,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 38
      }
    ]
  },
  {
    "id": 115,
    "chapter": "Abyssal Deep Trench",
    "title": "Crushing Depths",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": 1,
      "shiftDistance": 100
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.92
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 38
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.260301507537688,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 3.03
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.92
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "reversed_controls",
        "x": 275,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      }
    ]
  },
  {
    "id": 116,
    "chapter": "Abyssal Deep Trench",
    "title": "The Subterranean Spring",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": 1,
      "shiftDistance": 100
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.92
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 3.04
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.92
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 3.04
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      },
      {
        "type": "reversed_controls",
        "x": 205,
        "y": 150,
        "w": 70,
        "h": 50
      },
      {
        "type": "rolling_ball",
        "x": 550,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.2713567839195985,
        "triggerRange": 85
      }
    ]
  },
  {
    "id": 117,
    "chapter": "Abyssal Deep Trench",
    "title": "The Drowning Door",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 100
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 3.05
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 38
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 2.93
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 3.05
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 38
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 3.05
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "spinning_saw",
        "x": 560,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 530,
        "maxX": 590,
        "speed": 3.05
      },
      {
        "type": "piston_crusher",
        "x": 610,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 38
      }
    ]
  },
  {
    "id": 118,
    "chapter": "Abyssal Deep Trench",
    "title": "Chasm of Silence",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 101
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.94
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.94
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.94
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.94
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.06
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "reversed_controls",
        "x": 330,
        "y": 280,
        "w": 170,
        "h": 60
      },
      {
        "type": "spinning_saw",
        "x": 510,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.06
      }
    ]
  },
  {
    "id": 119,
    "chapter": "Abyssal Deep Trench",
    "title": "The Abyssal Spire",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 101
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 37
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 37
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.95
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 37
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.304522613065327,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.95
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 37
      },
      {
        "type": "reversed_controls",
        "x": 380,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "spinning_saw",
        "x": 590,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 560,
        "maxX": 620,
        "speed": 3.07
      }
    ]
  },
  {
    "id": 120,
    "chapter": "Abyssal Deep Trench",
    "title": "Abyssal Monolith",
    "theme": "abyssal",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 101
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.315577889447236,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.96
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -4.518241206030151,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 3.08
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 37
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.96
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 550,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 200,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": 3.986683417085427,
        "triggerX": 360,
        "triggerRange": 60
      }
    ]
  },
  {
    "id": 121,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "Serpent's Coil",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 101
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.96
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 37
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 3.09
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.326633165829145,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 650,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.96
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 37
      }
    ]
  },
  {
    "id": 122,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "Emerald Spikes",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 101
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 2.97
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.09
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 37
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.337688442211055,
        "triggerRange": 85
      },
      {
        "type": "spinning_saw",
        "x": 480,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.09
      },
      {
        "type": "collapsing_floor",
        "x": 350,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.97
      }
    ]
  },
  {
    "id": 123,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "The Jade Crusher",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 101
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.98
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 37
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 3.1
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.348743718592965,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 2.98
      },
      {
        "type": "reversed_controls",
        "x": 290,
        "y": 310,
        "w": 90,
        "h": 45
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 37
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 124,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "Venomous Slopes",
    "theme": "emerald",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 102
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 37
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.99
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.823819095477387,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 3.11
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.3597989949748746,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 760,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 2.99
      },
      {
        "type": "piston_crusher",
        "x": 670,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 37
      },
      {
        "type": "dropping_spike",
        "x": 840,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 125,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "The Constrictor Duct",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": 1,
      "shiftDistance": 102
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 37
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.370854271356784,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 3.12
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "reversed_controls",
        "x": 275,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "piston_crusher",
        "x": 495,
        "startY": 135,
        "targetY": 170,
        "w": 36,
        "h": 65,
        "triggerRange": 40,
        "pauseDuration": 37
      }
    ]
  },
  {
    "id": 126,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "Emerald Stepping Stones",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": 1,
      "shiftDistance": 102
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.01
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 3.13
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.01
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 3.13
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      },
      {
        "type": "reversed_controls",
        "x": 205,
        "y": 150,
        "w": 70,
        "h": 50
      },
      {
        "type": "rolling_ball",
        "x": 550,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.381909547738694,
        "triggerRange": 85
      },
      {
        "type": "static_spike",
        "x": 370,
        "y": 200,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 127,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "Rolling Jade",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 102
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 3.14
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 36
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 3.01
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 3.14
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 36
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 3.14
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "spinning_saw",
        "x": 560,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 530,
        "maxX": 590,
        "speed": 3.14
      },
      {
        "type": "piston_crusher",
        "x": 610,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 36
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.584020100502513,
        "triggerRange": 65
      }
    ]
  },
  {
    "id": 128,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "The Serpent's Tongue",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 102
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.02
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.02
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.02
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.02
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.15
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "reversed_controls",
        "x": 330,
        "y": 280,
        "w": 170,
        "h": 60
      },
      {
        "type": "spinning_saw",
        "x": 510,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.15
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 129,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "Winding Inversion",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 103
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 36
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 36
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.03
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 36
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.415075376884422,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.03
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 36
      },
      {
        "type": "reversed_controls",
        "x": 380,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "spinning_saw",
        "x": 590,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 560,
        "maxX": 620,
        "speed": 3.16
      },
      {
        "type": "dropping_spike",
        "x": 600,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 130,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "The Basilisk Drop",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 103
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.426130653266332,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.04
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -4.612211055276382,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 3.17
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 36
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.04
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 550,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 200,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": 4.069597989949749,
        "triggerX": 360,
        "triggerRange": 60
      },
      {
        "type": "collapsing_floor",
        "x": 610,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.04
      }
    ]
  },
  {
    "id": 131,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "The Jade Portal",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 103
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.05
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 36
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 3.18
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.437185929648241,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 650,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.05
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 36
      }
    ]
  },
  {
    "id": 132,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "Emerald Buzzsaw",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 103
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.05
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.18
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 36
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.448241206030151,
        "triggerRange": 85
      },
      {
        "type": "spinning_saw",
        "x": 480,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.18
      },
      {
        "type": "collapsing_floor",
        "x": 350,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.05
      }
    ]
  },
  {
    "id": 133,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "The Dissolving Scale",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 103
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.06
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 35
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 3.19
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.459296482412061,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.06
      },
      {
        "type": "reversed_controls",
        "x": 290,
        "y": 310,
        "w": 90,
        "h": 45
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 35
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 134,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "Twin Jade Boulders",
    "theme": "emerald",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 103
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 35
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.07
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -4.923316582914573,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 3.2
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.47035175879397,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 760,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.07
      },
      {
        "type": "piston_crusher",
        "x": 670,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 35
      },
      {
        "type": "dropping_spike",
        "x": 840,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 135,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "The Squeezing Coil",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": 1,
      "shiftDistance": 104
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.08
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 35
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.48140703517588,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 3.21
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.08
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "reversed_controls",
        "x": 275,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "piston_crusher",
        "x": 495,
        "startY": 135,
        "targetY": 170,
        "w": 36,
        "h": 65,
        "triggerRange": 40,
        "pauseDuration": 35
      }
    ]
  },
  {
    "id": 136,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "The False Shrine",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": 1,
      "shiftDistance": 104
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.09
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 3.22
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.09
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 3.22
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      },
      {
        "type": "reversed_controls",
        "x": 205,
        "y": 150,
        "w": 70,
        "h": 50
      },
      {
        "type": "rolling_ball",
        "x": 550,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.492462311557789,
        "triggerRange": 85
      },
      {
        "type": "static_spike",
        "x": 370,
        "y": 200,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 137,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "Serpent's Ascent",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 104
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 3.23
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 35
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 3.09
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 3.23
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 35
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 3.23
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "spinning_saw",
        "x": 560,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 530,
        "maxX": 590,
        "speed": 3.23
      },
      {
        "type": "piston_crusher",
        "x": 610,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 35
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.677989949748744,
        "triggerRange": 65
      }
    ]
  },
  {
    "id": 138,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "Poison Apex",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 104
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.1
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.1
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.1
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.1
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.24
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "reversed_controls",
        "x": 330,
        "y": 280,
        "w": 170,
        "h": 60
      },
      {
        "type": "spinning_saw",
        "x": 510,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.24
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 139,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "Jade Fortress",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 104
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 35
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 35
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.11
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 35
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.5256281407035175,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.11
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 35
      },
      {
        "type": "reversed_controls",
        "x": 380,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "spinning_saw",
        "x": 590,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 560,
        "maxX": 620,
        "speed": 3.25
      },
      {
        "type": "dropping_spike",
        "x": 600,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 140,
    "chapter": "Emerald Serpent Labyrinth",
    "title": "The Emerald Dragon",
    "theme": "emerald",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 3,
      "shiftDirection": -1,
      "shiftDistance": 104
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.5366834170854275,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.12
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -4.706180904522613,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 3.26
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 34
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.12
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 550,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 200,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": 4.152512562814071,
        "triggerX": 360,
        "triggerRange": 60
      },
      {
        "type": "collapsing_floor",
        "x": 610,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.12
      }
    ]
  },
  {
    "id": 141,
    "chapter": "Twilight Distortion Void",
    "title": "Twilight Rift",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 105
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.13
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 34
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 3.27
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.547738693467337,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 650,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.13
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 34
      }
    ]
  },
  {
    "id": 142,
    "chapter": "Twilight Distortion Void",
    "title": "The Void Step",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 105
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.13
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.28
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 34
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.558793969849246,
        "triggerRange": 85
      },
      {
        "type": "spinning_saw",
        "x": 480,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.28
      },
      {
        "type": "collapsing_floor",
        "x": 350,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.13
      }
    ]
  },
  {
    "id": 143,
    "chapter": "Twilight Distortion Void",
    "title": "Phantom Crushers",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 105
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.14
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 34
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 3.28
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.569849246231156,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.14
      },
      {
        "type": "reversed_controls",
        "x": 290,
        "y": 310,
        "w": 90,
        "h": 45
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 34
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 144,
    "chapter": "Twilight Distortion Void",
    "title": "The Inverted Horizon",
    "theme": "twilight",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 105
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 34
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.15
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.0228140703517585,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 3.29
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.580904522613065,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 760,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.15
      },
      {
        "type": "piston_crusher",
        "x": 670,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 34
      },
      {
        "type": "dropping_spike",
        "x": 840,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 145,
    "chapter": "Twilight Distortion Void",
    "title": "Shadow Boulders",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": 1,
      "shiftDistance": 105
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.16
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 34
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.591959798994975,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 3.3
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.16
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "reversed_controls",
        "x": 275,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "piston_crusher",
        "x": 495,
        "startY": 135,
        "targetY": 170,
        "w": 36,
        "h": 65,
        "triggerRange": 40,
        "pauseDuration": 34
      }
    ]
  },
  {
    "id": 146,
    "chapter": "Twilight Distortion Void",
    "title": "The Whispering Duct",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": 1,
      "shiftDistance": 106
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.17
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 3.31
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.17
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 3.31
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      },
      {
        "type": "reversed_controls",
        "x": 205,
        "y": 150,
        "w": 70,
        "h": 50
      },
      {
        "type": "rolling_ball",
        "x": 550,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.603015075376884,
        "triggerRange": 85
      },
      {
        "type": "static_spike",
        "x": 370,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 270,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 34
      }
    ]
  },
  {
    "id": 147,
    "chapter": "Twilight Distortion Void",
    "title": "Dimensional Saws",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 106
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 3.32
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 33
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 3.17
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 3.32
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 33
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 3.32
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "spinning_saw",
        "x": 560,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 530,
        "maxX": 590,
        "speed": 3.32
      },
      {
        "type": "piston_crusher",
        "x": 610,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 33
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.771959798994975,
        "triggerRange": 65
      },
      {
        "type": "dropping_spike",
        "x": 710,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      }
    ]
  },
  {
    "id": 148,
    "chapter": "Twilight Distortion Void",
    "title": "The Shifting Portal",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 106
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.18
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.18
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.18
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.18
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.33
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "reversed_controls",
        "x": 330,
        "y": 280,
        "w": 170,
        "h": 60
      },
      {
        "type": "spinning_saw",
        "x": 510,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.33
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.781356783919598,
        "triggerRange": 60
      }
    ]
  },
  {
    "id": 149,
    "chapter": "Twilight Distortion Void",
    "title": "Twilight Chasm",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 106
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 33
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 33
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.19
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 33
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.636180904522613,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.19
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 33
      },
      {
        "type": "reversed_controls",
        "x": 380,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "spinning_saw",
        "x": 590,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 560,
        "maxX": 620,
        "speed": 3.34
      },
      {
        "type": "dropping_spike",
        "x": 600,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 600,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.19
      }
    ]
  },
  {
    "id": 150,
    "chapter": "Twilight Distortion Void",
    "title": "The Void Spring",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 106
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.647236180904523,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.2
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -4.800150753768844,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 3.35
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 33
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.2
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 550,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 200,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": 4.235427135678393,
        "triggerX": 360,
        "triggerRange": 60
      },
      {
        "type": "collapsing_floor",
        "x": 610,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.2
      },
      {
        "type": "static_spike",
        "x": 650,
        "y": 345,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 151,
    "chapter": "Twilight Distortion Void",
    "title": "Collapsing Void",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 106
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.21
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 33
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 3.36
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.658291457286433,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 650,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.21
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 33
      },
      {
        "type": "collapsing_floor",
        "x": 350,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.21
      }
    ]
  },
  {
    "id": 152,
    "chapter": "Twilight Distortion Void",
    "title": "The Mirror Door",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 107
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.21
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.37
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 33
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.669346733668342,
        "triggerRange": 85
      },
      {
        "type": "spinning_saw",
        "x": 480,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.37
      },
      {
        "type": "collapsing_floor",
        "x": 350,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.21
      },
      {
        "type": "static_spike",
        "x": 680,
        "y": 345,
        "w": 24,
        "h": 15
      }
    ]
  },
  {
    "id": 153,
    "chapter": "Twilight Distortion Void",
    "title": "Stalactites of Dusk",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 107
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.22
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 33
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 3.37
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.680402010050251,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.22
      },
      {
        "type": "reversed_controls",
        "x": 290,
        "y": 310,
        "w": 90,
        "h": 45
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 33
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      }
    ]
  },
  {
    "id": 154,
    "chapter": "Twilight Distortion Void",
    "title": "Twilight Spire",
    "theme": "twilight",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 107
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 32
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.23
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.1223115577889455,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 3.38
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.691457286432161,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 760,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.23
      },
      {
        "type": "piston_crusher",
        "x": 670,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 32
      },
      {
        "type": "dropping_spike",
        "x": 840,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "reversed_controls",
        "x": 740,
        "y": 290,
        "w": 110,
        "h": 55
      }
    ]
  },
  {
    "id": 155,
    "chapter": "Twilight Distortion Void",
    "title": "The Dual Shadow",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": 1,
      "shiftDistance": 107
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.24
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 32
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.7025125628140705,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 3.39
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.24
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "reversed_controls",
        "x": 275,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "piston_crusher",
        "x": 495,
        "startY": 135,
        "targetY": 170,
        "w": 36,
        "h": 65,
        "triggerRange": 40,
        "pauseDuration": 32
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.24
      }
    ]
  },
  {
    "id": 156,
    "chapter": "Twilight Distortion Void",
    "title": "The False Dawn",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": 1,
      "shiftDistance": 107
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.25
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 3.4
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.25
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 3.4
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      },
      {
        "type": "reversed_controls",
        "x": 205,
        "y": 150,
        "w": 70,
        "h": 50
      },
      {
        "type": "rolling_ball",
        "x": 550,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.71356783919598,
        "triggerRange": 85
      },
      {
        "type": "static_spike",
        "x": 370,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 270,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 32
      }
    ]
  },
  {
    "id": 157,
    "chapter": "Twilight Distortion Void",
    "title": "Mind Eclipse",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 107
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 3.41
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 32
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 3.25
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 3.41
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 32
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 3.41
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "spinning_saw",
        "x": 560,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 530,
        "maxX": 590,
        "speed": 3.41
      },
      {
        "type": "piston_crusher",
        "x": 610,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 32
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.865929648241206,
        "triggerRange": 65
      },
      {
        "type": "dropping_spike",
        "x": 710,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      }
    ]
  },
  {
    "id": 158,
    "chapter": "Twilight Distortion Void",
    "title": "The Void Gauntlet",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 108
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.26
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.26
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.26
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.26
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.42
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "reversed_controls",
        "x": 330,
        "y": 280,
        "w": 170,
        "h": 60
      },
      {
        "type": "spinning_saw",
        "x": 510,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.42
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.875326633165829,
        "triggerRange": 60
      }
    ]
  },
  {
    "id": 159,
    "chapter": "Twilight Distortion Void",
    "title": "Twilight Horizon",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 108
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 32
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 32
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.27
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 32
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.746733668341709,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.27
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 32
      },
      {
        "type": "reversed_controls",
        "x": 380,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "spinning_saw",
        "x": 590,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 560,
        "maxX": 620,
        "speed": 3.43
      },
      {
        "type": "dropping_spike",
        "x": 600,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 600,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.27
      }
    ]
  },
  {
    "id": 160,
    "chapter": "Twilight Distortion Void",
    "title": "The Void Singularity",
    "theme": "twilight",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 108
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.757788944723618,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.28
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -4.894120603015075,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 3.44
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 32
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.28
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 550,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 200,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": 4.318341708542714,
        "triggerX": 360,
        "triggerRange": 60
      },
      {
        "type": "collapsing_floor",
        "x": 610,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.28
      },
      {
        "type": "static_spike",
        "x": 650,
        "y": 345,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 161,
    "chapter": "Volcanic Magma Core",
    "title": "Magma Lake",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 108
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.29
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 31
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 3.45
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.768844221105528,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 650,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.29
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 31
      },
      {
        "type": "collapsing_floor",
        "x": 350,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.29
      }
    ]
  },
  {
    "id": 162,
    "chapter": "Volcanic Magma Core",
    "title": "Volcanic Piston",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 108
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.29
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.46
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 31
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.779899497487437,
        "triggerRange": 85
      },
      {
        "type": "spinning_saw",
        "x": 480,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.46
      },
      {
        "type": "collapsing_floor",
        "x": 350,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.29
      },
      {
        "type": "static_spike",
        "x": 680,
        "y": 345,
        "w": 24,
        "h": 15
      }
    ]
  },
  {
    "id": 163,
    "chapter": "Volcanic Magma Core",
    "title": "The Lava Boulder",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 108
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.3
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 31
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 3.47
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.7909547738693465,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.3
      },
      {
        "type": "reversed_controls",
        "x": 290,
        "y": 310,
        "w": 90,
        "h": 45
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 31
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      }
    ]
  },
  {
    "id": 164,
    "chapter": "Volcanic Magma Core",
    "title": "Scorched Stepping Stones",
    "theme": "volcanic",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 109
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 31
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.31
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.221809045226131,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 3.47
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.802010050251257,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 760,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.31
      },
      {
        "type": "piston_crusher",
        "x": 670,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 31
      },
      {
        "type": "dropping_spike",
        "x": 840,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "reversed_controls",
        "x": 740,
        "y": 290,
        "w": 110,
        "h": 55
      }
    ]
  },
  {
    "id": 165,
    "chapter": "Volcanic Magma Core",
    "title": "The Magma Squeeze",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": 1,
      "shiftDistance": 109
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.32
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 31
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.813065326633166,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 3.48
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.32
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "reversed_controls",
        "x": 275,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "piston_crusher",
        "x": 495,
        "startY": 135,
        "targetY": 170,
        "w": 36,
        "h": 65,
        "triggerRange": 40,
        "pauseDuration": 31
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.32
      }
    ]
  },
  {
    "id": 166,
    "chapter": "Volcanic Magma Core",
    "title": "Rain of Fire",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": 1,
      "shiftDistance": 109
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.33
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 3.49
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.33
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 3.49
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      },
      {
        "type": "reversed_controls",
        "x": 205,
        "y": 150,
        "w": 70,
        "h": 50
      },
      {
        "type": "rolling_ball",
        "x": 550,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.824120603015076,
        "triggerRange": 85
      },
      {
        "type": "static_spike",
        "x": 370,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 270,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 31
      }
    ]
  },
  {
    "id": 167,
    "chapter": "Volcanic Magma Core",
    "title": "Eruption Inversion",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 109
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 3.5
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 31
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 3.33
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 3.5
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 31
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 3.5
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "spinning_saw",
        "x": 560,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 530,
        "maxX": 590,
        "speed": 3.5
      },
      {
        "type": "piston_crusher",
        "x": 610,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 31
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.959899497487437,
        "triggerRange": 65
      },
      {
        "type": "dropping_spike",
        "x": 710,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      }
    ]
  },
  {
    "id": 168,
    "chapter": "Volcanic Magma Core",
    "title": "The Molten Duct",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 109
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.34
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.34
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.34
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.34
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.51
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "reversed_controls",
        "x": 330,
        "y": 280,
        "w": 170,
        "h": 60
      },
      {
        "type": "spinning_saw",
        "x": 510,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.51
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -4.9692964824120605,
        "triggerRange": 60
      }
    ]
  },
  {
    "id": 169,
    "chapter": "Volcanic Magma Core",
    "title": "Buzzsaw Caldera",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 110
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 30
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 30
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.35
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 30
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.857286432160804,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.35
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 30
      },
      {
        "type": "reversed_controls",
        "x": 380,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "spinning_saw",
        "x": 590,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 560,
        "maxX": 620,
        "speed": 3.52
      },
      {
        "type": "dropping_spike",
        "x": 600,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 600,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.35
      }
    ]
  },
  {
    "id": 170,
    "chapter": "Volcanic Magma Core",
    "title": "The Lava Chute",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 110
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.868341708542713,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.36
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -4.988090452261306,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 3.53
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 30
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.36
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 550,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 200,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": 4.401256281407035,
        "triggerX": 360,
        "triggerRange": 60
      },
      {
        "type": "collapsing_floor",
        "x": 610,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.36
      },
      {
        "type": "static_spike",
        "x": 650,
        "y": 345,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 171,
    "chapter": "Volcanic Magma Core",
    "title": "Twin Magma Balls",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 110
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.37
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 30
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 3.54
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.8793969849246235,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 650,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.37
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 30
      },
      {
        "type": "collapsing_floor",
        "x": 350,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.37
      },
      {
        "type": "dropping_spike",
        "x": 600,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 172,
    "chapter": "Volcanic Magma Core",
    "title": "The Sinking Basalt",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 110
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.37
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.55
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 30
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.890452261306533,
        "triggerRange": 85
      },
      {
        "type": "spinning_saw",
        "x": 480,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.55
      },
      {
        "type": "collapsing_floor",
        "x": 350,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.37
      },
      {
        "type": "static_spike",
        "x": 680,
        "y": 345,
        "w": 24,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 520,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 173,
    "chapter": "Volcanic Magma Core",
    "title": "Volcanic Spire",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 110
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.38
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 30
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 3.56
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.901507537688442,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.38
      },
      {
        "type": "reversed_controls",
        "x": 290,
        "y": 310,
        "w": 90,
        "h": 45
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 30
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 620,
        "maxX": 680,
        "speed": 3.56
      }
    ]
  },
  {
    "id": 174,
    "chapter": "Volcanic Magma Core",
    "title": "The Ash Ambush",
    "theme": "volcanic",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 110
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 30
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.39
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.321306532663317,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 3.56
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.912562814070352,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 760,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.39
      },
      {
        "type": "piston_crusher",
        "x": 670,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 30
      },
      {
        "type": "dropping_spike",
        "x": 840,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "reversed_controls",
        "x": 740,
        "y": 290,
        "w": 110,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 220,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": 4.138793969849246,
        "triggerX": 450,
        "triggerRange": 60
      }
    ]
  },
  {
    "id": 175,
    "chapter": "Volcanic Magma Core",
    "title": "Pneumatic Eruption",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": 1,
      "shiftDistance": 111
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.4
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 30
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.923618090452262,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 3.57
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.4
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "reversed_controls",
        "x": 275,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "piston_crusher",
        "x": 495,
        "startY": 135,
        "targetY": 170,
        "w": 36,
        "h": 65,
        "triggerRange": 40,
        "pauseDuration": 30
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.4
      },
      {
        "type": "spinning_saw",
        "x": 200,
        "y": 295,
        "radius": 16,
        "patrolAxis": "y",
        "minY": 265,
        "maxY": 325,
        "speed": 3.57
      }
    ]
  },
  {
    "id": 176,
    "chapter": "Volcanic Magma Core",
    "title": "The Caldera Spring",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": 1,
      "shiftDistance": 111
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.41
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 3.58
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.41
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 3.58
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      },
      {
        "type": "reversed_controls",
        "x": 205,
        "y": 150,
        "w": 70,
        "h": 50
      },
      {
        "type": "rolling_ball",
        "x": 550,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.934673366834171,
        "triggerRange": 85
      },
      {
        "type": "static_spike",
        "x": 370,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 270,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 29
      },
      {
        "type": "collapsing_floor",
        "x": 430,
        "y": 200,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.41
      }
    ]
  },
  {
    "id": 177,
    "chapter": "Volcanic Magma Core",
    "title": "The Runaway Core",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 111
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 3.59
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 29
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 3.42
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 3.59
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 29
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 3.59
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "spinning_saw",
        "x": 560,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 530,
        "maxX": 590,
        "speed": 3.59
      },
      {
        "type": "piston_crusher",
        "x": 610,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 29
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.053869346733668,
        "triggerRange": 65
      },
      {
        "type": "dropping_spike",
        "x": 710,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 660,
        "y": 285,
        "radius": 16,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 315,
        "speed": 3.59
      }
    ]
  },
  {
    "id": 178,
    "chapter": "Volcanic Magma Core",
    "title": "Magma Chamber",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 111
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.42
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.42
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.42
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.42
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.6
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "reversed_controls",
        "x": 330,
        "y": 280,
        "w": 170,
        "h": 60
      },
      {
        "type": "spinning_saw",
        "x": 510,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.6
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.0632663316582915,
        "triggerRange": 60
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 190,
        "targetY": 250,
        "w": 36,
        "h": 80,
        "triggerRange": 45,
        "pauseDuration": 29
      }
    ]
  },
  {
    "id": 179,
    "chapter": "Volcanic Magma Core",
    "title": "The Inferno Trench",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 111
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 29
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 29
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.43
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 29
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.9678391959798995,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.43
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 29
      },
      {
        "type": "reversed_controls",
        "x": 380,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "spinning_saw",
        "x": 590,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 560,
        "maxX": 620,
        "speed": 3.61
      },
      {
        "type": "dropping_spike",
        "x": 600,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 600,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.43
      },
      {
        "type": "static_spike",
        "x": 480,
        "y": 345,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 180,
    "chapter": "Volcanic Magma Core",
    "title": "Volcano's Fury",
    "theme": "volcanic",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 111
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.978894472361809,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.44
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -5.082060301507537,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 3.62
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 29
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.44
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 550,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 200,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": 4.4841708542713565,
        "triggerX": 360,
        "triggerRange": 60
      },
      {
        "type": "collapsing_floor",
        "x": 610,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.44
      },
      {
        "type": "static_spike",
        "x": 650,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      }
    ]
  },
  {
    "id": 181,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "Dune of Deception",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 112
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.45
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 29
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 3.63
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.989949748743719,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 650,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.45
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 29
      },
      {
        "type": "collapsing_floor",
        "x": 350,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.45
      },
      {
        "type": "dropping_spike",
        "x": 600,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 182,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "Scorched Fangs",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 112
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.46
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.64
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 29
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -6.001005025125629,
        "triggerRange": 85
      },
      {
        "type": "spinning_saw",
        "x": 480,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.64
      },
      {
        "type": "collapsing_floor",
        "x": 350,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.46
      },
      {
        "type": "static_spike",
        "x": 680,
        "y": 345,
        "w": 24,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 520,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 183,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "The Quicksand Bridge",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 112
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.46
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 28
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 3.65
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -6.012060301507537,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.46
      },
      {
        "type": "reversed_controls",
        "x": 290,
        "y": 310,
        "w": 90,
        "h": 45
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 28
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 620,
        "maxX": 680,
        "speed": 3.65
      }
    ]
  },
  {
    "id": 184,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "The Sunken Obelisk",
    "theme": "desert",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 112
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 28
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.47
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.420804020100503,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 3.66
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -6.023115577889447,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 760,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.47
      },
      {
        "type": "piston_crusher",
        "x": 670,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 28
      },
      {
        "type": "dropping_spike",
        "x": 840,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "reversed_controls",
        "x": 740,
        "y": 290,
        "w": 110,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 220,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": 4.216180904522613,
        "triggerX": 450,
        "triggerRange": 60
      }
    ]
  },
  {
    "id": 185,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "Desert Crusher",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": 1,
      "shiftDistance": 112
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.48
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 28
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -6.034170854271357,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 3.66
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.48
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "reversed_controls",
        "x": 275,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "piston_crusher",
        "x": 495,
        "startY": 135,
        "targetY": 170,
        "w": 36,
        "h": 65,
        "triggerRange": 40,
        "pauseDuration": 28
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.48
      },
      {
        "type": "spinning_saw",
        "x": 200,
        "y": 295,
        "radius": 16,
        "patrolAxis": "y",
        "minY": 265,
        "maxY": 325,
        "speed": 3.66
      }
    ]
  },
  {
    "id": 186,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "The Rolling Monolith",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": 1,
      "shiftDistance": 113
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.49
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 3.67
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.49
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 3.67
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      },
      {
        "type": "reversed_controls",
        "x": 205,
        "y": 150,
        "w": 70,
        "h": 50
      },
      {
        "type": "rolling_ball",
        "x": 550,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -6.045226130653266,
        "triggerRange": 85
      },
      {
        "type": "static_spike",
        "x": 370,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 270,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 28
      },
      {
        "type": "collapsing_floor",
        "x": 430,
        "y": 200,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.49
      }
    ]
  },
  {
    "id": 187,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "Mirage Inversion",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 113
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 3.68
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 28
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 3.5
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 3.68
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 28
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 3.68
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "spinning_saw",
        "x": 560,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 530,
        "maxX": 590,
        "speed": 3.68
      },
      {
        "type": "piston_crusher",
        "x": 610,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 28
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.147839195979899,
        "triggerRange": 65
      },
      {
        "type": "dropping_spike",
        "x": 710,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 660,
        "y": 285,
        "radius": 16,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 315,
        "speed": 3.68
      }
    ]
  },
  {
    "id": 188,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "The Tomb Crawl",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 113
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.5
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.5
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.5
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.5
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.69
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "reversed_controls",
        "x": 330,
        "y": 280,
        "w": 170,
        "h": 60
      },
      {
        "type": "spinning_saw",
        "x": 510,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.69
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.157236180904523,
        "triggerRange": 60
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 190,
        "targetY": 250,
        "w": 36,
        "h": 80,
        "triggerRange": 45,
        "pauseDuration": 28
      }
    ]
  },
  {
    "id": 189,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "Sandstorm Saws",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 113
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 28
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 28
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.51
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 28
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -6.078391959798996,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.51
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 28
      },
      {
        "type": "reversed_controls",
        "x": 380,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "spinning_saw",
        "x": 590,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 560,
        "maxX": 620,
        "speed": 3.7
      },
      {
        "type": "dropping_spike",
        "x": 600,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 600,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.51
      },
      {
        "type": "static_spike",
        "x": 480,
        "y": 345,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 190,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "The Pharaonic Warp",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 113
    },
    "traps": [
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -6.089447236180905,
        "triggerRange": 95
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 420,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 490,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.52
      },
      {
        "type": "hidden_spike",
        "x": 590,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": -5.176030150753769,
        "triggerRange": 60
      },
      {
        "type": "spinning_saw",
        "x": 360,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 320,
        "maxX": 400,
        "speed": 3.71
      },
      {
        "type": "piston_crusher",
        "x": 490,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 27
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.52
      },
      {
        "type": "reversed_controls",
        "x": 460,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 550,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 200,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": 4.567085427135678,
        "triggerX": 360,
        "triggerRange": 60
      },
      {
        "type": "collapsing_floor",
        "x": 610,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.52
      },
      {
        "type": "static_spike",
        "x": 650,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      }
    ]
  },
  {
    "id": 191,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "Twin Sun Boulders",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 113
    },
    "traps": [
      {
        "type": "reversed_controls",
        "x": 340,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 410,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 530,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.53
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 620,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 560,
        "y": 290,
        "w": 100,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 260,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 27
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 610,
        "maxX": 690,
        "speed": 3.72
      },
      {
        "type": "rolling_ball",
        "x": 730,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -6.100502512562814,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 650,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.53
      },
      {
        "type": "static_spike",
        "x": 280,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 27
      },
      {
        "type": "collapsing_floor",
        "x": 350,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.53
      },
      {
        "type": "dropping_spike",
        "x": 600,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 192,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "The Collapsing Pyramid",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      },
      {
        "x": 110,
        "y": 150,
        "w": 50,
        "h": 80
      },
      {
        "x": 600,
        "y": 345,
        "w": 55,
        "h": 80
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 110,
        "h": 230
      },
      {
        "x": 110,
        "y": 0,
        "w": 50,
        "h": 150
      },
      {
        "x": 160,
        "y": 0,
        "w": 680,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 520,
        "h": 135
      },
      {
        "x": 655,
        "y": 345,
        "w": 105,
        "h": 135
      },
      {
        "x": 600,
        "y": 425,
        "w": 55,
        "h": 55
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 114
    },
    "traps": [
      {
        "type": "troll_portal",
        "x": 595,
        "y": 345,
        "w": 65,
        "h": 80,
        "exitX": 135,
        "exitY": 215,
        "exitVy": 3.8
      },
      {
        "type": "static_spike",
        "x": 250,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "collapsing_floor",
        "x": 440,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.54
      },
      {
        "type": "spinning_saw",
        "x": 330,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.73
      },
      {
        "type": "static_spike",
        "x": 500,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 480,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 27
      },
      {
        "type": "hidden_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "dropping_spike",
        "x": 190,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "reversed_controls",
        "x": 530,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -6.111557788944724,
        "triggerRange": 85
      },
      {
        "type": "spinning_saw",
        "x": 480,
        "y": 280,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 250,
        "maxY": 315,
        "speed": 3.73
      },
      {
        "type": "collapsing_floor",
        "x": 350,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.54
      },
      {
        "type": "static_spike",
        "x": 680,
        "y": 345,
        "w": 24,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 520,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      }
    ]
  },
  {
    "id": 193,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "The Desert Spire",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 150,
        "w": 200,
        "h": 195
      },
      {
        "x": 280,
        "y": 150,
        "w": 360,
        "h": 70
      },
      {
        "x": 280,
        "y": 260,
        "w": 360,
        "h": 85
      },
      {
        "x": 640,
        "y": 240,
        "w": 120,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 150
      },
      {
        "x": 0,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 760,
        "y": 150,
        "w": 80,
        "h": 330
      },
      {
        "x": 280,
        "y": 220,
        "w": 360,
        "h": 40
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 114
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 190,
        "y": 345,
        "w": 34,
        "h": 14,
        "boostVy": -11
      },
      {
        "type": "static_spike",
        "x": 380,
        "y": 220,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 320,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.54
      },
      {
        "type": "dropping_spike",
        "x": 480,
        "y": 150,
        "w": 22,
        "h": 22,
        "groundY": 220,
        "triggerRange": 40
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 27
      },
      {
        "type": "hidden_spike",
        "x": 550,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 520,
        "y": 195,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 470,
        "maxX": 570,
        "speed": 3.74
      },
      {
        "type": "rolling_ball",
        "x": 620,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -6.122613065326633,
        "triggerRange": 75
      },
      {
        "type": "dropping_spike",
        "x": 380,
        "y": 260,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 220,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.54
      },
      {
        "type": "reversed_controls",
        "x": 290,
        "y": 310,
        "w": 90,
        "h": 45
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 220,
        "targetY": 260,
        "w": 38,
        "h": 85,
        "triggerRange": 45,
        "pauseDuration": 27
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 650,
        "y": 315,
        "radius": 16,
        "patrolAxis": "x",
        "minX": 620,
        "maxX": 680,
        "speed": 3.74
      }
    ]
  },
  {
    "id": 194,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "Searing Stalactites",
    "theme": "desert",
    "bounds": {
      "width": 1040,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 880,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1040,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 960,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 880,
        "h": 135
      }
    ],
    "door": {
      "x": 910,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 114
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 230,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 320,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 27
      },
      {
        "type": "collapsing_floor",
        "x": 380,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.55
      },
      {
        "type": "rolling_ball",
        "x": 520,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -5.520301507537688,
        "triggerRange": 90
      },
      {
        "type": "reversed_controls",
        "x": 550,
        "y": 290,
        "w": 130,
        "h": 55
      },
      {
        "type": "static_spike",
        "x": 610,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "dropping_spike",
        "x": 720,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "spinning_saw",
        "x": 810,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 760,
        "maxX": 860,
        "speed": 3.75
      },
      {
        "type": "hidden_spike",
        "x": 870,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "rolling_ball",
        "x": 920,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -6.1336683417085425,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 760,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.55
      },
      {
        "type": "piston_crusher",
        "x": 670,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 48,
        "pauseDuration": 27
      },
      {
        "type": "dropping_spike",
        "x": 840,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "reversed_controls",
        "x": 740,
        "y": 290,
        "w": 110,
        "h": 55
      },
      {
        "type": "rolling_ball",
        "x": 220,
        "y": 345,
        "groundY": 345,
        "radius": 16,
        "vx": 4.29356783919598,
        "triggerX": 450,
        "triggerRange": 60
      }
    ]
  },
  {
    "id": 195,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "The Oasis Mirage",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 440,
      "y": 200,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 360,
        "y": 135,
        "w": 310,
        "h": 65
      },
      {
        "x": 590,
        "y": 200,
        "w": 80,
        "h": 145
      },
      {
        "x": 120,
        "y": 240,
        "w": 550,
        "h": 105
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 360,
        "h": 105
      },
      {
        "x": 180,
        "y": 200,
        "w": 410,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 120,
        "h": 240
      },
      {
        "x": 670,
        "y": 135,
        "w": 170,
        "h": 345
      },
      {
        "x": 120,
        "y": 345,
        "w": 550,
        "h": 135
      }
    ],
    "door": {
      "x": 155,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": 1,
      "shiftDistance": 114
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 380,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 260,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.56
      },
      {
        "type": "piston_crusher",
        "x": 310,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 27
      },
      {
        "type": "rolling_ball",
        "x": 650,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -6.1447236180904525,
        "triggerRange": 90
      },
      {
        "type": "dropping_spike",
        "x": 450,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "hidden_spike",
        "x": 520,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 380,
        "maxX": 460,
        "speed": 3.75
      },
      {
        "type": "collapsing_floor",
        "x": 550,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.56
      },
      {
        "type": "dropping_spike",
        "x": 610,
        "y": 200,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "static_spike",
        "x": 535,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "reversed_controls",
        "x": 275,
        "y": 290,
        "w": 90,
        "h": 55
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "piston_crusher",
        "x": 495,
        "startY": 135,
        "targetY": 170,
        "w": 36,
        "h": 65,
        "triggerRange": 40,
        "pauseDuration": 27
      },
      {
        "type": "collapsing_floor",
        "x": 420,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.56
      },
      {
        "type": "spinning_saw",
        "x": 200,
        "y": 295,
        "radius": 16,
        "patrolAxis": "y",
        "minY": 265,
        "maxY": 325,
        "speed": 3.75
      }
    ]
  },
  {
    "id": 196,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "The Tomb of Trials",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 130,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 110,
        "y": 240,
        "w": 570,
        "h": 105
      },
      {
        "x": 590,
        "y": 135,
        "w": 90,
        "h": 210
      },
      {
        "x": 140,
        "y": 135,
        "w": 470,
        "h": 65
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 135
      },
      {
        "x": 0,
        "y": 135,
        "w": 140,
        "h": 105
      },
      {
        "x": 140,
        "y": 200,
        "w": 450,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 110,
        "h": 240
      },
      {
        "x": 680,
        "y": 135,
        "w": 160,
        "h": 345
      },
      {
        "x": 110,
        "y": 345,
        "w": 570,
        "h": 135
      }
    ],
    "door": {
      "x": 175,
      "y": 154,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": 1,
      "shiftDistance": 114
    },
    "traps": [
      {
        "type": "spring_pad",
        "x": 620,
        "y": 345,
        "w": 36,
        "h": 14,
        "boostVy": -12
      },
      {
        "type": "static_spike",
        "x": 654,
        "y": 135,
        "w": 26,
        "h": 16,
        "isCeiling": true
      },
      {
        "type": "static_spike",
        "x": 360,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 300,
        "y": 200,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.57
      },
      {
        "type": "spinning_saw",
        "x": 420,
        "y": 170,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 360,
        "maxX": 480,
        "speed": 3.76
      },
      {
        "type": "dropping_spike",
        "x": 440,
        "y": 240,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 230,
        "y": 200,
        "w": 26,
        "h": 16,
        "triggerRange": 36
      },
      {
        "type": "collapsing_floor",
        "x": 480,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.57
      },
      {
        "type": "spinning_saw",
        "x": 260,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 200,
        "maxX": 320,
        "speed": 3.76
      },
      {
        "type": "dropping_spike",
        "x": 540,
        "y": 135,
        "w": 22,
        "h": 22,
        "groundY": 200,
        "triggerRange": 45
      },
      {
        "type": "reversed_controls",
        "x": 205,
        "y": 150,
        "w": 70,
        "h": 50
      },
      {
        "type": "rolling_ball",
        "x": 550,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -6.155778894472363,
        "triggerRange": 85
      },
      {
        "type": "static_spike",
        "x": 370,
        "y": 200,
        "w": 26,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 270,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 27
      },
      {
        "type": "collapsing_floor",
        "x": 430,
        "y": 200,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.57
      }
    ]
  },
  {
    "id": 197,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "The Squeezing Sarcophagus",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 130,
        "h": 115
      },
      {
        "x": 210,
        "y": 310,
        "w": 430,
        "h": 35
      },
      {
        "x": 640,
        "y": 230,
        "w": 120,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 210,
        "h": 230
      },
      {
        "x": 210,
        "y": 0,
        "w": 430,
        "h": 310
      },
      {
        "x": 640,
        "y": 0,
        "w": 200,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 700,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 114
    },
    "traps": [
      {
        "type": "spinning_saw",
        "x": 310,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 270,
        "maxX": 350,
        "speed": 3.77
      },
      {
        "type": "piston_crusher",
        "x": 370,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 26
      },
      {
        "type": "static_spike",
        "x": 670,
        "y": 345,
        "w": 26,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 645,
        "y": 345,
        "w": 40,
        "h": 35,
        "dropSpeed": 3.58
      },
      {
        "type": "spinning_saw",
        "x": 440,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 410,
        "maxX": 470,
        "speed": 3.77
      },
      {
        "type": "piston_crusher",
        "x": 500,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 26
      },
      {
        "type": "hidden_spike",
        "x": 660,
        "y": 345,
        "w": 24,
        "h": 15,
        "triggerRange": 36
      },
      {
        "type": "spinning_saw",
        "x": 195,
        "y": 275,
        "radius": 14,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 295,
        "speed": 3.77
      },
      {
        "type": "reversed_controls",
        "x": 240,
        "y": 310,
        "w": 60,
        "h": 35
      },
      {
        "type": "dropping_spike",
        "x": 685,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "spinning_saw",
        "x": 560,
        "y": 322,
        "radius": 12,
        "patrolAxis": "x",
        "minX": 530,
        "maxX": 590,
        "speed": 3.77
      },
      {
        "type": "piston_crusher",
        "x": 610,
        "startY": 260,
        "targetY": 310,
        "w": 36,
        "h": 80,
        "triggerRange": 50,
        "pauseDuration": 26
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.241809045226131,
        "triggerRange": 65
      },
      {
        "type": "dropping_spike",
        "x": 710,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 38
      },
      {
        "type": "spinning_saw",
        "x": 660,
        "y": 285,
        "radius": 16,
        "patrolAxis": "y",
        "minY": 255,
        "maxY": 315,
        "speed": 3.77
      }
    ]
  },
  {
    "id": 198,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "The Final Gauntlet",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 190,
        "w": 680,
        "h": 200
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 190
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 680,
        "y": 345,
        "w": 80,
        "h": 135
      },
      {
        "x": 160,
        "y": 440,
        "w": 520,
        "h": 40
      },
      {
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 95
      },
      {
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 110
      },
      {
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 95
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 115
    },
    "traps": [
      {
        "type": "static_spike",
        "x": 260,
        "y": 440,
        "w": 320,
        "h": 16
      },
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.58
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.58
      },
      {
        "type": "dropping_spike",
        "x": 330,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 330,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 330,
        "y": 330,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.58
      },
      {
        "type": "dropping_spike",
        "x": 570,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "collapsing_floor",
        "x": 570,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.58
      },
      {
        "type": "spinning_saw",
        "x": 390,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.78
      },
      {
        "type": "dropping_spike",
        "x": 210,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "hidden_spike",
        "x": 690,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 35
      },
      {
        "type": "reversed_controls",
        "x": 330,
        "y": 280,
        "w": 170,
        "h": 60
      },
      {
        "type": "spinning_saw",
        "x": 510,
        "y": 270,
        "radius": 18,
        "patrolAxis": "y",
        "minY": 240,
        "maxY": 300,
        "speed": 3.78
      },
      {
        "type": "dropping_spike",
        "x": 680,
        "y": 190,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "rolling_ball",
        "x": 745,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -5.251206030150754,
        "triggerRange": 60
      },
      {
        "type": "piston_crusher",
        "x": 450,
        "startY": 190,
        "targetY": 250,
        "w": 36,
        "h": 80,
        "triggerRange": 45,
        "pauseDuration": 26
      }
    ]
  },
  {
    "id": 199,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "The Devil's Gate",
    "theme": "desert",
    "bounds": {
      "width": 840,
      "height": 480
    },
    "playerSpawn": {
      "x": 110,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 230,
        "w": 680,
        "h": 115
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 840,
        "h": 230
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 760,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 680,
        "h": 135
      }
    ],
    "door": {
      "x": 710,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 115
    },
    "traps": [
      {
        "type": "piston_crusher",
        "x": 240,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 26
      },
      {
        "type": "piston_crusher",
        "x": 380,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 26
      },
      {
        "type": "static_spike",
        "x": 190,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "collapsing_floor",
        "x": 310,
        "y": 345,
        "w": 48,
        "h": 35,
        "dropSpeed": 3.59
      },
      {
        "type": "piston_crusher",
        "x": 520,
        "startY": 190,
        "targetY": 240,
        "w": 40,
        "h": 105,
        "triggerRange": 50,
        "pauseDuration": 26
      },
      {
        "type": "hidden_spike",
        "x": 450,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 460,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -6.188944723618091,
        "triggerRange": 80
      },
      {
        "type": "collapsing_floor",
        "x": 450,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.59
      },
      {
        "type": "piston_crusher",
        "x": 640,
        "startY": 190,
        "targetY": 240,
        "w": 38,
        "h": 105,
        "triggerRange": 45,
        "pauseDuration": 26
      },
      {
        "type": "reversed_controls",
        "x": 380,
        "y": 290,
        "w": 120,
        "h": 55
      },
      {
        "type": "spinning_saw",
        "x": 590,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 560,
        "maxX": 620,
        "speed": 3.79
      },
      {
        "type": "dropping_spike",
        "x": 600,
        "y": 230,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 40
      },
      {
        "type": "collapsing_floor",
        "x": 600,
        "y": 345,
        "w": 45,
        "h": 35,
        "dropSpeed": 3.59
      },
      {
        "type": "static_spike",
        "x": 480,
        "y": 345,
        "w": 26,
        "h": 15
      }
    ]
  },
  {
    "id": 200,
    "chapter": "The Devil's Scorched Ascendancy",
    "title": "The Devil's Ultimate Reckoning",
    "theme": "desert",
    "bounds": {
      "width": 1100,
      "height": 480
    },
    "playerSpawn": {
      "x": 120,
      "y": 345,
      "facing": 1
    },
    "pathwayCorridors": [
      {
        "x": 80,
        "y": 220,
        "w": 940,
        "h": 125
      }
    ],
    "solids": [
      {
        "x": 0,
        "y": 0,
        "w": 1100,
        "h": 220
      },
      {
        "x": 0,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 1020,
        "y": 0,
        "w": 80,
        "h": 480
      },
      {
        "x": 80,
        "y": 345,
        "w": 940,
        "h": 135
      }
    ],
    "door": {
      "x": 960,
      "y": 299,
      "w": 32,
      "h": 46,
      "open": true,
      "shiftsMax": 4,
      "shiftDirection": -1,
      "shiftDistance": 115
    },
    "traps": [
      {
        "type": "collapsing_floor",
        "x": 210,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.6
      },
      {
        "type": "collapsing_floor",
        "x": 265,
        "y": 345,
        "w": 50,
        "h": 35,
        "dropSpeed": 3.6
      },
      {
        "type": "static_spike",
        "x": 330,
        "y": 345,
        "w": 28,
        "h": 15
      },
      {
        "type": "piston_crusher",
        "x": 400,
        "startY": 180,
        "targetY": 235,
        "w": 42,
        "h": 110,
        "triggerRange": 55,
        "pauseDuration": 26
      },
      {
        "type": "reversed_controls",
        "x": 440,
        "y": 290,
        "w": 140,
        "h": 55
      },
      {
        "type": "piston_crusher",
        "x": 540,
        "startY": 180,
        "targetY": 235,
        "w": 42,
        "h": 110,
        "triggerRange": 55,
        "pauseDuration": 26
      },
      {
        "type": "rolling_ball",
        "x": 740,
        "y": 345,
        "groundY": 345,
        "radius": 18,
        "vx": -6.2,
        "triggerRange": 95
      },
      {
        "type": "dropping_spike",
        "x": 640,
        "y": 220,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "spinning_saw",
        "x": 770,
        "y": 315,
        "radius": 18,
        "patrolAxis": "x",
        "minX": 710,
        "maxX": 820,
        "speed": 3.8
      },
      {
        "type": "collapsing_floor",
        "x": 840,
        "y": 345,
        "w": 55,
        "h": 35,
        "dropSpeed": 3.6
      },
      {
        "type": "hidden_spike",
        "x": 910,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 40
      },
      {
        "type": "dropping_spike",
        "x": 880,
        "y": 220,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 45
      },
      {
        "type": "rolling_ball",
        "x": 940,
        "y": 345,
        "groundY": 345,
        "radius": 17,
        "vx": -6.324000000000001,
        "triggerRange": 90
      },
      {
        "type": "hidden_spike",
        "x": 470,
        "y": 345,
        "w": 26,
        "h": 16,
        "triggerRange": 38
      },
      {
        "type": "dropping_spike",
        "x": 500,
        "y": 220,
        "w": 22,
        "h": 22,
        "groundY": 345,
        "triggerRange": 42
      },
      {
        "type": "reversed_controls",
        "x": 800,
        "y": 290,
        "w": 120,
        "h": 55
      }
    ]
  }
];

/**
 * Dynamic Solid Floor Slicer:
 * Takes the continuous, unbroken solid floor and dynamically slices it ONLY
 * where an active VanishingFloorTrap or FallingPlatformTrap is present.
 * Everywhere else in the level is 100% guaranteed solid ground!
 */
function getActiveLevelSolids(level, activeTraps) {
    const isFallingPlatform = (t) => (typeof FallingPlatformTrap !== 'undefined' && t instanceof FallingPlatformTrap);
    const isVanishingTrap = (t) => (typeof VanishingFloorTrap !== 'undefined' && t instanceof VanishingFloorTrap);

    const floorTraps = (activeTraps || []).filter(t => isVanishingTrap(t) || isFallingPlatform(t));
    if (floorTraps.length === 0) {
        return [...level.solids];
    }

    const resolvedSolids = [];
    for (const solid of level.solids) {
        const cuttingTraps = floorTraps.filter(t => {
            const trapInitialY = t.initialY !== undefined ? t.initialY : t.y;
            const yMatches = Math.abs(trapInitialY - solid.y) <= 15;
            const xOverlaps = (t.x + t.w > solid.x) && (t.x < solid.x + solid.w);
            return yMatches && xOverlaps;
        });

        if (cuttingTraps.length === 0) {
            resolvedSolids.push(solid);
        } else {
            cuttingTraps.sort((a, b) => a.x - b.x);

            let curX = solid.x;
            for (const trap of cuttingTraps) {
                const trapLeft = Math.max(solid.x, trap.x);
                const trapRight = Math.min(solid.x + solid.w, trap.x + trap.w);

                if (trapLeft > curX) {
                    resolvedSolids.push({
                        x: curX,
                        y: solid.y,
                        w: trapLeft - curX,
                        h: solid.h
                    });
                }
                curX = Math.max(curX, trapRight);
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
