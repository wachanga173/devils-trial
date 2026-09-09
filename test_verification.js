// test_verification.js - Verify Level Generator Topologies, AI progressive scaling, and Python endpoints
const http = require('http');
const fs = require('fs');
const path = require('path');

// Mock browser globals for testing levelGenerator.js and ai.js
global.window = global;

require('./ai.js');
require('./levelGenerator.js');

console.log('=== 1. VERIFYING PROCEDURAL LEVEL TOPOLOGIES (LEVELS 5-15) ===');
const gen = new window.AILevelGenerator();
const ai = new window.DevilAI();

for (let lvl = 5; lvl <= 15; lvl++) {
    const level = gen.generateLevel(lvl, ai);
    const cSlots = level.candidateTrapSlots || [];
    const zones = { entry: 0, mid: 0, exit: 0, none: 0 };
    cSlots.forEach(s => {
        zones[s.zone || 'none'] = (zones[s.zone || 'none'] || 0) + 1;
    });

    const activeTraps = ai.selectAdaptiveTraps(cSlots, level.staticTraps, lvl);

    console.log(`Level ${lvl} (${level.title}):`);
    console.log(`  - Candidate Traps: ${cSlots.length} (Entry: ${zones.entry}, Mid: ${zones.mid}, Exit: ${zones.exit})`);
    console.log(`  - Active Traps Selected: ${activeTraps.length} (${activeTraps.map(t => t.type).join(', ')})`);

    if (cSlots.length < 8) {
        throw new Error(`Level ${lvl} has only ${cSlots.length} candidate slots, expected >= 8!`);
    }

    const expectedMin = lvl <= 7 ? 2 : 3;
    const expectedMax = lvl <= 7 ? 3 : 4;
    if (activeTraps.length < expectedMin || activeTraps.length > expectedMax) {
        throw new Error(`Level ${lvl} has ${activeTraps.length} active traps, expected between ${expectedMin} and ${expectedMax}!`);
    }

    // Verify mathematical solvability guarantee
    const solvable = ai.verifyLevelSolvability(level, activeTraps);
    if (!solvable) {
        throw new Error(`Level ${lvl} failed solvability check!`);
    }
}
console.log('✔ All generated levels verified: candidate slots >= 8, focused 2-4 trap budget, and 100% mathematically solvable!\n');

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
        if (!predictRes.data.selectedTraps || predictRes.data.selectedTraps.length < 2 || predictRes.data.selectedTraps.length > 3) {
            throw new Error(`Predict returned ${predictRes.data.selectedTraps?.length} traps for Level 6, expected 2-3!`);
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
