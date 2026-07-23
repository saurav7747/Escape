export class HighPerformanceParticleEngine {
    constructor() {
        this.pool = [];
        this.activeCount = 0;
        this.maxParticles = 500;
        
        // Populate structural pre-allocation array memory pool allocations cleanly
        for (let i = 0; i < this.maxParticles; i++) {
            this.pool.push({ x: 0, y: 0, vx: 0, vy: 0, color: '#fff', life: 0, maxLife: 0, size: 2 });
        }
    }

    spawn(x, y, vx, vy, color, durationMs, size = 2) {
        for (let i = 0; i < this.maxParticles; i++) {
            const p = this.pool[i];
            if (p.life <= 0) {
                p.x = x;
                p.y = y;
                p.vx = vx;
                p.vy = vy;
                p.color = color;
                p.life = durationMs;
                p.maxLife = durationMs;
                p.size = size;
                break;
            }
        }
    }

    update(dt) {
        for (let i = 0; i < this.maxParticles; i++) {
            const p = this.pool[i];
            if (p.life > 0) {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= dt;
            }
        }
    }

    render(ctx) {
        for (let i = 0; i < this.maxParticles; i++) {
            const p = this.pool[i];
            if (p.life > 0) {
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life / p.maxLife;
                ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
            }
        }
        ctx.globalAlpha = 1.0;
    }
}


