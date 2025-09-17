import { Vector2, Vector3 } from "three";
import Component from "../component";
import Game from "../game";

export default class TriggerBox extends Component {
	constructor(width, height, depth) {
		super();
		this.width = width;
		this.height = height;
		this.depth = depth;

	}

	init() {
		this.player = Game.instance.world.player;
		this.mesh.position.z = -4;
	}

	update() {
		this.updateTriggerPosition();
		const pPos = new Vector3();
		this.player.mesh.getWorldPosition(pPos);
		if (pPos.x >= this.bottomLeft.x && pPos.x <= this.topRight.x && pPos.z <= this.bottomLeft.y && pPos.z >= this.topRight.y) {
			console.log("Inside");
		}
	}

	updateTriggerPosition() {
		const wPos = new Vector3();
		this.mesh.getWorldPosition(wPos);

		this.bottomLeft = new Vector2(wPos.x - (this.width / 2), wPos.z + (this.height / 2));
		this.topRight = new Vector2(wPos.x + (this.width / 2), wPos.z - (this.height / 2));
	}
}
