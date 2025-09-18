import { RigidBodyDesc } from "@dimforge/rapier3d-compat";
import Component from "../component";
import Physics from "../physics";
import RAPIER from "@dimforge/rapier3d-compat";
import { ColliderDesc } from "@dimforge/rapier3d-compat";
import { Vector3 } from "three";

export default class RigidBody extends Component {
	/** @type {RigidBodyDesc} */
	descriptor;
	/** @type {RAPIER.RigidBody} */
	instance;
	collider;

	constructor() {
		super();
		// TODO: add a way to create fixed rigidbody
		this.descriptor = RigidBodyDesc.dynamic();

		this.instance = Physics.instance.createRigidBody(this.descriptor);
	}

	boxCollider(hx, hy, hz) {
		this.collider = Physics.instance.createCollider(ColliderDesc.cuboid(hx, hy, hz), this.instance);
	}

	init() {
		const wPos = new Vector3();
		this.mesh.getWorldPosition(wPos);

		this.instance.setTranslation(new RAPIER.Vector3(wPos.x, wPos.y, wPos.z), true);
	}

	update() {
		const position = this.instance.translation();
		this.mesh.position.set(position.x, position.y, position.z);
	}
}
