// physics.js - Tuned 2D Platformer Physics with Wall/Floor Separation & Crawling Mechanics
class Physics {
    constructor() {
        this.gravity = 0.42;
        this.maxFallSpeed = 9.8;
        this.runSpeed = 3.8;
        this.leapSpeed = 4.4; // Enhanced forward leap velocity for clearing group spikes & boulders
        this.crawlSpeed = 2.2;
        this.accel = 0.90;
        this.airAccel = 0.92;
        this.friction = 0.72;
        this.airFriction = 0.95;
        this.jumpForce = -7.8; // Tuned for crisp leap clearance while remaining safely within corridor ceiling bounds!

        this.standWidth = 12;
        this.standHeight = 24;
        this.crawlWidth = 20;
        this.crawlHeight = 12;
        
        // Coyote time & Jump buffer (frames)
        this.coyoteMax = 6;
        this.bufferMax = 5;
        this.lastCollidingHazard = null;
    }

    /**
     * Updates player position and handles collisions with terrain and dynamic obstacles
     */
    update(player, input, solids, traps, bounds) {
        if (!player.alive) return;

        // Combine static solids and active moving blocks
        const activeSolids = [...solids];
        if (traps) {
            for (const trap of traps) {
                if (typeof trap.getSolidBox === 'function') {
                    const box = trap.getSolidBox();
                    if (box) activeSolids.push(box);
                } else if (trap.isSolid && trap.active !== false) {
                    activeSolids.push(trap);
                }
            }
        }

        // --- CROUCH / CRAWL ON ALL FOURS ---
        if (input.down) {
            player.isCrawling = true;
        } else if (player.isCrawling) {
            // Check if headroom is clear before standing back upright
            const blocked = this.isHeadroomBlocked(player, activeSolids, this.standHeight);
            if (!blocked) {
                player.isCrawling = false;
            }
        }

        if (player.isCrawling) {
            player.width = this.crawlWidth;
            player.height = this.crawlHeight;
        } else {
            player.width = this.standWidth;
            player.height = this.standHeight;
        }

        // --- HORIZONTAL MOVEMENT ---
        let moveDir = 0;
        if (input.left) moveDir -= 1;
        if (input.right) moveDir += 1;

        if (moveDir !== 0) {
            const currentAccel = player.onGround ? this.accel : this.airAccel;
            player.vx += moveDir * currentAccel;
            player.facing = moveDir;
        } else {
            const currentFriction = player.onGround ? this.friction : this.airFriction;
            player.vx *= currentFriction;
            if (Math.abs(player.vx) < 0.05) player.vx = 0;
        }

        let maxSpeed;
        if (player.isCrawling) {
            maxSpeed = this.crawlSpeed;
        } else if (!player.onGround) {
            maxSpeed = this.leapSpeed;
        } else {
            maxSpeed = this.runSpeed;
        }
        player.vx = Math.max(-maxSpeed, Math.min(maxSpeed, player.vx));

        // --- JUMP LOGIC (Variable height, coyote time, buffer) ---
        if (player.onGround) {
            player.coyoteTimer = this.coyoteMax;
        } else {
            if (player.coyoteTimer > 0) player.coyoteTimer--;
        }

        if (input.jumpPressed) {
            player.jumpBufferTimer = this.bufferMax;
        } else if (player.jumpBufferTimer > 0) {
            player.jumpBufferTimer--;
        }

        if (player.jumpBufferTimer > 0 && player.coyoteTimer > 0) {
            let canJump = true;
            if (player.isCrawling) {
                if (this.isHeadroomBlocked(player, activeSolids, this.standHeight)) {
                    canJump = false; // Blocked under low ceiling
                } else if (!input.down) {
                    player.isCrawling = false;
                    player.width = this.standWidth;
                    player.height = this.standHeight;
                }
            }

            if (canJump) {
                player.vy = this.jumpForce;
                player.onGround = false;
                player.coyoteTimer = 0;
                player.jumpBufferTimer = 0;
                player.isJumping = true;

                // Dynamic forward leap momentum: when jumping while holding a direction,
                // immediately impart forward leap velocity so jumps from standstill or walk carry full leap momentum!
                if (moveDir !== 0) {
                    player.vx = moveDir * Math.max(Math.abs(player.vx), this.leapSpeed);
                    player.facing = moveDir;
                }

                if (window.soundFX) window.soundFX.playJump();
            }
        }

        if (!input.jump && player.isJumping && player.vy < -1.5) {
            player.vy *= 0.5;
            player.isJumping = false;
        }

        // Apply gravity
        player.vy += this.gravity;
        if (player.vy > this.maxFallSpeed) player.vy = this.maxFallSpeed;

        // Footstep audio
        if (player.onGround && Math.abs(player.vx) > 0.4) {
            player.stepTimer = (player.stepTimer || 0) + 1;
            const stepInterval = player.isCrawling ? 11 : 15;
            if (player.stepTimer > stepInterval) {
                player.stepTimer = 0;
                if (window.soundFX) window.soundFX.playFootstep();
            }
        }

        // --- X AXIS COLLISION ---
        player.x += player.vx;
        this.resolveXCollisions(player, activeSolids);

        // --- Y AXIS COLLISION ---
        player.onGround = false;
        player.y += player.vy;
        this.resolveYCollisions(player, activeSolids, bounds);

        // Fall off the world check (triggered while still in visible viewport for on-screen splat!)
        if (bounds && player.y > bounds.height - 5) {
            player.die("fell_in_hole");
        }
    }

