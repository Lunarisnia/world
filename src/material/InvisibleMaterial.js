import { GLSL3, ShaderMaterial } from "three";

import vertexShader from "/shaders/invisible/invisible.vert?url&raw"
import fragmentShader from "/shaders/invisible/invisible.frag?url&raw"

export default class InvisibleMaterial {
	constructor() {
		const material = new ShaderMaterial({
			transparent: true,
			depthTest: true,
			depthWrite: false,

			vertexShader: vertexShader,
			fragmentShader: fragmentShader,

			glslVersion: GLSL3,
		});


		return material;
	}
}
