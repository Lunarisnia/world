import { GLSL3, ShaderMaterial } from "three";

import vertexShader from "/shaders/testbed/testbed.vert?url&raw";
import fragmentShader from "/shaders/testbed/testbed.frag?url&raw";

export default class TestBedViewportMaterial {
	constructor(worldRenderTarget) {
		const uniforms = {
			uWorldTexture: {
				value: worldRenderTarget.texture,
			},

		}

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
