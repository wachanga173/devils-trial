// traps.js - Seamless Devil's Trial Traps: Adaptive Shifting Door, Natural Crushers, Rolling Boulders, Emerging Spikes
class TrapManager {
    constructor() {
        this.traps = [];
        this.activeHazards = [];
        this.chaosMode = true;
    }

    setupLevel(levelData, aiModel) {
        this.traps = [];
        this.activeHazards = [];
        this.level = levelData;

        // Guaranteed visible bait traps (e.g. stationary spikes)
        for (const st of (levelData.staticTraps || [])) {
            this.createTrap(st);
        }

        const candidateSlots = levelData.candidateTrapSlots || [];
        if (candidateSlots.length > 0) {
            if (this.chaosMode && aiModel) {
                const adaptiveTraps = aiModel.selectAdaptiveTraps(candidateSlots, levelData.staticTraps, levelData.id || 1, levelData);
                for (const slot of adaptiveTraps) {
                    this.createTrap(slot);
                }
            } else if (this.chaosMode) {
                const shuffled = [...candidateSlots].sort(() => Math.random() - 0.5);
                const activeXSpans = (levelData.staticTraps || []).map(st => ({
                    start: st.x,
                    end: st.x + (st.w || 28),
                    isStatic: true
                }));
                for (const slot of shuffled) {
                    const slotStart = slot.x;
                    const slotEnd = slot.x + (slot.w || 32);
                    const overlaps = activeXSpans.some(span => {
                        const minGap = span.isStatic ? 55 : 20;
                        return !(slotEnd <= span.start - minGap || slotStart >= span.end + minGap);
                    });
                    if (!overlaps) {
                        this.createTrap(slot);
                        activeXSpans.push({ start: slotStart, end: slotEnd });
                        if (activeXSpans.length >= 2) break;
                    }
                }
            } else {
                for (const slot of candidateSlots) {
                    if (slot.defaultActive !== false) {
                        this.createTrap(slot);
                    }
                }
            }
        }
    }

