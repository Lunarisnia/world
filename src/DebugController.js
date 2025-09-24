import InputManager from "./input/inputManager";

export default class DebugController {
	/** @type {boolean} */
	gizmo = false;

	constructor() {
		InputManager.instance.addKey("F2");
	}

	update() {
		if (InputManager.instance.getKey("F2").justPressed) {
			this.gizmo = !this.gizmo;
		}
	}
}
