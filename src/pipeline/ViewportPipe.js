import Game from "../game";
import Pipe from "./pipe";

export default class ViewportPipe extends Pipe {
	constructor() {
		super();

		this.type = "ViewportPipe";
	}

	draw() {
		this.renderer.instance.setRenderTarget(null);
		this.renderer.instance.render(Game.instance.scene, Game.instance.viewportCamera);
	}
}
