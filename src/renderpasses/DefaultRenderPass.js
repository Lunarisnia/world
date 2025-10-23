import { EffectComposer } from "postprocessing";
import Game from "../game";

export default class DefaultRenderPass {
	/**
	 * 
	 * @param {EffectComposer} composer - desc
	 */
	constructor(composer) {
		this.composer = composer;
	}

	init() {

	}

	render() {
		this.composer.render(Game.instance.clock.getDelta());
	}

	reset() {
		this.composer.reset();
	}
}
