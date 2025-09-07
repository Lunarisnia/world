import Game from "./game";
import basicVert from "/shaders/basic/basic.vert?url&raw"
import solidColor from "/shaders/basic/solid-color.frag?url&raw"
import Spawner from "./object/spawner";
import { Vector3 } from "three/webgpu";

export default class World {
	/** @type {Game} */
	game;

	/**
	 * description
	 * @param {Game} game - desc
	 */
	constructor(game) {
		this.game = game;
		this.sphere = Spawner.CreateSphereWithShaderMaterial({
			radius: 1.0,
			heightSegments: 30,
			widthSegments: 30,
		}, {
			vertexShader: basicVert,
			fragmentShader: solidColor,
			uniforms: {
				color: {
					value: new Vector3(0.0, 1.0, 0.0),
				},
			},
		});
		game.scene.add(this.sphere.mesh);

		game.mainCamera.instance.position.z = 5;
	}

	update() {
		this.sphere.mesh.position.x = Math.cos(this.game.clock.getElapsedTime());
		this.sphere.mesh.position.y = Math.sin(this.game.clock.getElapsedTime());
	}
};
