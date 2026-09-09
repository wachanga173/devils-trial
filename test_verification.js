// test_verification.js - Verify Generative AI Trap Synthesis, Topologies, Profile Leans & Python Endpoints
const http = require('http');
const fs = require('fs');
const path = require('path');

// Mock browser globals for testing levelGenerator.js and ai.js
global.window = global;

require('./ai.js');
require('./levelGenerator.js');

console.log('=== 1. VERIFYING PROCEDURAL LEVEL TOPOLOGIES & GENERATIVE TRAP SYNTHESIS (LEVELS 5-25) ===');
const gen = new window.AILevelGenerator();
const ai = new window.DevilAI();

function getExpectedTrapBudget(lvl) {
    if (lvl <= 2) return 2;
    if (lvl <= 4) return 3;
    if (lvl <= 6) return 4;
    if (lvl <= 9) return 5;
    if (lvl <= 12) return 6;
    if (lvl <= 16) return 7;
    return Math.min(10, 7 + Math.floor((lvl - 16) / 4));
}

let totalAIGeneratedTrapsFound = 0;
let totalLivingBlocksFound = 0;
let totalDoorDefensesFound = 0;

for (let lvl = 5; lvl <= 25; lvl++) {
    const level = gen.generateLevel(lvl, ai);
    const cSlots = level.candidateTrapSlots || [];
    const zones = { entry: 0, mid: 0, exit: 0, none: 0 };
    cSlots.forEach(s => {
        zones[s.zone || 'none'] = (zones[s.zone || 'none'] || 0) + 1;
    });

    const aiGenSlots = cSlots.filter(s => s.isAIGenerated);
    totalAIGeneratedTrapsFound += aiGenSlots.length;
    const livingBlocks = aiGenSlots.filter(s => ['wall_ejector', 'ceiling_squish', 'shifting_block'].includes(s.type));
    totalLivingBlocksFound += livingBlocks.length;
    const doorDefenses = aiGenSlots.filter(s => s.zone === 'exit' || ['door_blocker', 'door_sinkhole', 'door_anti_air', 'door_loop_portal'].includes(s.purpose));
    totalDoorDefensesFound += doorDefenses.length;

    const activeTraps = ai.selectAdaptiveTraps(cSlots, level.staticTraps, lvl, level);
    const maxBudget = getExpectedTrapBudget(lvl);

    console.log(`Level ${lvl} (${level.title}, Gimmick: ${gen.getLevelGimmick(lvl)?.name || 'None'}):`);
    console.log(`  - Candidate Traps: ${cSlots.length} (Entry: ${zones.entry}, Mid: ${zones.mid}, Exit: ${zones.exit}, AI-Gen: ${aiGenSlots.length})`);
    console.log(`  - Living Blocks Synthesized: ${livingBlocks.length} (${livingBlocks.map(t => t.type).join(', ') || 'none'})`);
    console.log(`  - Door Perimeter Defenses: ${doorDefenses.length} (${doorDefenses.map(t => t.purpose).join(', ') || 'none'})`);
    console.log(`  - Active Traps Selected: ${activeTraps.length}/${maxBudget} (${activeTraps.map(t => t.type).join(', ')})`);

    if (cSlots.length < 8) {
        throw new Error(`Level ${lvl} has only ${cSlots.length} candidate slots, expected >= 8!`);
    }

    if (aiGenSlots.length === 0) {
        throw new Error(`Level ${lvl} has NO generative AI traps synthesized in candidate slots!`);
    }

    // Active traps should match or be close to budget (may be slightly less if anti-checkmate pruned unsafe slots)
    if (activeTraps.length < Math.max(2, maxBudget - 2) || activeTraps.length > maxBudget) {
        throw new Error(`Level ${lvl} has ${activeTraps.length} active traps, expected between ${maxBudget - 2} and ${maxBudget}!`);
    }

    // Check 1: Vertical Spire must ALWAYS have moving_platform in staticTraps (infrastructure guarantee)
    if (level.topology === 'VERTICAL_SPIRE') {
        const hasElevator = (level.staticTraps || []).some(t => t.type === 'moving_platform' && t.isInfrastructure);
        if (!hasElevator) {
            throw new Error(`Level ${lvl} is VERTICAL_SPIRE but has no infrastructure moving_platform in staticTraps!`);
        }
    }

    // Check 2: Verify combo atomicity (if any combo members were selected, all or none must be selected)
    const selectedComboIds = {};
    activeTraps.forEach(t => {
        if (t.comboId) selectedComboIds[t.comboId] = (selectedComboIds[t.comboId] || 0) + 1;
    });
    for (const [cid, count] of Object.entries(selectedComboIds)) {
        const totalInCandidates = cSlots.filter(s => s.comboId === cid).length;
        if (count !== totalInCandidates) {
            throw new Error(`Level ${lvl} broken combo ${cid}: ${count} selected out of ${totalInCandidates}!`);
        }
    }

    // Check 3: Verify mathematical solvability guarantee
    const solvable = ai.verifyLevelSolvability(level, activeTraps);
    if (!solvable) {
        throw new Error(`Level ${lvl} failed solvability check!`);
    }
}
console.log(`✔ All generated levels verified: ${totalAIGeneratedTrapsFound} AI-gen traps, ${totalLivingBlocksFound} living blocks, ${totalDoorDefensesFound} door defenses, 100% mathematically solvable!\n`);

