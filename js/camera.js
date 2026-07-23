import { GAME_WIDTH, GAME_HEIGHT } from './constants.js';
import { MathUtils } from './utils.js';

export class InterpolatedCamera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.lerpFactor = 0.08;
        
        this.bounds = { minX: 0, maxX: 10000, minY: 0, maxY: 2000 };
        
        this.shakeDuration = 0;
        this.shakeMagnitude = 0;
    }

    setBounds(minX, maxX, minY, maxY) {
        this.bounds.minX = minX;
        this.bounds.maxX = maxX;
        this.bounds.minY = minY;
        this.bounds.maxY = maxY;
    }

    follow(playerEntity) {
        // Center camera window around coordinates of player tracking object
        this.targetX = playerEntity.x + playerEntity.width / 2 - GAME_WIDTH / 2;
        this.targetY = playerEntity.y + playerEntity.height / 2 - GAME_HEIGHT / 2;
        
        this.targetX = MathUtils.clamp(this.targetX, this.bounds.minX, this.bounds.maxX - GAME_WIDTH);
        this.targetY = MathUtils.clamp(this.targetY, this.bounds.minY, this.bounds.maxY - GAME_HEIGHT);
    }

    triggerShake(durationMs, magnitudePixels) {
        this.shakeDuration = durationMs;
        this.shakeMagnitude = magnitudePixels;
    }

    update(dt) {
        this.x = MathUtils.lerp(this.x, this.targetX, this.lerpFactor);
        this.y = MathUtils.lerp(this.y, this.targetY, this.lerpFactor);

        if (this.shakeDuration > 0) {
            this.x += (Math.random() * 2 - 1) * this.shakeMagnitude;
            this.y += (Math.random() * 2 - 1) * this.shakeMagnitude;
            this.shakeDuration -= dt;
        }
    }
}