    createTrap(def) {
        let trap = null;
        switch (def.type) {
            case 'collapsing_floor':
                trap = new VanishingFloorTrap(def);
                break;
            case 'piston_crusher':
            case 'falling_block':
            case 'sliding_block':
                trap = new PistonCrusherTrap(def);
                break;
            case 'rolling_ball':
                trap = new RollingBallTrap(def);
                break;
            case 'hidden_spike':
                trap = new EmergingSpikeTrap(def);
                break;
            case 'dropping_spike':
                trap = new DroppingCeilingSpikeTrap(def);
                break;
            case 'static_spike':
                trap = new StaticSpikeTrap(def);
                break;
            case 'troll_portal':
                trap = new TrollPortalTrap(def);
                break;
            case 'spinning_saw':
            case 'razor':
                trap = new SpinningSawbladeTrap(def);
                break;
            case 'moving_platform':
                trap = new MovingPlatformTrap(def);
                break;
            case 'spring_pad':
                trap = new SpringPadTrap(def);
                break;
            case 'pop_up_wall':
                trap = new PopUpWallTrap(def);
                break;
            case 'ceiling_squish':
                trap = new CeilingSquishTrap(def);
                break;
            case 'shifting_block':
                trap = new ShiftingBlockTrap(def);
                break;
            case 'wall_ejector':
                trap = new WallEjectorTrap(def);
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

// --- ADAPTIVE SHIFTING EXIT DOOR ---
class AdaptiveDoor {
    constructor(doorDef, level, aiModel) {
        this.baseX = doorDef.x;
        this.baseY = doorDef.y;
        this.x = doorDef.x;
        this.y = doorDef.y;
        this.w = doorDef.w || 32;
        this.h = doorDef.h || 46;
        this.open = true;
        this.level = level;

        // Comedic shifts count: 1 on L1, 1-2 on higher levels
        this.shiftsMax = doorDef.shiftsMax !== undefined ? doorDef.shiftsMax : (level && level.id > 1 ? (Math.random() < 0.6 ? 2 : 1) : 1);
        this.shiftsLeft = this.shiftsMax;

        this.shiftDirection = doorDef.shiftDirection || (this.x > 400 ? -1 : 1);
        this.shiftDistance = doorDef.shiftDistance || 85;

        // States: 'idle', 'alert', 'shifting', 'settled'
        this.state = this.shiftsLeft === 0 ? 'settled' : 'idle';
        this.alertTimer = 0;

        // Animation & Physical Attributes
        this.isHopping = false;
        this.isShifting = false;
        this.isAlert = false;
        this.shiftProgress = 0;
        this.hopStartX = this.x;
        this.hopTargetX = this.x;
        this.hopY = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.opacity = 1;
        this.eyeLookX = 0;
        this.shiftType = 'LEAP_OVER';
        this.cautiousTimer = 0;
        this.shutProgress = 0;
        this.onShutComplete = null;
    }

    startShutting(callback) {
        if (this.state === 'shutting' || this.state === 'shut') return;
        this.state = 'shutting';
        this.shutProgress = 0;
        this.onShutComplete = callback;
    }

    update(player, aiModel, game) {
        // Physical door shutting sequence
        if (this.state === 'shutting') {
            this.shutProgress += 0.12;
            if (this.shutProgress >= 1) {
                this.shutProgress = 1;
                this.state = 'shut';
                if (window.soundFX && window.soundFX.playDoorSlam) {
                    window.soundFX.playDoorSlam();
                }
                if (game) {
                    if (game.shake) game.shake(8, 4.5);
                    if (game.spawnDust) game.spawnDust(this.x + this.w / 2, this.y + this.h);
                }
                if (this.onShutComplete) {
                    this.onShutComplete();
                }
            }
            return;
        }
        if (this.state === 'shut') return;

        // Track player horizontally with animated eyes
        const playerCenterX = player ? player.x : this.x;
        const doorCenterX = this.x + this.w / 2;
        const diffX = playerCenterX - doorCenterX;
        this.eyeLookX = Math.max(-2.2, Math.min(2.2, diffX * 0.04));

        // 1. Shifting animation
        if (this.isShifting) {
            this.shiftProgress += (this.shiftType === 'POP_TELEPORT' ? 0.08 : 0.055);

            if (this.shiftProgress >= 1) {
                this.shiftProgress = 1;
                this.x = this.hopTargetX;
                this.hopY = 0;
                this.rotation = 0;
                this.scaleX = 1;
                this.scaleY = 1;
                this.opacity = 1;
                this.isShifting = false;
                this.isHopping = false;

                // Shift completed!
                this.shiftsLeft--;
                if (this.shiftsLeft <= 0) {
                    this.state = 'settled';
                    if (window.soundFX) window.soundFX.playDoorSettle();
                    if (game) {
                        if (game.spawnDust) game.spawnDust(this.x + this.w / 2, this.y + this.h);
                        // Golden sparkle burst
                        if (game.particles) {
                            for (let i = 0; i < 10; i++) {
                                game.particles.push({
                                    x: this.x + this.w / 2 + (Math.random() - 0.5) * 20,
                                    y: this.y + this.h / 2 + (Math.random() - 0.5) * 28,
                                    vx: (Math.random() - 0.5) * 2.5,
                                    vy: -Math.random() * 2.5 - 0.8,
                                    life: 32,
                                    maxLife: 32,
                                    color: '#ffca28',
                                    size: 2.6,
                                    gravity: 0.08
                                });
                            }
                        }
                    }
                } else {
                    this.state = 'idle';
                    if (game && game.spawnDust) game.spawnDust(this.x + this.w / 2, this.y + this.h);
                }
            } else {
                const t = this.shiftProgress;
                if (this.shiftType === 'LEAP_OVER') {
                    // Parabolic leap over player
                    this.x = this.hopStartX + (this.hopTargetX - this.hopStartX) * t;
                    this.hopY = -Math.sin(t * Math.PI) * 54;
                    this.rotation = Math.sin(t * Math.PI) * (this.shiftDirection * 0.24);
                    // Squash and stretch
                    if (t < 0.2) {
                        this.scaleX = 1.35;
                        this.scaleY = 0.72;
                    } else if (t < 0.8) {
                        this.scaleX = 0.8;
                        this.scaleY = 1.28;
                    } else {
                        this.scaleX = 1.25;
                        this.scaleY = 0.8;
                    }
                } else if (this.shiftType === 'SCURRY_SPRINT') {
                    // Rapid ground skid with running tilt
                    this.x = this.hopStartX + (this.hopTargetX - this.hopStartX) * t;
                    this.hopY = 0;
                    this.rotation = this.shiftDirection * 0.15 * Math.sin(t * Math.PI * 4);
                    this.scaleX = 1.15;
                    this.scaleY = 0.9;
                    if (game && game.spawnDust && Math.random() < 0.35) {
                        game.spawnDust(this.x + this.w / 2, this.y + this.h);
                    }
                } else if (this.shiftType === 'POP_TELEPORT') {
                    // Comic vanish and reappear
                    if (t < 0.5) {
                        this.opacity = Math.max(0, 1 - t * 2.5);
                        this.scaleX = Math.max(0.2, 1 - t * 1.8);
                        this.scaleY = Math.max(0.2, 1 - t * 1.8);
                    } else {
                        this.x = this.hopTargetX;
                        this.opacity = Math.min(1, (t - 0.5) * 2.5);
                        this.scaleX = 1 + Math.sin((t - 0.5) * Math.PI * 2) * 0.35;
                        this.scaleY = 1 - Math.sin((t - 0.5) * Math.PI * 2) * 0.25;
                    }
                } else if (this.shiftType === 'ANTI_AIR_DUCK_SLIDE') {
                    // Flattened duck slide under airborne player
                    this.x = this.hopStartX + (this.hopTargetX - this.hopStartX) * t;
                    this.hopY = this.h * 0.35;
                    this.scaleY = 0.45;
                    this.scaleX = 1.45;
                    this.rotation = 0;
                }
            }
            return;
        }

        // 2. Alert anticipation state
        if (this.isAlert) {
            this.alertTimer--;
            this.scaleX = 0.86;
            this.scaleY = 1.2; // Startle recoil stretch
            if (this.alertTimer <= 0) {
                this.isAlert = false;
                this.executeShift(game);
            }
            return;
        }

        // 3. Settled state check
        if (this.shiftsLeft <= 0) {
            this.state = 'settled';
            return;
        }

        // 4. Proximity & Playstyle trigger detection
        const dist = Math.abs(player.x - (this.x + this.w / 2));
        const yDist = Math.abs(player.y - (this.y + this.h));
        if (yDist > 55) return;

        const profile = aiModel ? aiModel.currentProfile : 'BALANCED';
        let shouldTrigger = false;

        if (profile === 'RUSHER') {
            // Rushers get caught off guard when sprinting at full speed towards the door!
            if (Math.abs(player.vx) > 1.6 && dist < 88) {
                shouldTrigger = true;
            }
        } else if (profile === 'CAUTIOUS') {
            // Cautious players get baited when they hesitate right near the door!
            if (dist < 105 && Math.abs(player.vx) < 0.45) {
                this.cautiousTimer++;
                if (this.cautiousTimer > 15) {
                    shouldTrigger = true;
                }
            } else {
                this.cautiousTimer = 0;
            }
        } else if (profile === 'HOPPER') {
            // Jumpers have the door duck or leap as they jump towards it!
            if (!player.onGround && dist < 88) {
                shouldTrigger = true;
            }
        } else {
            // Balanced: triggers within 68px proximity
            if (dist < 68) {
                shouldTrigger = true;
            }
        }

        // Fallback proximity catch
        if (dist < 52) {
            shouldTrigger = true;
        }

        if (shouldTrigger) {
            this.triggerShift(player, aiModel, game);
        }
    }

    triggerShift(player, aiModel, game) {
        this.state = 'alert';
        this.isAlert = true;
        this.alertTimer = 6; // 6-frame comedy startle anticipation!

        const profile = aiModel ? aiModel.currentProfile : 'BALANCED';
        const rand = Math.random();

        // Weighted shift selection based on player psychology
        if (profile === 'RUSHER') {
            if (rand < 0.45) this.shiftType = 'LEAP_OVER';
            else if (rand < 0.80) this.shiftType = 'POP_TELEPORT';
            else this.shiftType = 'SCURRY_SPRINT';
        } else if (profile === 'CAUTIOUS') {
            if (rand < 0.45) this.shiftType = 'SCURRY_SPRINT';
            else if (rand < 0.75) this.shiftType = 'POP_TELEPORT';
            else this.shiftType = 'LEAP_OVER';
        } else if (profile === 'HOPPER') {
            if (rand < 0.45) this.shiftType = 'ANTI_AIR_DUCK_SLIDE';
            else if (rand < 0.80) this.shiftType = 'LEAP_OVER';
            else this.shiftType = 'SCURRY_SPRINT';
        } else {
            if (rand < 0.25) this.shiftType = 'LEAP_OVER';
            else if (rand < 0.50) this.shiftType = 'SCURRY_SPRINT';
            else if (rand < 0.75) this.shiftType = 'POP_TELEPORT';
            else this.shiftType = 'ANTI_AIR_DUCK_SLIDE';
        }

        // Vault or duck-slide moves towards the side the player approached from (leap over their head!)
        if (this.shiftType === 'LEAP_OVER' || this.shiftType === 'ANTI_AIR_DUCK_SLIDE') {
            this.shiftDirection = player.x < this.x ? -1 : 1;
        } else {
            this.shiftDirection = player.x < this.x ? 1 : -1;
        }
    }

    executeShift(game) {
        this.isShifting = true;
        this.isHopping = (this.shiftType === 'LEAP_OVER');
        this.shiftProgress = 0;
        this.hopStartX = this.x;

        // Calculate safe landing spot on solid ground
        const dist = (this.shiftType === 'POP_TELEPORT') ? 130 : 85;
        let candidateX = this.x + this.shiftDirection * dist;

        candidateX = this.findSafeLandingSpot(candidateX, this.shiftDirection);
        this.hopTargetX = candidateX;

        // Play sound effects & particles
        if (this.shiftType === 'LEAP_OVER') {
            if (window.soundFX) window.soundFX.playDoorBoing();
            if (game && game.spawnDust) game.spawnDust(this.x + this.w / 2, this.y + this.h);
        } else if (this.shiftType === 'POP_TELEPORT') {
            if (window.soundFX) window.soundFX.playDoorPoof();
            if (game && game.particles) {
                for (let i = 0; i < 14; i++) {
                    game.particles.push({
                        x: this.x + this.w / 2 + (Math.random() - 0.5) * 16,
                        y: this.y + this.h / 2 + (Math.random() - 0.5) * 20,
                        vx: (Math.random() - 0.5) * 3.5,
                        vy: -Math.random() * 3 - 0.5,
                        life: 25,
                        maxLife: 25,
                        color: ['#ffffff', '#ffca28', '#8d6e63'][Math.floor(Math.random() * 3)],
                        size: 3,
                        gravity: 0.1
                    });
                }
            }
        } else if (this.shiftType === 'SCURRY_SPRINT' || this.shiftType === 'ANTI_AIR_DUCK_SLIDE') {
            if (window.soundFX) window.soundFX.playDoorScurry();
            if (game && game.spawnDust) game.spawnDust(this.x + this.w / 2, this.y + this.h);
        }

        if (game && game.shake) game.shake(5, 2);
    }

    findSafeLandingSpot(targetX, dir) {
        const boundsW = (this.level && this.level.bounds) ? this.level.bounds.width : 840;
        const minX = 80;
        const maxX = boundsW - 80 - this.w;

        // Find the solid floor supporting the door at its base
        const floorY = this.baseY + this.h;
        let supportingSolid = null;
        if (this.level && this.level.solids) {
            supportingSolid = this.level.solids.find(s => 
                Math.abs(s.y - floorY) <= 5 && 
                s.x <= this.baseX + 10 && 
                (s.x + s.w) >= this.baseX + this.w - 10
            );
        }

        let floorLeft = minX;
        let floorRight = maxX;
        if (supportingSolid) {
            floorLeft = Math.max(minX, supportingSolid.x + 10);
            floorRight = Math.min(maxX, supportingSolid.x + supportingSolid.w - this.w - 10);
        }

        // Clamp targetX strictly to valid solid ground on the current story
        let safeX = Math.max(floorLeft, Math.min(floorRight, targetX));

        // If target was too close or cramped, pick a safe landing at least 65px away along the same floor
        if (Math.abs(safeX - this.x) < 55) {
            const shiftAttempt = dir !== 0 ? dir : -1;
            const cand1 = this.x + shiftAttempt * 85;
            const cand2 = this.x - shiftAttempt * 85;

            if (cand1 >= floorLeft && cand1 <= floorRight) {
                safeX = cand1;
            } else if (cand2 >= floorLeft && cand2 <= floorRight) {
                safeX = cand2;
            }
        }

        // Avoid landing directly on static spikes
        if (this.level && this.level.staticTraps) {
            for (const trap of this.level.staticTraps) {
                if (Math.abs(safeX - trap.x) < 36) {
                    safeX = safeX > trap.x ? Math.min(floorRight, trap.x + 42) : Math.max(floorLeft, trap.x - 42 - this.w);
                }
            }
        }

        return Math.max(floorLeft, Math.min(floorRight, safeX));
    }

    draw(ctx, theme) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x + this.w / 2, this.y + this.hopY + this.h / 2);
        ctx.rotate(this.rotation);
        ctx.scale(this.scaleX, this.scaleY);

        // Draw door centered at origin with expressive eyes, comic reaction and physical shutting
        drawArchedDoor(ctx, -this.w / 2, -this.h / 2, this.w, this.h, theme, {
            eyeLookX: this.eyeLookX,
            state: this.state,
            isAlert: this.isAlert,
            shutProgress: this.shutProgress
        });

        ctx.restore();
    }
}

// --- 1. VANISHING FLOOR TRAP ---
class VanishingFloorTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.w = def.w;
        this.h = def.h || 35;
        this.initialY = def.y;
        this.isSolid = true;
        this.isFloorTrap = true;
        this.state = 'dormant';
        this.vy = 0;
        this.dropSpeed = def.dropSpeed || 1.8;
    }

    update(player, particles, onTrigger) {
        if (this.state === 'dormant') {
            const pLeft = player.x - player.width / 2;
            const pRight = player.x + player.width / 2;
            const pBottom = player.y;

            const isOverX = pRight > this.x + 2 && pLeft < this.x + this.w - 2;
            const isNearY = Math.abs(pBottom - this.y) < 5;

            if (isOverX && isNearY) {
                this.state = 'dropping';
                this.vy = this.dropSpeed;
                if (window.soundFX) window.soundFX.playCrumble();
                if (onTrigger) onTrigger(this);
            }
        } else if (this.state === 'dropping') {
            this.vy += 0.55;
            this.y += this.vy;

            if (this.y - this.initialY > 6) {
                this.isSolid = false;
            }

            if (this.y > 600) {
                this.state = 'gone';
                this.isSolid = false;
            }
        }
    }

    getHazardBox() {
        return null;
    }

    draw(ctx, theme) {
        if (this.state === 'dropping') {
            ctx.save();
            ctx.fillStyle = theme.bgColor;
            ctx.fillRect(this.x, this.y, this.w, this.h);
            ctx.restore();
        }
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
        this.triggerRange = def.triggerRange || 50;

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
        this.vx = def.vx || -4.2;
        this.groundY = def.groundY || 345;
        this.rotation = 0;
        this.state = 'dormant';
        this.triggerX = def.triggerX || (this.x - 110);
        this.triggerRange = def.triggerRange || 65;
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
        this.triggerRange = def.triggerRange || 36;
        this.riseSpeed = def.riseSpeed || 4.5;
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
        this.triggerRange = def.triggerRange || 38;
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

// --- 8. SPINNING SAWBLADE TRAP (RAZORS) ---
class SpinningSawbladeTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.startX = def.x;
        this.startY = def.y;
        this.radius = def.radius || 20;
        this.teethCount = def.teethCount || 10;
        this.rotation = 0;
        this.rotSpeed = def.rotSpeed || 0.24;

        this.patrolAxis = def.patrolAxis || 'none'; // 'none', 'x', 'y'
        this.minX = def.minX !== undefined ? def.minX : def.x - 60;
        this.maxX = def.maxX !== undefined ? def.maxX : def.x + 60;
        this.minY = def.minY !== undefined ? def.minY : def.y - 60;
        this.maxY = def.maxY !== undefined ? def.maxY : def.y + 60;
        this.speed = def.speed || 2.2;
        this.dir = def.dir || 1;
        this.active = true;
    }

    update(player, game, onTrigger) {
        this.rotation += this.rotSpeed;

        if (this.patrolAxis === 'x') {
            this.x += this.speed * this.dir;
            if (this.x >= this.maxX) {
                this.x = this.maxX;
                this.dir = -1;
            } else if (this.x <= this.minX) {
                this.x = this.minX;
                this.dir = 1;
            }
        } else if (this.patrolAxis === 'y') {
            this.y += this.speed * this.dir;
            if (this.y >= this.maxY) {
                this.y = this.maxY;
                this.dir = -1;
            } else if (this.y <= this.minY) {
                this.y = this.minY;
                this.dir = 1;
            }
        }

        // Audio & sparks when player approaches
        if (player && game) {
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140 && Math.random() < 0.04 && window.soundFX && window.soundFX.playSawBuzz) {
                window.soundFX.playSawBuzz();
            }
            if (game.particles && Math.random() < 0.2) {
                game.particles.push({
                    x: this.x + (Math.random() - 0.5) * this.radius,
                    y: this.y + (Math.random() - 0.5) * this.radius,
                    vx: (Math.random() - 0.5) * 3,
                    vy: (Math.random() - 0.5) * 3,
                    life: 8,
                    maxLife: 8,
                    color: '#ffeb3b',
                    size: 1.5,
                    gravity: 0.1
                });
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

        // 1. Draw guide rail slot if patrolling
        if (this.patrolAxis === 'x') {
            ctx.fillStyle = '#1a1410';
            ctx.fillRect(this.minX - 2, this.startY - 3, (this.maxX - this.minX) + 4, 6);
            ctx.fillStyle = '#423328';
            ctx.fillRect(this.minX - 4, this.startY - 5, 4, 10);
            ctx.fillRect(this.maxX, this.startY - 5, 4, 10);
        } else if (this.patrolAxis === 'y') {
            ctx.fillStyle = '#1a1410';
            ctx.fillRect(this.startX - 3, this.minY - 2, 6, (this.maxY - this.minY) + 4);
            ctx.fillStyle = '#423328';
            ctx.fillRect(this.startX - 5, this.minY - 4, 10, 4);
            ctx.fillRect(this.startX - 5, this.maxY, 10, 4);
        }

        // 2. Draw spinning sawblade
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        const r = this.radius;
        const innerR = r * 0.72;
        const teeth = this.teethCount;

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
        if (player && player.onGround && !player.isJumping) {
            const pLeft = player.x - player.width / 2;
            const pRight = player.x + player.width / 2;
            const onTop = pRight > this.x + 2 && pLeft < this.x + this.w - 2 && Math.abs(player.y - this.y) <= 4;
            if (onTop) {
                this.stepTimer++;
                // Carry player smoothly along platform transit
                player.x += this.vx;
                player.y += this.vy;
            } else {
                this.stepTimer = 0;
            }
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
            return;
        }

        // Normal patrol motion
        if (this.axis === 'x') {
            this.x += this.speed * this.dir;
            this.vx = this.speed * this.dir;
            this.vy = 0;
            if (this.x >= this.max) {
                this.x = this.max;
                this.dir = -1;
            } else if (this.x <= this.min) {
                this.x = this.min;
                this.dir = 1;
            }
        } else if (this.axis === 'y') {
            this.y += this.speed * this.dir;
            this.vy = this.speed * this.dir;
            this.vx = 0;
            if (this.y >= this.max) {
                this.y = this.max;
                this.dir = -1;
            } else if (this.y <= this.min) {
                this.y = this.min;
                this.dir = 1;
            }
        }
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
        this.boostVy = def.boostVy || -11.5;
        this.compressTimer = 0;
        this.active = true;
    }

    update(player, game, onTrigger) {
        if (this.compressTimer > 0) this.compressTimer--;

        if (player && player.alive) {
            const pLeft = player.x - player.width / 2;
            const pRight = player.x + player.width / 2;
            const landsOn = pRight > this.x && pLeft < this.x + this.w && Math.abs(player.y - this.y) < 6;
            if (landsOn && player.vy >= 0) {
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

// --- 11. LIVING POP-UP WALL BLOCK TRAP ---
class PopUpWallTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y; // Base floor line
        this.w = def.w || 32;
        this.maxH = def.h || 40;
        this.currentH = 0;
        this.state = 'dormant'; // 'dormant', 'rising', 'risen'
        this.triggerRange = def.triggerRange || 70;
        this.speed = def.speed || 3.5;
        this.isSolid = true;
        this.isDynamicBlock = true;
    }

    update(player, particles, onTrigger) {
        const pCenterX = player.x;
        const pBottom = player.y;
        const dist = Math.abs(pCenterX - (this.x + this.w / 2));
        const isNearFloor = Math.abs(pBottom - this.y) < 32;

        if (this.state === 'dormant') {
            if (dist < this.triggerRange && isNearFloor) {
                this.state = 'rising';
                if (window.soundFX && window.soundFX.playCrumble) window.soundFX.playCrumble();
                if (onTrigger) onTrigger(this);
            }
        } else if (this.state === 'rising') {
            this.currentH = Math.min(this.maxH, this.currentH + this.speed);
            if (this.currentH >= this.maxH) {
                this.state = 'risen';
            }
        }
    }

    getSolidBox() {
        if (this.currentH <= 2) return null;
        return {
            x: this.x,
            y: this.y - this.currentH,
            w: this.w,
            h: this.currentH
        };
    }

    getHazardBox() {
        return null; // Physical barrier to bonk / block
    }

    draw(ctx, theme) {
        if (this.currentH <= 1) return;
        ctx.save();
        const drawY = this.y - this.currentH;
        ctx.fillStyle = theme.groundColor || '#2c221e';
        ctx.fillRect(this.x, drawY, this.w, this.currentH);

        ctx.fillStyle = theme.groundTopColor || '#3d3029';
        ctx.fillRect(this.x, drawY, this.w, Math.min(4, this.currentH));
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(this.x, drawY, this.w, this.currentH);

        if (this.currentH > 18) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.beginPath();
            ctx.moveTo(this.x, drawY + this.currentH / 2);
            ctx.lineTo(this.x + this.w, drawY + this.currentH / 2);
            ctx.stroke();
        }
        ctx.restore();
    }
}

// --- 12. LIVING CEILING SQUISH BLOCK TRAP ---
class CeilingSquishTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y; // Base ceiling level
        this.w = def.w || 60;
        this.maxDrop = def.dropH || 38;
        this.currentDrop = 0;
        this.floorY = def.floorY || (def.y + 115);
        this.state = 'dormant';
        this.triggerRange = def.triggerRange || 75;
        this.speed = def.speed || 3.0;
        this.isSolid = true;
        this.isDynamicBlock = true;
    }

    update(player, particles, onTrigger) {
        const pCenterX = player.x;
        const dist = Math.abs(pCenterX - (this.x + this.w / 2));

        if (this.state === 'dormant') {
            if (dist < this.triggerRange && player.y > this.y) {
                this.state = 'dropping';
                if (window.soundFX && window.soundFX.playCrumble) window.soundFX.playCrumble();
                if (onTrigger) onTrigger(this);
            }
        } else if (this.state === 'dropping') {
            this.currentDrop = Math.min(this.maxDrop, this.currentDrop + this.speed);
            if (this.currentDrop >= this.maxDrop) {
                this.state = 'dropped';
            }
        }
    }

    getSolidBox() {
        if (this.currentDrop <= 1) return null;
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.currentDrop
        };
    }

    getHazardBox() {
        return null; // Crawl underneath safely!
    }

    draw(ctx, theme) {
        if (this.currentDrop <= 1) return;
        ctx.save();
        ctx.fillStyle = theme.ceilingColor || theme.groundColor || '#2c221e';
        ctx.fillRect(this.x, this.y, this.w, this.currentDrop);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fillRect(this.x, this.y + this.currentDrop - 4, this.w, 4);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(this.x, this.y, this.w, this.currentDrop);
        ctx.restore();
    }
}