// Verify Difficulty Scaling curve
console.log('=== 1B. VERIFYING DIFFICULTY SCALING CURVE ===');
const d1 = gen.getDifficultyMultiplier(1);
const d5 = gen.getDifficultyMultiplier(5);
const d10 = gen.getDifficultyMultiplier(10);
const d20 = gen.getDifficultyMultiplier(20);
const d50 = gen.getDifficultyMultiplier(50);
console.log(`Difficulty scaling: L1=${d1}, L5=${d5}, L10=${d10}, L20=${d20}, L50=${d50}`);
if (d10 <= 2.0 || d20 <= 3.0 || d50 <= 4.0) {
    throw new Error(`Difficulty scaling too low: L10=${d10}, L20=${d20}, L50=${d50}`);
}
console.log('✔ Difficulty scaling verified: continuous unbounded logarithmic growth!\n');

// Verify Telemetry-Driven Behavioral Leaning
console.log('=== 1C. VERIFYING GENERATIVE COUNTER-LEANS ACROSS PLAYER PROFILES ===');
const sampleLevelDef = {
    width: 900,
    height: 500,
    spawn: { x: 80, y: 345 },
    door: { x: 750, y: 340, w: 34, h: 46 },
    solids: [
        { x: 300, y: 200, w: 25, h: 100 }, // vertical wall for living block conversion
        { x: 0, y: 400, w: 900, h: 100 }
    ],
    pathwayCorridors: [
        { x: 180, y: 220, w: 220, h: 120 } // corridor for living ceiling & shifting floor
    ],
    staticTraps: []
};

// Profile 1: Rusher
const rusherAI = new window.DevilAI();
rusherAI.telemetry = {
    totalFrames: 600,
    movingFrames: 580,
    idleFrames: 20,
    rushDistance: 4800,
    jumpCount: 5,
    deaths: []
};
const rusherTraps = rusherAI.synthesizeGenerativeTraps(sampleLevelDef, 6);
const hasRushCounter = rusherTraps.some(t => t.purpose === 'rush_counter_wall' || t.purpose === 'rush_counter_boulder');
console.log(`RUSHER Profile (${rusherAI.currentProfile}): Synthesized ${rusherTraps.length} traps, counter-lean present: ${hasRushCounter}`);
if (!hasRushCounter) throw new Error('RUSHER profile failed to synthesize rush counter hazard!');

// Profile 2: Hopper
const hopperAI = new window.DevilAI();
hopperAI.telemetry = {
    totalFrames: 600,
    movingFrames: 300,
    idleFrames: 100,
    rushDistance: 800,
    jumpCount: 45,
    deaths: []
};
const hopperTraps = hopperAI.synthesizeGenerativeTraps(sampleLevelDef, 6);
const hasHopperCounter = hopperTraps.some(t => t.purpose === 'hopper_anti_air' || t.purpose === 'hopper_landing_spike');
console.log(`HOPPER Profile (${hopperAI.currentProfile}): Synthesized ${hopperTraps.length} traps, counter-lean present: ${hasHopperCounter}`);
if (!hasHopperCounter) throw new Error('HOPPER profile failed to synthesize anti-air / landing counter hazard!');

