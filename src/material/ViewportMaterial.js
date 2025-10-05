import { GLSL3, ShaderMaterial } from "three";

import vertexShader from "/shaders/viewport/viewport.vert?url&raw";
import fragmentShader from "/shaders/viewport/viewport.frag?url&raw";

export default class ViewportMaterial {
	constructor(image) {
		const uniforms = {
			uWorldTexture: {
				value: image,
			},
			uDepthTexture: {
				value: null,
			},
			uInverseProjectionMatrix: {
				value: null,
			},
			uInverseViewMatrix: {
				value: null,
			},
		}

		const material = new ShaderMaterial({
			//wireframe: true,
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
