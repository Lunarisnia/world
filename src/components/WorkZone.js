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

	constructor(company = "Company Name", role = "Software Engineer") {
		super();
		this.role = role;
		this.company = company;
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

		const loader = new FontLoader();
		loader.load("/typefaces/Optimer-Regular.json", (font) => {
			this.roleFontEntity = this.createFont(font, this.role);
			this.owner.addChild(this.roleFontEntity);

			const centerOffset = - 0.5 * (this.roleFontEntity.geometry.boundingBox.max.x - this.roleFontEntity.geometry.boundingBox.min.x);
			this.roleFontEntity.mesh.position.x = centerOffset - 1.0;
			this.roleFontEntity.mesh.position.z = -1.5;
			this.roleFontEntity.mesh.position.y = 4.8;
			this.roleFontEntity.mesh.rotateY(degToRad(15));

			this.companyFontEntity = this.createFont(font, this.company);
			this.owner.addChild(this.companyFontEntity);

			const companyCenterOffset = - 0.5 * (this.companyFontEntity.geometry.boundingBox.max.x - this.companyFontEntity.geometry.boundingBox.min.x);
			this.companyFontEntity.mesh.position.x = companyCenterOffset - 1.0;
			this.companyFontEntity.mesh.position.z = -1.5;
			this.companyFontEntity.mesh.position.y = 5.8;
			this.companyFontEntity.mesh.rotateY(degToRad(15));
		});


		// TODO: Load font during the game launching
	}

	createFont(font, text) {
		const fontGeom = new TextGeometry(text, {
			font,
			size: 0.5,
			depth: 0.01,

			curveSegments: 4,
		});
		fontGeom.computeBoundingBox();
		const fontMat = new SimpleMeshMaterial({
			color: new Color(0.0, 0.0, 1.0),
		});

		const entity = new Entity(fontGeom, fontMat);

		return entity;
	}

	update() {

	}
}
