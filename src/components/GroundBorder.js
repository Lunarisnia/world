import { degToRad } from "three/src/math/MathUtils";
import Component from "../component";
import TriggerBox from "./TriggerBox";
import GroundBorderGeometry from "../geometry/GroundBorderGeometry";
import OuterGroundBorderMaterial from "../material/OuterGroundBorderMaterial";
import Entity from "../entity/entity";
import Game from "../game";
import GroundBorderMaterial from "../material/GroundBorderMaterial";
import { DoubleSide, Mesh, MeshBasicMaterial, NearestFilter, PlaneGeometry, TextureLoader } from "three";
import gsap from "gsap";
import IconPlaneMaterial from "../material/IconPlaneMaterial";
import InputManager from "../input/inputManager";

export default class GroundBorder extends Component {
	onInteract = () => { };
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
		this.createOpenPlane();

		return entity;
	}

	createOpenPlane() {
		// NOTE: maybe we could make a centralized loader that inform if all texture are loaded for loading screen
		const loader = new TextureLoader();
		const openTexture = loader.load("/textures/open.png");
		openTexture.magFilter = NearestFilter;
		openTexture.minFilter = NearestFilter;
		openTexture.generateMipmaps = false;

		const geom = new PlaneGeometry(10, 10);
		const material = new MeshBasicMaterial({
			map: openTexture,
			transparent: true,
			alphaTest: 0.5,
		});
		this.openPlane = new Mesh(geom, material);

		this.owner.mesh.add(this.openPlane);
	}

	createIconPlane() {
		const geom = new PlaneGeometry(3, 1);
		const material = new IconPlaneMaterial();
		this.iconPlane = new Mesh(geom, material);
		this.iconPlane.rotateX(degToRad(90));
		this.iconPlane.position.z = -1;
		this.iconPlane.scale.x = 0;

		const loader = new TextureLoader();
		const enterTexture = loader.load("/textures/enter.png");
		enterTexture.magFilter = NearestFilter;
		enterTexture.minFilter = NearestFilter;
		enterTexture.generateMipmaps = false;

		const innerGeom = new PlaneGeometry(6, 6);
		const innerMaterial = new MeshBasicMaterial({
			map: enterTexture,
			transparent: true,
			side: DoubleSide,
		});
		const innerPlane = new Mesh(innerGeom, innerMaterial);
		innerPlane.position.z = 0.01;
		this.iconPlane.add(innerPlane);

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

	update() {
		this.mesh.material.uniforms.uTime.value = Game.instance.clock.getElapsedTime();
		this.spinner.material.uniforms.uTime.value = Game.instance.clock.getElapsedTime();
		this.iconPlane.material.uniforms.uAspectRatio.value = this.iconPlane.geometry.parameters.width / this.iconPlane.geometry.parameters.height;

		if (InputManager.instance.getKey("f").justPressed && this.isIn) {
			this.onInteract();
		}
	}

	onTriggerEnter() {
		this.isIn = true;

		gsap.killTweensOf(this.spinner.scale);
		gsap.killTweensOf(this.spinner.position);
		gsap.killTweensOf(this.iconPlane.position);

		gsap.to(this.spinner.scale, { y: 1.05, x: 1.05, ease: "back.out(4)", duration: 0.8 });
		gsap.to(this.spinner.position, { z: 0.5, ease: "power1.inOut", duration: 0.4 });

		gsap.to(this.iconPlane.scale, { x: 1.0, ease: "back.out(2)", duration: 0.4 }).delay(0.2);
		gsap.to(this.iconPlane.position, { z: 3, ease: "back.out(2)", duration: 0.4 }).delay(0.2).then(() => {
			gsap.to(this.iconPlane.position, { z: 3.3, ease: "power1.inOut", duration: 2.5 }).yoyo(true).repeat(-1);
		})

	}

	onTriggerExit() {
		this.isIn = false;

		gsap.killTweensOf(this.spinner.scale);
		gsap.killTweensOf(this.spinner.position);
		gsap.killTweensOf(this.iconPlane.position);

		gsap.to(this.spinner.scale, { y: 1.0 * 0.9, x: 1.0 * 0.9, ease: "back.out(4)", duration: 0.8 });
		gsap.to(this.spinner.position, { z: 0.1, ease: "back.in(4)", duration: 0.4 });

		gsap.to(this.iconPlane.scale, { x: 0.0, ease: "back.in(2)", duration: 0.4 }).delay(0.2);
		gsap.to(this.iconPlane.position, { z: -1, ease: "back.in(2)", duration: 0.4 }).delay(0.2);
	}
}
