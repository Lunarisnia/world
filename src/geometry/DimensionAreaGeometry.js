import { BoxGeometry } from "three";

export default class DimensionAreaGeometry {
	constructor(width, height, depth) {
		const geom = new BoxGeometry(width, height, depth);

		return geom;
	}
}
