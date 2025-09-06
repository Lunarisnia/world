import { BoxGeometry, Mesh, ShaderMaterial } from "three";
import Game from "./game";
import basicVert from "/shaders/basic/basic.vert?url&raw"
import redColor from "/shaders/basic/red-color.frag?url&raw"
import Spawner from "./object/spawner";

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
		}, basicVert, redColor);
		game.scene.add(this.sphere.mesh);

		game.mainCamera.instance.position.z = 5;
	}

	update() {
		this.sphere.mesh.position.x = Math.cos(this.game.clock.getElapsedTime());
		this.sphere.mesh.position.y = Math.sin(this.game.clock.getElapsedTime());
	}
};
