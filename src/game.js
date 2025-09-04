import { Scene } from "three";
import Camera from "./camera";
import Renderer from "./renderer";

export default class Game {
	/** @type {Game} */
	static instance;
	/** @type {Renderer} */
	renderer;
	/** @type {Camera} */
	mainCamera;
	/** @type {Scene} */
	world;

	constructor() {
		if (Game.instance) {
			return Game.instance;
		}
		Game.instance = this;

		this.mainCamera = new Camera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
		this.world = new Scene();

		this.setRenderer();
		this.renderer.setCamera(this.mainCamera);
		this.renderer.setScene(this.world);
	}

	setRenderer() {
		this.renderer = new Renderer();

		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.instance.domElement);
	}


	run() {
		this.renderer.startRenderLoop();
	}
};
