import { Mesh, NearestFilter, WebGLRenderer, WebGLRenderTarget } from "three";
import Camera from "./camera";
import { Scene } from "three";
import Game from "./game";
import ViewportGeometry from "./geometry/ViewportGeometry";
import ViewportMaterial from "./material/ViewportMaterial";

export default class Renderer {
	/** @type {WebGLRenderer} */
	instance;

	/** @type {WebGLRenderTarget} */
	mainRenderTarget;

	viewport;

	constructor() {
		const canvas = document.querySelector("#mainCanvas")
		this.instance = new WebGLRenderer({ antialias: false, canvas });

		this.mainRenderTarget = new WebGLRenderTarget(512, 512, {
			minFilter: NearestFilter,
			magFilter: NearestFilter,
			samples: 2,
			generateMipmaps: false,
		});
	}

	setViewport() {
		const geom = new ViewportGeometry();
		const material = new ViewportMaterial(this.mainRenderTarget);
		this.viewport = new Mesh(geom, material);
		Game.instance.scene.add(this.viewport);
	}

	/**
	 * Set Scene
	 * @param {Scene} scene - desc
	 */
	setScene(scene) {
		this.scene = scene;
	}

	/**
	 * Set Camera
	 * @param {Camera} camera - desc
	 */
	setCamera(camera) {
		this.camera = camera;
	}

	setSize(width, height) {
		this.instance.setSize(width, height);
		this.mainRenderTarget.setSize(width * window.devicePixelRatio, height * window.devicePixelRatio);
	}

	render() {
		this.instance.setRenderTarget(this.mainRenderTarget);
		this.instance.render(Game.instance.world.scene, Game.instance.mainCamera.instance);

		this.instance.setRenderTarget(null);
		this.instance.render(Game.instance.scene, Game.instance.viewportCamera);
	}
};
