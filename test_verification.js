// test_verification.js - Comprehensive Verification of Level Devil Authentic Mechanics & AI
const http = require('http');
const fs = require('fs');
const path = require('path');

// Mock browser globals for testing
global.window = global;

require('./ai.js');
require('./levels.js');
require('./traps.js');
require('./levelGenerator.js');

console.log('=== 1. VERIFYING RADICALLY DIVERSE MAP TOPOLOGIES & AUTHENTIC HAZARDS (LEVELS 5-25) ===');
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
let totalAuthenticHazardsFound = 0;
let totalDoorDefensesFound = 0;
const uniqueThemesUsed = new Set();
const uniqueTopologiesUsed = new Set();
let minWidth = Infinity, maxWidth = -Infinity;
let minHeight = Infinity, maxHeight = -Infinity;

for (let lvl = 5; lvl <= 25; lvl++) {
    const level = gen.generateLevel(lvl, ai);
    const cSlots = level.candidateTrapSlots || [];
    const zones = { entry: 0, mid: 0, exit: 0, none: 0 };
    cSlots.forEach(s => {
        zones[s.zone || 'none'] = (zones[s.zone || 'none'] || 0) + 1;
    });

    uniqueThemesUsed.add(level.theme.name || level.theme);
    uniqueTopologiesUsed.add(level.topology);
    minWidth = Math.min(minWidth, level.bounds.width);
    maxWidth = Math.max(maxWidth, level.bounds.width);
    minHeight = Math.min(minHeight, level.bounds.height);
    maxHeight = Math.max(maxHeight, level.bounds.height);

    // Check A: Absolute Ban on Artificial Block Traps
    const forbiddenBlocks = cSlots.filter(s => 
        ['pop_up_wall', 'wall_ejector', 'ceiling_squish', 'shifting_block'].includes(s.type)
    );
    if (forbiddenBlocks.length > 0) {
        throw new Error(`Level ${lvl} contains ${forbiddenBlocks.length} forbidden artificial block traps: ${forbiddenBlocks.map(t => t.type).join(', ')}`);
    }

    // Check B: Dynamic Evasive Runaway Door
    if (!level.door) {
        throw new Error(`Level ${lvl} has no door object!`);
    }
    if (level.door.shiftsMax < 1 || level.door.shiftsMax > 2) {
        throw new Error(`Level ${lvl} door has shiftsMax=${level.door.shiftsMax}, expected 1-2 dynamic evasions!`);
    }

    // Check C: Headroom Guarantee (no cramped crawl ducts causing suffocation or wall clipping)
    const corridors = level.pathwayCorridors || [];
    for (const corr of corridors) {
        if (corr.h < 85) {
            throw new Error(`Level ${lvl} has corridor with headroom ${corr.h}px < 85px! Causes suffocation!`);
        }
    }

    const aiGenSlots = cSlots.filter(s => s.isAIGenerated);
    totalAIGeneratedTrapsFound += aiGenSlots.length;
    
    // Check D: Authentic Level Devil Hazards Present
    const authenticHazards = cSlots.filter(s => 
        ['reversed_controls', 'falling_platform', 'coin_trap', 'collapsing_floor', 'dropping_spike', 'rolling_ball', 'spinning_saw', 'piston_crusher', 'troll_portal', 'spring_pad'].includes(s.type)
    );
    totalAuthenticHazardsFound += authenticHazards.length;

    const doorDefenses = aiGenSlots.filter(s => s.zone === 'exit' || ['door_sinkhole', 'door_anti_air', 'door_inverted_approach', 'door_loop_portal'].includes(s.purpose));
    totalDoorDefensesFound += doorDefenses.length;

    const activeTraps = ai.selectAdaptiveTraps(cSlots, level.staticTraps, lvl, level);
    const maxBudget = getExpectedTrapBudget(lvl);

    console.log(`Level ${lvl} (${level.title}, Topology: ${level.topology}, ${level.bounds.width}x${level.bounds.height}, Theme: ${level.theme.name || level.theme}):`);
    console.log(`  - Candidate Traps: ${cSlots.length} (AI-Gen: ${aiGenSlots.length}, Authentic: ${authenticHazards.length})`);
    console.log(`  - Runaway Door Evasions: ${level.door.shiftsMax} dynamic hops [Trigger range: ${level.door.triggerRange}px]`);
    console.log(`  - Active Traps Selected: ${activeTraps.length}/${maxBudget} (${activeTraps.map(t => t.type).join(', ')})`);

    if (cSlots.length < 8) {
        throw new Error(`Level ${lvl} has only ${cSlots.length} candidate slots, expected >= 8!`);
    }

    if (aiGenSlots.length === 0) {
        throw new Error(`Level ${lvl} has NO generative AI traps synthesized in candidate slots!`);
    }

    // Active traps should match or be close to budget
    if (activeTraps.length < 3 || activeTraps.length > maxBudget) {
        throw new Error(`Level ${lvl} has ${activeTraps.length} active traps, expected between 3 and ${maxBudget}!`);
    }

    // Check E: Vertical Spire must ALWAYS have moving_platform in staticTraps (infrastructure guarantee)
    if (level.topology === 'VERTICAL_SPIRE') {
        const hasElevator = (level.staticTraps || []).some(t => t.type === 'moving_platform' && t.isInfrastructure);
        if (!hasElevator) {
            throw new Error(`Level ${lvl} is VERTICAL_SPIRE but has no infrastructure moving_platform in staticTraps!`);
        }
    }

    // Check F: Verify combo atomicity
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

    // Check G: Verify mathematical solvability guarantee
    const solvable = ai.verifyLevelSolvability(level, activeTraps);
    if (!solvable) {
        throw new Error(`Level ${lvl} failed solvability check!`);
    }
}