// --- 13. LIVING SHIFTING STEPPING BLOCK TRAP ---
class ShiftingBlockTrap {
    constructor(def) {
        this.baseX = def.x;
        this.baseY = def.y;
        this.x = def.x;
        this.y = def.y;
        this.w = def.w || 55;
        this.h = def.h || 20;
        this.shiftDist = def.shiftDist || 50;
        this.shiftAxis = def.axis || 'x';
        this.state = 'dormant';
        this.progress = 0;
        this.speed = def.speed || 0.055;
        this.triggerRange = def.triggerRange || 70;
        this.isSolid = true;
        this.isDynamicBlock = true;
    }

    update(player, particles, onTrigger) {
        if (this.state === 'dormant') {
            const pCenterX = player.x;
            const dist = Math.abs(pCenterX - (this.baseX + this.w / 2));
            if (dist < this.triggerRange) {
                this.state = 'shifting';
                if (window.soundFX && window.soundFX.playCrumble) window.soundFX.playCrumble();
                if (onTrigger) onTrigger(this);
            }
        } else if (this.state === 'shifting') {
            this.progress = Math.min(1, this.progress + this.speed);
            if (this.shiftAxis === 'x') {
                this.x = this.baseX + this.shiftDist * Math.sin(this.progress * Math.PI / 2);
            } else {
                this.y = this.baseY + this.shiftDist * Math.sin(this.progress * Math.PI / 2);
            }
            if (this.progress >= 1) {
                this.state = 'shifted';
            }
        }
    }

