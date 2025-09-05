import { Clock, Scene } from "three";
import Camera from "./camera";
import Renderer from "./renderer";
import World from "./world";

export default class Game {
	/** @type {Game} */
	static instance;
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

		this.mainCamera = new Camera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
		this.scene = new Scene();
		this.setClock();

		this.setRenderer();
		this.renderer.setCamera(this.mainCamera);
		this.renderer.setScene(this.scene);

		this.setWorld();
	}

	setWorld() {
		this.world = new World(this);
	}

	setClock() {
		this.clock = new Clock();
	}

	setRenderer() {
		this.renderer = new Renderer();

		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.instance.domElement);
	}


	run() {
		this.clock.start();
		this.renderer.instance.setAnimationLoop(() => {
			this.renderLoop();
		});
	}

	renderLoop() {
		this.world.update();
		this.renderer.render();
	}
};
