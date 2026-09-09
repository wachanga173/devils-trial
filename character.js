// character.js - Proportional Articulated Character with Running, Jumping, and Crawling on All Fours
class CharacterRenderer {
    constructor() {
        this.runCycle = 0;
        this.crawlCycle = 0;
    }

    /**
     * Draw the character with full procedural limb animation
     * Upright: ~24px height. Crawling on all fours: ~12px height (allows ducking under razors!)
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} x Center X
     * @param {number} y Bottom Y (ground level)
     * @param {number} vx Horizontal velocity
     * @param {number} vy Vertical velocity
     * @param {boolean} onGround Whether touching the floor
     * @param {number} facing 1 for right, -1 for left
     * @param {string} color Silhouette color
     * @param {boolean} isCrawling Whether player is crawling on all fours
     */
    draw(ctx, x, y, vx, vy, onGround, facing, color = '#111111', isCrawling = false) {
        const isMoving = Math.abs(vx) > 0.15;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(facing, 1);

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2.4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // --- CRAWLING ON ALL FOURS ANIMATION ---
        if (isCrawling) {
            this.drawCrawl(ctx, isMoving, vx, color);
            ctx.restore();
            return;
        }

        // --- UPRIGHT WALKING / RUNNING / JUMPING ---
        if (onGround && isMoving) {
            this.runCycle += Math.abs(vx) * 0.38;
            if (this.runCycle > Math.PI * 2) {
                this.runCycle -= Math.PI * 2;
            }
        } else if (onGround) {
            this.runCycle *= 0.75;
        }

        // Proportional measurements: total height = 24px (compact, nimble stick figure)
        const headRadius = 3.4;
        const torsoLength = 9.0;
        const upperLegLength = 6.0;
        const lowerLegLength = 6.0;
        const upperArmLength = 5.2;
        const lowerArmLength = 4.6;

        // Ground-locked vertical bobbing while running (subtle torso dynamics, feet stay locked to y = 0)
        const bobY = onGround && isMoving ? Math.abs(Math.sin(this.runCycle * 2)) * 0.5 : 0;
        const hipY = -11.6 + (onGround ? bobY * 0.3 : 0);
        const shoulderY = hipY - torsoLength;
        const headCenterY = shoulderY - headRadius - 1.2;

        let leftHipAngle = 0;
        let rightHipAngle = 0;
        let leftKneeAngle = 0;
        let rightKneeAngle = 0;

        let leftShoulderAngle = 0;
        let rightShoulderAngle = 0;
        let leftElbowAngle = 0;
        let rightElbowAngle = 0;

        if (!onGround) {
            // JUMPING / FALLING ANIMATION
            if (vy < 0) {
                // Rising: arms up, knees tucked
                leftShoulderAngle = -2.4;
                rightShoulderAngle = -2.2;
                leftElbowAngle = -0.3;
                rightElbowAngle = -0.4;

                leftHipAngle = 0.5;
                leftKneeAngle = 1.0;
                rightHipAngle = -0.2;
                rightKneeAngle = 0.7;
            } else {
                // Falling: arms flailing up/out, legs reaching for ground
                const flail = Math.sin(Date.now() * 0.025) * 0.25;
                leftShoulderAngle = -2.6 + flail;
                rightShoulderAngle = -2.0 - flail;
                leftElbowAngle = 0.4;
                rightElbowAngle = 0.4;

                leftHipAngle = -0.2;
                leftKneeAngle = 0.3;
                rightHipAngle = 0.3;
                rightKneeAngle = 0.4;
            }
        } else if (isMoving) {
            // RUNNING ANIMATION WITH 2-JOINT INVERSE KINEMATICS:
            // Stance foot is mathematically locked to ground line y = 0 (0 floating pixels!)
            const strideLength = 4.2;

            // Leg A (Left)
            let footAX, footAY;
            if (this.runCycle < Math.PI) {
                const t = this.runCycle / Math.PI;
                footAX = strideLength * (1 - 2 * t);
                footAY = 0; // Stance foot firmly on the floor
            } else {
                const t = (this.runCycle - Math.PI) / Math.PI;
                footAX = strideLength * (-1 + 2 * t);
                footAY = -Math.sin(t * Math.PI) * 4.2; // Swing foot lifting forward
            }

            // Leg B (Right, offset by PI)
            const cycleB = (this.runCycle + Math.PI) % (Math.PI * 2);
            let footBX, footBY;
            if (cycleB < Math.PI) {
                const t = cycleB / Math.PI;
                footBX = strideLength * (1 - 2 * t);
                footBY = 0; // Stance foot firmly on the floor
            } else {
                const t = (cycleB - Math.PI) / Math.PI;
                footBX = strideLength * (-1 + 2 * t);
                footBY = -Math.sin(t * Math.PI) * 4.2; // Swing foot lifting forward
            }

            const ikA = this.solveIK(0, hipY, footAX, footAY, upperLegLength, lowerLegLength, 1);
            const ikB = this.solveIK(0, hipY, footBX, footBY, upperLegLength, lowerLegLength, 1);

            leftHipAngle = ikA.hipAngle;
            leftKneeAngle = ikA.kneeAngle;
            rightHipAngle = ikB.hipAngle;
            rightKneeAngle = ikB.kneeAngle;

            // Athletic counter-arm pumping
            leftShoulderAngle = -(footAX / strideLength) * 0.75 + 0.3;
            leftElbowAngle = 0.55;

            rightShoulderAngle = -(footBX / strideLength) * 0.75 + 0.3;
            rightElbowAngle = 0.55;
        } else {
            // IDLE ANIMATION: both feet firmly planted on ground line y = 0
            const breathe = Math.sin(Date.now() * 0.003) * 0.06;
            const ikLeft = this.solveIK(0, hipY, -1.8, 0, upperLegLength, lowerLegLength, 1);
            const ikRight = this.solveIK(0, hipY, 1.8, 0, upperLegLength, lowerLegLength, 1);

            leftHipAngle = ikLeft.hipAngle;
            leftKneeAngle = ikLeft.kneeAngle;
            rightHipAngle = ikRight.hipAngle;
            rightKneeAngle = ikRight.kneeAngle;

            leftShoulderAngle = 0.2 + breathe;
            rightShoulderAngle = -0.12 - breathe;
            leftElbowAngle = 0.2;
            rightElbowAngle = 0.2;
        }

        // 1. Draw Back Limbs
        this.drawLeg(ctx, 0, hipY, leftHipAngle, leftKneeAngle, upperLegLength, lowerLegLength);
        this.drawArm(ctx, 0, shoulderY, leftShoulderAngle, leftElbowAngle, upperArmLength, lowerArmLength);

        // 2. Draw Torso
        const torsoLean = onGround && isMoving ? 1.6 : 0;
        ctx.beginPath();
        ctx.moveTo(0, hipY);
        ctx.lineTo(torsoLean, shoulderY);
        ctx.stroke();

        // 3. Draw Head & Eye
        ctx.beginPath();
        ctx.arc(torsoLean * 1.2, headCenterY, headRadius, 0, Math.PI * 2);
        ctx.fill();

        // Eye dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(torsoLean * 1.2 + 1.6, headCenterY - 0.5, 0.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = color;

        // 4. Draw Front Limbs
        this.drawLeg(ctx, 0, hipY, rightHipAngle, rightKneeAngle, upperLegLength, lowerLegLength);
        this.drawArm(ctx, torsoLean, shoulderY, rightShoulderAngle, rightElbowAngle, upperArmLength, lowerArmLength);

        ctx.restore();
    }

