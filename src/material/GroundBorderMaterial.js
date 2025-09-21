import { ShaderMaterial } from "three";

import vertexShader from "/shaders/groundborder/groundborder.vert?url&raw"
import fragmentShader from "/shaders/groundborder/groundborder.frag?url&raw"

export default class GroundBorderMaterial {
	constructor() {
		const material = new ShaderMaterial({
			wireframe: false,
			transparent: false,
			depthWrite: true,
			depthTest: true,
			//side: DoubleSide,

			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
		});

		return material;
	}
}
