import Component from "../component";
import GroundBorderZone from "./GroundBorderZone";
import WorkDisplayEntity from "../entities/WorkDisplayEntity";
import WorkDisplay from "./WorkDisplay";
import { degToRad } from "three/src/math/MathUtils";
import GroundBorderEntity from "../entities/GroundBorderEntity";

export default class WorkZone extends Component {
	/** @type {WorkDisplayEntity} */
	workDisplay;
	/** @type {GroundBorderEntity} */
	infoZone;

	constructor() {
		super();
	}

	init() {
		this.workDisplay = new WorkDisplayEntity();
		this.workDisplay.addComponent(new WorkDisplay());
		this.owner.addChild(this.workDisplay);

		this.infoZone = new GroundBorderEntity();
		this.infoZone.addComponent(new GroundBorderZone());
		this.owner.addChild(this.infoZone);

		this.mesh.position.z = 10;
		this.mesh.position.y = -0.4;

		this.workDisplay.mesh.position.x = -1;
		this.workDisplay.mesh.position.z = -2;
		this.workDisplay.mesh.position.y = 0.5;
		this.workDisplay.mesh.rotateY(degToRad(15));

		this.infoZone.mesh.position.z = 2;
		// TODO: add text to the top of the display
		// TODO: Procedurally generate this object
	}

	update() {

	}
}