    /**
     * Procedural Quad Crawl Animation on All Fours:
     * Total height is under 12px off ground so the player safely crawls under razors!
     */
    drawCrawl(ctx, isMoving, vx, color) {
        if (isMoving) {
            this.crawlCycle += Math.abs(vx) * 0.45;
            if (this.crawlCycle > Math.PI * 2) {
                this.crawlCycle -= Math.PI * 2;
            }
        } else {
            this.crawlCycle *= 0.8;
        }

        const stride = Math.sin(this.crawlCycle);
        const counterStride = Math.sin(this.crawlCycle + Math.PI);
        const spineBob = isMoving ? Math.abs(Math.sin(this.crawlCycle * 2)) * 1.2 : 0;

        // Torso spans horizontally between rear hip and front shoulder
        const rearHipX = -7;
        const rearHipY = -6.5 - spineBob * 0.4;
        const frontShoulderX = 5.5;
        const frontShoulderY = -6.0 - spineBob * 0.4;

        // 1. Back leg (far)
        const bLegFarX = rearHipX + stride * 3.5;
        ctx.beginPath();
        ctx.moveTo(rearHipX, rearHipY);
        ctx.lineTo(rearHipX - 2.5, rearHipY + 3.0);
        ctx.lineTo(bLegFarX, 0);
        ctx.stroke();

        // 2. Front arm (far)
        const fArmFarX = frontShoulderX + counterStride * 3.5;
        ctx.beginPath();
        ctx.moveTo(frontShoulderX, frontShoulderY);
        ctx.lineTo(frontShoulderX + 1.5, frontShoulderY + 3.0);
        ctx.lineTo(fArmFarX, 0);
        ctx.stroke();

        // 3. Horizontal Torso / Spine
        ctx.beginPath();
        ctx.moveTo(rearHipX, rearHipY);
        ctx.quadraticCurveTo((rearHipX + frontShoulderX) / 2, rearHipY - 1.2, frontShoulderX, frontShoulderY);
        ctx.stroke();

        // 4. Head extended forward and low (Head center at y = -8.2, height under 12px!)
        const headRadius = 3.2;
        const headX = frontShoulderX + 4.5;
        const headY = frontShoulderY - 1.8;

        ctx.beginPath();
        ctx.arc(headX, headY, headRadius, 0, Math.PI * 2);
        ctx.fill();

        // Focused forward-looking eye
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(headX + 1.6, headY - 0.5, 0.85, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = color;

        // 5. Back leg (near)
        const bLegNearX = rearHipX + counterStride * 3.5;
        ctx.beginPath();
        ctx.moveTo(rearHipX, rearHipY);
        ctx.lineTo(rearHipX - 1.0, rearHipY + 3.2);
        ctx.lineTo(bLegNearX, 0);
        ctx.stroke();

        // 6. Front arm (near)
        const fArmNearX = frontShoulderX + stride * 3.5;
        ctx.beginPath();
        ctx.moveTo(frontShoulderX, frontShoulderY);
        ctx.lineTo(frontShoulderX + 2.5, frontShoulderY + 3.2);
        ctx.lineTo(fArmNearX, 0);
        ctx.stroke();
    }

    /**
     * 2-Joint Analytical Inverse Kinematics for legs:
     * Guarantees stance foot lands mathematically on targetFootY (0 floating pixels).
     */
    solveIK(hipX, hipY, footX, footY, L1, L2, bendDir = 1) {
        const dx = footX - hipX;
        const dy = footY - hipY;
        let dist = Math.hypot(dx, dy);
        const maxLen = L1 + L2 - 0.001;
        if (dist > maxLen) dist = maxLen;
        const minLen = Math.abs(L1 - L2) + 0.001;
        if (dist < minLen) dist = minLen;

        const baseAngle = Math.atan2(dx, dy);
        const cosAngle1 = (L1 * L1 + dist * dist - L2 * L2) / (2 * L1 * dist);
        const angle1 = Math.acos(Math.max(-1, Math.min(1, cosAngle1)));

        const hipAngle = baseAngle + bendDir * angle1;
        const cosKnee = (L1 * L1 + L2 * L2 - dist * dist) / (2 * L1 * L2);
        const kneeAngle = (Math.PI - Math.acos(Math.max(-1, Math.min(1, cosKnee)))) * (-bendDir);

        return { hipAngle, kneeAngle };
    }

    drawLeg(ctx, startX, startY, hipAngle, kneeAngle, upperLen, lowerLen) {
        const kneeX = startX + Math.sin(hipAngle) * upperLen;
        const kneeY = startY + Math.cos(hipAngle) * upperLen;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(kneeX, kneeY);
        ctx.stroke();

        const totalAngle = hipAngle + kneeAngle;
        const footX = kneeX + Math.sin(totalAngle) * lowerLen;
        const footY = kneeY + Math.cos(totalAngle) * lowerLen;

        ctx.beginPath();
        ctx.moveTo(kneeX, kneeY);
        ctx.lineTo(footX, footY);
        ctx.lineTo(footX + 1.8, footY);
        ctx.stroke();
    }

    drawArm(ctx, startX, startY, shoulderAngle, elbowAngle, upperLen, lowerLen) {
        const elbowX = startX + Math.sin(shoulderAngle) * upperLen;
        const elbowY = startY + Math.cos(shoulderAngle) * upperLen;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(elbowX, elbowY);
        ctx.stroke();

        const totalAngle = shoulderAngle + elbowAngle;
        const handX = elbowX + Math.sin(totalAngle) * lowerLen;
        const handY = elbowY + Math.cos(totalAngle) * lowerLen;

        ctx.beginPath();
        ctx.moveTo(elbowX, elbowY);
        ctx.lineTo(handX, handY);
        ctx.stroke();
    }
}

window.CharacterRenderer = CharacterRenderer;
