import Pipe from "./pipe";

export default class ViewportPipe extends Pipe {
	constructor(scene, camera) {
		super();
		this.scene = scene;
		this.camera = camera;

		this.type = "ViewportPipe";
	}

	draw() {
		const pingPongPipe = this.pipeline.getPipe("PingPongPipe");
		const worldPipe = this.pipeline.getPipe("WorldPipe");
		this.renderer.viewport.material.uniforms.uWorldTexture.value = worldPipe.renderTarget.texture;
		this.renderer.viewport.material.uniforms.uBloomTexture = { value: pingPongPipe.renderTarget.texture };

		this.renderer.instance.setRenderTarget(null);
		this.renderer.instance.render(this.scene, this.camera);
	}
}