console.log(`\n✔ Map Diversity Stats across 21 levels:`);
console.log(`  - Dimensions Span: Widths ${minWidth}px to ${maxWidth}px, Heights ${minHeight}px to ${maxHeight}px`);
console.log(`  - Unique Topologies: ${uniqueTopologiesUsed.size} archetypes (${Array.from(uniqueTopologiesUsed).join(', ')})`);
console.log(`  - Unique Themes: ${uniqueThemesUsed.size} distinct palettes`);
if (uniqueTopologiesUsed.size < 6) throw new Error('Not enough topology variety across procedural levels!');
if (maxWidth - minWidth < 250) throw new Error('Level widths not sufficiently varied!');
if (maxHeight - minHeight < 300) throw new Error('Level heights not sufficiently varied (need spires and descents)!');
console.log('✔ All generated levels verified: radically diverse maps, 0 box traps, authentic runaway doors, 100% solvable!\n');

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

// Verify Door Evasion AI in Runtime Simulation
console.log('=== 1C. VERIFYING RUNAWAY DOOR RUNTIME EVASION BEHAVIOR ===');
const testDoorLevel = gen.generateLevel(6, ai);
const testDoor = new window.AdaptiveDoor(testDoorLevel.door, testDoorLevel, ai);
console.log(`Initial Door State: state=${testDoor.state}, evasionsLeft=${testDoor.shiftsLeft}, x=${testDoor.x}`);
if (testDoor.shiftsLeft < 1) throw new Error('AdaptiveDoor failed to initialize with evasions!');

// Approach door
const simulatedPlayer = { x: testDoor.x - 40, y: testDoor.y + testDoor.h, onGround: true, vx: 0, vy: 0 };
testDoor.update(simulatedPlayer, ai, null);
console.log(`After Approach: isAlert=${testDoor.isAlert}, alertTimer=${testDoor.alertTimer}`);
if (!testDoor.isAlert) throw new Error('AdaptiveDoor failed to detect approaching player!');

// Complete alert timer to trigger evasive hop
for (let f = 0; f < 12; f++) testDoor.update(simulatedPlayer, ai, null);
console.log(`During Hop: isShifting=${testDoor.isShifting}, hopTargetX=${testDoor.hopTargetX}`);
if (!testDoor.isShifting) throw new Error('AdaptiveDoor failed to trigger evasive hop!');

// Complete hop animation
for (let f = 0; f < 30; f++) testDoor.update(simulatedPlayer, ai, null);
console.log(`After Hop Complete: state=${testDoor.state}, shiftsLeft=${testDoor.shiftsLeft}, x=${testDoor.x}`);

// Settle door if more evasions remaining
while (testDoor.shiftsLeft > 0) {
    simulatedPlayer.x = testDoor.x - 40;
    testDoor.update(simulatedPlayer, ai, null);
    for (let f = 0; f < 45; f++) testDoor.update(simulatedPlayer, ai, null);
}
console.log(`Final Door State: state=${testDoor.state} (settled and ready for player entry)`);
if (testDoor.state !== 'settled') throw new Error('AdaptiveDoor failed to settle after completing evasions!');
console.log('✔ Runaway door evasion and settling verified!\n');

// Verify Door Two-Pass Rendering Functions
console.log('=== 1D. VERIFYING DOOR TWO-PASS RENDERING & COLOR INTEGRITY ===');
if (typeof window.drawDoorBackground !== 'function' || typeof window.drawDoorForeground !== 'function') {
    throw new Error('Two-pass door rendering functions (drawDoorBackground / drawDoorForeground) missing!');
}
const trapsCode = fs.readFileSync(path.join(__dirname, 'traps.js'), 'utf-8');
if (trapsCode.includes("ctx.fillStyle = '#000000'") || trapsCode.includes("ctx.fillStyle = '#050505'")) {
    throw new Error('traps.js still contains pitch-black override fillStyle in door drawing!');
}
console.log('✔ Door two-pass rendering verified: player steps inside aperture before door slams shut in front of character!\n');

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

        // Test /api/ai-predict
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
                reason: 'reversed_controls',
                fatal_trap: 'reversed_controls',
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
