import Game from './src/game';
import { gsap } from "gsap";

import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);


const game = new Game();
game.run();

