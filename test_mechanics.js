// test_mechanics.js - Verification of Random 2D Razors & Multi-Directional Ground Traps
const fs = require('fs');

global.window = global;
global.soundFX = {
    playSawBuzz: () => {},
    playCrumble: () => {},
    playJump: () => {},
    playTrapTrigger: () => {}
};

require('./levels.js');
require('./traps.js');
require('./physics.js');

console.log('=== TEST 1: SpinningSawbladeTrap Unpredictable 2D Movement ===');
const saw = new window.SpinningSawbladeTrap({
    x: 400,
    y: 300,
    radius: 18,
    speed: 2.5
});

console.log(`Initial Saw Pos: (${saw.x}, ${saw.y}), MinX: ${saw.minX}, MaxX: ${saw.maxX}, MinY: ${saw.minY}, MaxY: ${saw.maxY}`);
if (saw.minX >= saw.maxX || saw.minY >= saw.maxY) {
    throw new Error('Saw bounds are invalid!');
}

let movedX = false;
let movedY = false;
const positions = [];
for (let frame = 0; frame < 120; frame++) {
    saw.update({ x: 100, y: 100, width: 12, height: 24 }, { particles: [] });
    positions.push({ x: saw.x, y: saw.y });
    if (Math.abs(saw.x - 400) > 2) movedX = true;
    if (Math.abs(saw.y - 300) > 1) movedY = true;
}

if (!movedX || !movedY) {
    throw new Error(`Saw did not move in both X and Y! movedX: ${movedX}, movedY: ${movedY}`);
}
console.log(`✔ Saw wandered dynamically in 2D space: X span [${Math.min(...positions.map(p=>p.x)).toFixed(1)}, ${Math.max(...positions.map(p=>p.x)).toFixed(1)}], Y span [${Math.min(...positions.map(p=>p.y)).toFixed(1)}, ${Math.max(...positions.map(p=>p.y)).toFixed(1)}]`);

// Proximity check
const farRot = saw.rotSpeed;
saw.update({ x: saw.x + 50, y: saw.y + 20, width: 12, height: 24 }, { particles: [] });
if (saw.rotSpeed <= farRot) {
    throw new Error('Saw did not accelerate rotation upon player proximity!');
}
console.log(`✔ Saw accelerates rotation upon player proximity (${farRot.toFixed(2)} -> ${saw.rotSpeed.toFixed(2)})`);

console.log('\n=== TEST 2: Multi-Directional Ground Trap (All Directions) ===');

// 2a. Shifting ground: RIGHT
const groundRight = new window.VanishingFloorTrap({
    x: 300,
    y: 345,
    w: 50,
    h: 35,
    direction: 'right',
    speed: 3.0,
    shiftDistance: 60
});

const playerOnRight = { x: 320, y: 345, width: 12, height: 24, onGround: true, isJumping: false };
groundRight.update(playerOnRight, null); // triggers step
const startX = groundRight.x;
for (let f = 0; f < 10; f++) {
    groundRight.update(playerOnRight, null);
}
if (groundRight.x <= startX) {
    throw new Error('Ground right did not move right!');
}
if (playerOnRight.x <= 320) {
    throw new Error('Player was not carried right by shifting ground!');
}
console.log(`✔ Ground right moved right to x=${groundRight.x.toFixed(1)}, carried player to x=${playerOnRight.x.toFixed(1)}`);

// 2b. Shifting ground: LEFT
const groundLeft = new window.VanishingFloorTrap({
    x: 300,
    y: 345,
    w: 50,
    h: 35,
    direction: 'left',
    speed: 3.0,
    shiftDistance: 60
});
const playerOnLeft = { x: 320, y: 345, width: 12, height: 24, onGround: true, isJumping: false };
groundLeft.update(playerOnLeft, null);
for (let f = 0; f < 10; f++) {
    groundLeft.update(playerOnLeft, null);
}
if (groundLeft.x >= 300) {
    throw new Error('Ground left did not move left!');
}
if (playerOnLeft.x >= 320) {
    throw new Error('Player was not carried left by shifting ground!');
}
console.log(`✔ Ground left moved left to x=${groundLeft.x.toFixed(1)}, carried player to x=${playerOnLeft.x.toFixed(1)}`);

// 2c. Shifting ground: UP
const groundUp = new window.VanishingFloorTrap({
    x: 300,
    y: 345,
    w: 50,
    h: 35,
    direction: 'up',
    speed: 2.0,
    shiftDistance: 50
});
const playerOnUp = { x: 320, y: 345, width: 12, height: 24, onGround: true, isJumping: false, vy: 0 };
groundUp.update(playerOnUp, null);
for (let f = 0; f < 10; f++) {
    groundUp.update(playerOnUp, null);
}
if (groundUp.y >= 345) {
    throw new Error('Ground up did not move up!');
}
if (playerOnUp.y >= 345) {
    throw new Error('Player was not lifted up by rising ground!');
}
console.log(`✔ Ground up moved up to y=${groundUp.y.toFixed(1)}, lifted player to y=${playerOnUp.y.toFixed(1)}`);

// 2d. Shifting ground: SHIFT_AWAY
const groundAway = new window.VanishingFloorTrap({
    x: 300,
    y: 345,
    w: 50,
    h: 35,
    direction: 'shift_away',
    speed: 3.5,
    shiftDistance: 50
});
const playerOnAway = { x: 310, y: 345, width: 12, height: 24, onGround: true, isJumping: false };
groundAway.update(playerOnAway, null);
for (let f = 0; f < 10; f++) {
    groundAway.update(playerOnAway, null);
}
if (groundAway.x === 300) {
    throw new Error('Ground shift_away did not shift away!');
}
console.log(`✔ Ground shift_away shifted to x=${groundAway.x.toFixed(1)}`);

// 2e. Collapsing ground: DOWN
const groundDown = new window.VanishingFloorTrap({
    x: 300,
    y: 345,
    w: 50,
    h: 35,
    direction: 'down',
    dropSpeed: 4.8
});
const playerOnDown = { x: 320, y: 345, width: 12, height: 24, onGround: true, isJumping: false };
groundDown.update(playerOnDown, null);
for (let f = 0; f < 10; f++) {
    groundDown.update(playerOnDown, null);
}
if (groundDown.y <= 345 || groundDown.isSolid) {
    throw new Error('Ground down did not drop or is still solid!');
}
console.log(`✔ Ground down dropped to y=${groundDown.y.toFixed(1)}, isSolid=${groundDown.isSolid}`);

console.log('\n=== TEST 3: Physics SolidBox Integration ===');
const phys = new window.Physics();
const activeBox = groundRight.getSolidBox();
if (!activeBox || typeof activeBox.x !== 'number') {
    throw new Error('getSolidBox() did not return valid solid box!');
}
console.log(`✔ getSolidBox() verified:`, activeBox);

console.log('\n🎉 ALL MECHANICS TESTS PASSED! 🎉');
