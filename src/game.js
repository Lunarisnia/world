import { Clock, OrthographicCamera, Scene } from "three";
import Camera from "./camera";
import Renderer from "./renderer";
import World from "./world";
import InputManager from "./input/inputManager";
import Physics from "./physics";
import FPSCounter from "./FPSCounter";
import ViewportCamera from "./ViewportCamera";

export default class Game {
	/** @type {Game} */
	static instance;
	/** @type {HTMLCanvasElement} */
	static window;
	/** @type {Renderer} */
	renderer;
	/** @type {Camera} */
	mainCamera;
	/** @type {OrthographicCamera} */
	viewportCamera;
	/** @type {Scene} */
	scene;
	/** @type {Clock} */
	clock;
	/** @type {World} */
	world;
	/** @type {FPSCounter} */
	framerate;

	designatedFPS = 60.0;
	frameDuration = 1.0 / this.designatedFPS;
	delta = 0;

	constructor() {
		if (Game.instance) {
			return Game.instance;
		}
		Game.instance = this;

		this.framerate = new FPSCounter();

		this.mainCamera = new Camera(90, window.innerWidth / window.innerHeight, 0.01, 1000);
		this.viewportCamera = new ViewportCamera(0.1, 1000);
		this.scene = new Scene();
		this.setClock();

		this.setRenderer();
		this.renderer.setViewport();

		this.setWorld();

		new InputManager();
		new Physics();

	}

	setWorld() {
		this.world = new World();
	}

	setClock() {
		this.clock = new Clock();
	}

	setRenderer() {
		this.renderer = new Renderer();

		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.instance.setPixelRatio(window.devicePixelRatio);
		// This is required for the canvas to properly listen for keyboard input
		this.renderer.instance.domElement.tabIndex = 0;
		document.body.appendChild(this.renderer.instance.domElement);
		Game.window = this.renderer.instance.domElement;
		window.addEventListener("resize", () => {
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.mainCamera.instance.aspect = window.innerWidth / window.innerHeight;
			this.renderer.instance.setPixelRatio(window.devicePixelRatio);
			this.mainCamera.instance.updateProjectionMatrix();
		})
	}


	async run() {
		this.clock.start();
		await Physics.instance.init();
		this.world.init();
		this.mainCamera.init();

		this.framerate.init();
		this.lastTime = performance.now();
		this.renderer.instance.setAnimationLoop(() => {
			this.renderLoop();
		});
	}

	renderLoop() {
		this.delta += this.clock.getDelta();
		if (this.delta < this.frameDuration) {
			return
		};

		Physics.instance.update();
		this.mainCamera.update();
		this.world.update();
		InputManager.instance.update();
		this.framerate.tick();
		this.renderer.render();

		this.delta = this.delta % this.frameDuration;
	}
};