    getSolidBox() {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h
        };
    }

    getHazardBox() {
        return null;
    }

    draw(ctx, theme) {
        ctx.save();
        ctx.fillStyle = theme.platformColor || theme.groundColor || '#3d3029';
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = theme.groundTopColor || '#4e3f36';
        ctx.fillRect(this.x, this.y, this.w, 3.5);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}

// --- 14. LIVING WALL EJECTOR BLOCK TRAP ---
class WallEjectorTrap {
    constructor(def) {
        this.x = def.x;
        this.y = def.y;
        this.w = def.w || 24;
        this.h = def.h || 32;
        this.ejectDist = def.ejectDist || 36;
        this.direction = def.direction || 1;
        this.currentEject = 0;
        this.state = 'dormant';
        this.triggerRange = def.triggerRange || 65;
        this.speed = def.speed || 4.5;
        this.pauseTimer = 0;
        this.isSolid = true;
        this.isDynamicBlock = true;
    }

    update(player, particles, onTrigger) {
        const pCenterX = player.x;
        const dist = Math.abs(pCenterX - this.x);
        const pNearY = Math.abs(player.y - (this.y + this.h / 2)) < 35;

        if (this.state === 'dormant') {
            if (dist < this.triggerRange && pNearY) {
                this.state = 'punching';
                if (window.soundFX && window.soundFX.playCrumble) window.soundFX.playCrumble();
                if (onTrigger) onTrigger(this);
            }
        } else if (this.state === 'punching') {
            this.currentEject = Math.min(this.ejectDist, this.currentEject + this.speed);
            if (this.currentEject >= this.ejectDist) {
                this.state = 'extended';
                this.pauseTimer = 35;
            }
        } else if (this.state === 'extended') {
            this.pauseTimer--;
            if (this.pauseTimer <= 0) {
                this.state = 'retracting';
            }
        } else if (this.state === 'retracting') {
            this.currentEject = Math.max(0, this.currentEject - 1.5);
            if (this.currentEject <= 0) {
                this.state = 'dormant';
            }
        }
    }

