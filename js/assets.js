export class AssetPipeline {
    constructor() {
        this.images = new Map();
        this.audio = new Map();
        this.totalAssets = 0;
        this.loadedAssets = 0;
    }

    queueImage(key, src) {
        this.totalAssets++;
        return { key, src, type: 'image' };
    }

    queueAudio(key, src) {
        this.totalAssets++;
        return { key, src, type: 'audio' };
    }

    async loadAll(assetList, onProgress) {
        const promises = assetList.map(asset => {
            if (asset.type === 'image') {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = asset.src;
                    img.onload = () => {
                        this.images.set(asset.key, img);
                        this.loadedAssets++;
                        if (onProgress) onProgress(this.loadedAssets / this.totalAssets);
                        resolve();
                    };
                    img.onerror = () => {
                        // Fallback canvas asset if network/file missing
                        const fallbackCanvas = document.createElement('canvas');
                        fallbackCanvas.width = 32;
                        fallbackCanvas.height = 32;
                        const ctx = fallbackCanvas.getContext('2d');
                        ctx.fillStyle = '#ff00ff';
                        ctx.fillRect(0,0,32,32);
                        this.images.set(asset.key, fallbackCanvas);
                        this.loadedAssets++;
                        resolve();
                    };
                });
            } else {
                return new Promise((resolve) => {
                    const audio = new Audio();
                    audio.src = asset.src;
                    audio.preload = 'auto';
                    audio.oncanplaythrough = () => {
                        this.audio.set(asset.key, audio);
                        this.loadedAssets++;
                        if (onProgress) onProgress(this.loadedAssets / this.totalAssets);
                        resolve();
                    };
                    audio.onerror = () => {
                        this.audio.set(asset.key, { play: () => {}, pause: () => {}, cloneNode: function() { return this; } });
                        this.loadedAssets++;
                        resolve();
                    };
                    // Timeout fallback for programmatic environments
                    setTimeout(() => resolve(), 100);
                });
            }
        });
        await Promise.all(promises);
    }

    getImage(key) {
        return this.images.get(key);
    }

    getAudio(key) {
        return this.audio.get(key);
    }
}


