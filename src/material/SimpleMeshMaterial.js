import { FrontSide, GLSL3, ShaderMaterial } from "three";

import vertexShader from "/shaders/simple-mesh/simple-mesh.vert?url&raw";
import fragmentShader from "/shaders/simple-mesh/simple-mesh.frag?url&raw";
import fragmentTextureShader from "/shaders/simple-mesh/simple-mesh-texture.frag?url&raw";

export default class SimpleMeshMaterial {
	constructor({ color, map, side = FrontSide, depthTest = true, depthWrite = true, alphaTest = 0.0, transparent = false }) {
		const uniforms = {};
		const material = new ShaderMaterial({
			depthTest,
			depthWrite,
			alphaTest,
			transparent,
			uniforms: uniforms,
			side,

			vertexShader: vertexShader,
			fragmentShader: fragmentShader,

			glslVersion: GLSL3
		});

		if (map) {
			uniforms.uMap = {
				value: map,
			};
			material.fragmentShader = fragmentTextureShader;
			return material;
		}
		uniforms.uColor = {
			value: color,
		};
		return material;
	}
}
