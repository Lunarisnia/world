import { GLSL3, MeshStandardMaterial, ShaderMaterial } from "three";
import fragmentShader from "/shaders/floor/floor.frag?url&raw"
import vertexShader from "/shaders/floor/floor.vert?url&raw"

export default class FloorMaterial {
	constructor() {
		const material = new MeshStandardMaterial({
			color: 0xFFFFFF,
		})

		return material;
	}
}
