import { BoxGeometry, MeshBasicMaterial, ShaderMaterial, SphereGeometry } from "three";
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

	static CreateSimpleSphere({ radius, widthSegments, heightSegments, color }) {
		const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
		const material = new MeshBasicMaterial({ color: color });
		return new Entity(geometry, material);
	}

	static CreateCubeWithShaderMaterial({ width, height, depth, widthSegments, heightSegments, depthSegments }, {
		vertexShader, fragmentShader, uniforms,
	}) {
		const geometry = new BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);
		const material = new ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms,
		});

		return new Entity(geometry, material);
	}

	static CreateSimpleCube({ width, height, depth, color }) {
		const geometry = new BoxGeometry(width, height, depth);
		const material = new MeshBasicMaterial({ color: color });

		return new Entity(geometry, material);
	}
};
