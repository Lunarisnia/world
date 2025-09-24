import { PlaneGeometry } from "three";

export default class ViewportGeometry {
	constructor() {
		const geom = new PlaneGeometry(2, 2);
		return geom;
	}
}
