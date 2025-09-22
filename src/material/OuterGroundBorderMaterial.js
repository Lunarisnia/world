import { DoubleSide, ShaderMaterial } from "three";

import vertexShader from "/shaders/groundborder/groundborder.vert?url&raw"
import fragmentShader from "/shaders/groundborder/outergroundborder.frag?url&raw"

export default class OuterGroundBorderMaterial {
	constructor() {
		const uniforms = {
			uTime: { value: 0.0 },
		}

		const material = new ShaderMaterial({
			wireframe: false,
			transparent: true,
			depthWrite: false,
			depthTest: true,
			uniforms: uniforms,
			side: DoubleSide,

			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
		});

		return material;
	}
}
