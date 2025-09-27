import { Color, GLSL3, ShaderMaterial } from "three";

import vertexShader from "/shaders/simple-cube/simple-cube.vert?url&raw";
import fragmentShader from "/shaders/simple-cube/simple-cube.frag?url&raw";

export default class SimpleCubeMaterial {
	constructor(red, green, blue) {
		const color = new Color(red, green, blue);
		const uniforms = {
			color: {
				value: color,
			}
		}

		const material = new ShaderMaterial({
			uniforms: uniforms,

			vertexShader: vertexShader,
			fragmentShader: fragmentShader,

			glslVersion: GLSL3
		});

		return material;
	}
}
