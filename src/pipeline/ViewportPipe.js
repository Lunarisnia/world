import Game from "../game";
import Pipe from "./pipe";

export default class ViewportPipe extends Pipe {
	constructor() {
		super();

		this.type = "ViewportPipe";
	}

	draw() {
		this.renderer.setRenderTarget(null);
		this.renderer.render(Game.instance.scene, Game.instance.viewportCamera);
	}
}
