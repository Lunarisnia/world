import { DepthTexture, NearestFilter, WebGLRenderer, WebGLRenderTarget } from "three";
import Pipe from "./Pipe";

export default class WorldPipe extends Pipe {
	/** @type {WebGLRenderer} */
	renderTarget;

	constructor(scene, camera) {
		super();

		this.type = "WorldPipe";
		this.scene = scene;
		this.camera = camera;
		this.renderTarget = new WebGLRenderTarget(512, 512, {
			minFilter: NearestFilter,
			magFilter: NearestFilter,
			generateMipmaps: false,
			count: 2,
			// MSAA sample
			samples: 2,
			depthTexture: new DepthTexture(),
		});
	}

	init() {
		this.renderer.registerRenderTargetToBeResized(this.renderTarget);
	}

	draw() {
		this.renderer.instance.setRenderTarget(this.renderTarget);
		this.renderer.instance.render(this.scene, this.camera);
	}
}
