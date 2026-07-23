import { GAME_WIDTH, GAME_HEIGHT, WEATHER_TYPE } from './constants.js';

export class WeatherSimulationManager {
    constructor() {
        this.type = WEATHER_TYPE.CLEAR;
        this.particles = [];
    }

    setWeatherPattern(weatherType) {
        this.type = weatherType;
        this.particles = [];
        
        if (weatherType === WEATHER_TYPE.RAIN || weatherType === WEATHER_TYPE.SNOW) {
            for (let i = 0; i < 150; i++) {
                this.particles.push({
                    x: Math.random() * GAME_WIDTH,
                    y: Math.random() * GAME_HEIGHT,
                    speed: Math.random() * 4 + 4,
                    length: Math.random() * 10 + 5
                });
            }
        }
    }

    update(dt) {
        if (this.type === WEATHER_TYPE.CLEAR || this.type === WEATHER_TYPE.FOG) return;

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            if (this.type === WEATHER_TYPE.RAIN) {
                p.y += p.speed;
                p.x -= 1; // Winds slant factor processing
            } else if (this.type === WEATHER_TYPE.SNOW) {
                p.y += p.speed * 0.25;
                p.x += Math.sin(p.y * 0.05) * 0.5;
            }

            if (p.y > GAME_HEIGHT) {
                p.y = -20;
                p.x = Math.random() * GAME_WIDTH;
            }
        }
    }

    render(ctx) {
        if (this.type === WEATHER_TYPE.CLEAR) return;

        if (this.type === WEATHER_TYPE.FOG) {
            ctx.fillStyle = 'rgba(100, 100, 130, 0.2)';
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            return;
        }

        ctx.strokeStyle = this.type === WEATHER_TYPE.RAIN ? 'rgba(174,194,224,0.4)' : 'rgba(255,255,255,0.7)';
        ctx.lineWidth = this.type === WEATHER_TYPE.RAIN ? 1 : 2;

        ctx.beginPath();
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + (this.type === WEATHER_TYPE.RAIN ? -2 : 0), p.y + p.length);
        }
        ctx.stroke();
    }
}


