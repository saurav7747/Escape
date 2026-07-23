export class TouchInterface {
    constructor(inputSystem) {
        this.inputSystem = inputSystem;
        this.elements = {
            left: document.getElementById('btn-left'),
            right: document.getElementById('btn-right'),
            up: document.getElementById('btn-up'),
            down: document.getElementById('btn-down'),
            jump: document.getElementById('btn-jump'),
            attack: document.getElementById('btn-attack'),
            dash: document.getElementById('btn-dash'),
            magic: document.getElementById('btn-magic'),
            container: document.getElementById('touch-controls')
        };
        this.bindEvents();
    }

    show() {
        if (this.elements.container) this.elements.container.classList.remove('hidden');
    }

    hide() {
        if (this.elements.container) this.elements.container.classList.add('hidden');
    }

    bindEvents() {
        const bindKey = (element, virtualKeyCode) => {
            if (!element) return;
            element.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.inputSystem.keys.set(virtualKeyCode, true);
            }, { passive: false });
            
            element.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.inputSystem.keys.set(virtualKeyCode, false);
            }, { passive: false });
        };

        bindKey(this.elements.left, 'ArrowLeft');
        bindKey(this.elements.right, 'ArrowRight');
        bindKey(this.elements.up, 'ArrowUp');
        bindKey(this.elements.down, 'ArrowDown');
        bindKey(this.elements.jump, 'Space');
        bindKey(this.elements.attack, 'KeyF');
        bindKey(this.elements.dash, 'ShiftLeft');
        bindKey(this.elements.magic, 'KeyE');
    }
}


