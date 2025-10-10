import { GLSL3, ShaderMaterial, Texture } from "three";

import vertexShader from "/shaders/matcap/matcap.vert?url&raw";
import fragmentShader from "/shaders/matcap/matcap.frag?url&raw";

export default class MatcapMaterial {
	/**
	 * description
	 * @param {Texture} matcap - desc
	 * @returns {any} - desc
	 */
	constructor(matcap) {
		const uniforms = {
			uCameraPosition: {
				value: null,
			},
			uMatcap: {
				value: matcap,
			}
		};

		const material = new ShaderMaterial({
			uniforms,

			fragmentShader,
			vertexShader,

			glslVersion: GLSL3,
		});

		return material;
	}
}
