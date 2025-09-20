import { ArrowHelper, Color, Quaternion, Vector3 } from "three";
import Component from "../component";
import { degToRad, } from "three/src/math/MathUtils.js";
import InputManager from "../input/inputManager";
import Spawner from "../entity/spawner";
import RigidBody from "./rigidbody";

export default class Player extends Component {
	/** @type {Vector3} */
	forward;
	/** @type {Vector3} */
	up;
	/** @type {Number} */
	speed;

	angle = 0;
	turnSpeed = 3.5;
	direction = new Vector3(0.0, 0.0, -1.0);

	/** @type {RigidBody} */
	rigidBody;

	constructor() {
		super();

		this.forward = new Vector3(0.0, 0.0, -1.0);
		this.up = new Vector3(0.0, 1.0, 0.0);

		this.speed = 4.0;
	}

	init() {
		// TODO: add someway to toggle this debug mode real time
		const axesHelper = new ArrowHelper(this.direction, this.mesh.position, 2.5, 0x00FF00, 0.5, 0.5);
		this.mesh.add(axesHelper);

		const sphere = Spawner.CreateSimpleSphere({
			radius: 0.1,
			// widthSegments: 16,
			// heightSegments: 16,
			color: new Color(1.0, 0.0, 0.0),
		});
		sphere.material.depthTest = false;
		this.mesh.add(sphere.mesh);


		this.rigidBody = new RigidBody();
		this.owner.addComponent(this.rigidBody);
		this.rigidBody.init();
		this.rigidBody.boxCollider(0.5, 0.5, 0.5);

	}

	update() {
		this.handleTankMovement();
	}

	// TODO: make acceleration gradual 
	handleTankMovement() {
		this.mesh.getWorldDirection(this.direction);
		this.direction.negate();
		const r = this.rigidBody.instance.rotation();
		const rotation = new Quaternion(r.x, r.y, r.z, r.w);

		if (InputManager.instance.getKey("a").down) {
			rotation.setFromAxisAngle(new Vector3(0, 1, 0), degToRad(this.turnSpeed));
			const rotate = new Quaternion(r.x, r.y, r.z, r.w).multiply(rotation);
			this.rigidBody.instance.setRotation(rotate, true);
		}
		if (InputManager.instance.getKey("d").down) {
			rotation.setFromAxisAngle(new Vector3(0, 1, 0), degToRad(-this.turnSpeed));
			const rotate = new Quaternion(r.x, r.y, r.z, r.w).multiply(rotation);
			this.rigidBody.instance.setRotation(rotate, true);
		}
		if (InputManager.instance.getKey("w").down) {
			const forceDir = this.direction.multiplyScalar(this.speed);
			this.rigidBody.instance.setLinvel(new Vector3(forceDir.x, this.rigidBody.instance.linvel().y, forceDir.z), true);
		} else if (InputManager.instance.getKey("s").down) {
			const forceDir = this.direction.multiplyScalar(this.speed);
			this.rigidBody.instance.setLinvel(new Vector3(-forceDir.x, this.rigidBody.instance.linvel().y, -forceDir.z), true);
		} else {
			this.rigidBody.instance.setLinvel(new Vector3(0, this.rigidBody.instance.linvel().y, 0), true);

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
