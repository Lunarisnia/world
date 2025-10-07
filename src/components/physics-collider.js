import { ColliderDesc } from "@dimforge/rapier3d-compat";
import Component from "../component";
import { Quaternion, Vector3 } from "three";
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
		const wQuat = new Quaternion();
		this.mesh.getWorldQuaternion(wQuat);
		this.descriptor.setRotation({ x: wQuat.x, y: wQuat.y, z: wQuat.z, w: wQuat.w });
		this.descriptor.setTranslation(wPos.x, wPos.y, wPos.z);
	}
}
