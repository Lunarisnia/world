import { degToRad } from "three/src/math/MathUtils";
import Component from "../component";
import TriggerBox from "./TriggerBox";

export default class GroundBorder extends Component {
	constructor() {
		super();
	}

	init() {
		this.mesh.position.y = -0.49;
		this.mesh.position.z = -4;
		this.mesh.position.x = -8;
		this.mesh.rotateX(degToRad(-90));
		const width = this.mesh.geometry.parameters.width;
		const height = this.mesh.geometry.parameters.height;
		const trig = new TriggerBox(width / 2.0, height / 2.0, 2);
		trig.onTriggerEnter = () => {
			this.onTriggerEnter();
		}
		trig.onTriggerExit = () => {
			this.onTriggerExit();
		}
		this.owner.addComponent(trig);
	}

	onTriggerEnter() {

	}

	onTriggerExit() {

	}
}
