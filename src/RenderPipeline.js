import Pipe from "./pipeline/pipe";
import Renderer from "./renderer";

export default class RenderPipeline {
	pipeline = new Map();
	/** @type {Renderer} */
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
			pipe.init();
			this.pipeline.set(pipe.type, pipe);
		}
	}

	/**
	 * Get Pipe
	 * @param {string} name - desc
	 * @returns {null | Pipe} - desc
	 */
	getPipe(name) {
		if (!this.pipeline.has(name)) {
			return null
		}

		return this.pipeline.get(name);
	}


	run() {
		for (const [_, pipe] of this.pipeline) {
			pipe.draw();
		}
	}
}
