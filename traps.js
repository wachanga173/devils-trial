// traps.js - Seamless Devil's Trial Traps: Adaptive Shifting Door, Natural Crushers, Rolling Boulders, Emerging Spikes

/**
 * Canonical Surface Finder: computes the exact pixel-perfect floor and ceiling surface
 * at any coordinate x across all 8 architectural topologies (steps, tiers, islands, high roads).
 */
function getSurfaceAt(level, x, preferredY = null) {
    if (!level) return { floorY: 345, ceilY: 220, headroom: 125 };

    const corridors = (level.pathwayCorridors || []).filter(c => x >= c.x - 2 && x <= c.x + c.w + 2);
    if (corridors.length > 0) {
        let best = corridors[0];
        if (corridors.length > 1 && preferredY !== null) {
            let minDiff = Infinity;
            for (const c of corridors) {
                const mid = c.y + c.h / 2;
                const diff = Math.abs(mid - preferredY);
                if (diff < minDiff) {
                    minDiff = diff;
                    best = c;
                }
            }
        }
        let ceilY = best.y;
        let floorY = best.y + best.h;

        // Check if there is a solid block defining the floor surface under this corridor
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

    if (level.solids) {
        const matchingSolids = level.solids.filter(s => x >= s.x && x <= s.x + s.w);
        if (matchingSolids.length > 0) {
            matchingSolids.sort((a, b) => a.y - b.y);
            const topSolid = matchingSolids[0];
            const floorY = topSolid.y;
            const ceilY = Math.max(30, floorY - 120);
            return { floorY, ceilY, headroom: floorY - ceilY };
        }
    }

    const fallbackFloor = (level.playerSpawn && level.playerSpawn.y) || 345;
    return { floorY: fallbackFloor, ceilY: Math.max(30, fallbackFloor - 120), headroom: 120 };
}
if (typeof window !== 'undefined') window.getSurfaceAt = getSurfaceAt;

class TrapManager {
    constructor() {
        this.traps = [];
        this.activeHazards = [];
        this.chaosMode = true;
    }

    setupLevel(levelData) {
        this.traps = [];
        this.activeHazards = [];
        this.level = levelData;

        // Guaranteed visible static traps
        for (const st of (levelData.staticTraps || [])) {
            this.createTrap(st);
        }

        // Handcrafted traps array
        for (const t of (levelData.traps || [])) {
            this.createTrap(t);
        }

        // Candidate trap slots (for legacy levels 1-3)
        for (const slot of (levelData.candidateTrapSlots || [])) {
            this.createTrap(slot);
        }
    }

    createTrap(def) {
        if (!def) return;
        const d = { ...def };

        // Surface alignment guarantee: snap coordinates only when not explicitly set
        if (this.level && typeof getSurfaceAt === 'function') {
            const centerX = d.x + (d.w || 26) / 2;
            const surf = getSurfaceAt(this.level, centerX, d.y);
            if (['hidden_spike', 'static_spike', 'collapsing_floor', 'vanishing_floor', 'shifting_ground', 'moving_ground', 'spring_pad', 'falling_platform'].includes(d.type)) {
                if (d.y === undefined) d.y = surf.floorY;
            } else if (d.type === 'coin_trap') {
                if (d.y === undefined) d.y = surf.floorY - 35;
            } else if (d.type === 'dropping_spike') {
                if (d.y === undefined) d.y = surf.ceilY;
                if (d.groundY === undefined) d.groundY = surf.floorY;
            } else if (d.type === 'rolling_ball') {
                if (d.y === undefined) d.y = surf.floorY;
                if (d.groundY === undefined) d.groundY = surf.floorY;
            } else if (d.type === 'piston_crusher') {
                if (d.startY === undefined) d.startY = surf.ceilY - 25;
                if (d.targetY === undefined) d.targetY = surf.ceilY + 15;
            } else if (d.type === 'reversed_controls') {
                if (d.y === undefined) d.y = surf.floorY - (d.h || 35);
            }
        }
        let trap = null;
        switch (d.type) {
            case 'collapsing_floor':
            case 'vanishing_floor':
            case 'shifting_ground':
            case 'moving_ground':
                trap = new VanishingFloorTrap(d);
                break;
            case 'piston_crusher':
            case 'falling_block':
            case 'sliding_block':
                trap = new PistonCrusherTrap(d);
                break;
            case 'rolling_ball':
                trap = new RollingBallTrap(d);
                break;
            case 'hidden_spike':
                trap = new EmergingSpikeTrap(d);
                break;
            case 'dropping_spike':
                trap = new DroppingCeilingSpikeTrap(d);
                break;
            case 'static_spike':
                trap = new StaticSpikeTrap(d);
                break;
            case 'troll_portal':
                trap = new TrollPortalTrap(d);
                break;
            case 'spinning_saw':
            case 'razor':
                trap = new SpinningSawbladeTrap(d);
                break;
            case 'moving_platform':
                trap = new MovingPlatformTrap(d);
                break;
            case 'spring_pad':
                trap = new SpringPadTrap(d);
                break;
            case 'reversed_controls':
                trap = new ReversedControlsTrap(d);
                break;
            case 'falling_platform':
                trap = new FallingPlatformTrap(d);
                break;
            case 'coin_trap':
                trap = new CoinBaitTrap(d);
                break;
        }
        if (trap) this.traps.push(trap);
    }

    update(player, particles, onTrigger) {
        this.activeHazards = [];
        for (const trap of this.traps) {
            trap.update(player, particles, onTrigger);
            const hazard = trap.getHazardBox();
            if (hazard) this.activeHazards.push(hazard);
        }
    }

    draw(ctx, theme) {
        for (const trap of this.traps) {
            trap.draw(ctx, theme);
        }
    }
}

// --- SPECIFIED PUZZLE EXIT DOOR ---
class AdaptiveDoor {
    constructor(doorDef, level, aiModel) {
        this.def = doorDef || {};
        this.level = level;
        this.baseX = this.def.x || 700;
        this.baseY = this.def.y || 299;
        this.x = this.baseX;
        this.y = this.baseY;
        this.w = this.def.w || 32;
        this.h = this.def.h || 46;
        this.open = true;

        // Dynamic Evasion Budget:
        // Levels 1-3: Tutorial levels (0 evasions, stationary)
        // Level 4: 1 evasion (Level 4 signature puzzle shift)
        // Level 5+: 1 to 2 dynamic evasions (or explicitly specified by shiftsMax)
        let maxEvasions = 0;
        if (this.def.shiftsMax !== undefined) {
            maxEvasions = this.def.shiftsMax;
        } else if (level && level.id) {
            if (level.id <= 3) maxEvasions = 0;
            else if (level.id === 4) maxEvasions = 1;
            else maxEvasions = 1 + (level.id % 2);
        }
        this.evasionsMax = maxEvasions;
        this.shiftsLeft = maxEvasions;
        this.triggerRange = this.def.triggerRange || 85;

        // States: 'idle', 'alert', 'shifting', 'settled', 'shutting', 'shut'
        this.state = this.shiftsLeft === 0 ? 'settled' : 'idle';
        this.isShifting = false;
        this.isAlert = false;
        this.alertTimer = 0;
        this.shiftProgress = 0;
        this.hopStartX = this.x;
        this.hopStartY = this.y;
        this.hopTargetX = this.x;
        this.hopTargetY = this.y;
        this.hopY = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.opacity = 1;
        this.eyeLookX = 0;
        this.shutProgress = 0;
        this.onShutComplete = null;
    }

    startShutting(callback) {
        if (this.state === 'shutting' || this.state === 'shut') return;
        this.state = 'shutting';
        this.shutProgress = 0;
        this.onShutComplete = callback;
    }

    isTargetValid(x, y) {
        const boundsW = (this.level && this.level.bounds) ? this.level.bounds.width : 840;
        const boundsH = (this.level && this.level.bounds) ? this.level.bounds.height : 480;
        const solids = (this.level && this.level.solids) ? this.level.solids : [];
        const traps = (this.level && this.level.traps) ? this.level.traps : [];

        // 1. Must stay safely within level boundaries
        if (x < 15 || x + this.w > boundsW - 15) return false;
        if (y < 15 || y + this.h > boundsH - 15) return false;

        // 2. Must not overlap any solid obstacle (walls, ceilings, pillars)
        for (const s of solids) {
            if (s.passthrough) continue;
            const overlapX = Math.min(x + this.w, s.x + s.w) - Math.max(x, s.x);
            const overlapY = Math.min(y + this.h, s.y + s.h) - Math.max(y, s.y);
            if (overlapX > 1 && overlapY > 1) {
                return false;
            }
        }

        // 3. Must stand firmly on solid ground
        let hasGround = false;
        const groundY = y + this.h;
        for (const s of solids) {
            if (s.passthrough || s.isWallOnly) continue;
            if (Math.abs(s.y - groundY) <= 3) {
                if (x + this.w - 4 >= s.x && x + 4 <= s.x + s.w) {
                    hasGround = true;
                    break;
                }
            }
        }
        if (!hasGround) return false;

        // 4. Must not overlap deadly static hazards at landing spot
        for (const t of traps) {
            if (t.type === 'static_spike' || t.type === 'spinning_saw') {
                const tX = t.x !== undefined ? t.x : (t.startX || 0);
                const tY = t.y !== undefined ? t.y : 0;
                const tW = t.w || (t.radius ? t.radius * 2 : 24);
                const tH = t.h || (t.radius ? t.radius * 2 : 24);
                const overlapX = Math.min(x + this.w, tX + tW) - Math.max(x, tX);
                const overlapY = Math.min(y + this.h, tY + tH) - Math.max(y, tY);
                if (overlapX > 2 && overlapY > 2) {
                    return false;
                }
            }
        }

        return true;
    }

    findEvasionTarget(player) {
        const boundsW = (this.level && this.level.bounds) ? this.level.bounds.width : 840;
        const solids = (this.level && this.level.solids) ? this.level.solids : [];
        const pX = player ? player.x : this.x;

        // 1. Scripted shift if defined in level definition (e.g. shiftDirection & shiftDistance, or shiftX)
        let scriptDir = null;
        let scriptDist = null;
        if (this.def.shiftDirection !== undefined && this.def.shiftDistance !== undefined) {
            scriptDir = this.def.shiftDirection;
            scriptDist = this.def.shiftDistance;
        } else if (this.def.shiftX !== undefined) {
            scriptDir = Math.sign(this.def.shiftX);
            scriptDist = Math.abs(this.def.shiftX);
        }

        if (this.shiftsLeft === this.evasionsMax && scriptDir !== null && scriptDist !== null) {
            const testX = this.x + scriptDir * scriptDist;
            if (this.isTargetValid(testX, this.y)) {
                return { x: testX, y: this.y };
            }
        }

        // 2. Dynamic evasion: Determine preferred direction away from player
        let preferredDir = (this.x >= pX) ? 1 : -1;
        if (this.x > boundsW - 180) preferredDir = -1;
        if (this.x < 180) preferredDir = 1;

        // Candidate distances to try, from ideal leap to compact hops
        const testDirs = [preferredDir, -preferredDir];
        const candidateDists = [115, 85, 140, 60, 45, 175, 30];

        for (const d of testDirs) {
            for (const dist of candidateDists) {
                const testX = this.x + d * dist;
                // Test current floor level
                if (this.isTargetValid(testX, this.y)) {
                    return { x: testX, y: this.y };
                }
                // Test platforms at nearby heights (stepped terraces)
                for (const s of solids) {
                    if (s.passthrough || s.isWallOnly) continue;
                    if (testX + this.w - 4 >= s.x && testX + 4 <= s.x + s.w) {
                        const testY = s.y - this.h;
                        if (Math.abs(testY - this.y) <= 45 && Math.abs(testY - this.y) > 0) {
                            if (this.isTargetValid(testX, testY)) {
                                return { x: testX, y: testY };
                            }
                        }
                    }
                }
            }
        }

        // 3. Fallback: If no candidate location is safe from wall collisions,
        // hop safely in-place instead of jumping into a wall or void!
        return { x: this.x, y: this.y };
    }

    update(player, aiModel, game) {
        // 1. Physical door shutting sequence
        if (this.state === 'shutting') {
            this.shutProgress += 0.085;
            if (this.shutProgress >= 1) {
                this.shutProgress = 1;
                this.state = 'shut';
                if (window.soundFX && window.soundFX.playDoorSlam) {
                    window.soundFX.playDoorSlam();
                }
                if (game) {
                    if (game.shake) game.shake(10, 5.0);
                    if (game.spawnDust) game.spawnDust(this.x + this.w / 2, this.y + this.h);
                }
                if (this.onShutComplete) {
                    this.onShutComplete();
                }
            }
            return;
        }
        if (this.state === 'shut') return;

        // 2. Track player with animated eyes
        const playerCenterX = player ? player.x : this.x;
        const doorCenterX = this.x + this.w / 2;
        const diffX = playerCenterX - doorCenterX;
        this.eyeLookX = Math.max(-2.2, Math.min(2.2, diffX * 0.04));

        // 3. Alert countdown before evasive hop
        if (this.isAlert) {
            this.alertTimer--;
            if (this.alertTimer <= 0) {
                this.isAlert = false;
                this.startEvasiveHop(player, game);
            }
            return;
        }

        // 4. Shifting animation (smooth parabolic hop to destination)
        if (this.isShifting) {
            this.shiftProgress += 0.048;
            if (this.shiftProgress >= 1) {
                this.shiftProgress = 1;
                this.x = this.hopTargetX;
                this.y = this.hopTargetY;
                this.hopY = 0;
                this.rotation = 0;
                this.scaleX = 1;
                this.scaleY = 1;
                this.isShifting = false;
                this.shiftsLeft--;
                if (this.shiftsLeft <= 0) {
                    this.state = 'settled';
                } else {
                    this.state = 'idle';
                }
                if (window.soundFX && window.soundFX.playDoorSettle) window.soundFX.playDoorSettle();
                if (game && game.spawnDust) game.spawnDust(this.x + this.w / 2, this.y + this.h);
            } else {
                const t = this.shiftProgress;
                this.x = this.hopStartX + (this.hopTargetX - this.hopStartX) * t;
                this.y = this.hopStartY + (this.hopTargetY - this.hopStartY) * t;
                this.hopY = -Math.sin(t * Math.PI) * 32;
                const hopDir = (this.hopTargetX >= this.hopStartX) ? 1 : -1;
                this.rotation = hopDir * Math.sin(t * Math.PI) * 0.14;
                this.scaleX = 1 + Math.sin(t * Math.PI) * 0.12;
                this.scaleY = 1 - Math.sin(t * Math.PI) * 0.12;
            }
            return;
        }

        // 5. If no evasions left, door is permanently settled and waiting for player
        if (this.shiftsLeft <= 0) {
            this.state = 'settled';
            return;
        }

        // 6. Proximity detection: Startle door when player approaches!
        const dist = Math.abs(player.x - (this.x + this.w / 2));
        const yDist = Math.abs(player.y - (this.y + this.h));
        if (dist < this.triggerRange && yDist < 55) {
            this.isAlert = true;
            this.alertTimer = 10; // Brief comic reaction before hopping
            if (window.soundFX && window.soundFX.playDoorScurry) window.soundFX.playDoorScurry();
            if (game && game.spawnDust) game.spawnDust(this.x + this.w / 2, this.y + this.h);
        }
    }

    startEvasiveHop(player, game) {
        const target = this.findEvasionTarget(player);
        this.isShifting = true;
        this.shiftProgress = 0;
        this.hopStartX = this.x;
        this.hopStartY = this.y;
        this.hopTargetX = target.x;
        this.hopTargetY = target.y;
        if (game && game.spawnDust) game.spawnDust(this.x + this.w / 2, this.y + this.h);
    }

    drawBack(ctx, theme) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x + this.w / 2, this.y + this.hopY + this.h / 2);
        ctx.rotate(this.rotation);
        ctx.scale(this.scaleX, this.scaleY);

        drawDoorBackground(ctx, -this.w / 2, -this.h / 2, this.w, this.h, theme, {
            state: this.state,
            isAlert: this.isAlert,
            eyeLookX: this.eyeLookX
        });

        ctx.restore();
    }

    drawFront(ctx, theme) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x + this.w / 2, this.y + this.hopY + this.h / 2);
        ctx.rotate(this.rotation);
        ctx.scale(this.scaleX, this.scaleY);

        drawDoorForeground(ctx, -this.w / 2, -this.h / 2, this.w, this.h, theme, {
            state: this.state,
            isAlert: this.isAlert,
            shutProgress: this.shutProgress
        });

        ctx.restore();
    }

    draw(ctx, theme) {
        this.drawBack(ctx, theme);
        this.drawFront(ctx, theme);
    }
}

