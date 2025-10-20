import Player from "./components/player";
import BoxCollider from "./components/box-collider";
import SimpleCubeGeometry from "./geometry/SimpleCubeGeometry";
import FloorGeometry from "./geometry/FloorGeometry";
import { Scene } from "three";
import Physics from "./physics";
import Entity from "./entity";
import CenterPieceEntity from "./entities/CenterPieceEntity";
import CenterPiece from "./components/CenterPiece";
import TLoader from "./loaders/TLoader";
import MatcapMaterial from "./material/MatcapMaterial";
import PointEntity from "./entities/PointEntity";
import Podium from "./components/Podium";
import Youtube from "./components/Youtube";

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
		// NOTE: Ideally it should all look like this
		const centerPiece = new CenterPieceEntity();
		centerPiece.addComponent(new CenterPiece());
		this.addEntity(centerPiece);

		const youtubeLogo = new PointEntity();
		youtubeLogo.addComponent(new Youtube());
		const youtubePodium = new PointEntity();
		youtubePodium.addComponent(new Podium(youtubeLogo));
		youtubePodium.mesh.position.z = 8;
		this.addEntity(youtubePodium);


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
		const playerMaterial = new MatcapMaterial();
		this.player = new Entity(playerGeom, playerMaterial);
		this.player.addComponent(new Player());
		this.addEntity(this.player);

		const floorMatcap = TLoader.load("/textures/matcap_white.png");
		const floorGeom = new FloorGeometry(100, 1, 100);
		const floorMaterial = new MatcapMaterial(floorMatcap);
		this.floor = new Entity(floorGeom, floorMaterial);
		this.floor.mesh.position.y = -1;
		const bc = new BoxCollider(50, 0.5, 50);
		this.floor.addComponent(bc);
		this.addEntity(this.floor);

	}
};
