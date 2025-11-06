import InputManager from "./input/inputManager";

export default class DebugController {
	/** @type {boolean} */
	gizmo = false;

	/** @type {boolean} */
	shaderTestBed = false;

	constructor() {
	}

	init() {
		InputManager.instance.addKey("F2");
		InputManager.instance.addKey("u");
	}

	update() {
		if (InputManager.instance.getKey("F2").justPressed) {
			this.gizmo = !this.gizmo;
		}
		if (InputManager.instance.getKey("u").justPressed) {
			this.shaderTestBed = !this.shaderTestBed;
		}
	}
}
