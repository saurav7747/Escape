export class InventoryPipelineManager {
    constructor() {
        this.slots = new Map();
        this.equipment = {
            weapon: null,
            armor: null
        };
    }

    addItem(itemId, amount = 1) {
        const currentCount = this.slots.get(itemId) || 0;
        this.slots.set(itemId, currentCount + amount);
    }

    removeItem(itemId, amount = 1) {
        if (!this.slots.has(itemId)) return false;
        const currentCount = this.slots.get(itemId);
        if (currentCount < amount) return false;
        
        if (currentCount === amount) {
            this.slots.delete(itemId);
        } else {
            this.slots.set(itemId, currentCount - amount);
        }
        return true;
    }

    hasItem(itemId, amount = 1) {
        return (this.slots.get(itemId) || 0) >= amount;
    }

    equipItem(itemObject) {
        if (itemObject.type === 'weapon') {
            this.equipment.weapon = itemObject;
        } else if (itemObject.type === 'armor') {
            this.equipment.armor = itemObject;
        }
    }
}


