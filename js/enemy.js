import { MathUtils } from './utils.js';

export class CombatAIActor {
    constructor(x, y, patrolRangeWidth) {
        this.x = x;
        this.y = y;
        this.startX = x;
        this.width = 32;
        this.height = 48;
        this.vx = 1.5;
        this.vy = 0;
        
        this.patrolRange = patrolRangeWidth;
        this.isStatic = false;
        this.color = '#ff3344';
        this.hp = 30;
    }

    update(dt) {
        // Automatic runtime validation context evaluations
        if (Math.abs(this.x - this.startX) > this.patrolRange) {
            this.vx *= -1; // Revert trajectory tracking matrix
            this.x = MathUtils.clamp(this.x, this.startX - this.patrolRange, this.startX + this.patrolRange);
        }
    }
}


