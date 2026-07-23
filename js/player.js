import { ENTITY_STATE } from './constants.js';

export class PlayerActorEntity {
    constructor(x, y, baseConfig) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 48;
        this.vx = 0;
        this.vy = 0;
        
        this.config = baseConfig;
        
        this.hp = baseConfig.maxHp;
        this.mp = baseConfig.maxMp;
        
        this.onGround = false;
        this.inWater = false;
        this.isClimbingAvailable = false;
        this.isClimbing = false;
        this.isDashing = false;
        this.dashTimer = 0;
        this.jumpCount = 0;
        
        this.state = ENTITY_STATE.IDLE;
        this.color = '#33ccff';
    }

    update(dt, inputSystem) {
        if (!inputSystem) return;

        const axes = inputSystem.getMovementAxes();

        if (this.isDashing) {
            this.dashTimer -= dt;
            if (this.dashTimer <= 0) {
                this.isDashing = false;
            }
            return; // Maintain vector direction locks during operational execution periods
        }

        // Horizontal input movement evaluations
        let speed = this.config.moveSpeed;
        if (inputSystem.isPressed('KeyR')) speed *= this.config.runMultiplier;

        if (axes.xAxis !== 0) {
            this.vx = axes.xAxis * speed;
            this.state = ENTITY_STATE.RUNNING;
        } else {
            this.state = ENTITY_STATE.IDLE;
        }

        // Vertical functional climbing execution routines
        if (this.isClimbingAvailable && Math.abs(axes.yAxis) > 0) {
            this.isClimbing = true;
        }

        if (this.isClimbing) {
            this.vy = axes.yAxis * this.config.moveSpeed;
            if (!this.isClimbingAvailable) this.isClimbing = false;
        }

        // Jump processing systems
        if (inputSystem.isPressed('Space') && this.onGround) {
            this.vy = -this.config.jumpForce;
            this.onGround = false;
            this.jumpCount = 1;
            inputSystem.keys.set('Space', false); // Consume event token frame cleanly
        } else if (inputSystem.isPressed('Space') && !this.onGround && this.jumpCount < 2) {
            this.vy = -this.config.jumpForce * 0.85; // Double jump vertical scalar
            this.jumpCount = 2;
            inputSystem.keys.set('Space', false);
        }

        // Dash initialization interface
        if (inputSystem.isPressed('ShiftLeft') && !this.isDashing) {
            this.isDashing = true;
            this.dashTimer = this.config.dashDuration;
            this.vx = (this.vx >= 0 ? 1 : -1) * this.config.dashForce;
            this.vy = 0;
        }
    }
}


