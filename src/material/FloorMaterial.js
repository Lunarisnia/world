import { GLSL3, ShaderMaterial } from "three";
import fragmentShader from "/shaders/floor/floor.frag?url&raw"
import vertexShader from "/shaders/floor/floor.vert?url&raw"

export default class FloorMaterial {
	constructor() {
		const material = new ShaderMaterial({
			fragmentShader: fragmentShader,
			vertexShader: vertexShader,

			glslVersion: GLSL3,
		})

		return material;
	}
}
