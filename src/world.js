import { BoxGeometry, Mesh, MeshBasicMaterial, ShaderMaterial } from "three";
import Game from "./game";
import basicVert from "/shaders/basic/basic.vert?url&raw"
import redColor from "/shaders/basic/red-color.frag?url&raw"


export default class World {
	/** @type {Game} */
	game;

	/**
	 * description
	 * @param {Game} game - desc
	 */
	constructor(game) {
		this.game = game;
		const geometry = new BoxGeometry(1, 1, 1);
		const material = new ShaderMaterial({
			vertexShader: basicVert,
			fragmentShader: redColor,
		});
		this.cube = new Mesh(geometry, material);
		game.scene.add(this.cube);

		game.mainCamera.instance.position.z = 5;
	}

	update() {
		this.cube.position.x = Math.cos(this.game.clock.getElapsedTime());
		this.cube.position.y = Math.sin(this.game.clock.getElapsedTime());
	}
};