// Profile 3: Cautious / Camper
const cautiousAI = new window.DevilAI();
cautiousAI.telemetry = {
    totalFrames: 1200,
    movingFrames: 200,
    idleFrames: 1000,
    rushDistance: 300,
    jumpCount: 3,
    deaths: []
};
const cautiousTraps = cautiousAI.synthesizeGenerativeTraps(sampleLevelDef, 6);
const hasCamperCounter = cautiousTraps.some(t => t.purpose === 'camper_flusher_boulder');
console.log(`CAUTIOUS Profile (${cautiousAI.currentProfile}): Synthesized ${cautiousTraps.length} traps, counter-lean present: ${hasCamperCounter}`);
if (!hasCamperCounter) throw new Error('CAUTIOUS profile failed to synthesize camper flusher boulder!');

// Profile 4: Death Counter Reinforcement
const deathAI = new window.DevilAI();
deathAI.telemetry = {
    totalFrames: 300,
    movingFrames: 150,
    idleFrames: 50,
    rushDistance: 500,
    jumpCount: 4,
    deaths: [{ x: 420, y: 345, reason: 'spike' }]
};
const deathTraps = deathAI.synthesizeGenerativeTraps(sampleLevelDef, 6);
const hasDeathCounter = deathTraps.some(t => t.purpose === 'death_counter_trap');
console.log(`Death Reinforcement: Synthesized ${deathTraps.length} traps, death counter present: ${hasDeathCounter}`);
if (!hasDeathCounter) throw new Error('Failed to synthesize secondary ambush for past-death coordinates!');

console.log('✔ Generative counter-leans verified for all behavioral profiles!\n');

console.log('=== 2. VERIFYING SERVER AI ENDPOINTS (PORT 3333) ===');

function makeRequest(path, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3333,
            path: path,
            method: method,
            headers: { 'Content-Type': 'application/json' }
        };
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(body) });
                } catch (e) {
                    resolve({ status: res.statusCode, raw: body });
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

(async () => {
    try {
        // Test /api/ai-status
        const statusRes = await makeRequest('/api/ai-status');
        console.log('Status Endpoint Response:', statusRes);
        if (!statusRes.data.available) throw new Error('AI status endpoint returned available=false');

        // Test /api/ai-predict with Generative Level Geometry
        const dummyLevel = gen.generateLevel(6, ai);
        const predictRes = await makeRequest('/api/ai-predict', 'POST', {
            levelId: 6,
            candidateSlots: dummyLevel.candidateTrapSlots,
            staticTraps: dummyLevel.staticTraps,
            levelData: {
                width: dummyLevel.bounds.width,
                height: dummyLevel.bounds.height,
                spawn: dummyLevel.playerSpawn,
                door: dummyLevel.door,
                solids: dummyLevel.solids,
                pathwayCorridors: dummyLevel.pathwayCorridors,
                staticTraps: dummyLevel.staticTraps
            },
            telemetry: {
                totalFrames: 600,
                movingFrames: 550,
                idleFrames: 50,
                jumpCount: 8,
                rushDistance: 4500,
                deaths: []
            }
        });
        console.log('Predict Endpoint Response (Level 6):', {
            success: predictRes.data.success,
            selectedTrapsCount: predictRes.data.selectedTraps?.length,
            traps: predictRes.data.selectedTraps?.map(t => t.type),
            classification: predictRes.data.classification
        });
        if (!predictRes.data.selectedTraps || predictRes.data.selectedTraps.length < 3 || predictRes.data.selectedTraps.length > 4) {
            throw new Error(`Predict returned ${predictRes.data.selectedTraps?.length} traps for Level 6, expected 3-4!`);
        }

        // Test /api/ai-learn (death)
        const learnRes = await makeRequest('/api/ai-learn', 'POST', {
            type: 'death',
            event: {
                levelId: 6,
                reason: 'pop_up_wall',
                fatal_trap: 'pop_up_wall',
                telemetry: { totalFrames: 600, rushDistance: 4500 }
            }
        });
        console.log('Learn Endpoint Response:', learnRes);

        console.log('\n✔ ALL AUTOMATED VERIFICATION TESTS PASSED PERFECTLY!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Verification failed:', err);
        process.exit(1);
    }
})();
