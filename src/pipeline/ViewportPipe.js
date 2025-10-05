import { Matrix4 } from "three";
import Game from "../game";
import Pipe from "./Pipe";

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
		this.renderer.viewport.material.uniforms.uDepthTexture.value = worldPipe.renderTarget.depthTexture;
		this.renderer.viewport.material.uniforms.uBloomTexture = { value: pingPongPipe.renderTarget.texture };
		this.renderer.viewport.material.uniforms.uTime = { value: Game.instance.clock.getElapsedTime() };

		Game.instance.mainCamera.instance.updateMatrixWorld();
		Game.instance.mainCamera.instance.updateProjectionMatrix();
		this.renderer.viewport.material.uniforms.uInverseProjectionMatrix.value = Game.instance.mainCamera.instance.projectionMatrixInverse;
		this.renderer.viewport.material.uniforms.uInverseViewMatrix.value = Game.instance.mainCamera.instance.matrixWorld;

		this.renderer.instance.setRenderTarget(null);
		this.renderer.instance.render(this.scene, this.camera);
	}
}
