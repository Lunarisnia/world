import { ShaderMaterial, SphereGeometry } from "three";
import Entity from "./entity";

export default class Spawner {
	static CreateSphereWithShaderMaterial({ radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength }, {
		vertexShader,
		fragmentShader,
		uniforms,
	}) {
		const geometry = new SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
		const material = new ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms,
		});
		return new Entity(geometry, material);
	}
};
