import { BoxGeometry } from "three";

export default class SimpleCubeGeometry {
	constructor(width, height, depth) {
		this.width = width;
		this.height = height;
		this.depth = depth;

		const geometry = new BoxGeometry(this.width, this.height, this.depth);

		return geometry;
	}
}

