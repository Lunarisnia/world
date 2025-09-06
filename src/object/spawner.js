import { ShaderMaterial, SphereGeometry } from "three";
import Object from "./object";

export default class Spawner {
	static CreateSphereWithShaderMaterial({ radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength }, vertexShader, fragmentShader) {
		const geometry = new SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
		const material = new ShaderMaterial({
			vertexShader,
			fragmentShader,
		});
		return new Object(geometry, material);
	}
};
