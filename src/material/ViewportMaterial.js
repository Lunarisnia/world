import { ShaderMaterial } from "three";

import vertexShader from "/shaders/viewport/viewport.vert?url&raw";
import fragmentShader from "/shaders/viewport/viewport.frag?url&raw";

export default class ViewportMaterial {
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
		});

		return material;
	}
}
