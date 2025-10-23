import { Mesh, WebGLRenderer, WebGLRenderTarget } from "three";
import Camera from "./camera";
import { Scene } from "three";
import Game from "./game";
import ViewportGeometry from "./geometry/ViewportGeometry";
import ViewportMaterial from "./material/ViewportMaterial";
import { EffectComposer } from "postprocessing";
import MainRenderPass from "./renderpasses/MainRenderpass";


export default class Renderer {
	/** @type {WebGLRenderer} */
	instance;

	/** @type {[WebGLRenderTarget]} */
	resizedRenderTarget = new Array();

	/** @type {Mesh} */
	viewport;
	/** @type {Mesh} */
	testRealmViewport;
	/** @type {Mesh} */
	postProcessViewport;

	constructor() {
		const canvas = document.querySelector("#mainCanvas")
		this.instance = new WebGLRenderer({
			antialias: false,
			stencil: false,
			powerPreference: "high-performance",
			depth: false,
			canvas
		});
		this.instance.shadowMap.enabled = true;
		this.instance.setPixelRatio(window.devicePixelRatio);

		// TODO: Abstract this to its own file
		this.composer = new EffectComposer(this.instance);
		this.registerRenderTargetToBeResized(this.composer);

		this.mainPass = new MainRenderPass(this.composer);
	}

	init() {
		this.mainPass.init();
	}

	registerRenderTargetToBeResized(renderTarget) {
		this.resizedRenderTarget.push(renderTarget);
	}

	setViewport() {
		const geom = new ViewportGeometry();
		const material = new ViewportMaterial();
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
		for (const rt of this.resizedRenderTarget) {
			rt.setSize(width, height);
		}
	}

	draw() {
		this.mainPass.render();
	}
};
