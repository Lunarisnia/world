import { GLSL3, ShaderMaterial, WebGLRenderTarget } from "three";

import vertexShader from "/shaders/dimension/dimension.vert?url&raw"
import fragmentShader from "/shaders/dimension/dimension.frag?url&raw"

export default class DimensionAreaMaterial {
	/**
	 * Dimension Area
	 * @param {WebGLRenderTarget} renderTarget - desc
	 * @returns {any} - desc
	 */
	constructor(renderTarget) {
		const uniforms = {
			uTime: {
				value: 0.0,
			},
			uWorldTexture: {
				value: renderTarget.texture,
			}
		}
		const material = new ShaderMaterial({
			transparent: true,
			depthWrite: false,
			uniforms,

			fragmentShader,
			vertexShader,

			glslVersion: GLSL3,
		});

		return material;
	}
}
