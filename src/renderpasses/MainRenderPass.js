import { EdgeDetectionMode, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from "postprocessing";
import DefaultRenderPass from "./DefaultRenderpass";
import Game from "../game";

export default class MainRenderPass extends DefaultRenderPass {
	constructor(composer) {
		super(composer);
	}

	init() {
		const camera = Game.instance.mainCamera.instance;
		const scene = Game.instance.world.scene;

		this.composer.reset();
		const renderPass = new RenderPass(scene, camera);
		const smaaEffect = new SMAAEffect({
			preset: SMAAPreset.HIGH,
			edgeDetectionMode: EdgeDetectionMode.LUMA,
		});
		const smaaPass = new EffectPass(camera, smaaEffect);

		this.composer.addPass(renderPass);
		this.composer.addPass(smaaPass);
	}
}
