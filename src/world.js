import Player from "./components/player";
import BoxCollider from "./components/box-collider";
import SimpleCubeGeometry from "./geometry/SimpleCubeGeometry";
import FloorGeometry from "./geometry/FloorGeometry";
import { BoxGeometry, CameraHelper, Color, DirectionalLight, DirectionalLightHelper, Mesh, MeshBasicMaterial, MeshStandardMaterial, PointLight, PointLightHelper, Scene, SphereGeometry } from "three";
import Physics from "./physics";
import Entity from "./entity";
import CenterPieceEntity from "./entities/CenterPieceEntity";
import CenterPiece from "./components/CenterPiece";
import TLoader from "./loaders/TLoader";
import MatcapMaterial from "./material/MatcapMaterial";
import PointEntity from "./entities/PointEntity";
import Podium from "./components/Podium";
import Youtube from "./components/Youtube";
import Github from "./components/Github";
import Tiktok from "./components/Tiktok";
import LinkedIn from "./components/LinkedIn";
import WorkZoneGenerator from "./components/WorkZoneGenerator";
import DiffuseCubeMaterial from "./material/DiffuseCubeMaterial";
import EntityPositionInfo from "./components/EntityPositionInfo";
import FloorMaterial from "./material/FloorMaterial";
import { degToRad } from "three/src/math/MathUtils.js";
import FollowLight from "./components/FollowLight";

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

	spawnPodium(displayedComponent) {
		const logo = new PointEntity();
		logo.addComponent(displayedComponent);

		const podiumEntity = new PointEntity();
		const podium = new Podium(logo);
		podiumEntity.addComponent(podium);
		this.addEntity(podiumEntity);
		return podium;
	}

	testWorld() {

		// TODO: set everything to cast shadow
		const centerPieceZPos = 16;
		const centerPiece = new CenterPieceEntity();
		centerPiece.addComponent(new CenterPiece());
		centerPiece.mesh.position.z = centerPieceZPos;
		this.addEntity(centerPiece);

		const workZone = new PointEntity();
		workZone.addComponent(new WorkZoneGenerator());
		workZone.mesh.position.z = centerPieceZPos;
		workZone.mesh.position.x = 28;
		this.addEntity(workZone);

		const socialAreaZPos = 40;
		const youtube = this.spawnPodium(new Youtube());
		youtube.onInteract = () => {
			window.open("https://www.youtube.com/@Lounarisnia", "_blank");
		}
		youtube.mesh.position.z = socialAreaZPos;
		youtube.mesh.position.x = -8;

		const github = this.spawnPodium(new Github())
		github.onInteract = () => {
			window.open("https://github.com/Lunarisnia", "_blank");
		}
		github.mesh.position.z = socialAreaZPos;
		github.mesh.position.x = 0;

		const tiktok = this.spawnPodium(new Tiktok());
		tiktok.onInteract = () => {
			window.open("https://www.tiktok.com/@lunarisnia", "_blank");
		}
		tiktok.mesh.position.z = socialAreaZPos;
		tiktok.mesh.position.x = 8;

		const linkedIn = this.spawnPodium(new LinkedIn());
		linkedIn.onInteract = () => {
			window.open("https://www.linkedin.com/in/rio-arswendo-rachmad-990a091a9/", "_blank");
		}
		linkedIn.mesh.position.z = socialAreaZPos;
		linkedIn.mesh.position.x = 16;


		const playerGeom = new SimpleCubeGeometry(1, 1, 1);
		//const playerMaterial = new MatcapMaterial();
		const playerMaterial = new MeshStandardMaterial({
			color: 0xFF00FF,
		});
		this.player = new Entity(playerGeom, playerMaterial);
		this.player.mesh.castShadow = true;
		this.player.mesh.receiveShadow = true;
		this.player.addComponent(new Player());
		this.addEntity(this.player);

		let cubeGeometry = new SphereGeometry(1, 16, 16);
		// NOTE: Flat shading example
		cubeGeometry = cubeGeometry.toNonIndexed();
		cubeGeometry.computeVertexNormals();
		const cubeMaterial = new DiffuseCubeMaterial();
		const cube = new Entity(cubeGeometry, cubeMaterial);
		cube.addComponent(new EntityPositionInfo(this.player, "uLightPosition"));
		this.addEntity(cube);

		//const floorMatcap = TLoader.load("/textures/matcap_green.png");
		const width = 200;
		const height = 200;
		const floorGeom = new FloorGeometry(width, 1, height);
		const floorMaterial = new FloorMaterial();
		this.floor = new Entity(floorGeom, floorMaterial);
		this.floor.mesh.position.y = -1;
		const bc = new BoxCollider(width / 2, 0.5, height / 2);
		this.floor.addComponent(bc);
		this.floor.mesh.receiveShadow = true;
		this.addEntity(this.floor);


		const light = new DirectionalLight(0xffffff, 10);
		const cubeGeom = new BoxGeometry(1, 1, 1);
		const cubeMat = new MeshBasicMaterial({
			color: 0x00FF00,
		});
		this.lightCube = new Entity(cubeGeom, cubeMat);
		this.lightCube.mesh.position.setX(1);
		this.lightCube.mesh.position.setZ(-4);
		this.lightCube.addComponent(new FollowLight(light, this.player))
		this.addEntity(this.lightCube);

		// TODO: Move the object along the player
		light.position.set(0, 100, 200);
		light.target = this.lightCube.mesh;
		light.castShadow = true;
		light.shadow.mapSize.width = 1024; // default
		light.shadow.mapSize.height = 1024; // default
		light.shadow.camera.near = 0.5; // default
		light.shadow.camera.far = 1000; // default

		light.shadow.camera.left = -10;
		light.shadow.camera.right = 10;
		light.shadow.camera.top = 10;
		light.shadow.camera.bottom = -10;
		this.scene.add(light);


		//const sHelper = new DirectionalLightHelper(light, 1, 0xFF0000);
		//this.scene.add(sHelper);
	}
};
