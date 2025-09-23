import { degToRad } from "three/src/math/MathUtils";
import Component from "../component";
import TriggerBox from "./TriggerBox";
import GroundBorderGeometry from "../geometry/GroundBorderGeometry";
import OuterGroundBorderMaterial from "../material/OuterGroundBorderMaterial";
import Entity from "../entity/entity";
import Game from "../game";
import GroundBorderMaterial from "../material/GroundBorderMaterial";
import { Mesh } from "three";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

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
		const innerMaterial = new GroundBorderMaterial();
		this.spinner = new Mesh(innerGeom, innerMaterial)
		this.spinner.position.z = -1;
		entity.mesh.add(this.spinner);

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

	// TODO: I want the word open in the middle
	// TODO: I want the enter key icon floating on the middle of the box
	update() {
		this.mesh.material.uniforms.uTime.value = Game.instance.clock.getElapsedTime();
		this.spinner.material.uniforms.uTime.value = Game.instance.clock.getElapsedTime();
	}

	async onTriggerEnter() {
		gsap.fromTo(this.spinner.scale, { x: -1.0, y: -1.0 }, { y: 1.0, x: 1.0, ease: "power1.out", duration: 0.5 });
		gsap.fromTo(this.spinner.position, { z: -1 }, { z: 0.5, ease: "power1.inOut", duration: 0.5 });
	}

	async onTriggerExit() {
		const timeline = gsap.timeline();
		await gsap.fromTo(this.spinner.position, { z: 0.5 }, { z: 1.0, ease: "power1.inOut", duration: 0.4 })
		gsap.to(this.spinner.position, { z: -1.0, ease: "power1.out", duration: 0.8 });
		timeline.fromTo(this.spinner.scale, { x: 1.0, y: 1.0 }, { y: -1.0, x: -1.0, ease: "power1.out", duration: 0.8 })
			.to(this.spinner.scale, { y: 1.0, x: 1.0, ease: "power1.out", duration: 0.1 });
	}
}
