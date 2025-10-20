import { GLSL3, ShaderMaterial, Texture } from "three";

import vertexShader from "/shaders/post-process/post-process.vert?url&raw";
import fragmentShader from "/shaders/post-process/gaussian/gaussian.frag?url&raw";

export default class BlurPlaneMaterial {
	/**
	 * Post Process Material
	 * @param {Texture} image - desc
	 */
	constructor(image) {
		const uniforms = {
			uImage: {
				value: image,
			},
			uHorizontal: {
				value: false,
			}
		};

		const material = new ShaderMaterial({
			depthTest: false,
			depthWrite: false,
			uniforms: uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,

			glslVersion: GLSL3,
		});

		return material;
	}
}
