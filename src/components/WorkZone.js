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
	/** @type {WorkDisplay} */
	workDisplay;
	/** @type {GroundBorderEntity} */
	infoZone;

	/** @type {string} */
	role;

	constructor(role = "Software Engineer") {
		super();
		this.role = role;
		this.workDisplayEntity = new WorkDisplayEntity();
		this.workDisplay = new WorkDisplay();
		this.workDisplayEntity.addComponent(this.workDisplay);
	}

	init() {
		this.owner.addChild(this.workDisplayEntity);

		this.infoZone = new GroundBorderEntity();
		this.infoZone.addComponent(new GroundBorderZone());
		this.owner.addChild(this.infoZone);

		this.mesh.position.y = -0.49;

		this.workDisplay.mesh.position.x = -1;
		this.workDisplay.mesh.position.z = -2;
		this.workDisplay.mesh.position.y = 0.5;
		this.workDisplay.mesh.rotateY(degToRad(15));

		this.infoZone.mesh.position.z = 2;

		// FIXME: This doesn't work for some reason
		const loader = new FontLoader();
		loader.load("/typefaces/Optimer-Regular.json", (font) => {
			const fontGeom = new TextGeometry(this.role, {
				font,
				size: 0.5,
				depth: 0.01,

				curveSegments: 4,
			});
			fontGeom.computeBoundingBox();
			const fontMat = new SimpleMeshMaterial({
				color: new Color(0.0, 0.0, 1.0),
			});

			const centerOffset = - 0.5 * (fontGeom.boundingBox.max.x - fontGeom.boundingBox.min.x);
			this.roleFontEntity = new Entity(fontGeom, fontMat);
			this.owner.addChild(this.roleFontEntity);
			this.roleFontEntity.mesh.position.x = centerOffset - 1.0;
			this.roleFontEntity.mesh.position.z = -1.5;
			this.roleFontEntity.mesh.position.y = 4.8;
			this.roleFontEntity.mesh.rotateY(degToRad(15));
		});


		// TODO: Load font during the game launching
	}

	update() {

	}
}
