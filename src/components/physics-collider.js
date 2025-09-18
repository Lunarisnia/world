import { ColliderDesc } from "@dimforge/rapier3d-compat";
import Component from "../component";
import { Vector3 } from "three";

export default class PhysicsCollider extends Component {
	/** @type {ColliderDesc} */
	descriptor;
	constructor() {
		super();
	}

	update() {
		const wPos = new Vector3();
		this.mesh.getWorldPosition(wPos);
		this.descriptor.setTranslation(wPos.x, wPos.y, wPos.z);
	}
}
