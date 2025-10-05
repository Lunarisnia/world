import { GLSL3, ShaderMaterial } from "three";

import vertexShader from "/shaders/player/player.vert?url&raw";
import fragmentShader from "/shaders/player/player.frag?url&raw";

export default class PlayerMaterial {
	constructor() {
		const uniforms = {

		};

		const material = new ShaderMaterial({
			uniforms: uniforms,

			vertexShader: vertexShader,
			fragmentShader: fragmentShader,

			glslVersion: GLSL3,
		});
		return material;
	}
}
