import { EngineConfig } from './config.js';
import { EngineKernel } from './engine.js';
import { InputSystem } from './input.js';
import { TouchInterface } from './touch.js';
import { AssetPipeline } from './assets.js';

window.addEventListener('DOMContentLoaded', async () => {
    const kernel = new EngineKernel(EngineConfig);
    
    // Core foundational tracking
    const input = new InputSystem();
    const touch = new TouchInterface(input);
    const assets = new AssetPipeline();

    kernel.registerSystem('input', input);
    kernel.registerSystem('assets', assets);

    // Differentiate desktop and handheld form-factors for interface overlays
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        touch.show();
    }

    // High-performance canvas interface acquisition
    const canvas = document.getElementById(EngineConfig.canvasId);
    canvas.width = EngineConfig.logicalWidth;
    canvas.height = EngineConfig.logicalHeight;

    // Core asset bootstrapping phase
    const assetQueue = [
        assets.queueImage('hero_idle', 'assets/sprites/player_idle.png'),
        assets.queueImage('tileset_core', 'assets/sprites/tileset.png'),
        assets.queueAudio('bg_main', 'assets/audio/music_ambient.mp3')
    ];

    await assets.loadAll(assetQueue, (progress) => {
        console.log(`Loading Engine Core Pipelines: ${Math.round(progress * 100)}%`);
    });

    // Final entry hook execution
    document.getElementById('menu-overlay').classList.add('hidden');
    document.getElementById('hud-overlay').classList.remove('hidden');
    
    kernel.boot();
});


