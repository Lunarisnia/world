import RAPIER from "@dimforge/rapier3d-compat";
export default class Physics {
	/** @type {Physics} */
	static instance;

	constructor() {
		if (Physics.instance) {
			return Physics.instance;
		}
		Physics.instance = this;
		this.gravity = { x: 0.0, y: -9.81, z: 0.0 };
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
		// 	.setTranslation(0.0, 100.0, 0.0);
		// this.rigidBody = this.world.createRigidBody(rigidBodyDesc);
		//
		// // Create a cuboid collider attached to the dynamic rigidBody.
		// const colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
		// this.world.createCollider(colliderDesc, this.rigidBody);

	}

	update() {
		this.world.step();

		// const position = this.rigidBody.translation();
		// console.log("RBPos:", position.x, position.y);
	}
};