    isHeadroomBlocked(player, solids, targetHeight) {
        const pLeft = player.x - this.standWidth / 2 + 1.5;
        const pRight = player.x + this.standWidth / 2 - 1.5;
        const pTop = player.y - targetHeight;
        const pBottom = player.y - player.height;

        for (const s of solids) {
            if (s.passthrough || s.isWallOnly) continue;
            if (pRight > s.x && pLeft < s.x + s.w && pBottom > s.y && pTop < s.y + s.h) {
                return true;
            }
        }
        return false;
    }

    resolveXCollisions(player, solids) {
        const prevX = player.x - player.vx;
        const prevLeft = prevX - player.width / 2;
        const prevRight = prevX + player.width / 2;
        const pTop = player.y - player.height;
        const pBottom = player.y;

        for (const s of solids) {
            if (s.passthrough || s.isOneWay || s.isWallOnly) continue;

            // Only collide horizontally if within the vertical span of the solid
            // (pBottom > s.y + 1 prevents snagging on flat floors under feet)
            if (pBottom <= s.y + 1 || pTop >= s.y + s.h - 1) continue;

            const pLeft = player.x - player.width / 2;
            const pRight = player.x + player.width / 2;

            // Check horizontal bounding overlap
            if (pRight > s.x && pLeft < s.x + s.w) {
                // Determine direction based on previous frame position
                if (prevRight <= s.x + 1 || (player.vx > 0 && prevRight <= s.x + player.vx + 1)) {
                    // Approached from the LEFT face
                    player.x = s.x - player.width / 2;
                    if (player.vx > 0) player.vx = 0;
                } else if (prevLeft >= s.x + s.w - 1 || (player.vx < 0 && prevLeft >= s.x + s.w + player.vx - 1)) {
                    // Approached from the RIGHT face
                    player.x = s.x + s.w + player.width / 2;
                    if (player.vx < 0) player.vx = 0;
                } else {
                    // Pre-existing overlap or crouch width expansion: use minimum penetration displacement
                    const overlapLeft = pRight - s.x;
                    const overlapRight = (s.x + s.w) - pLeft;

                    if (overlapLeft < overlapRight) {
                        player.x = s.x - player.width / 2;
                        if (player.vx > 0) player.vx = 0;
                    } else {
                        player.x = s.x + s.w + player.width / 2;
                        if (player.vx < 0) player.vx = 0;
                    }
                }
            }
        }
    }

