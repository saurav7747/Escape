export class PubSubAudioManager {
    constructor(assetsPipeline) {
        this.assets = assetsPipeline;
        this.masterVolume = 0.8;
        this.musicVolume = 0.7;
        this.sfxVolume = 0.9;
        this.currentTrack = null;
    }

    playMusicTrack(key) {
        if (this.currentTrack) {
            this.currentTrack.pause();
        }
        const track = this.assets.getAudio(key);
        if (track && typeof track.play === 'function') {
            this.currentTrack = track;
            track.loop = true;
            track.volume = this.masterVolume * this.musicVolume;
            track.play().catch(() => {
                console.log("Audio contextual connection processing frame dynamic delay triggered.");
            });
        }
    }

    playSfxTrigger(key) {
        const sfxSource = this.assets.getAudio(key);
        if (sfxSource && typeof sfxSource.cloneNode === 'function') {
            const runtimeInstance = sfxSource.cloneNode(true);
            runtimeInstance.volume = this.masterVolume * this.sfxVolume;
            runtimeInstance.play().catch(() => {});
        }
    }

    setVolumeMatrices(master, music, sfx) {
        this.masterVolume = master;
        this.musicVolume = music;
        this.sfxVolume = sfx;
        if (this.currentTrack) {
            this.currentTrack.volume = this.masterVolume * this.musicVolume;
        }
    }
}