// --- 1. VANISHING FLOOR / MULTI-DIRECTIONAL GROUND TRAP ---
class VanishingFloorTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.w = def.w;
        this.h = def.h || 35;
        this.initialX = def.x;
        this.initialY = def.y;
        this.isSolid = true;
        this.isFloorTrap = true;
        this.isGroundTrap = true;
        this.state = 'dormant'; // 'dormant', 'moving', 'arrived', 'gone'
        this.direction = def.direction || 'down'; // 'down', 'up', 'left', 'right', 'shift_away', 'patrol_x', 'patrol_y'
        this.triggerMode = def.triggerMode || 'step'; // 'step', 'proximity', 'continuous'
        this.triggerRange = def.triggerRange || 75;
        this.speed = def.speed || def.dropSpeed || (this.direction === 'down' ? 4.8 : 2.8);
        this.shiftDistance = def.shiftDistance || def.maxDistance || (['left', 'right', 'shift_away'].includes(this.direction) ? 65 : 120);
        this.floorBelowY = def.floorBelowY;
        this.solidH = def.solidH;
        this.vx = 0;
        this.vy = 0;
        this.patrolDir = def.dir || 1;
        this.shiftDir = def.shiftDir || 1;
        this.carryPlayer = def.carryPlayer !== undefined ? def.carryPlayer : true;

        if (this.triggerMode === 'continuous') {
            this.state = 'moving';
            this.initVelocity();
        }
    }

    initVelocity() {
        if (this.direction === 'down') {
            this.vy = this.speed;
            this.vx = 0;
        } else if (this.direction === 'up') {
            this.vy = -this.speed;
            this.vx = 0;
        } else if (this.direction === 'left') {
            this.vx = -this.speed;
            this.vy = 0;
        } else if (this.direction === 'right') {
            this.vx = this.speed;
            this.vy = 0;
        } else if (this.direction === 'shift_away') {
            this.vx = this.shiftDir * this.speed * 1.4;
            this.vy = 0;
        } else if (this.direction === 'patrol_x') {
            this.vx = this.patrolDir * this.speed;
            this.vy = 0;
        } else if (this.direction === 'patrol_y') {
            this.vy = this.patrolDir * this.speed;
            this.vx = 0;
        }
    }

    update(player, game, onTrigger) {
        if (this.state === 'dormant') {
            let triggered = false;
            if (this.triggerMode === 'step' || this.triggerMode === 'proximity') {
                const pLeft = player.x - player.width / 2;
                const pRight = player.x + player.width / 2;
                const pBottom = player.y;

                const isOverX = pRight > this.x + 2 && pLeft < this.x + this.w - 2;
                const isNearY = Math.abs(pBottom - this.y) <= 6;

                if (isOverX && isNearY) {
                    triggered = true;
                } else if (this.triggerMode === 'proximity') {
                    const distCenterX = Math.abs(player.x - (this.x + this.w / 2));
                    const distCenterY = Math.abs(player.y - this.y);
                    if (distCenterX < this.triggerRange && distCenterY < 70) {
                        triggered = true;
                    }
                }

                if (triggered && this.direction === 'shift_away') {
                    this.shiftDir = player.x < (this.x + this.w / 2) ? 1 : -1;
                }
            }

            if (triggered) {
                this.state = 'moving';
                this.initVelocity();
                if (window.soundFX && window.soundFX.playCrumble) window.soundFX.playCrumble();
                if (onTrigger) onTrigger(this);
            }
        }

        if (this.state === 'moving') {
            const pLeft = player.x - player.width / 2;
            const pRight = player.x + player.width / 2;
            const isStandingOnTop = player.onGround && !player.isJumping &&
                (pRight > this.x + 2 && pLeft < this.x + this.w - 2) &&
                Math.abs(player.y - this.y) <= 6;

            if (this.direction === 'down') {
                this.vy += 0.55;
                this.y += this.vy;

                if (this.y - this.initialY > 6) {
                    this.isSolid = false;
                }

                const limitY = this.floorBelowY !== undefined ? (this.floorBelowY - this.h) : 600;
                if (this.y >= limitY) {
                    this.state = 'gone';
                    this.isSolid = false;
                    if (game && game.spawnDust) {
                        game.spawnDust(this.x + this.w / 2, limitY + this.h);
                    }
                }
            } else if (this.direction === 'up') {
                this.vy = -this.speed;
                this.y += this.vy;

                if (isStandingOnTop && this.carryPlayer) {
                    player.y = this.y;
                    player.vy = 0;
                    player.onGround = true;
                }

                if (this.initialY - this.y >= this.shiftDistance) {
                    this.y = this.initialY - this.shiftDistance;
                    this.vy = 0;
                    this.state = 'arrived';
                }
            } else if (this.direction === 'left') {
                this.vx = -this.speed;
                this.x += this.vx;

                if (isStandingOnTop && this.carryPlayer) {
                    player.x += this.vx;
                }

                if (this.initialX - this.x >= this.shiftDistance) {
                    this.x = this.initialX - this.shiftDistance;
                    this.vx = 0;
                    this.state = 'arrived';
                }
            } else if (this.direction === 'right') {
                this.vx = this.speed;
                this.x += this.vx;

                if (isStandingOnTop && this.carryPlayer) {
                    player.x += this.vx;
                }

                if (this.x - this.initialX >= this.shiftDistance) {
                    this.x = this.initialX + this.shiftDistance;
                    this.vx = 0;
                    this.state = 'arrived';
                }
            } else if (this.direction === 'shift_away') {
                this.vx = this.shiftDir * this.speed * 1.4;
                this.x += this.vx;

                if (Math.abs(this.x - this.initialX) >= this.shiftDistance) {
                    this.vx = 0;
                    this.state = 'arrived';
                }
            } else if (this.direction === 'patrol_x') {
                this.vx = this.patrolDir * this.speed;
                this.x += this.vx;

                if (isStandingOnTop && this.carryPlayer) {
                    player.x += this.vx;
                }

                if (this.x >= this.initialX + this.shiftDistance) {
                    this.x = this.initialX + this.shiftDistance;
                    this.patrolDir = -1;
                } else if (this.x <= this.initialX - this.shiftDistance) {
                    this.x = this.initialX - this.shiftDistance;
                    this.patrolDir = 1;
                }
            } else if (this.direction === 'patrol_y') {
                this.vy = this.patrolDir * this.speed;
                this.y += this.vy;

                if (isStandingOnTop && this.carryPlayer) {
                    player.y = this.y;
                    player.vy = 0;
                    player.onGround = true;
                }

                if (this.y >= this.initialY + this.shiftDistance) {
                    this.y = this.initialY + this.shiftDistance;
                    this.patrolDir = -1;
                } else if (this.y <= this.initialY - this.shiftDistance) {
                    this.y = this.initialY - this.shiftDistance;
                    this.patrolDir = 1;
                }
            }
        }
    }

    getSolidBox() {
        if (!this.isSolid || this.state === 'gone') return null;
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.solidH || this.h,
            vx: this.vx || 0,
            vy: this.vy || 0
        };
    }

    getHazardBox() {
        return null;
    }

    draw(ctx, theme) {
        if (this.state === 'gone') return;
        const limitY = this.floorBelowY !== undefined ? (this.floorBelowY - (this.solidH || this.h)) : 600;
        if (this.y > limitY) return;

        ctx.save();
        ctx.fillStyle = theme.bgColor;
        ctx.fillRect(this.x, this.y, this.w, this.solidH || this.h);
        ctx.restore();
    }
}

