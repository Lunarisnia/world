import { Mesh, NearestFilter, WebGLRenderer, WebGLRenderTarget } from "three";
import Camera from "./camera";
import { Scene } from "three";
import Game from "./game";
import ViewportGeometry from "./geometry/ViewportGeometry";
import ViewportMaterial from "./material/ViewportMaterial";
import TestBedViewportMaterial from "./material/TestBedViewportMaterial";
import RenderPipeline from "./RenderPipeline";
import ViewportPipe from "./pipeline/ViewportPipe";
import WorldPipe from "./pipeline/WorldPipe";

export default class Renderer {
	/** @type {WebGLRenderer} */
	instance;

	/** @type {[WebGLRenderTarget]} */
	resizedRenderTarget = new Array();

	viewport;

	/** @type {{main: RenderPipeline, testBed: RenderPipeline}} */
	pipelines = {
		main: null,
		testBed: null,
	};

	// TODO: Create render pipeline abstraction

	constructor() {
		const canvas = document.querySelector("#mainCanvas")
		this.instance = new WebGLRenderer({ antialias: false, canvas });


		this.testBedRenderTarget = new WebGLRenderTarget(512, 512, {
			minFilter: NearestFilter,
			magFilter: NearestFilter,
			generateMipmaps: false,
			// MSAA sample
			samples: 2,
		});


		this.pipelines.main = new RenderPipeline(this,
			new WorldPipe(Game.instance.world.scene, Game.instance.mainCamera.instance),
			new ViewportPipe(Game.instance.scene, Game.instance.viewportCamera),
		);
		this.pipelines.testBed = new RenderPipeline(this,
			new WorldPipe(Game.instance.testRealmScene, Game.instance.mainCamera.instance),
			new ViewportPipe(Game.instance.testRealmViewportScene, Game.instance.viewportCamera),
		);
	}

	registerRenderTargetToBeResized(renderTarget) {
		this.resizedRenderTarget.push(renderTarget);
	}

	setViewport() {
		const geom = new ViewportGeometry();
		const material = new ViewportMaterial(this.pipelines.main.getPipe("WorldPipe").renderTarget);
		this.viewport = new Mesh(geom, material);
		Game.instance.scene.add(this.viewport);

		const testBedGeom = new ViewportGeometry();
		const testBedMaterial = new TestBedViewportMaterial(this.pipelines.testBed.getPipe("WorldPipe").renderTarget);
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
		for (const rt of this.resizedRenderTarget) {
			rt.setSize(width * window.devicePixelRatio, height * window.devicePixelRatio);
		}
	}

	render() {
		if (Game.instance.debug.shaderTestBed) {
			this.pipelines.testBed.run();
			return;
		}
		this.pipelines.main.run();
	}
};
