import { ColliderDesc } from "@dimforge/rapier3d-compat";
import PhysicsComponent from "../physics-component";

export default class BoxCollider extends PhysicsComponent {
	constructor(hx, hy, hz) {
		super();
		this.descriptor = ColliderDesc.cuboid(hx, hy, hz);
	}
}
