import { degToRad } from "three/src/math/MathUtils";
import Component from "../component";
import TriggerBox from "./TriggerBox";
import GroundBorderGeometry from "../geometry/GroundBorderGeometry";
import OuterGroundBorderMaterial from "../material/OuterGroundBorderMaterial";
import Entity from "../entity/entity";
import Game from "../game";
import GroundBorderMaterial from "../material/GroundBorderMaterial";
import { Color, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import gsap from "gsap";

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
		entity.mesh.position.y = -0.49;
		entity.mesh.position.z = -4;
		entity.mesh.position.x = -8;
		entity.mesh.rotateX(degToRad(-90));

		this.createSpinner();
		this.createTrigger();
		this.createIconPlane();

		return entity;
	}

	createIconPlane() {
		const geom = new PlaneGeometry(1, 1);
		const material = new MeshBasicMaterial({
			color: new Color(1, 1, 1),
		});
		this.iconPlane = new Mesh(geom, material);
		this.iconPlane.rotateX(degToRad(90));
		this.iconPlane.position.z = -1;

		this.owner.mesh.add(this.iconPlane);
	}

	createTrigger() {
		const trig = new TriggerBox(this.width / 2.0, this.height / 2.0, 2);
		trig.onTriggerEnter = () => {
			this.onTriggerEnter();
		}
		trig.onTriggerExit = () => {
			this.onTriggerExit();
		}
		this.owner.addComponent(trig);
	}

	createSpinner() {
		const innerGeom = new GroundBorderGeometry(this.width - 1.0, this.height - 1.0, this.thickness);
		const innerMaterial = new GroundBorderMaterial();
		this.spinner = new Mesh(innerGeom, innerMaterial)
		this.spinner.position.z = 0.1;
		this.spinner.scale.multiplyScalar(0.9);
		this.owner.mesh.add(this.spinner);
	}

	init() {
	}

	// TODO: I want the word open in the middle
	// TODO: add the "Enter" key texture
	update() {
		this.mesh.material.uniforms.uTime.value = Game.instance.clock.getElapsedTime();
		this.spinner.material.uniforms.uTime.value = Game.instance.clock.getElapsedTime();
	}

	async onTriggerEnter() {
		gsap.killTweensOf(this.spinner.scale);
		gsap.killTweensOf(this.spinner.position);

		gsap.fromTo(this.spinner.scale, { x: 1.0 * 0.9, y: 1.0 * 0.9 }, { y: 1.05, x: 1.05, ease: "back.out(4)", duration: 0.8 });
		await gsap.fromTo(this.spinner.position, { z: 0.1 }, { z: 0.5, ease: "power1.inOut", duration: 0.4 });

		gsap.fromTo(this.iconPlane.position, { z: -1 }, { z: 2, ease: "back.out(2)", duration: 0.5 });
	}

	async onTriggerExit() {
		gsap.killTweensOf(this.spinner.scale);
		gsap.killTweensOf(this.spinner.position);

		gsap.fromTo(this.spinner.scale, { x: 1.05, y: 1.05 }, { y: 1.0 * 0.9, x: 1.0 * 0.9, ease: "back.out(4)", duration: 0.8 });
		await gsap.to(this.spinner.position, { z: 0.1, ease: "back.in(4)", duration: 0.4 });

		gsap.fromTo(this.iconPlane.position, { z: 2 }, { z: -1, ease: "back.in(2)", duration: 0.5 });
	}
}
