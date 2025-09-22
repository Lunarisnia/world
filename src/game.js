import { Clock, Scene } from "three";
import Camera from "./camera";
import Renderer from "./renderer";
import World from "./world";
import InputManager from "./input/inputManager";
import Physics from "./physics";

export default class Game {
	/** @type {Game} */
	static instance;
	/** @type {HTMLCanvasElement} */
	static window;
	/** @type {Renderer} */
	renderer;
	/** @type {Camera} */
	mainCamera;
	/** @type {Scene} */
	scene;
	/** @type {Clock} */
	clock;
	/** @type {World} */
	world;

	constructor() {
		if (Game.instance) {
			return Game.instance;
		}
		Game.instance = this;

		this.mainCamera = new Camera(90, window.innerWidth / window.innerHeight, 0.01, 1000);
		this.scene = new Scene();
		this.setClock();

		this.setRenderer();
		this.renderer.setCamera(this.mainCamera);
		this.renderer.setScene(this.scene);

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
		// This is required for the canvas to properly listen for keyboard input
		this.renderer.instance.domElement.tabIndex = 0;
		document.body.appendChild(this.renderer.instance.domElement);
		Game.window = this.renderer.instance.domElement;
		window.addEventListener("resize", () => {
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.mainCamera.instance.aspect = window.innerWidth / window.innerHeight;
			this.mainCamera.instance.updateProjectionMatrix();
		})
	}


	async run() {
		this.clock.start();
		await Physics.instance.init();
		this.world.init();
		this.mainCamera.init();
		this.renderer.instance.setAnimationLoop(() => {
			this.renderLoop();
		});
	}

	renderLoop() {
		Physics.instance.update();
		this.mainCamera.update();
		this.world.update();
		InputManager.instance.update();
		this.renderer.render();
	}
};
