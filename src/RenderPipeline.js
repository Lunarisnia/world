import { WebGLRenderer } from "three";
import Pipe from "./pipeline/pipe";
import Renderer from "./renderer";

export default class RenderPipeline {
	pipeline = new Map();
	/** @type {WebGLRenderer} */
	renderer;

	/**
	 * Construct render pipeline
	 * @param {Renderer} renderer
	 * @param {...Pipe} pipes 
	 */
	constructor(renderer, ...pipes) {
		this.renderer = renderer;
		for (const pipe of pipes) {
			pipe.pipeline = this.pipeline;
			pipe.renderer = this.renderer;
			this.pipeline.set(pipe.type, pipe);
		}

		//console.log(this.pipeline);
	}


	run() {
		for (const [_, pipe] of this.pipeline) {
			pipe.draw();
		}
	}
}
