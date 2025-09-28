import Pipe from "./pipeline/Pipe";
import Renderer from "./renderer";

export default class RenderPipeline {
	pipelineIndice = new Array();
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
		let i = 0;
		for (const pipe of pipes) {
			pipe.pipeline = this;
			pipe.renderer = this.renderer;
			pipe.index = i;
			pipe.init();
			this.pipeline.set(pipe.type, pipe);
			this.pipelineIndice.push(pipe.type);
			i++;
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