    resolveYCollisions(player, solids, bounds) {
        const pLeft = player.x - player.width / 2 + 1.5;
        const pRight = player.x + player.width / 2 - 1.5;
        const boundsH = bounds ? bounds.height : 480;
        const prevBottom = player.y - player.vy;
        const prevTop = prevBottom - player.height;

        for (const s of solids) {
            // isWallOnly blocks DO NOT push or snap player Y
            if (s.passthrough || s.isWallOnly) continue;

            // One-way moving platforms & elevators (only collide from above when falling)
            if (s.isOneWay) {
                if (player.vy < 0) continue; // Moving upward: pass through

                const platVy = s.vy || 0;
                const landingTolerance = Math.max(16, player.vy + Math.abs(platVy) + 4);

                if (pRight > s.x + 2 && pLeft < s.x + s.w - 2) {
                    if (prevBottom <= s.y + landingTolerance && player.y >= s.y - 4) {
                        player.y = s.y;
                        player.vy = 0;
                        player.onGround = true;
                        player.isJumping = false;
                    }
                }
                continue;
            }

            // Standard solid: check horizontal overlap first
            if (pRight <= s.x || pLeft >= s.x + s.w) continue;

            const pTop = player.y - player.height;
            const pBottom = player.y;

            // Check vertical overlap
            if (pBottom > s.y && pTop < s.y + s.h) {
                const isWorldBottom = (s.y + s.h >= boundsH - 10);

                // Ceiling anchored to top of world: always push down
                if (s.y === 0 && !isWorldBottom) {
                    player.y = s.y + s.h + player.height;
                    if (player.vy < 0) player.vy = 0;
                    player.isJumping = false;
                    continue;
                }

                if (player.vy < 0) {
                    // Moving upward into a ceiling or underside of a hanging beam/ledge
                    if (!isWorldBottom && (prevBottom >= s.y + s.h || prevTop >= s.y + s.h + player.vy - 4)) {
                        player.y = s.y + s.h + player.height;
                        player.vy = 0;
                        player.isJumping = false;
                    }
                } else {
                    // Falling, landing, or standing on a floor
                    if (prevBottom <= s.y + Math.max(16, player.vy + 4) || isWorldBottom) {
                        player.y = s.y;
                        player.vy = 0;
                        player.onGround = true;
                        player.isJumping = false;
                    } else if (!isWorldBottom && pTop < s.y + s.h && prevTop >= s.y + s.h - 8) {
                        // Head clipping underside of overhead block while vy >= 0
                        player.y = s.y + s.h + player.height;
                        player.vy = 0;
                    }
                }
            }
        }
    }

    checkHazards(player, hazards) {
        this.lastCollidingHazard = null;
        if (!player.alive) return false;
        const padX = player.isCrawling ? 3.0 : 2.0;
        const pLeft = player.x - player.width / 2 + padX;
        const pRight = player.x + player.width / 2 - padX;
        const pTop = player.y - player.height + 2;
        const pBottom = player.y - 1;

        for (const h of hazards) {
            if (h.active === false) continue;
            if (h.isRadial) {
                // Circle-box intersection test for spinning razor sawblades
                const closestX = Math.max(pLeft, Math.min(h.cx, pRight));
                const closestY = Math.max(pTop, Math.min(h.cy, pBottom));
                const distX = h.cx - closestX;
                const distY = h.cy - closestY;
                if ((distX * distX + distY * distY) < (h.r * h.r)) {
                    this.lastCollidingHazard = h;
                    return true;
                }
                continue;
            }
            if (pRight > h.x && pLeft < h.x + h.w && pBottom > h.y && pTop < h.y + h.h) {
                this.lastCollidingHazard = h;
                return true;
            }
        }
        return false;
    }

    checkDoor(player, door) {
        if (!door || door.open === false) return false;
        // Cannot enter door while it is in comedic motion, hopping, startled alert, or already shut
        if (door.isHopping || door.isShifting || door.isAlert || door.state === 'shutting' || door.state === 'shut') return false;

        // Player must be grounded or touching the ground (not brushing from overhead jump or falling past)
        if (!player.onGround && Math.abs(player.vy) > 2.0) return false;

        const doorCenterX = door.x + door.w / 2;
        const doorFloorY = door.y + door.h;
        const distCenterX = Math.abs(player.x - doorCenterX);
        const distFloorY = Math.abs(player.y - doorFloorY);

        // Player must step inside the center opening of the doorway arch on the floor
        return (distCenterX <= 14 && distFloorY <= 8);
    }
}

window.Physics = Physics;
