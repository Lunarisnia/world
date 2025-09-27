import Pipe from "./pipe";

export default class ViewportPipe extends Pipe {
	constructor(scene, camera) {
		super();
		this.scene = scene;
		this.camera = camera;

		this.type = "ViewportPipe";
	}

	draw() {
		this.renderer.instance.setRenderTarget(null);
		this.renderer.instance.render(this.scene, this.camera);
	}
}
