import { Mesh, NearestFilter, Scene, Vector3, WebGLRenderTarget } from "three";
import Game from "../game";
import Pipe from "./Pipe";
import CircleMaskMaterial from "../material/CircleMaskMaterial";
import PostProcessPlaneGeometry from "../geometry/PostProcessPlaneGeometry";

export default class CircleMaskPipe extends Pipe {
	/** @type {WebGLRenderTarget} */
	renderTarget;
	/** @type {Scene} */
	scene;
	/** @type {Mesh} */
	viewport;

	/**
	 * description
	 * @param {any} camera - desc
	 * @param {Mesh} point - desc
	 */
	constructor(camera) {
		super();
		this.camera = camera;

		this.renderTarget = new WebGLRenderTarget(512, 512, {
			minFilter: NearestFilter,
			magFilter: NearestFilter,
			generateMipmaps: false,
			count: 1,
			// MSAA sample
			samples: 2,
		});

		this.scene = new Scene();
		const postProcessGeom = new PostProcessPlaneGeometry();
		const circleMaskMaterial = new CircleMaskMaterial();
		this.viewport = new Mesh(postProcessGeom, circleMaskMaterial);
		this.scene.add(this.viewport);

		this.point = new Vector3(0.0, 0.0, 0.0);
		this.radius = 8.0;

		this.type = "CircleMaskPipe";
	}

	init() {
		this.renderer.registerRenderTargetToBeResized(this.renderTarget);
	}

	draw() {
		const worldPipe = this.pipeline.getPipe("WorldPipe");
		this.viewport.material.uniforms.uPointPosition = { value: this.point };
		this.viewport.material.uniforms.uRadius = { value: this.radius };

		this.viewport.material.uniforms.uWorldTexture = { value: worldPipe.renderTarget.texture };
		this.viewport.material.uniforms.uDepthTexture = { value: worldPipe.renderTarget.depthTexture };
		this.viewport.material.uniforms.uTime = { value: Game.instance.clock.getElapsedTime() };

		Game.instance.mainCamera.instance.updateMatrixWorld();
		Game.instance.mainCamera.instance.updateProjectionMatrix();
		this.viewport.material.uniforms.uInverseProjectionMatrix = { value: Game.instance.mainCamera.instance.projectionMatrixInverse };
		this.viewport.material.uniforms.uInverseViewMatrix = { value: Game.instance.mainCamera.instance.matrixWorld };

		this.renderer.instance.setRenderTarget(this.renderTarget);
		this.renderer.instance.render(this.scene, this.camera);
	}
}
