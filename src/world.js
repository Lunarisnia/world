import Game from "./game";
import Entity from "./entity/entity";
import Player from "./components/player";
import BoxCollider from "./components/box-collider";
import RigidBody from "./components/rigidbody";
import Physics from "./physics";
import SimpleCubeMaterial from "./material/SimpleCubeMaterial";
import SimpleCubeGeometry from "./geometry/SimpleCubeGeometry";
import FloorGeometry from "./geometry/FloorGeometry";
import FloorMaterial from "./material/FloorMaterial";
import GroundBorder from "./components/GroundBorder";
import TriggerBox from "./components/TriggerBox";
import { PlaneGeometry } from "three";
import IconPlaneMaterial from "./material/IconPlaneMaterial";

export default class World {
	/** @type {Map} */
	entities = new Map();

	constructor() {
	}

	/**
	 * Register entity to be updated and rendered
	 * @param {Entity} entity - 
	 */
	addEntity(entity) {
		this.entities.set(entity.id, entity);
		Game.instance.scene.add(entity.mesh);
	}

	init() {
		this.testWorld();
		Physics.instance.createDebugGizmo();
		for (const entity of this.entities.values()) {
			entity.init();
		}
	}

	update() {
		Physics.instance.updateDebugGizmo();
		//this.testBed.material.uniforms.uAspectRatio.value = this.testBed.mesh.geometry.parameters.width / this.testBed.mesh.geometry.parameters.height;
		for (const entity of this.entities.values()) {
			entity.update();
		}
	}

	testWorld() {
		//const testBedGeom = new PlaneGeometry(6, 4);
		//const testBedMaterial = new IconPlaneMaterial();
		//this.testBed = new Entity(testBedGeom, testBedMaterial);
		//this.testBed.mesh.position.y = 4;
		//this.addEntity(this.testBed);

		// NOTE: Ideally it should all look like this
		this.addEntity(new GroundBorder());

		const cubeGeom = new SimpleCubeGeometry(1, 1, 1);
		const cubeMaterial = new SimpleCubeMaterial(0, 0, 1);
		this.cube = new Entity(cubeGeom, cubeMaterial);
		const rb = new RigidBody();
		rb.boxCollider(0.5, 0.5, 0.5);
		this.cube.mesh.position.y = 2;
		this.cube.mesh.position.z = -2;
		this.cube.addComponent(rb);
		this.addEntity(this.cube);

		const playerGeom = new SimpleCubeGeometry(1, 1, 1);
		const playerMaterial = new SimpleCubeMaterial(0, 1, 1);
		this.player = new Entity(playerGeom, playerMaterial);
		this.player.addComponent(new Player());
		this.addEntity(this.player);

		const floorGeom = new FloorGeometry(100, 1, 100);
		const floorMaterial = new FloorMaterial();
		this.floor = new Entity(floorGeom, floorMaterial);
		this.floor.mesh.position.y = -1;
		const bc = new BoxCollider(50, 0.5, 50);
		this.floor.addComponent(bc);
		this.addEntity(this.floor);

		const width = 3;
		const height = 1;
		const depth = 2;
		const triggerGeom = new SimpleCubeGeometry(width, height, depth);
		const triggerMaterial = new SimpleCubeMaterial(1, 0, 1);
		this.testTriggerBox = new Entity(triggerGeom, triggerMaterial);
		const trigger = new TriggerBox(width, height, depth);
		trigger.onTriggerEnter = () => {
			console.log("Enter");
		}
		trigger.onTriggerExit = () => {
			console.log("Exit");
		}
		this.testTriggerBox.addComponent(trigger);
		this.testTriggerBox.mesh.position.z = 0;
		this.testTriggerBox.material.wireframe = true;
		this.addEntity(this.testTriggerBox);

		Game.instance.mainCamera.instance.position.z = 5;
	}
};
