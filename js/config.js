import { GAME_WIDTH, GAME_HEIGHT } from './constants.js';

export const EngineConfig = {
    canvasId: 'gameCanvas',
    logicalWidth: GAME_WIDTH,
    logicalHeight: GAME_HEIGHT,
    physics: {
        gravity: 0.65,
        terminalVelocity: 14.0,
        frictionAir: 0.98,
        frictionGround: 0.85,
        waterBuoyancy: 0.4,
        waterFriction: 0.88
    },
    playerDefaults: {
        maxHp: 100,
        maxMp: 50,
        moveSpeed: 4.5,
        runMultiplier: 1.5,
        jumpForce: 12.0,
        dashForce: 16.0,
        dashDuration: 150 // milliseconds
    },
    debugMode: false
};
