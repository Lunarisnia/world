import { Vector3 } from "three";
import Component from "../component";

export default class FollowLight extends Component {
	playerWorldPos = new Vector3();
	lightOffsetPos = new Vector3(0, 100, 200);
	controlOffsetPos = new Vector3(0, 0, -4);
	constructor(light, player) {
		super();
		this.light = light;
		this.player = player;
	}

	init() {

	}

	update() {
		this.player.mesh.getWorldPosition(this.playerWorldPos);
		const offset = this.lightOffsetPos.clone().add(this.playerWorldPos);
		const controlOffset = this.controlOffsetPos.clone().add(this.playerWorldPos);

		//this.light.position.lerp(offset, 0.2);
		this.light.position.set(offset.x, offset.y, offset.z);
		this.mesh.position.set(controlOffset.x, controlOffset.y, controlOffset.z);
		//this.light.lookAt(this.playerWorldPos);

	}
}
