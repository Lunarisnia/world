import { Matrix4, Vector3 } from "three";
import Component from "../component";
import Game from "../game";
import { degToRad } from "three/src/math/MathUtils.js";
import InputManager from "../input/inputManager";

export default class Player extends Component {
	/** @type {Vector3} */
	forward;
	/** @type {Vector3} */
	up;
	/** @type {Number} */
	speed;

	constructor() {
		super();

		this.forward = new Vector3(0.0, 0.0, -1.0);
		this.up = new Vector3(0.0, 1.0, 0.0);

		this.speed = 0.15;
	}

	init() {
	}

	update() {
		// this.mesh.applyMatrix4(this.mat);
		// this.mesh.position.x = Math.sin(Game.instance.clock.getElapsedTime());

		if (InputManager.instance.getKey("w").down) {
			this.mesh.position.z -= this.speed;
		}
		if (InputManager.instance.getKey("s").down) {
			this.mesh.position.z += this.speed;
		}
		if (InputManager.instance.getKey("a").down) {
			this.mesh.position.x -= this.speed;
		}
		if (InputManager.instance.getKey("d").down) {
			this.mesh.position.x += this.speed;
		}
	}
}