// --- 2. NATURAL PISTON CRUSHER ---
class PistonCrusherTrap {
    constructor(def) {
        this.x = def.x;
        this.w = def.w || 38;
        this.h = def.h || 105;
        this.restY = def.startY !== undefined ? def.startY : (def.y || 140);
        this.targetY = def.targetY !== undefined ? def.targetY : (this.restY + 105);
        this.y = this.restY;

        this.isSolid = false;
        this.isWallOnly = true;
        this.state = 'dormant';

        this.anticipationTimer = 0;
        this.pauseTimer = 0;
        this.pauseDuration = def.pauseDuration || 50;

        this.triggerX = def.triggerX || (this.x + this.w / 2);
        this.triggerRange = def.triggerRange || 75;

        this.vy = 0;
        this.shakeOffset = 0;
    }

    update(player, particles, onTrigger) {
        if (this.state === 'dormant') {
            const dist = Math.abs(player.x - this.triggerX);
            if (dist < this.triggerRange && player.y > this.restY) {
                this.state = 'anticipation';
                this.anticipationTimer = 6;
                if (window.soundFX) window.soundFX.playTrapTrigger();
                if (onTrigger) onTrigger(this);
            }
        } else if (this.state === 'anticipation') {
            this.anticipationTimer--;
            this.shakeOffset = (Math.random() - 0.5) * 3;
            if (this.anticipationTimer <= 0) {
                this.state = 'slamming';
                this.vy = 4.0;
                this.shakeOffset = 0;
            }
        } else if (this.state === 'slamming') {
            this.vy += 1.8;
            this.y += this.vy;

            if (this.y >= this.targetY) {
                this.y = this.targetY;
                this.vy = 0;
                this.state = 'paused_down';
                this.pauseTimer = this.pauseDuration;
                this.isSolid = true;
                if (window.soundFX) window.soundFX.playCrumble();
                if (particles) particles.spawnImpact(this.x + this.w / 2, this.y + this.h);
            }
        } else if (this.state === 'paused_down') {
            this.pauseTimer--;
            if (this.pauseTimer <= 0) {
                this.state = 'retracting';
                this.isSolid = false;
            }
        } else if (this.state === 'retracting') {
            this.y -= 2.4;
            if (this.y <= this.restY) {
                this.y = this.restY;
                this.state = 'settled';
                this.isSolid = false;
            }
        }
    }

    getHazardBox() {
        if (this.state === 'slamming') {
            return {
                x: this.x + 2,
                y: this.y + this.h - 18,
                w: this.w - 4,
                h: 20,
                trapType: 'piston_crusher'
            };
        }
        return null;
    }

    draw(ctx, theme) {
        ctx.save();
        const drawX = this.x + this.shakeOffset;
        ctx.fillStyle = theme.bgColor;
        ctx.fillRect(drawX, this.restY - 40, this.w, (this.y - this.restY) + this.h + 40);
        ctx.fillStyle = '#220800';
        ctx.fillRect(drawX, this.y + this.h - 2, this.w, 2);
        ctx.restore();
    }
}

// --- 3. LARGE ROLLING BOULDER ---
class RollingBallTrap {
    constructor(def) {
        this.x = def.x;
        this.radius = def.radius || 18;
        this.vx = def.vx || -5.2;
        this.groundY = def.groundY || 345;
        this.rotation = 0;
        this.state = 'dormant';
        this.triggerX = def.triggerX || (this.x - 110);
        this.triggerRange = def.triggerRange || 85;
        this.shatterTimer = 0;
        this.active = true;
    }

