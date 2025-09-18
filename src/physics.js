import RAPIER, { Collider, RigidBodyDesc } from "@dimforge/rapier3d-compat";
import { RigidBody } from "@dimforge/rapier3d-compat";
import { ColliderDesc } from "@dimforge/rapier3d-compat";
export default class Physics {
	/** @type {Physics} */
	static instance;

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

		// // Create the ground
		// const groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1, 10.0);
		// this.world.createCollider(groundColliderDesc);
		//
		// // Create a dynamic rigid-body.
		// const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
		// 	.setTranslation(0.0, 1.0, 0.0);
		// this.rigidBody = this.world.createRigidBody(rigidBodyDesc);
		//
		// // Create a cuboid collider attached to the dynamic rigidBody.
		// const colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
		// this.world.createCollider(colliderDesc, this.rigidBody);
	}

	// TODO: Finish the attachment of the physics collider to the object, right not it just attached as a component and nothing else
	createPhysicsEntity(descriptor) {
		if (descriptor instanceof ColliderDesc) {
			return this.createCollider(descriptor);
		}
		if (descriptor instanceof RigidBodyDesc) {
			return this.createRigidBody(descriptor);
		}
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
		this.world.step();

		// const position = this.rigidBody.translation();
		// console.log("RBPos:", position.x, position.y);
	}
};
