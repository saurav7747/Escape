export class TilemapStructure {
    constructor(width, height, tileSize) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.data = Array.from({ length: height }, () => Array(width).fill(0));
    }

    getTileType(col, row) {
        if (col < 0 || col >= this.width || row < 0 || row >= this.height) {
            return 1; // Return Solid configuration boundary out of structural map bounds
        }
        return this.data[row][col];
    }
}

export class WorldSimulationManager {
    constructor(engineConfig) {
        this.config = engineConfig;
        this.currentMap = new TilemapStructure(100, 25, 32);
        this.entities = [];
        this.systems = null;
    }

    injectSystems(systems) {
        this.systems = systems;
    }

    loadLevelMatrix(levelData) {
        this.entities = [];
        this.currentMap = new TilemapStructure(levelData.width, levelData.height, levelData.tileSize);
        
        for(let r=0; r<levelData.height; r++) {
            for(let c=0; c<levelData.width; c++) {
                this.currentMap.data[r][c] = levelData.layers[0][r][c];
            }
        }
    }

    update(dt) {
        const physics = this.systems?.physics;
        for (let i = 0; i < this.entities.length; i++) {
            const ent = this.entities[i];
            if (physics) {
                physics.updateEntity(ent, this.currentMap, dt);
            }
            if (ent.update) {
                ent.update(dt, this.systems?.input);
            }
        }
    }
}


