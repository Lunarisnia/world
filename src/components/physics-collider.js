import { ColliderDesc } from "@dimforge/rapier3d-compat";
import Component from "../component";
import { Vector3 } from "three";
import Physics from "../physics";

export default class PhysicsCollider extends Component {
	/** @type {ColliderDesc} */
	descriptor;
	/** @type {PhysicsCollider} */
	instance;

	constructor(descriptor) {
		super();
		this.descriptor = descriptor;
	}

	init() {
		this.setMeshPosition();

		this.instance = Physics.instance.createCollider(this.descriptor);
	}

	update() {
		this.setMeshPosition();
	}

	setMeshPosition() {
		const wPos = new Vector3();
		this.mesh.getWorldPosition(wPos);
		this.descriptor.setTranslation(wPos.x, wPos.y, wPos.z);
	}
}
