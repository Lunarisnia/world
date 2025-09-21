import { Color, MeshBasicMaterial } from "three";

export default class SimpleCubeMaterial {
	constructor(red, green, blue) {
		const color = new Color(red, green, blue);

		const material = new MeshBasicMaterial({
			color: color,
		});

		return material;
	}
}
