import { GLSL3, ShaderMaterial } from "three";

import vertexShader from "/shaders/post-process/post-process.vert?url&raw";
import fragmentShader from "/shaders/post-process/mask/circle.frag?url&raw";

export default class CircleMaskMaterial {
	constructor() {
		const material = new ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,

			glslVersion: GLSL3,
		});

		return material;
	}
}
