import RAPIER, { Collider, RigidBodyDesc } from "@dimforge/rapier3d-compat";
import { RigidBody } from "@dimforge/rapier3d-compat";
import { ColliderDesc } from "@dimforge/rapier3d-compat";
import { BufferAttribute, BufferGeometry, LineBasicMaterial, LineSegments } from "three";
import Game from "./game";
export default class Physics {
	/** @type {Physics} */
	static instance;
	timeStep = 1.0 / 60.0;
	accumulator = 0.0;

	constructor() {
		if (Physics.instance) {
			return Physics.instance;
		}
		Physics.instance = this;
		this.gravity = { x: 0.0, y: -9.81, z: 0.0 }
	}

	async init() {
		await RAPIER.init();
		this.world = new RAPIER.World(this.gravity);
	}

	// NOTE: Add toggle for this
	createDebugGizmo() {
		this.geometry = new BufferGeometry()
		const material = new LineBasicMaterial({ vertexColors: true });
		const lineSegment = new LineSegments(this.geometry, material);

		Game.instance.scene.add(lineSegment);
	}

	updateDebugGizmo() {
		const debugData = this.world.debugRender();
		this.geometry.setAttribute("position", new BufferAttribute(debugData.vertices, 3));
		this.geometry.setAttribute("color", new BufferAttribute(debugData.colors, 4));
	}

	/**
	 * Add Collider
	 * @param {ColliderDesc} descriptor - desc
	 * @param {RigidBody} parent=null - desc
	 * @returns {Collider} - Collider
	 */
	createCollider(descriptor, parent = null) {
		return this.world.createCollider(descriptor, parent);
	}

	/**
	 * Add RigidBody
	 * @param {RigidBodyDesc} descriptor - desc
	 * @returns {RigidBody} - Rigidbody
	 */
	createRigidBody(descriptor) {
		return this.world.createRigidBody(descriptor);
	}

	update() {
		console.log(this.world.timestep, 1 / 60);
		this.world.step();
	}
};
