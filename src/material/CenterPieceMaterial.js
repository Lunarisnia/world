import { ShaderMaterial, Vector3 } from "three";

import vertexShader from "/shaders/center/center.vert?url&raw";
import fragmentShader from "/shaders/center/center.frag?url&raw";

export default class CenterPieceMaterial {
	constructor() {
		const uniforms = {
			uTime: {
				value: 0.0,
			},
			uCameraPosition: {
				value: new Vector3(0.0, 0.0, 0.0),
			}
		};

		const material = new ShaderMaterial({
			wireframe: false,
			uniforms: uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
		});

		return material;
	}
}