    update(player, game, onTrigger) {
        if (this.state === 'dormant') {
            const dist = Math.abs(player.x - this.triggerX);
            if (dist < this.triggerRange && Math.abs(player.y - this.groundY) < 45) {
                this.state = 'rolling';
                if (window.soundFX) window.soundFX.playTrapTrigger();
                if (onTrigger) onTrigger(this);
            }
        } else if (this.state === 'rolling') {
            const prevX = this.x;
            this.x += this.vx;
            this.rotation += this.vx * 0.08;

            if (Math.random() < 0.25 && game && game.spawnDust) {
                game.spawnDust(this.x, this.groundY);
            }

            // Gather all solid obstacles: terrain blocks + active solid trap blocks (e.g. crushers)
            const obstacles = [];
            const solids = (game && game.currentSolids) ? game.currentSolids :
                           ((game && game.currentLevel && game.currentLevel.solids) ? game.currentLevel.solids :
                           (game && game.solids ? game.solids : []));

            for (const s of solids) {
                if (!s.passthrough) obstacles.push(s);
            }

            const traps = (game && game.trapManager && game.trapManager.traps) ? game.trapManager.traps : [];
            for (const t of traps) {
                if (t === this) continue;
                // Piston crusher / slamming blocks descending into corridor
                if (t.isWallOnly || (t.constructor && t.constructor.name === 'PistonCrusherTrap')) {
                    if (t.y + t.h > this.groundY - this.radius * 2) {
                        obstacles.push({ x: t.x, y: t.y, w: t.w, h: t.h });
                    }
                } else if (t.isSolid && (t.constructor && t.constructor.name === 'MovingPlatformTrap')) {
                    obstacles.push({ x: t.x, y: t.y, w: t.w, h: t.h });
                }
            }

            const bounds = (game && game.currentLevel && game.currentLevel.bounds) ? game.currentLevel.bounds : { width: 840, height: 480 };

            // Floor support & step/ledge descent physics (allows boulder to roll down temple steps instead of floating!)
            let floorY = null;
            for (const s of solids) {
                if (this.x >= s.x - 2 && this.x <= s.x + s.w + 2) {
                    if (s.y >= this.groundY - 6) {
                        if (floorY === null || s.y < floorY) {
                            floorY = s.y;
                        }
                    }
                }
            }

            if (floorY !== null && Math.abs(floorY - this.groundY) <= 6) {
                this.groundY = floorY;
                this.vy = 0;
            } else if (floorY !== null && floorY > this.groundY) {
                // In air above a lower floor (e.g. rolling off a step/ledge)
                this.vy = (this.vy || 0) + 0.55;
                this.groundY += this.vy;
                if (this.groundY >= floorY) {
                    this.groundY = floorY;
                    this.vy = 0;
                }
            } else {
                // In air over pit or chasm
                this.vy = (this.vy || 0) + 0.55;
                this.groundY += this.vy;
                if (this.groundY > bounds.height + 100) {
                    this.state = 'gone';
                    this.active = false;
                    return;
                }
            }

            // Swept horizontal boundary collision check against all obstacles
            const prevLeft = prevX - this.radius;
            const prevRight = prevX + this.radius;
            const currLeft = this.x - this.radius;
            const currRight = this.x + this.radius;
            const bTop = this.groundY - this.radius * 2 + 3;
            const bBottom = this.groundY - 3;

            let hitWall = false;
            let impactX = this.x;

            for (const s of obstacles) {
                // Vertical corridor intersection (excluding the floor underneath)
                const yOverlap = (bBottom > s.y && bTop < s.y + s.h);
                if (!yOverlap) continue;

                if (this.vx < 0) {
                    const faceX = s.x + s.w;
                    if (prevLeft >= faceX - 4 && currLeft <= faceX && currRight > faceX) {
                        hitWall = true;
                        impactX = faceX;
                        this.x = impactX + this.radius;
                        break;
                    }
                } else if (this.vx > 0) {
                    const faceX = s.x;
                    if (prevRight <= faceX + 4 && currRight >= faceX && currLeft < faceX) {
                        hitWall = true;
                        impactX = faceX;
                        this.x = impactX - this.radius;
                        break;
                    }
                }
            }

            // Level boundary collisions
            if (!hitWall) {
                if (this.vx < 0 && currLeft <= 0) {
                    hitWall = true;
                    impactX = 0;
                    this.x = this.radius;
                } else if (this.vx > 0 && currRight >= bounds.width) {
                    hitWall = true;
                    impactX = bounds.width;
                    this.x = bounds.width - this.radius;
                }
            }

            if (hitWall) {
                this.shatter(impactX, game);
                return;
            }

            if (this.x < -100 || this.x > bounds.width + 100) {
                this.state = 'gone';
                this.active = false;
            }
        } else if (this.state === 'shattering') {
            this.shatterTimer--;
            if (this.shatterTimer <= 0) {
                this.state = 'gone';
                this.active = false;
            }
        }
    }

    shatter(impactX, game) {
        this.state = 'shattering';
        this.shatterTimer = 22;
        this.active = false;

        if (window.soundFX && window.soundFX.playCrumble) {
            window.soundFX.playCrumble();
        }

        if (game) {
            if (game.shake) game.shake(8, 4);

            if (game.particles) {
                // Exploding stone rubble & flying rock chunks
                for (let i = 0; i < 18; i++) {
                    const angle = (this.vx < 0 ? 0 : Math.PI) + (Math.random() - 0.5) * 1.6;
                    const speed = 2.0 + Math.random() * 5.0;
                    game.particles.push({
                        x: impactX,
                        y: this.groundY - this.radius + (Math.random() - 0.5) * this.radius,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed - 1.8,
                        life: 36,
                        maxLife: 36,
                        color: ['#1c130b', '#3e2723', '#5d4037', '#8a2b0d', '#be7808'][Math.floor(Math.random() * 5)],
                        size: 2.0 + Math.random() * 3.5,
                        gravity: 0.35,
                        rotation: Math.random() * Math.PI,
                        rotSpeed: (Math.random() - 0.5) * 0.4
                    });
                }
            }
        }
    }

    getHazardBox() {
        if (this.state === 'rolling') {
            return {
                x: this.x - this.radius + 3,
                y: this.groundY - this.radius * 2 + 3,
                w: (this.radius - 3) * 2,
                h: (this.radius - 3) * 2,
                isRadial: true,
                cx: this.x,
                cy: this.groundY - this.radius,
                r: this.radius - 2.5,
                trapType: 'rolling_ball'
            };
        }
        return null;
    }

    draw(ctx, theme) {
        if (this.state === 'rolling') {
            ctx.save();
            ctx.translate(this.x, this.groundY - this.radius);
            ctx.rotate(this.rotation);

            ctx.fillStyle = '#1c130b';
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = theme.spikeColor || '#8a2b0d';
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius - 4, 0, Math.PI * 1.5);
            ctx.stroke();

            ctx.restore();
        } else if (this.state === 'shattering') {
            // Draw exploding crumbling core fading out
            const alpha = Math.max(0, this.shatterTimer / 22);
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.translate(this.x, this.groundY - this.radius);
            ctx.fillStyle = '#1c130b';

            ctx.beginPath();
            ctx.arc(-4, -2, this.radius * 0.45, 0, Math.PI * 2);
            ctx.arc(4, -3, this.radius * 0.4, 0, Math.PI * 2);
            ctx.arc(0, 4, this.radius * 0.48, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }
}

// --- 4. EMERGING FLOOR SPIKES ---
class EmergingSpikeTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.w = def.w || 26;
        this.spikeHeight = def.h || 16;
        this.currentHeight = 0;
        this.state = 'dormant';
        this.triggerRange = def.triggerRange || 65;
        this.riseSpeed = def.riseSpeed || 6.0;
    }

    update(player, gameOrParticles, onTrigger) {
        if (this.state === 'dormant') {
            const dist = Math.abs(player.x - (this.x + this.w / 2));
            if (dist < this.triggerRange && Math.abs(player.y - this.y) < 40) {
                // Runtime Anti-Checkmate Guard: Delay emergence if a rolling boulder is currently crossing nearby
                let boulderActiveNearby = false;
                if (gameOrParticles && gameOrParticles.trapManager && gameOrParticles.trapManager.traps) {
                    for (const t of gameOrParticles.trapManager.traps) {
                        if (t.constructor && t.constructor.name === 'RollingBallTrap' && t.state === 'rolling') {
                            if (Math.abs(t.x - player.x) < 140) {
                                boulderActiveNearby = true;
                                break;
                            }
                        }
                    }
                }
                if (boulderActiveNearby) {
                    return; // Stagger until player lands safely after jumping boulder
                }

                this.state = 'emerging';
                if (window.soundFX) window.soundFX.playTrapTrigger();
                if (onTrigger) onTrigger(this);
            }
        } else if (this.state === 'emerging') {
            this.currentHeight += this.riseSpeed;
            if (this.currentHeight >= this.spikeHeight) {
                this.currentHeight = this.spikeHeight;
                this.state = 'active';
            }
        }
    }

    getHazardBox() {
        if (this.currentHeight > 3) {
            return {
                x: this.x + 2,
                y: this.y - this.currentHeight,
                w: this.w - 4,
                h: this.currentHeight,
                trapType: 'hidden_spike'
            };
        }
        return null;
    }

    draw(ctx, theme) {
        if (this.currentHeight <= 0) return;
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x - 2, this.y - this.currentHeight, this.w + 4, this.currentHeight);
        ctx.clip();

        const count = Math.max(1, Math.floor(this.w / 8));
        const spikeW = this.w / count;

        ctx.fillStyle = theme.spikeColor;
        ctx.strokeStyle = '#220800';
        ctx.lineWidth = 1;

        for (let i = 0; i < count; i++) {
            const sx = this.x + i * spikeW;
            ctx.beginPath();
            ctx.moveTo(sx, this.y);
            ctx.lineTo(sx + spikeW / 2, this.y - this.currentHeight);
            ctx.lineTo(sx + spikeW, this.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
        ctx.restore();
    }
}

