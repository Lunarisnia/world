import { Vector2, Vector3 } from "three";
import Component from "../component";
import Game from "../game";

export default class TriggerBox extends Component {
	intersecting = false;
	/** @type {Function} */
	onTriggerEnter = () => { }
	/** @type {Function} */
	onTriggerExit = () => { }

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
			if (!this.intersecting) {
				this.onTriggerEnter();
			}
			this.intersecting = true;
			return;
		}

		if (this.intersecting) {
			this.onTriggerExit();
		}
		this.intersecting = false;
	}

	updateTriggerPosition() {
		const wPos = new Vector3();
		this.mesh.getWorldPosition(wPos);

		this.bottomLeft = new Vector2(wPos.x - (this.width), wPos.z + (this.height));
		this.topRight = new Vector2(wPos.x + (this.width), wPos.z - (this.height));
	}
}
