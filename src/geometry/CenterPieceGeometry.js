import { SphereGeometry } from "three";

export default class CenterPieceGeometry {
	constructor() {
		const geom = new SphereGeometry(1, 64, 32);
		return geom;
	}
}
