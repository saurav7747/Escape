export class CombatInterfaceController {
    constructor(engineKernel) {
        this.kernel = engineKernel;
        this.damageNumbers = [];
    }

    processPlayerMeleeStrike(player, entitiesList) {
        const strikeZone = {
            x: player.vx >= 0 ? player.x + player.width : player.x - 40,
            y: player.y,
            width: 40,
            height: player.height
        };

        for (let i = 0; i < entitiesList.length; i++) {
            const target = entitiesList[i];
            if (target === player) continue;

            if (this.checkOverlap(strikeZone, target)) {
                this.applyDamageToTarget(target, 15);
            }
        }
    }

    applyDamageToTarget(target, baseDamage) {
        const isCrit = Math.random() > 0.85;
        const finalDamage = isCrit ? baseDamage * 2 : baseDamage;
        
        target.hp -= finalDamage;
        
        this.damageNumbers.push({
            x: target.x + target.width / 2,
            y: target.y - 10,
            value: finalDamage,
            critical: isCrit,
            lifetime: 600 // milliseconds operational duration window
        });
    }

    checkOverlap(r1, r2) {
        return r1.x < r2.x + r2.width &&
               r1.x + r1.width > r2.x &&
               r1.y < r2.y + r2.height &&
               r1.y + r1.height > r2.y;
    }

    update(dt) {
        for (let i = this.damageNumbers.length - 1; i >= 0; i--) {
            this.damageNumbers[i].y -= 0.5;
            this.damageNumbers[i].lifetime -= dt;
            if (this.damageNumbers[i].lifetime <= 0) {
                this.damageNumbers.splice(i, 1);
            }
        }
    }
}


