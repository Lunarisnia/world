import Player from "./components/player";
import BoxCollider from "./components/box-collider";
import SimpleCubeGeometry from "./geometry/SimpleCubeGeometry";
import FloorGeometry from "./geometry/FloorGeometry";
import FloorMaterial from "./material/FloorMaterial";
import { Scene } from "three";
import Physics from "./physics";
import PlayerMaterial from "./material/PlayerMaterial";
import Entity from "./entity";
import WorkZoneManagerEntity from "./entities/WorkZoneManagerEntity";
import WorkZoneGenerator from "./components/WorkZoneGenerator";
import CenterPieceEntity from "./entities/CenterPieceEntity";
import CenterPiece from "./components/CenterPiece";

export default class World {
	/** @type {Map} */
	entities = new Map();
	/** @type {Scene} */
	scene;

	constructor() {
		this.scene = new Scene();
	}

	/**
	 * Register entity to be updated and rendered
	 * @param {Entity} entity - 
	 */
	addEntity(entity) {
		this.entities.set(entity.id, entity);
		this.scene.add(entity.mesh);
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
		for (const entity of this.entities.values()) {
			entity.update();
		}
	}

	testWorld() {
		const workZoneManager = new WorkZoneManagerEntity();
		workZoneManager.addComponent(new WorkZoneGenerator());
		this.addEntity(workZoneManager);

		// NOTE: Ideally it should all look like this
		//const centerPiece = new CenterPieceEntity();
		//centerPiece.addComponent(new CenterPiece());
		//this.addEntity(centerPiece);

		//const cubeGeom = new SimpleCubeGeometry(1, 1, 1);
		//const cubeMaterial = new SimpleMeshMaterial({
		//	color: new Color(0, 0, 1),
		//});
		//this.cube = new Entity(cubeGeom, cubeMaterial);
		//const rb = new RigidBody();
		//rb.boxCollider(0.5, 0.5, 0.5);
		//this.cube.mesh.position.y = 2;
		//this.cube.mesh.position.z = -2;
		//this.cube.addComponent(rb);
		//this.addEntity(this.cube);

		const playerGeom = new SimpleCubeGeometry(1, 1, 1);
		const playerMaterial = new PlayerMaterial();
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

	}
};