// --- 5. DROPPING CEILING SPIKE ---
class DroppingCeilingSpikeTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.w = def.w || 20;
        this.h = def.h || 22;
        this.groundY = def.groundY || 345;
        this.vy = 0;
        this.state = 'dormant';
        this.triggerX = def.triggerX || (this.x + this.w / 2);
        this.triggerRange = def.triggerRange || 75;
        this.shatterTimer = 0;
    }

    update(player, gameOrParticles, onTrigger) {
        const particles = gameOrParticles;
        if (this.state === 'dormant') {
            const dist = Math.abs(player.x - this.triggerX);
            if (dist < this.triggerRange && player.y > this.y) {
                // Runtime Anti-Checkmate Guard: Delay drop if a rolling boulder is currently crossing nearby
                let boulderActiveNearby = false;
                if (gameOrParticles && gameOrParticles.trapManager && gameOrParticles.trapManager.traps) {
                    for (const t of gameOrParticles.trapManager.traps) {
                        if (t.constructor && t.constructor.name === 'RollingBallTrap' && t.state === 'rolling') {
                            if (Math.abs(t.x - player.x) < 140) {
                                boulderActiveNearby = true;
                                break;
                            }
                        }
                    }
                }
                if (boulderActiveNearby) {
                    return; // Stagger until player lands safely after jumping boulder
                }

                this.state = 'falling';
                this.vy = 2.4;
                if (window.soundFX) window.soundFX.playTrapTrigger();
                if (onTrigger) onTrigger(this);
            }
        } else if (this.state === 'falling') {
            this.vy += 0.85;
            this.y += this.vy;
            if (this.y + this.h >= this.groundY) {
                this.y = this.groundY - this.h;
                this.state = 'shattered';
                this.shatterTimer = 24;
                if (window.soundFX) window.soundFX.playCrumble();
                if (particles && particles.spawnImpact) particles.spawnImpact(this.x + this.w / 2, this.groundY);
                if (particles && particles.spawnDebris) particles.spawnDebris(this.x + this.w / 2, this.groundY, 5);
            }
        } else if (this.state === 'shattered') {
            this.shatterTimer--;
            if (this.shatterTimer <= 0) {
                this.state = 'gone';
            }
        }
    }

    getHazardBox() {
        // ONLY lethal while falling from ceiling (tries to spear player on head)
        // Once it impacts floor, it shatters into harmless rubble so the path is never blocked!
        if (this.state === 'falling') {
            return {
                x: this.x + 2,
                y: this.y,
                w: this.w - 4,
                h: this.h,
                trapType: 'dropping_spike'
            };
        }
        return null;
    }

    draw(ctx, theme) {
        if (this.state === 'dormant' || this.state === 'gone') return;

        ctx.save();
        if (this.state === 'falling') {
            ctx.fillStyle = theme.spikeColor;
            ctx.strokeStyle = '#220800';
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.w, this.y);
            ctx.lineTo(this.x + this.w / 2, this.y + this.h);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else if (this.state === 'shattered') {
            // Draw crumbling rubble fading out on the floor
            const alpha = Math.max(0, this.shatterTimer / 24);
            ctx.globalAlpha = alpha;
            ctx.fillStyle = theme.spikeColor;
            const cx = this.x + this.w / 2;
            const gy = this.groundY;

            ctx.beginPath();
            ctx.arc(cx - 5, gy - 3, 3, 0, Math.PI * 2);
            ctx.arc(cx + 1, gy - 4, 3.5, 0, Math.PI * 2);
            ctx.arc(cx + 6, gy - 2, 2.5, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}

// --- 6. STATIC SPIKES ---
class StaticSpikeTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.w = def.w || 26;
        this.h = def.h || 15;
        this.active = true;
    }

    update() {}

    getHazardBox() {
        return {
            x: this.x + 2,
            y: this.y - this.h + 2,
            w: this.w - 4,
            h: this.h,
            trapType: 'static_spike'
        };
    }

    draw(ctx, theme) {
        const count = Math.max(1, Math.floor(this.w / 8));
        const spikeW = this.w / count;

        ctx.save();
        ctx.fillStyle = theme.spikeColor;
        ctx.strokeStyle = '#220800';
        ctx.lineWidth = 1;

        for (let i = 0; i < count; i++) {
            const sx = this.x + i * spikeW;
            ctx.beginPath();
            ctx.moveTo(sx, this.y);
            ctx.lineTo(sx + spikeW / 2, this.y - this.h);
            ctx.lineTo(sx + spikeW, this.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
        ctx.restore();
    }
}

// --- 7. TROLL PORTAL TRAP (Seamless Loop Chute) ---
class TrollPortalTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.w = def.w || 60;
        this.h = def.h || 75;
        this.exitX = def.exitX !== undefined ? def.exitX : 135;
        this.exitY = def.exitY !== undefined ? def.exitY : 215;
        this.exitVy = def.exitVy !== undefined ? def.exitVy : 3.5;
        this.isSolid = false;
        this.active = true;
        this.cooldown = 0;
    }

    update(player, game, onTrigger) {
        if (this.cooldown > 0) {
            this.cooldown--;
            return;
        }

        if (!player || !player.alive) return;

        // Player falls into chute
        const pLeft = player.x - player.width / 2;
        const pRight = player.x + player.width / 2;
        const pBottom = player.y;

        const inChuteX = pRight > this.x + 2 && pLeft < this.x + this.w - 2;
        const inChuteY = pBottom > this.y + 12 && pBottom < this.y + this.h + 60;

        if (inChuteX && inChuteY) {
            this.triggerWarp(player, game);
        }
    }

    triggerWarp(player, game) {
        this.cooldown = 45; // Prevent immediate double loop

        if (window.soundFX) window.soundFX.playWarpWhoosh();
        if (game) {
            if (game.shake) game.shake(7, 3);
            // Spawn entrance dust
            if (game.particles) {
                for (let i = 0; i < 14; i++) {
                    game.particles.push({
                        x: this.x + this.w / 2 + (Math.random() - 0.5) * 25,
                        y: this.y + 12,
                        vx: (Math.random() - 0.5) * 3,
                        vy: -Math.random() * 3 - 0.8,
                        life: 25,
                        maxLife: 25,
                        color: '#ffca28',
                        size: 2.8,
                        gravity: 0.12
                    });
                }
            }
        }

        // Warp player to the simultaneous opening at the beginning (fully visible inside open corridor air!)
        player.x = this.exitX;
        player.y = this.exitY;
        player.vx = 0.5;
        player.vy = this.exitVy; // Plunge downward out of the top chute!
        player.onGround = false;
        player.alive = true;
        player.isJumping = false;

        if (game && game.particles) {
            // Spawn exit pop dust
            for (let i = 0; i < 14; i++) {
                game.particles.push({
                    x: this.exitX + (Math.random() - 0.5) * 18,
                    y: this.exitY + 6,
                    vx: (Math.random() - 0.5) * 3,
                    vy: Math.random() * 2 + 1,
                    life: 22,
                    maxLife: 22,
                    color: '#ffffff',
                    size: 2.5,
                    gravity: 0.2
                });
            }
        }
    }

    getHazardBox() {
        return null; // Never kills the player - seamless loop!
    }

    draw(ctx, theme) {
        // Draw the dark chute opening
        ctx.save();
        ctx.fillStyle = theme.pathColor;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        // Chute depth gradient
        const grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.h);
        grad.addColorStop(0, 'rgba(0,0,0,0.1)');
        grad.addColorStop(1, 'rgba(0,0,0,0.7)');
        ctx.fillStyle = grad;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}

