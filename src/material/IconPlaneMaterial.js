import { DoubleSide, GLSL3, ShaderMaterial } from "three";

import vertexShader from "/shaders/icon-plane/icon-plane.vert?url&raw"
import fragmentShader from "/shaders/icon-plane/icon-plane.frag?url&raw"

export default class IconPlaneMaterial {
	constructor() {
		const uniforms = {
			uAspectRatio: {
				value: 0.0,
			},
		}

		const material = new ShaderMaterial({
			transparent: true,
			depthTest: true,
			depthWrite: true,
			side: DoubleSide,
			uniforms: uniforms,

			vertexShader: vertexShader,
			fragmentShader: fragmentShader,

			glslVersion: GLSL3,
		});


		return material;
	}
}
