import { GAME_WIDTH, GAME_HEIGHT } from './constants.js';

export class DynamicCompositeLightingEngine {
    constructor() {
        this.ambientLightLevel = 0.15; // Represents standard internal dungeon/night configurations
        this.lightSources = [];
    }

    clearSources() {
        this.lightSources = [];
    }

    registerSource(x, y, radius, intensity, colorString = '#fff') {
        this.lightSources.push({ x, y, radius, intensity, color: colorString });
    }

    applyDynamicLighting(ctx, camera) {
        // High efficiency light mask render composition extraction pipeline layer
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = GAME_WIDTH;
        maskCanvas.height = GAME_HEIGHT;
        const maskCtx = maskCanvas.getContext('2d');

        maskCtx.fillStyle = `rgba(7, 7, 10, ${1.0 - this.ambientLightLevel})`;
        maskCtx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        maskCtx.globalCompositeOperation = 'destination-out';

        for (let i = 0; i < this.lightSources.length; i++) {
            const src = this.lightSources[i];
            const screenX = src.x - camera.x;
            const screenY = src.y - camera.y;

            const radGrad = maskCtx.createRadialGradient(screenX, screenY, 0, screenX, screenY, src.radius);
            radGrad.addColorStop(0, `rgba(255, 255, 255, ${src.intensity})`);
            radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            maskCtx.fillStyle = radGrad;
            maskCtx.beginPath();
            maskCtx.arc(screenX, screenY, src.radius, 0, Math.PI * 2);
            maskCtx.fill();
        }

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Restore raw view coordinates to prevent double-translations
        ctx.globalCompositeOperation = 'multiply';
        ctx.drawImage(maskCanvas, 0, 0);
        ctx.restore();
    }
}