// --- 8. SPINNING SAWBLADE TRAP (UNPREDICTABLE RANDOM RAZORS) ---
class SpinningSawbladeTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.startX = def.x;
        this.startY = def.y;
        this.radius = def.radius || 20;
        this.teethCount = def.teethCount || 10;
        this.rotation = Math.random() * Math.PI * 2;
        this.baseRotSpeed = def.rotSpeed || 0.25;
        this.rotSpeed = this.baseRotSpeed;

        this.baseSpeed = def.speed || 2.4;
        this.active = true;

        // Dynamic 2D Random Wandering Bounds
        const hSpan = (def.maxX !== undefined && def.minX !== undefined) 
            ? (def.maxX - def.minX) / 2 
            : 65;
        this.minX = def.minX !== undefined ? def.minX : Math.max(def.x - hSpan, def.x - 75);
        this.maxX = def.maxX !== undefined ? def.maxX : Math.min(def.x + hSpan, def.x + 75);
        if (this.maxX <= this.minX) {
            this.minX = def.x - 50;
            this.maxX = def.x + 50;
        }

        // Vertical boundary: respect tight crawl ducts if radius is small
        if (def.minY !== undefined && def.maxY !== undefined) {
            this.minY = def.minY;
            this.maxY = def.maxY;
        } else if (def.patrolAxis === 'y') {
            this.minY = def.y - 45;
            this.maxY = def.y + 45;
        } else {
            const vSpan = (this.radius <= 13) ? 4 : 22;
            this.minY = def.y - vSpan;
            this.maxY = def.y + vSpan;
        }
        if (this.maxY <= this.minY) {
            this.minY = def.y - 10;
            this.maxY = def.y + 10;
        }

        // Initialize random 2D heading and velocity
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * this.baseSpeed;
        this.vy = Math.sin(angle) * (this.radius <= 13 ? 0.35 : this.baseSpeed * 0.7);

        this.wanderTimer = Math.floor(Math.random() * 40) + 25;
        this.speedMod = 1.0;
        this.bobPhase = Math.random() * Math.PI * 2;
    }

    update(player, game, onTrigger) {
        this.rotation += this.rotSpeed;

        // 1. Random velocity and heading perturbation timer
        this.wanderTimer--;
        if (this.wanderTimer <= 0) {
            this.wanderTimer = Math.floor(Math.random() * 45) + 30;
            // Modulate speed unpredictably between 0.75x and 1.4x
            this.speedMod = 0.75 + Math.random() * 0.65;
            // Random heading perturbation angle
            const angleDrift = (Math.random() - 0.5) * 1.4;
            const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy) || this.baseSpeed;
            let currentAngle = Math.atan2(this.vy, this.vx) + angleDrift;

            // Compute new randomized velocity vector
            const vScale = (this.radius <= 13) ? 0.35 : 0.85;
            this.vx = Math.cos(currentAngle) * currentSpeed;
            this.vy = Math.sin(currentAngle) * (currentSpeed * vScale);
        }

        // 2. Organic sinusoidal micro-bobbing
        this.bobPhase += 0.08;
        const bobX = Math.cos(this.bobPhase * 0.75) * 0.35;
        const bobY = Math.sin(this.bobPhase) * (this.radius <= 13 ? 0.15 : 0.45);

        // 3. Apply 2D movement
        this.x += (this.vx * this.speedMod) + bobX;
        this.y += (this.vy * this.speedMod) + bobY;

        // 4. Soft organic boundary deflections with randomized bounce angles
        if (this.x <= this.minX) {
            this.x = this.minX;
            this.vx = Math.abs(this.vx) * (0.85 + Math.random() * 0.3);
            this.vy += (Math.random() - 0.5) * (this.radius <= 13 ? 0.3 : 1.2);
        } else if (this.x >= this.maxX) {
            this.x = this.maxX;
            this.vx = -Math.abs(this.vx) * (0.85 + Math.random() * 0.3);
            this.vy += (Math.random() - 0.5) * (this.radius <= 13 ? 0.3 : 1.2);
        }

        if (this.y <= this.minY) {
            this.y = this.minY;
            this.vy = Math.abs(this.vy) * (0.85 + Math.random() * 0.3);
            this.vx += (Math.random() - 0.5) * 1.2;
        } else if (this.y >= this.maxY) {
            this.y = this.maxY;
            this.vy = -Math.abs(this.vy) * (0.85 + Math.random() * 0.3);
            this.vx += (Math.random() - 0.5) * 1.2;
        }

        // Velocity stabilization guard: maintain energetic yet controlled wander speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed < 1.2) {
            this.vx *= 1.4;
            this.vy *= 1.4;
        } else if (speed > 4.8) {
            this.vx *= 0.8;
            this.vy *= 0.8;
        }

        // 5. Proximity Excitement & Menacing Audio/Sparks
        if (player && game) {
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 135) {
                // Excited state: spin accelerates and occasional spark burst
                this.rotSpeed = this.baseRotSpeed * 1.5;

                // Subtle predatory micro-drift when player enters hunting zone
                if (Math.random() < 0.08) {
                    this.vx += Math.sign(dx) * 0.4;
                }

                if (Math.random() < 0.04 && window.soundFX && window.soundFX.playSawBuzz) {
                    window.soundFX.playSawBuzz();
                }

                if (game.particles && Math.random() < 0.28) {
                    game.particles.push({
                        x: this.x + (Math.random() - 0.5) * this.radius,
                        y: this.y + (Math.random() - 0.5) * this.radius,
                        vx: (Math.random() - 0.5) * 3.5,
                        vy: (Math.random() - 0.5) * 3.5,
                        life: 9,
                        maxLife: 9,
                        color: '#ffeb3b',
                        size: 1.6,
                        gravity: 0.1
                    });
                }
            } else {
                this.rotSpeed = this.baseRotSpeed;
            }
        }
    }

    getHazardBox() {
        return {
            x: this.x - this.radius + 3,
            y: this.y - this.radius + 3,
            w: (this.radius - 3) * 2,
            h: (this.radius - 3) * 2,
            isRadial: true,
            cx: this.x,
            cy: this.y,
            r: this.radius - 2,
            trapType: 'spinning_saw'
        };
    }

    draw(ctx, theme) {
        ctx.save();

        // NO MECHANICAL RAILS OR SLOTS: completely seamless with the environment!

        // Draw spinning sawblade
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        const r = this.radius;
        const innerR = r * 0.72;
        const teeth = this.teethCount;

        // Faint spinning buzz aura for high velocity
        ctx.beginPath();
        ctx.arc(0, 0, r + 1, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 235, 59, 0.22)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Serrated razor teeth
        ctx.fillStyle = '#b0bec5'; // Blade metallic grey
        ctx.strokeStyle = '#37474f';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < teeth; i++) {
            const a1 = (i * 2 * Math.PI) / teeth;
            const a2 = ((i + 0.5) * 2 * Math.PI) / teeth;
            const a3 = ((i + 1) * 2 * Math.PI) / teeth;

            const tipX = Math.cos(a1) * r;
            const tipY = Math.sin(a1) * r;
            const midX = Math.cos(a2) * (innerR * 1.05);
            const midY = Math.sin(a2) * (innerR * 1.05);
            const rootX = Math.cos(a3) * innerR;
            const rootY = Math.sin(a3) * innerR;

            if (i === 0) ctx.moveTo(tipX, tipY);
            else ctx.lineTo(tipX, tipY);
            ctx.lineTo(midX, midY);
            ctx.lineTo(rootX, rootY);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner circular hub
        ctx.fillStyle = '#78909c';
        ctx.beginPath();
        ctx.arc(0, 0, innerR * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Center bolt / mounting axle
        ctx.fillStyle = '#263238';
        ctx.beginPath();
        ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#eceff1';
        ctx.beginPath();
        ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// --- 9. MOVING PLATFORM TRAP ---
class MovingPlatformTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.w = def.w || 64;
        this.h = def.h || 18;
        this.axis = def.axis || 'x'; // 'x' or 'y'
        this.min = def.min !== undefined ? def.min : (this.axis === 'x' ? def.x - 70 : def.y - 70);
        this.max = def.max !== undefined ? def.max : (this.axis === 'x' ? def.x + 70 : def.y + 70);
        this.speed = def.speed || 1.8;
        this.dir = def.dir || 1;
        this.vx = this.axis === 'x' ? this.speed * this.dir : 0;
        this.vy = this.axis === 'y' ? this.speed * this.dir : 0;

        this.isSolid = true;
        this.isOneWay = true; // One-way top platform: player jumps through/off freely without ceiling collision
        this.active = true;
        this.trollMode = def.trollMode || 'none'; // 'speed_up_ceiling', 'drop_on_step'
        this.stepTimer = 0;
    }

    update(player, game, onTrigger) {
        // Detect if player is standing on top
        let onTop = false;
        if (player && player.onGround && !player.isJumping) {
            const pLeft = player.x - player.width / 2;
            const pRight = player.x + player.width / 2;
            onTop = pRight > this.x + 2 && pLeft < this.x + this.w - 2 && Math.abs(player.y - this.y) <= 5;
        }

        if (onTop) {
            this.stepTimer++;
        } else {
            this.stepTimer = 0;
        }

        // Troll elevator acceleration towards ceiling
        if (this.trollMode === 'speed_up_ceiling' && this.stepTimer > 18) {
            this.axis = 'y';
            this.vy = -4.2;
            this.vx = 0;
            this.y += this.vy;
            if (this.y < this.min) this.y = this.min;
            if (onTop) {
                player.y = this.y;
                player.vy = this.vy;
                player.onGround = true;
            }
            return;
        }

        // Normal patrol motion with exact frame delta
        let dx = 0;
        let dy = 0;
        if (this.axis === 'x') {
            const nextX = this.x + this.speed * this.dir;
            if (nextX >= this.max) {
                dx = this.max - this.x;
                this.x = this.max;
                this.dir = -1;
            } else if (nextX <= this.min) {
                dx = this.min - this.x;
                this.x = this.min;
                this.dir = 1;
            } else {
                dx = this.speed * this.dir;
                this.x = nextX;
            }
            this.vx = dx;
            this.vy = 0;
        } else if (this.axis === 'y') {
            const nextY = this.y + this.speed * this.dir;
            if (nextY >= this.max) {
                dy = this.max - this.y;
                this.y = this.max;
                this.dir = -1;
            } else if (nextY <= this.min) {
                dy = this.min - this.y;
                this.y = this.min;
                this.dir = 1;
            } else {
                dy = this.speed * this.dir;
                this.y = nextY;
            }
            this.vy = dy;
            this.vx = 0;
        }

        // Smoothly synchronize player with moving platform
        if (onTop) {
            player.x += dx;
            player.y = this.y;
            player.vy = 0;
            player.onGround = true;
        }
    }

    getSolidBox() {
        if (!this.isSolid || !this.active) return null;
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            vx: this.vx || 0,
            vy: this.vy || 0,
            isOneWay: true
        };
    }

    getHazardBox() {
        return null;
    }

    draw(ctx, theme) {
        ctx.save();
        // Solid visible walking surface (contrasts with background air so player never appears floating!)
        ctx.fillStyle = theme.doorFrameColor || '#3d2516';
        ctx.fillRect(this.x, this.y, this.w, this.h);

        // Solid top grip tread
        ctx.fillStyle = theme.spikeColor || '#ffca28';
        ctx.fillRect(this.x, this.y, this.w, 3);

        // Platform underside & mechanical body
        ctx.fillStyle = theme.bgColor;
        ctx.fillRect(this.x + 2, this.y + 5, this.w - 4, this.h - 5);

        // Mechanical chevron grooves / track rollers
        ctx.fillStyle = '#ffca28';
        const rollerCount = Math.max(2, Math.floor(this.w / 16));
        for (let i = 0; i < rollerCount; i++) {
            ctx.fillRect(this.x + 6 + i * 15, this.y + 7, 6, 4);
        }

        ctx.strokeStyle = '#220800';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}

