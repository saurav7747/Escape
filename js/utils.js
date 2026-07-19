export class MathUtils {
    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    static lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }

    static aabbTest(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    static getDistance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

export class PubSub {
    constructor() {
        this.topics = {};
    }

    subscribe(topic, listener) {
        if (!this.topics[topic]) this.topics[topic] = [];
        this.topics[topic].push(listener);
        return () => {
            this.topics[topic] = this.topics[topic].filter(l => l !== listener);
        };
    }

    publish(topic, data) {
        if (!this.topics[topic]) return;
        for (let i = 0; i < this.topics[topic].length; i++) {
            this.topics[topic][i](data);
        }
    }
}

