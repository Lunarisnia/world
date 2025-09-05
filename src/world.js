import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import Game from "./game";


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
		const material = new MeshBasicMaterial({ color: 0x00ff00 });
		this.cube = new Mesh(geometry, material);
		game.scene.add(this.cube);

		game.mainCamera.instance.position.z = 5;
		game.mainCamera.instance.position.y = 1;
	}

	update() {
		this.cube.position.x = Math.sin(this.game.clock.getElapsedTime());
		this.cube.position.y = Math.cos(this.game.clock.getElapsedTime());
	}
};
