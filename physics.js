// physics.js - Tuned 2D Platformer Physics with Wall/Floor Separation & Crawling Mechanics
class Physics {
    constructor() {
        this.gravity = 0.42;
        this.maxFallSpeed = 9.8;
        this.runSpeed = 3.6;
        this.crawlSpeed = 2.2;
        this.accel = 0.85;
        this.friction = 0.72;
        this.jumpForce = -7.5; // Tuned so player never hits the ceiling when jumping!

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
                if (trap.isSolid && trap.active !== false) {
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
            player.vx += moveDir * this.accel;
            player.facing = moveDir;
        } else {
            player.vx *= this.friction;
            if (Math.abs(player.vx) < 0.05) player.vx = 0;
        }

        const maxSpeed = player.isCrawling ? this.crawlSpeed : this.runSpeed;
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
        this.resolveYCollisions(player, activeSolids);

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
        const pLeft = player.x - player.width / 2;
        const pRight = player.x + player.width / 2;
        const pTop = player.y - player.height;
        const pBottom = player.y;

        for (const s of solids) {
            if (s.passthrough || s.isOneWay || s.isWallOnly) continue;
            // Snag prevention: only collide horizontally if penetrating at least 3px into the vertical wall face.
            // Walking on top of adjacent floor blocks will never snag or register as a wall collision!
            if (pRight > s.x && pLeft < s.x + s.w && pBottom > s.y + 3 && pTop < s.y + s.h - 1) {
                if (player.vx > 0) {
                    player.x = s.x - player.width / 2;
                    player.vx = 0;
                } else if (player.vx < 0) {
                    player.x = s.x + s.w + player.width / 2;
                    player.vx = 0;
                }
            }
        }
    }

    resolveYCollisions(player, solids) {
        const pLeft = player.x - player.width / 2 + 1.5;
        const pRight = player.x + player.width / 2 - 1.5;
        const pTop = player.y - player.height;
        const pBottom = player.y;

        for (const s of solids) {
            // isWallOnly blocks (like vertical slam crushers) DO NOT push or snap player Y!
            if (s.passthrough || s.isWallOnly) continue;

            // One-way moving platforms & elevators (only collide with feet from above when falling or landing!)
            if (s.isOneWay) {
                // If player is moving upward (jumping), NEVER collide or force down!
                if (player.vy < 0) continue;

                const prevBottom = player.y - player.vy;
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

            if (pRight > s.x && pLeft < s.x + s.w && pBottom > s.y && pTop < s.y + s.h) {
                // Ceilings anchored at y: 0 are NEVER floors; always push down into corridor!
                if (s.y === 0) {
                    player.y = s.y + s.h + player.height;
                    player.vy = Math.max(0, player.vy);
                    continue;
                }

                if (player.vy >= 0) {
                    const prevBottom = player.y - player.vy;
                    const topOverlap = player.y - s.y;
                    const bottomOverlap = (s.y + s.h) - (player.y - player.height);

                    // Landing on top of solid floor:
                    // Player arrived from above, or penetration is closer to top surface than bottom.
                    // Snaps player.y exactly to s.y so player is firmly grounded with ZERO floating pixels!
                    if (prevBottom <= s.y + Math.max(16, player.vy + 4) || topOverlap <= bottomOverlap) {
                        player.y = s.y;
                        player.vy = 0;
                        player.onGround = true;
                        player.isJumping = false;
                    } else {
                        // Truly hit bottom of a ceiling block hanging down: push down
                        player.y = s.y + s.h + player.height;
                        player.vy = 0;
                    }
                } else if (player.vy < 0) {
                    // Hitting solid ceiling from below: push down
                    player.y = s.y + s.h + player.height;
                    player.vy = 0;
                }
            }
        }
    }

    checkHazards(player, hazards) {
        this.lastCollidingHazard = null;
        if (!player.alive) return false;
        const pLeft = player.x - player.width / 2 + 2;
        const pRight = player.x + player.width / 2 - 2;
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

        const pLeft = player.x - player.width / 2;
        const pRight = player.x + player.width / 2;
        const pTop = player.y - player.height;
        const pBottom = player.y;

        return (
            pRight > door.x + 4 &&
            pLeft < door.x + door.w - 4 &&
            pBottom > door.y + 10 &&
            pTop < door.y + door.h
        );
    }
}

window.Physics = Physics;
