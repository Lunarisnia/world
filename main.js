import Game from './src/game';
import { gsap } from "gsap";

import { CustomEase } from "gsap/CustomEase";
import Databank from './src/databank/databank';

gsap.registerPlugin(CustomEase);


Databank.getWorkHistories().then(() => {
	const game = new Game();
	game.run();
});

