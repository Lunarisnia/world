import { PlaneGeometry } from "three";

export default class PostProcessPlaneGeometry {
	constructor() {
		const geometry = new PlaneGeometry(2, 2);
		return geometry;
	}
}
