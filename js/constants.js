export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;
export const TARGET_FPS = 60;
export const TIME_STEP = 1000 / TARGET_FPS;

export const PHYSICS_TILES = {
    EMPTY: 0,
    SOLID: 1,
    ONE_WAY: 2,
    SLOPE_L45: 3,
    SLOPE_R45: 4,
    WATER: 5,
    LADDER: 6,
    ROPE: 7,
    SPIKES: 8,
    CHECKPOINT: 9
};

export const ENTITY_STATE = {
    IDLE: 'idle',
    RUNNING: 'running',
    JUMPING: 'jumping',
    FALLING: 'falling',
    WALL_SLIDING: 'wall_slide',
    DASHING: 'dashing',
    CLIMBING: 'climbing',
    SWIMMING: 'swimming',
    ATTACKING: 'attacking',
    HIT: 'hit',
    DYING: 'dying'
};

export const COMBAT_TYPE = {
    SWORD: 'sword',
    BOW: 'bow',
    MAGIC: 'magic'
};

export const WEATHER_TYPE = {
    CLEAR: 'clear',
    RAIN: 'rain',
    FOG: 'fog',
    SNOW: 'snow'
};

