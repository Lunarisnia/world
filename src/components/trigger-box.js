import Component from "../component";
import Game from "../game";

export default class TriggerBox extends Component {
	init() {
		this.player = Game.instance.world.player;
	}

	update() {
	}
}
