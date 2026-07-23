export class InputSystem {
    constructor() {
        this.keys = new Map();
        this.gamepadIndex = null;
        this.initListeners();
    }

    initListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys.set(e.code, true);
        });

        window.addEventListener('keyup', (e) => {
            this.keys.set(e.code, false);
        });

        window.addEventListener('gamepadconnected', (e) => {
            this.gamepadIndex = e.gamepad.index;
        });

        window.addEventListener('gamepaddisconnected', () => {
            this.gamepadIndex = null;
        });
    }

    isPressed(code) {
        return !!this.keys.get(code);
    }

    getMovementAxes() {
        let xAxis = 0;
        let yAxis = 0;

        if (this.isPressed('KeyA') || this.isPressed('ArrowLeft')) xAxis = -1;
        if (this.isPressed('KeyD') || this.isPressed('ArrowRight')) xAxis = 1;
        if (this.isPressed('KeyW') || this.isPressed('ArrowUp')) yAxis = -1;
        if (this.isPressed('KeyS') || this.isPressed('ArrowDown')) yAxis = 1;

        // Gamepad polling override if active
        if (this.gamepadIndex !== null) {
            const gp = navigator.getGamepads()[this.gamepadIndex];
            if (gp) {
                const threshold = 0.2;
                if (Math.abs(gp.axes[0]) > threshold) xAxis = gp.axes[0];
                if (Math.abs(gp.axes[1]) > threshold) yAxis = gp.axes[1];
            }
        }

        return { xAxis, yAxis };
    }
}