// --- 10. SPRING PAD TRAP (BOUNCERS) ---
class SpringPadTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.w = def.w || 32;
        this.h = def.h || 12;
        this.boostVy = def.boostVy || -12.0;
        this.compressTimer = 0;
        this.active = true;
    }

    update(player, game, onTrigger) {
        if (this.compressTimer > 0) this.compressTimer--;

        if (player && player.alive) {
            const pLeft = player.x - player.width / 2;
            const pRight = player.x + player.width / 2;
            const landsOn = pRight > this.x && pLeft < this.x + this.w && 
                (Math.abs(player.y - this.y) < 8 || (player.y >= this.y - 6 && player.y - player.vy <= this.y + 4));
            if (landsOn && player.vy >= 0) {
                player.y = this.y - 2;
                player.vy = this.boostVy;
                player.onGround = false;
                player.isJumping = false; // Preserves full spring bounce momentum regardless of jump key state
                this.compressTimer = 14;
                if (window.soundFX && window.soundFX.playSpringBoing) {
                    window.soundFX.playSpringBoing();
                }
                if (game) {
                    if (game.shake) game.shake(5, 2);
                    if (game.spawnDust) game.spawnDust(this.x + this.w / 2, this.y);
                }
                if (onTrigger) onTrigger(this);
            }
        }
    }

    getHazardBox() {
        return null;
    }

    draw(ctx, theme) {
        ctx.save();
        const compressed = this.compressTimer > 6;
        const padY = compressed ? this.y + 4 : this.y;
        const springH = compressed ? 5 : 9;

        // Base plate
        ctx.fillStyle = '#37474f';
        ctx.fillRect(this.x + 2, this.y + this.h - 3, this.w - 4, 3);

        // Coiled spring
        ctx.strokeStyle = '#ffd54f';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        const cx = this.x + this.w / 2;
        ctx.moveTo(cx - 8, this.y + this.h - 3);
        ctx.lineTo(cx + 8, this.y + this.h - 3 - springH * 0.33);
        ctx.lineTo(cx - 8, this.y + this.h - 3 - springH * 0.66);
        ctx.lineTo(cx + 8, padY + 3);
        ctx.stroke();

        // Top bouncy pad
        ctx.fillStyle = '#e53935';
        ctx.fillRect(this.x, padY, this.w, 4);
        ctx.fillStyle = '#ff8a80';
        ctx.fillRect(this.x + 2, padY, this.w - 4, 1.5);
        ctx.restore();
    }
}

// --- 11. REVERSED CONTROLS ZONE TRAP (Level Devil Level 5 Signature) ---
class ReversedControlsTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.w = def.w || 54;
        this.h = def.h || 32;
        this.triggered = false;
        this.pulse = 0;
    }

    update(player, particles, onTrigger) {
        if (!player) return;
        this.pulse += 0.05;

        const pLeft = player.x - (player.width || 20) / 2;
        const pRight = player.x + (player.width || 20) / 2;
        const pBottom = player.y;
        const pTop = player.y - (player.height || 26);

        // Broad foot-level trigger intersection
        const inZone = pRight > this.x && pLeft < this.x + this.w &&
                       pBottom > this.y - 12 && pTop < this.y + this.h + 20;

        if (inZone && !this.triggered) {
            this.triggered = true;
            if (window.soundFX && window.soundFX.playWarp) window.soundFX.playWarp();
            if (onTrigger) onTrigger(this);
            if (window.gameInstance) {
                window.gameInstance.reversedControls = true;
                window.gameInstance.reversedTimer = 360; // 6 seconds sustained inversion (holding LEFT lets player run RIGHT!)
            }
        }
    }

    getSolidBox() { return null; }
    getHazardBox() { return null; }

    draw(ctx, theme) {
        ctx.save();
        // Authentic Level Devil mechanical floor plate with opposing directional chevrons
        const midX = this.x + this.w / 2;
        const groundY = this.y + this.h;
        const glow = 0.5 + Math.sin(this.pulse * 2) * 0.3;

        // Plate dimensions flush with ground
        const plateW = Math.min(this.w, 54);
        const plateH = 5;
        const depressOffset = this.triggered ? 2 : 0;
        const plateX = midX - plateW / 2;
        const plateY = groundY - plateH + depressOffset;

        // 1. Recessed ground casing
        ctx.fillStyle = 'rgba(15, 10, 10, 0.9)';
        ctx.fillRect(plateX - 1, groundY - plateH - 1, plateW + 2, plateH + 2);

        // 2. Main tread plate body
        ctx.fillStyle = this.triggered ? '#3b1c1c' : '#2a1a17';
        ctx.fillRect(plateX, plateY, plateW, plateH);

        // 3. Metallic bevel highlight on top edge
        ctx.fillStyle = this.triggered ? 'rgba(255, 138, 128, 0.5)' : 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(plateX, plateY, plateW, 1.2);

        // 4. Subtle corner rivets
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(plateX + 2, plateY + 1.5, 2, 2);
        ctx.fillRect(plateX + plateW - 4, plateY + 1.5, 2, 2);

        // 5. Etched opposing neon directional chevrons & inversion glyph
        const activeColor = `rgba(239, 83, 80, ${Math.min(1.0, glow)})`;
        const brightColor = `rgba(255, 138, 128, ${Math.min(1.0, glow + 0.25)})`;

        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 1.4;

        // Leftward chevron pointing LEFT: ◄
        const leftChevX = midX - 16;
        ctx.beginPath();
        ctx.moveTo(leftChevX + 4, plateY - 4);
        ctx.lineTo(leftChevX - 2, plateY - 1);
        ctx.lineTo(leftChevX + 4, plateY + 2);
        ctx.stroke();

        // Rightward chevron pointing RIGHT: ►
        const rightChevX = midX + 16;
        ctx.beginPath();
        ctx.moveTo(rightChevX - 4, plateY - 4);
        ctx.lineTo(rightChevX + 2, plateY - 1);
        ctx.lineTo(rightChevX - 4, plateY + 2);
        ctx.stroke();

        // Central reverse indicator symbol
        ctx.fillStyle = brightColor;
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText('◄ ⇄ ►', midX, plateY - 2);

        ctx.restore();
    }
}

// --- 12. FALLING PLATFORM TRAP (Level Devil Level 6 Signature) ---
class FallingPlatformTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.initialY = def.y;
        this.w = def.w || 55;
        this.h = def.h || 14;
        this.state = 'dormant'; // 'dormant', 'shaking', 'falling', 'gone'
        this.shakeTimer = 0;
        this.vy = 0;
        this.dropSpeed = def.dropSpeed || 5.0;
        this.isSolid = true;
        this.isPlatform = true;
    }

    update(player, particles, onTrigger) {
        if (!player) return;
        if (this.state === 'dormant') {
            const pLeft = player.x - (player.width || 20) / 2;
            const pRight = player.x + (player.width || 20) / 2;
            const pBottom = player.y;

            const isOverX = pRight > this.x + 2 && pLeft < this.x + this.w - 2;
            const isNearY = Math.abs(pBottom - this.y) < 6;

            if (isOverX && isNearY) {
                this.state = 'shaking';
                this.shakeTimer = 8;
                if (window.soundFX && window.soundFX.playCrumble) window.soundFX.playCrumble();
                if (onTrigger) onTrigger(this);
            }
        } else if (this.state === 'shaking') {
            this.shakeTimer--;
            if (this.shakeTimer <= 0) {
                this.state = 'falling';
                this.vy = this.dropSpeed;
            }
        } else if (this.state === 'falling') {
            this.vy += 0.5;
            this.y += this.vy;

            if (this.y - this.initialY > 8) {
                this.isSolid = false;
            }

            const limitY = this.floorBelowY !== undefined ? (this.floorBelowY - this.h) : 650;
            if (this.y >= limitY) {
                this.state = 'gone';
                this.isSolid = false;
                if (particles && particles.spawnDust) {
                    particles.spawnDust(this.x + this.w / 2, limitY + this.h);
                }
            }
        }
    }

    getSolidBox() {
        if (!this.isSolid || this.state === 'gone') return null;
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h
        };
    }

    getHazardBox() { return null; }

    draw(ctx, theme) {
        if (this.state === 'gone') return;
        const limitY = this.floorBelowY !== undefined ? (this.floorBelowY - this.h) : 650;
        if (this.y > limitY) return;
        ctx.save();
        let drawX = this.x;
        let drawY = this.y;
        if (this.state === 'shaking') {
            drawX += (Math.random() - 0.5) * 3;
            drawY += (Math.random() - 0.5) * 1.5;
        }

        ctx.fillStyle = theme.platformColor || theme.groundColor || '#3d3029';
        ctx.fillRect(drawX, drawY, this.w, this.h);

        ctx.fillStyle = theme.groundTopColor || '#5a463a';
        ctx.fillRect(drawX, drawY, this.w, 3.5);

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(drawX, drawY, this.w, this.h);
        ctx.restore();
    }
}

