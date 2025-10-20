import { DoubleSide, GLSL3, ShaderMaterial } from "three";

import vertexShader from "/shaders/groundborder/groundborder.vert?url&raw"
import fragmentShader from "/shaders/groundborder/outergroundborder.frag?url&raw"

export default class OuterGroundBorderMaterial {
	constructor() {
		const uniforms = {
			uTime: { value: 0.0 },
		}

		const material = new ShaderMaterial({
			wireframe: false,
			transparent: false,
			depthWrite: true,
			depthTest: true,
			uniforms: uniforms,
			side: DoubleSide,

			vertexShader: vertexShader,
			fragmentShader: fragmentShader,

			glslVersion: GLSL3,
		});

		return material;
	}
}
