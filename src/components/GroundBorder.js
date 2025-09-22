import { degToRad } from "three/src/math/MathUtils";
import Component from "../component";
import TriggerBox from "./TriggerBox";
import GroundBorderGeometry from "../geometry/GroundBorderGeometry";
import OuterGroundBorderMaterial from "../material/OuterGroundBorderMaterial";
import Entity from "../entity/entity";
import Game from "../game";
import GroundBorderMaterial from "../material/GroundBorderMaterial";
import { Mesh } from "three";

export default class GroundBorder extends Component {
	constructor() {
		super();
		this.width = 7;
		this.height = 4;
		this.thickness = 0.25;

		const geom = new GroundBorderGeometry(this.width, this.height, this.thickness);
		const material = new OuterGroundBorderMaterial();
		const entity = new Entity(geom, material);
		entity.addComponent(this);

		const innerGeom = new GroundBorderGeometry(this.width - 1.0, this.height - 1.0, this.thickness);
		this.innerMaterial = new GroundBorderMaterial();
		entity.mesh.add(new Mesh(innerGeom, this.innerMaterial));
		// TODO: I want the word open in the middle
		// TOOD: I want the enter key icon floating on the middle of the box

		entity.mesh.position.y = -0.49;
		entity.mesh.position.z = -4;
		entity.mesh.position.x = -8;
		entity.mesh.rotateX(degToRad(-90));
		const trig = new TriggerBox(this.width / 2.0, this.height / 2.0, 2);
		trig.onTriggerEnter = () => {
			this.onTriggerEnter();
		}
		trig.onTriggerExit = () => {
			this.onTriggerExit();
		}
		entity.addComponent(trig);
		return entity;
	}

	init() {
	}

	update() {
		this.mesh.material.uniforms.uTime.value = Game.instance.clock.getElapsedTime();
		this.innerMaterial.uniforms.uTime.value = Game.instance.clock.getElapsedTime();
	}

	onTriggerEnter() {
	}

	onTriggerExit() {

	}
}
