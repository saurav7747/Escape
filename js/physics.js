import { PHYSICS_TILES } from './constants.js';
import { MathUtils } from './utils.js';

export class KinematicPhysicsEngine {
    constructor(config) {
        this.config = config.physics;
    }

    updateEntity(entity, map, dt) {
        if (entity.isStatic) return;

        // Apply constant structural environmental forces
        const currentFriction = entity.inWater ? this.config.waterFriction : this.config.frictionGround;
        const gravityEffect = entity.inWater ? this.config.gravity * this.config.waterBuoyancy : this.config.gravity;

        if (!entity.onGround && !entity.isClimbing && !entity.isDashing) {
            entity.vy += gravityEffect;
        }

        entity.vx *= currentFriction;
        entity.vy = MathUtils.clamp(entity.vy, -this.config.terminalVelocity, this.config.terminalVelocity);

        // Displace position incrementally while cross-checking environmental obstacles
        entity.x += entity.vx;
        this.resolveMapCollisionsX(entity, map);

        entity.y += entity.vy;
        this.resolveMapCollisionsY(entity, map);

        this.updateGroundStatus(entity, map);
    }

    resolveMapCollisionsX(entity, map) {
        const leftTile = Math.floor(entity.x / map.tileSize);
        const rightTile = Math.floor((entity.x + entity.width) / map.tileSize);
        const topTile = Math.floor(entity.y / map.tileSize);
        const bottomTile = Math.floor((entity.y + entity.height) / map.tileSize);

        for (let row = topTile; row <= bottomTile; row++) {
            if (this.isSolidTile(map, leftTile, row)) {
                entity.x = (leftTile + 1) * map.tileSize;
                entity.vx = 0;
            } else if (this.isSolidTile(map, rightTile, row)) {
                entity.x = rightTile * map.tileSize - entity.width;
                entity.vx = 0;
            }
        }
    }

    resolveMapCollisionsY(entity, map) {
        const leftTile = Math.floor(entity.x / map.tileSize);
        const rightTile = Math.floor((entity.x + entity.width) / map.tileSize);
        const topTile = Math.floor(entity.y / map.tileSize);
        const bottomTile = Math.floor((entity.y + entity.height) / map.tileSize);

        entity.inWater = false;
        entity.isClimbingAvailable = false;

        for (let col = leftTile; col <= rightTile; col++) {
            for (let row = topTile; row <= bottomTile; row++) {
                const type = map.getTileType(col, row);
                if (type === PHYSICS_TILES.WATER) {
                    entity.inWater = true;
                }
                if (type === PHYSICS_TILES.LADDER || type === PHYSICS_TILES.ROPE) {
                    entity.isClimbingAvailable = true;
                }
            }
        }

        for (let col = leftTile; col <= rightTile; col++) {
            if (this.isSolidTile(map, col, topTile)) {
                entity.y = (topTile + 1) * map.tileSize;
                entity.vy = 0;
            } else if (this.isSolidTile(map, col, bottomTile)) {
                entity.y = bottomTile * map.tileSize - entity.height;
                entity.vy = 0;
            }
        }
    }

    isSolidTile(map, col, row) {
        const tileType = map.getTileType(col, row);
        return tileType === PHYSICS_TILES.SOLID;
    }

    updateGroundStatus(entity, map) {
        const leftTile = Math.floor(entity.x / map.tileSize);
        const rightTile = Math.floor((entity.x + entity.width) / map.tileSize);
        const checkRow = Math.floor((entity.y + entity.height + 2) / map.tileSize);

        entity.onGround = false;
        for (let col = leftTile; col <= rightTile; col++) {
            if (this.isSolidTile(map, col, checkRow)) {
                entity.onGround = true;
                break;
            }
        }
    }
  }


