import { Mesh, NearestFilter, WebGLRenderer, WebGLRenderTarget } from "three";
import Camera from "./camera";
import { Scene } from "three";
import Game from "./game";
import ViewportGeometry from "./geometry/ViewportGeometry";
import ViewportMaterial from "./material/ViewportMaterial";
import DebugController from "./DebugController";
import Spawner from "./entity/spawner";
import TestBedViewportMaterial from "./material/TestBedViewportMaterial";

export default class Renderer {
	/** @type {WebGLRenderer} */
	instance;

	/** @type {WebGLRenderTarget} */
	mainRenderTarget;

	/** @type {WebGLRenderTarget} */
	testBedRenderTarget;

	viewport;

	constructor() {
		const canvas = document.querySelector("#mainCanvas")
		this.instance = new WebGLRenderer({ antialias: false, canvas });

		this.mainRenderTarget = new WebGLRenderTarget(512, 512, {
			minFilter: NearestFilter,
			magFilter: NearestFilter,
			generateMipmaps: false,
			// MSAA sample
			samples: 2,
		});

		this.testBedRenderTarget = new WebGLRenderTarget(512, 512, {
			minFilter: NearestFilter,
			magFilter: NearestFilter,
			generateMipmaps: false,
			// MSAA sample
			samples: 2,
		});
	}

	setViewport() {
		const geom = new ViewportGeometry();
		const material = new ViewportMaterial(this.mainRenderTarget);
		this.viewport = new Mesh(geom, material);
		Game.instance.scene.add(this.viewport);

		const testBedGeom = new ViewportGeometry();
		const testBedMaterial = new TestBedViewportMaterial(this.testBedRenderTarget);
		this.testBedViewport = new Mesh(testBedGeom, testBedMaterial);
		Game.instance.testRealmViewportScene.add(this.testBedViewport);
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
		this.testBedRenderTarget.setSize(width * window.devicePixelRatio, height * window.devicePixelRatio);
	}

	render() {
		if (Game.instance.debug.shaderTestBed) {
			this.instance.setRenderTarget(this.testBedRenderTarget);
			// NOTE: Might need to replace this with an independent camera
			this.instance.render(Game.instance.testRealmScene, Game.instance.mainCamera.instance);

			this.instance.setRenderTarget(null);
			this.instance.render(Game.instance.testRealmViewportScene, Game.instance.viewportCamera);
			return;
		}

		this.instance.setRenderTarget(this.mainRenderTarget);
		this.instance.render(Game.instance.world.scene, Game.instance.mainCamera.instance);

		this.instance.setRenderTarget(null);
		this.instance.render(Game.instance.scene, Game.instance.viewportCamera);
	}
};
