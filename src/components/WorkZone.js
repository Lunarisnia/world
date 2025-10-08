import Component from "../component";
import GroundBorderZone from "./GroundBorderZone";
import WorkDisplayEntity from "../entities/WorkDisplayEntity";
import WorkDisplay from "./WorkDisplay";
import { degToRad } from "three/src/math/MathUtils";
import GroundBorderEntity from "../entities/GroundBorderEntity";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import SimpleMeshMaterial from "../material/SimpleMeshMaterial";
import { Color } from "three";
import Entity from "../entity";

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
		//this.mesh.position.y = -0.4;

		this.workDisplay.mesh.position.x = -1;
		this.workDisplay.mesh.position.z = -2;
		this.workDisplay.mesh.position.y = 0.5;
		this.workDisplay.mesh.rotateY(degToRad(15));

		this.infoZone.mesh.position.z = 2;

		// FIXME: This doesn't work for some reason
		//const loader = new FontLoader();
		//let font;
		//loader.load("/typefaces/Optimer-Regular.json", (data) => {
		//	font = data;
		//});
		//
		//const fontGeom = new TextGeometry("", {
		//	font,
		//	size: 70,
		//	depth: 20,
		//
		//	curveSegments: 4,
		//
		//	bevelThickness: 2,
		//	bevelSize: 1.5,
		//	bevelEnabled: true,
		//});
		//fontGeom.computeBoundingBox();
		//const fontMat = new SimpleMeshMaterial({
		//	color: new Color(0.0, 0.0, 1.0),
		//});
		//
		//const fontEntity = new Entity(fontGeom, fontMat);
		//this.owner.addChild(fontEntity);

		// TODO: add text to the top of the display
		// TODO: Procedurally generate this object
	}

	update() {

	}
}
