import { GLSL3, ShaderMaterial } from "three";

import vertexShader from "/shaders/work-display/work-display.vert?url&raw";
import fragmentShader from "/shaders/work-display/work-display.frag?url&raw";

export default class WorkDisplayMaterial {
	constructor() {
		const uniforms = {

		};

		const material = new ShaderMaterial({
			uniforms,
			vertexShader,
			fragmentShader,

			glslVersion: GLSL3,
		});

		return material;
	}
}
