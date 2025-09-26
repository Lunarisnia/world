import Game from "../game";
import Pipe from "./pipe";

export default class WorldPipe extends Pipe {
	constructor() {
		super();

		this.type = "WorldPipe";
	}

	draw() {
		this.renderer.setRenderTarget(Game.instance.renderer.mainRenderTarget);
		this.renderer.render(Game.instance.world.scene, Game.instance.mainCamera.instance);
	}
}