// --- 13. COIN BAIT TRAP (Classic Level Devil Gimmick) ---
class CoinBaitTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.baseY = def.y;
        this.r = def.r || 8;
        this.collected = false;
        this.bobAngle = Math.random() * Math.PI * 2;
    }

    update(player, particles, onTrigger) {
        if (this.collected || !player) return;
        this.bobAngle += 0.08;
        const curY = this.baseY + Math.sin(this.bobAngle) * 3;
        const pCenterX = player.x;
        const pCenterY = player.y - (player.height || 26) / 2;

        const dist = Math.hypot(pCenterX - this.x, pCenterY - curY);
        if (dist < this.r + 14) {
            this.collected = true;
            if (window.soundFX && window.soundFX.playWarp) window.soundFX.playWarp();
            if (particles && particles.addDeathExplosion) {
                particles.addDeathExplosion(this.x, curY, '#ffd54f');
            }
            if (onTrigger) onTrigger(this);
        }
    }

    getSolidBox() { return null; }
    getHazardBox() { return null; }

    draw(ctx, theme) {
        if (this.collected) return;
        ctx.save();
        const curY = this.baseY + Math.sin(this.bobAngle) * 3;

        // Glowing gold coin
        ctx.fillStyle = '#ffca28';
        ctx.beginPath();
        ctx.arc(this.x, curY, this.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ff8f00';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner devil imprint / shine
        ctx.fillStyle = '#fff9c4';
        ctx.beginPath();
        ctx.arc(this.x - 2, curY - 2, this.r * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawDoorBackground(ctx, x, y, w, h, theme, options = {}) {
    const { state = 'idle', isAlert = false, eyeLookX = 0 } = options;

    ctx.save();

    // 1. Outer arch frame - ALWAYS uses authentic theme colors, NEVER pitch black!
    ctx.fillStyle = theme.doorFrameColor || '#473628';
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x, y + w / 2);
    ctx.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
    ctx.fill();

    // 2. Hollow dark doorway interior aperture (the passage where player steps inside)
    ctx.fillStyle = '#140e0a';
    ctx.beginPath();
    ctx.moveTo(x + 3.5, y + h);
    ctx.lineTo(x + 3.5, y + w / 2 + 2);
    ctx.arc(x + w / 2, y + w / 2 + 2, w / 2 - 3.5, Math.PI, 0);
    ctx.lineTo(x + w - 3.5, y + h);
    ctx.closePath();
    ctx.fill();

    // If open and NOT shutting/shut, draw inner door panel face and eyes
    if (state !== 'shutting' && state !== 'shut') {
        ctx.fillStyle = theme.doorInnerColor || '#d9d5cd';
        ctx.beginPath();
        ctx.moveTo(x + 3.5, y + h);
        ctx.lineTo(x + 3.5, y + w / 2 + 2);
        ctx.arc(x + w / 2, y + w / 2 + 2, w / 2 - 3.5, Math.PI, 0);
        ctx.lineTo(x + w - 3.5, y + h);
        ctx.closePath();
        ctx.fill();

        // Doorknob
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.arc(x + w - 7, y + h * 0.62, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Expressive Eyes
        const eyeY = y + w / 2 - 1;
        const eyeLeftX = x + w / 2 - 5;
        const eyeRightX = x + w / 2 + 5;

        if (state === 'settled' || state === 'entering') {
            // Happy smiling crescent eyes ^ ^
            ctx.strokeStyle = '#ffca28';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.arc(eyeLeftX, eyeY + 1, 2.6, Math.PI * 1.15, Math.PI * 1.85);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(eyeRightX, eyeY + 1, 2.6, Math.PI * 1.15, Math.PI * 1.85);
            ctx.stroke();
        } else if (isAlert) {
            ctx.fillStyle = '#111';
            ctx.beginPath();
            ctx.arc(eyeLeftX, eyeY, 2.8, 0, Math.PI * 2);
            ctx.arc(eyeRightX, eyeY, 2.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(eyeLeftX, eyeY - 0.8, 1.2, 0, Math.PI * 2);
            ctx.arc(eyeRightX, eyeY - 0.8, 1.2, 0, Math.PI * 2);
            ctx.fill();

            // Comic '!' exclamation pop-up above door
            ctx.fillStyle = '#ff1744';
            ctx.font = 'bold 16px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.fillText("!", x + w / 2, y - 6);
        } else {
            ctx.fillStyle = '#111';
            ctx.beginPath();
            ctx.arc(eyeLeftX + eyeLookX, eyeY, 1.8, 0, Math.PI * 2);
            ctx.arc(eyeRightX + eyeLookX, eyeY, 1.8, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}

function drawDoorForeground(ctx, x, y, w, h, theme, options = {}) {
    const { state = 'idle', shutProgress = 0 } = options;
    if (state !== 'shutting' && state !== 'shut') return;

    ctx.save();

    // Heavy door slab swinging / sliding shut IN FRONT of the player!
    const maxDoorW = w - 7;
    const currentDoorW = maxDoorW * Math.min(1, shutProgress);

    ctx.fillStyle = '#5d4037'; // Heavy dark oak timber
    ctx.beginPath();
    ctx.moveTo(x + 3.5, y + h);
    ctx.lineTo(x + 3.5, y + w / 2 + 2);
    ctx.arc(x + 3.5 + currentDoorW / 2, y + w / 2 + 2, currentDoorW / 2, Math.PI, 0);
    ctx.lineTo(x + 3.5 + currentDoorW, y + h);
    ctx.closePath();
    ctx.fill();

    // Sturdy vertical plank lines
    if (currentDoorW > 8) {
        ctx.strokeStyle = '#3e2723';
        ctx.lineWidth = 1;
        const plankStep = currentDoorW / 3;
        for (let p = 1; p < 3; p++) {
            ctx.beginPath();
            ctx.moveTo(x + 3.5 + p * plankStep, y + w / 2 + 3);
            ctx.lineTo(x + 3.5 + p * plankStep, y + h);
            ctx.stroke();
        }
    }

    // Heavy iron cross-straps and locking bolt
    if (shutProgress >= 0.75) {
        ctx.fillStyle = '#212121';
        ctx.fillRect(x + 3.5, y + h * 0.42, currentDoorW, 3.5);
        ctx.fillRect(x + 3.5, y + h * 0.72, currentDoorW, 3.5);

        if (state === 'shut' || shutProgress >= 0.95) {
            ctx.fillStyle = '#ffb300'; // Golden padlock
            ctx.beginPath();
            ctx.arc(x + w - 8, y + h * 0.58, 3.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#111';
            ctx.fillRect(x + w - 8.6, y + h * 0.56, 1.2, 2.5);
        }
    }

    ctx.restore();
}

function drawArchedDoor(ctx, x, y, w, h, theme, options = {}) {
    drawDoorBackground(ctx, x, y, w, h, theme, options);
    drawDoorForeground(ctx, x, y, w, h, theme, options);
}

window.TrapManager = TrapManager;
window.AdaptiveDoor = AdaptiveDoor;
window.TrollPortalTrap = TrollPortalTrap;
window.DroppingCeilingSpikeTrap = DroppingCeilingSpikeTrap;
window.StaticSpikeTrap = StaticSpikeTrap;
window.VanishingFloorTrap = VanishingFloorTrap;
window.ShiftingGroundTrap = VanishingFloorTrap;
window.PistonCrusherTrap = PistonCrusherTrap;
window.RollingBallTrap = RollingBallTrap;
window.EmergingSpikeTrap = EmergingSpikeTrap;
window.SpinningSawbladeTrap = SpinningSawbladeTrap;
window.MovingPlatformTrap = MovingPlatformTrap;
window.SpringPadTrap = SpringPadTrap;
window.ReversedControlsTrap = ReversedControlsTrap;
window.FallingPlatformTrap = FallingPlatformTrap;
window.CoinBaitTrap = CoinBaitTrap;
window.drawArchedDoor = drawArchedDoor;
window.drawDoorBackground = drawDoorBackground;
window.drawDoorForeground = drawDoorForeground;
