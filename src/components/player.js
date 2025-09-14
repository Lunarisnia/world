import { Matrix4, Vector3 } from "three";
import Component from "../component";
import Game from "../game";
import { degToRad, radToDeg } from "three/src/math/MathUtils.js";
import InputManager from "../input/inputManager";

export default class Player extends Component {
	/** @type {Vector3} */
	forward;
	/** @type {Vector3} */
	up;
	/** @type {Number} */
	speed;

	angle = 0;
	turnSpeed = 0.1;
	direction = new Vector3(0.0, 0.0, -1.0);

	constructor() {
		super();

		this.forward = new Vector3(0.0, 0.0, -1.0);
		this.up = new Vector3(0.0, 1.0, 0.0);

		this.speed = 0.1;
	}

	init() {
		Game.instance.mainCamera.instance.position.y = 2;
		Game.instance.mainCamera.instance.lookAt(new Vector3(0.0, 0.0, 0.0));
	}

	update() {
		this.handleMovement();
	}

	handleMovement() {
		const movementDir = new Vector3();

		if (InputManager.instance.getKey("w").down) {
			movementDir.z = 1;
		}
		if (InputManager.instance.getKey("s").down) {
			movementDir.z = -1;
		}
		if (InputManager.instance.getKey("a").down) {
			movementDir.x = -1;
		}
		if (InputManager.instance.getKey("d").down) {
			movementDir.x = 1;
		}
		if (InputManager.instance.getKey("w").down || InputManager.instance.getKey("a").down || InputManager.instance.getKey("s").down || InputManager.instance.getKey("d").down) {
			movementDir.normalize();
			const angleTo = this.direction.angleTo(movementDir);
			if (InputManager.instance.getKey("a").down) {
				this.angle += (-angleTo - this.angle) * this.turnSpeed;
			} else {

				this.angle += (angleTo - this.angle) * this.turnSpeed;
			}

			this.mesh.position.x += Math.sin(this.angle) * this.speed;
			this.mesh.position.z += Math.cos(this.angle) * this.speed;
		}
	}

	// NOTE: This don't support diagonal
	angleMethodSmoothTurning() {
		let targetAngle = degToRad(180);
		const turnSpeed = 0.22;

		if (InputManager.instance.getKey("w").down) {
			targetAngle = degToRad(180);
		}
		if (InputManager.instance.getKey("s").down) {
			targetAngle = degToRad(0);
		}
		if (InputManager.instance.getKey("a").down) {
			targetAngle = degToRad(270);
		}
		if (InputManager.instance.getKey("d").down) {
			targetAngle = degToRad(90);
		}
		if (InputManager.instance.getKey("w").down || InputManager.instance.getKey("a").down || InputManager.instance.getKey("s").down || InputManager.instance.getKey("d").down) {
			this.angle += (targetAngle - this.angle) * turnSpeed;

			this.mesh.position.x += Math.sin(this.angle) * this.speed;
			this.mesh.position.z += Math.cos(this.angle) * this.speed;
		}
	}

	// NOTE: this feels unresponsive
	smoothTurning() {
		const turnSpeed = 0.5;

		if (InputManager.instance.getKey("w").down) {
			this.direction.lerp(new Vector3(0.0, 0.0, -1.0).normalize(), turnSpeed).normalize();
		}
		if (InputManager.instance.getKey("s").down) {
			this.direction.lerp(new Vector3(0.0, 0.0, 1.0).normalize(), turnSpeed).normalize();
		}
		if (InputManager.instance.getKey("a").down) {
			this.direction.lerp(new Vector3(-1.0, 0.0, 0.0).normalize(), turnSpeed).normalize();
		}
		if (InputManager.instance.getKey("d").down) {
			this.direction.lerp(new Vector3(1.0, 0.0, 0.0).normalize(), turnSpeed).normalize();
		}
		if (InputManager.instance.getKey("w").down || InputManager.instance.getKey("a").down || InputManager.instance.getKey("s").down || InputManager.instance.getKey("d").down) {
			this.mesh.position.add(this.direction.clone().multiplyScalar(this.speed));
		}
	}
}
