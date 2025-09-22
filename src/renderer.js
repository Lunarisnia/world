import { WebGLRenderer } from "three";
import Camera from "./camera";
import { Scene } from "three";

export default class Renderer {
	/** @type {WebGLRenderer} */
	instance;
	/** @type {Scene} */
	scene;
	/** @type {Camera} */
	camera;

	constructor() {
		const canvas = document.querySelector("#mainCanvas")
		this.instance = new WebGLRenderer({ antialias: true, canvas });
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
	}

	render() {
		this.instance.render(this.scene, this.camera.instance);
	}
};