    getSolidBox() {
        if (this.currentEject <= 2) return null;
        const blockX = this.direction > 0 ? this.x : (this.x - this.currentEject);
        return {
            x: blockX,
            y: this.y,
            w: this.currentEject,
            h: this.h
        };
    }

    getHazardBox() {
        return null;
    }

    draw(ctx, theme) {
        if (this.currentEject <= 2) return;
        ctx.save();
        const blockX = this.direction > 0 ? this.x : (this.x - this.currentEject);
        ctx.fillStyle = theme.groundColor || '#2c221e';
        ctx.fillRect(blockX, this.y, this.currentEject, this.h);
        ctx.fillStyle = 'rgba(255, 202, 40, 0.4)';
        ctx.fillRect(this.direction > 0 ? (blockX + this.currentEject - 3) : blockX, this.y, 3, this.h);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(blockX, this.y, this.currentEject, this.h);
        ctx.restore();
    }
}

function drawArchedDoor(ctx, x, y, w, h, theme, options = {}) {
    const { eyeLookX = 0, state = 'idle', isAlert = false, shutProgress = 0 } = options;

    ctx.save();

    // 1. SETTLED STATE: The door will not jump again -> TURNS COMPLETELY PITCH BLACK!
    if (state === 'settled' || state === 'entering') {
        // Deep matte black outer arched frame
        ctx.fillStyle = '#050505';
        ctx.beginPath();
        ctx.moveTo(x, y + h);
        ctx.lineTo(x, y + w / 2);
        ctx.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0);
        ctx.lineTo(x + w, y + h);
        ctx.closePath();
        ctx.fill();

        // Pitch black inner doorway void
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(x + 2.5, y + h);
        ctx.lineTo(x + 2.5, y + w / 2 + 2);
        ctx.arc(x + w / 2, y + w / 2 + 2, w / 2 - 2.5, Math.PI, 0);
        ctx.lineTo(x + w - 2.5, y + h);
        ctx.closePath();
        ctx.fill();

        // Subtle dark crisp silhouette edge
        ctx.strokeStyle = '#222222';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.restore();
        return;
    }

    // Outer arch frame for active/hopping door
    ctx.fillStyle = theme.doorFrameColor || '#473628';
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x, y + w / 2);
    ctx.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
    ctx.fill();

    // Inner doorway rendering
    if (state === 'shutting' || state === 'shut') {
        // First draw the dark inner passage behind
        ctx.fillStyle = '#0a0705';
        ctx.beginPath();
        ctx.moveTo(x + 3.5, y + h);
        ctx.lineTo(x + 3.5, y + w / 2 + 2);
        ctx.arc(x + w / 2, y + w / 2 + 2, w / 2 - 3.5, Math.PI, 0);
        ctx.lineTo(x + w - 3.5, y + h);
        ctx.closePath();
        ctx.fill();

        // Heavy door slab physically swinging / slamming shut across the opening!
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
        if (shutProgress >= 0.8) {
            ctx.fillStyle = '#212121';
            // Upper iron strap
            ctx.fillRect(x + 3.5, y + h * 0.42, currentDoorW, 3.5);
            // Lower iron strap
            ctx.fillRect(x + 3.5, y + h * 0.72, currentDoorW, 3.5);

            // Heavy locked iron padlock / latch
            if (state === 'shut') {
                ctx.fillStyle = '#ffb300'; // Golden padlock
                ctx.beginPath();
                ctx.arc(x + w - 8, y + h * 0.58, 3.2, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#111';
                ctx.fillRect(x + w - 8.6, y + h * 0.56, 1.2, 2.5);
            }
        }
    } else {
        // Normal door (idle, alert, shifting)
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
    }

    // Expressive Eyes (only when not shut)
    if (state !== 'shut' && state !== 'shutting') {
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

window.TrapManager = TrapManager;
window.AdaptiveDoor = AdaptiveDoor;
window.TrollPortalTrap = TrollPortalTrap;
window.DroppingCeilingSpikeTrap = DroppingCeilingSpikeTrap;
window.StaticSpikeTrap = StaticSpikeTrap;
window.VanishingFloorTrap = VanishingFloorTrap;
window.PistonCrusherTrap = PistonCrusherTrap;
window.RollingBallTrap = RollingBallTrap;
window.EmergingSpikeTrap = EmergingSpikeTrap;
window.SpinningSawbladeTrap = SpinningSawbladeTrap;
window.MovingPlatformTrap = MovingPlatformTrap;
window.SpringPadTrap = SpringPadTrap;
window.PopUpWallTrap = PopUpWallTrap;
window.CeilingSquishTrap = CeilingSquishTrap;
window.ShiftingBlockTrap = ShiftingBlockTrap;
window.WallEjectorTrap = WallEjectorTrap;
window.drawArchedDoor = drawArchedDoor;
