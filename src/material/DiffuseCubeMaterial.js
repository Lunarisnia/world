import { GLSL3, ShaderMaterial } from "three";

import vertexShader from "/shaders/diffuse/diffuse.vert?url&raw";
import fragmentShader from "/shaders/diffuse/diffuse.frag?url&raw";

export default class DiffuseCubeMaterial {
	constructor() {
		const material = new ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,

			glslVersion: GLSL3,
		});

		return material;
	}
}
