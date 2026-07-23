import { GAME_WIDTH, GAME_HEIGHT } from './constants.js';

export class EngineRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d', { alpha: false, desynchronized: true });
        this.ctx.imageSmoothingEnabled = false;
        
        this.layers = {
            sky: 0.1,
            farBack: 0.3,
            midBack: 0.6,
            foreground: 1.0
        };
    }

    renderFrame(systems) {
        const ctx = this.ctx;
        const camera = systems.camera || { x: 0, y: 0 };
        const world = systems.world;

        // Clear display context buffer
        ctx.fillStyle = '#07070a';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        ctx.save();
        // Translate world frame according to active camera coordinates
        ctx.translate(-Math.floor(camera.x), -Math.floor(camera.y));

        if (world) {
            this.renderParallaxBackground(ctx, camera, systems.assets);
            this.renderTilemap(ctx, world, systems.assets);
            this.renderEntities(ctx, world, systems.assets);
        }

        if (systems.particles) {
            systems.particles.render(ctx);
        }

        if (systems.lighting) {
            systems.lighting.applyDynamicLighting(ctx, camera);
        }

        ctx.restore();
    }

    renderParallaxBackground(ctx, camera, assets) {
        const bgImg = assets.getImage('hero_idle'); // Fallback placeholder context hook
        if (!bgImg) return;
        
        // Loop structure calculating offsets based on layer coefficients
        let offset = (camera.x * this.layers.farBack) % GAME_WIDTH;
        ctx.drawImage(bgImg, -offset, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.drawImage(bgImg, -offset + GAME_WIDTH, 0, GAME_WIDTH, GAME_HEIGHT);
    }

    renderTilemap(ctx, world, assets) {
        const map = world.currentMap;
        const tileset = assets.getImage('tileset_core');
        if (!map || !tileset) return;

        for (let row = 0; row < map.height; row++) {
            for (let col = 0; col < map.width; col++) {
                const tileType = map.data[row][col];
                if (tileType === 0) continue;

                const targetX = col * map.tileSize;
                const targetY = row * map.tileSize;
                
                // Direct continuous structural rendering optimization via pixel blits
                ctx.drawImage(
                    tileset,
                    (tileType - 1) * map.tileSize, 0, map.tileSize, map.tileSize,
                    targetX, targetY, map.tileSize, map.tileSize
                );
            }
        }
    }

    renderEntities(ctx, world, assets) {
        if (!world.entities) return;
        for (let i = 0; i < world.entities.length; i++) {
            const ent = world.entities[i];
            ctx.fillStyle = ent.color || '#ff0000';
            ctx.fillRect(ent.x, ent.y, ent.width, ent.height);
        }
    }
}


