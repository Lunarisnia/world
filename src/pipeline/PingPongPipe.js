import { Mesh, NearestFilter, WebGLRenderTarget } from "three";
import Pipe from "./Pipe";
import BlurPlaneMaterial from "../material/BlurPlaneMaterial";

export default class PingPongPipe extends Pipe {
	/** @type {WebGLRenderTarget} */
	renderTargetA;
	renderTargetB
	renderTarget;
	/**
	 * Ping Pong Blur Shader
	 * @param {any} scene - desc
	 * @param {any} camera - desc
	 * @param {Mesh} postProcessPlane - desc
	 */
	constructor(scene, camera, postProcessPlane) {
		super();
		this.scene = scene;
		this.camera = camera;
		this.renderTargetA = new WebGLRenderTarget(512, 512, {
			minFilter: NearestFilter,
			magFilter: NearestFilter,
			generateMipmaps: false,
			count: 1,
			// MSAA sample
			//samples: 2,
		});
		this.renderTargetB = new WebGLRenderTarget(512, 512, {
			minFilter: NearestFilter,
			magFilter: NearestFilter,
			generateMipmaps: false,
			count: 1,
			// MSAA sample
			//samples: 2,
		});
		this.renderTarget = this.renderTargetA;

		this.type = "PingPongPipe";

		this.postProcessPlane = postProcessPlane;
	}

	init() {
		this.renderer.registerRenderTargetToBeResized(this.renderTargetA);
		this.renderer.registerRenderTargetToBeResized(this.renderTargetB);
		this.postProcessPlane.material = new BlurPlaneMaterial();
	}

	draw() {
		const prevIndex = Math.max(this.index - 1, 0);
		const prevPipe = this.pipeline.getPipe(this.pipeline.pipelineIndice[prevIndex]);
		this.postProcessPlane.material.uniforms.uImage.value = prevPipe.renderTarget.textures[1];
		this.renderer.instance.setRenderTarget(this.renderTargetA);
		this.renderer.instance.render(this.scene, this.camera);
		this.renderTarget = this.renderTargetA;


		let rt = this.renderTargetA;
		let input = this.renderTargetB;
		for (let i = 0; i < 5; i++) {
			if (i % 2 == 0) {
				input = this.renderTargetA;
				rt = this.renderTargetB;
				this.postProcessPlane.material.uniforms.uHorizontal.value = true;
				this.renderTarget = this.renderTargetB;
			} else {
				input = this.renderTargetB;
				rt = this.renderTargetA;
				this.postProcessPlane.material.uniforms.uHorizontal.value = false;
				this.renderTarget = this.renderTargetA;
			}
			this.postProcessPlane.material.uniforms.uImage.value = input.texture;

			this.renderer.instance.setRenderTarget(rt);
			this.renderer.instance.render(this.scene, this.camera);
		}
	}
}
