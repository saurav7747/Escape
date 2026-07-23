import { TIME_STEP } from './constants.js';
import { PubSub } from './utils.js';

export class EngineKernel {
    constructor(config) {
        this.config = config;
        this.running = false;
        this.events = new PubSub();
        this.accumulatedTime = 0;
        this.lastTime = 0;
        
        this.systems = {};
        this.gameState = {
            currentLevelIndex: 0,
            score: 0,
            isPaused: false
        };
    }

    registerSystem(key, systemInstance) {
        this.systems[key] = systemInstance;
    }

    boot() {
        this.running = true;
        this.lastTime = performance.now();
        requestAnimationFrame((ts) => this.loop(ts));
        this.events.publish('engine:booted', true);
    }

    loop(currentTime) {
        if (!this.running) return;

        let frameTime = currentTime - this.lastTime;
        if (frameTime > 250) frameTime = 250; // Protect against tab switching drift
        this.lastTime = currentTime;

        this.accumulatedTime += frameTime;

        while (this.accumulatedTime >= TIME_STEP) {
            if (!this.gameState.isPaused) {
                this.update(TIME_STEP);
            }
            this.accumulatedTime -= TIME_STEP;
        }

        this.render();
        requestAnimationFrame((ts) => this.loop(ts));
    }

    update(dt) {
        if (this.systems.physics) this.systems.physics.update(dt);
        if (this.systems.world) this.systems.world.update(dt);
        if (this.systems.weather) this.systems.weather.update(dt);
        if (this.systems.particles) this.systems.particles.update(dt);
    }

    render() {
        if (this.systems.renderer) {
            this.systems.renderer.renderFrame(this.systems);
        }
    }

    setPause(state) {
        this.gameState.isPaused = state;
        this.events.publish('engine:pause', state);
    }
          }


