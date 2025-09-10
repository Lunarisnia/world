import Game from "../game";

export default class InputManager {
	/** @type {InputManager} */
	static instance;
	/** @type {Map} */
	keyMap = new Map();

	constructor() {
		if (InputManager.instance) {
			return InputManager.instance;
		}
		InputManager.instance = this;

		this.addKey("a");

		Game.window.addEventListener("keydown", (event) => {
			this.keyDownListener(event)
		});
		Game.window.addEventListener("keyup", (event) => {
			this.keyUpListener(event)
		});
	}

	addKey(key) {
		this.keyMap.set(key, {
			justPressed: false,
			down: false,
		});
	}

	/**
	 * Get current key state
	 * @param {string} key - Keycode
	 */
	getKey(key) {
		if (!this.keyMap.has(key)) {
			return null;
		}
		return this.keyMap.get(key);
	}

	/**
	 * Key listener
	 * @param {KeyboardEvent} event - desc
	 */
	keyDownListener(event) {
		if (!this.keyMap.has(event.key)) {
			return;
		}
		const pressedKey = this.keyMap.get(event.key);
		pressedKey.justPressed = !pressedKey.justPressed && !pressedKey.down;
		pressedKey.down = true;
		// this.keyMap[event.key].justPressed = !pressedKey.justPressed && !pressedKey.down;
		// this.keyMap[event.key].down = true;
	}

	/**
	 * Key listener
	 * @param {KeyboardEvent} event - desc
	 */
	keyUpListener(event) {
		if (!this.keyMap.has(event.key)) {
			return;
		}
		const pressedKey = this.keyMap.get(event.key);
		pressedKey.justPressed = false;
		pressedKey.down = false;
	}

	update() {
		for (const k of this.keyMap.keys()) {
			const key = this.keyMap.get(k);
			key.justPressed = false;
		}
	}
};
