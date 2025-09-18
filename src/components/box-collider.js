import { ColliderDesc } from "@dimforge/rapier3d-compat";
import PhysicsCollider from "./physics-collider";

export default class BoxCollider extends PhysicsCollider {
	constructor(hx, hy, hz) {
		const desc = ColliderDesc.cuboid(hx, hy, hz);
		super(desc);
	}
}
