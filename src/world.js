import Game from "./game";
import basicVert from "/shaders/basic/basic.vert?url&raw"
import solidColor from "/shaders/basic/solid-color.frag?url&raw"
import normalViz from "/shaders/basic/normal-viz.frag?url&raw"
import Spawner from "./entity/spawner";
import Entity from "./entity/entity";
import Player from "./components/player";
import { Color, Vector3 } from "three";
import TriggerBox from "./components/trigger-box";
import BoxCollider from "./components/box-collider";
import RigidBody from "./components/rigidbody";
import Physics from "./physics";
import GroundBorderGeometry from "./geometry/GroundBorderGeometry";
import GroundBorderMaterial from "./material/GroundBorderMaterial";

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
		for (const entity of this.entities.values()) {
			entity.update();
		}
	}

	testWorld() {
		// NOTE: Ideally it should all look like this
		const geom = new GroundBorderGeometry(5, 5, 2.5);
		const material = new GroundBorderMaterial();
		this.en = new Entity(geom, material);
		this.en.mesh.position.y = 3;
		this.addEntity(this.en);

		this.cube = Spawner.CreateSimpleCube({
			width: 1,
			height: 1,
			color: new Color(0, 1, 0),
		});
		this.cube.mesh.position.y = 2;
		this.cube.mesh.position.z = -2;
		const rb = new RigidBody();
		rb.boxCollider(0.5, 0.5, 0.5);
		this.cube.addComponent(rb);
		this.addEntity(this.cube);

		this.player = Spawner.CreateCubeWithShaderMaterial({
			width: 1.0,
			height: 1.0,
			// heightSegments: 30,
			// widthSegments: 30,
		}, {
			vertexShader: basicVert,
			fragmentShader: solidColor,
			uniforms: {
				uTime: {
					value: 0.0,
				},
				color: {
					value: new Vector3(1.0, 1.0, 0.0),
				},
			},
		});
		this.player.addComponent(new Player());
		this.addEntity(this.player);

		this.floor = Spawner.CreateCubeWithShaderMaterial({
			width: 100.0,
			height: 1.0,
			depth: 100.0,
		}, {
			vertexShader: basicVert,
			fragmentShader: normalViz,
			uniforms: {
				color: {
					value: new Vector3(1.0, 1.0, 1.0),
				}
			}
		})
		this.floor.mesh.position.y = -1;
		const bc = new BoxCollider(50, 0.5, 50);
		this.floor.addComponent(bc);
		this.addEntity(this.floor);

		const width = 3;
		const height = 1;
		const depth = 2;
		this.testTriggerBox = Spawner.CreateSimpleCube({
			width,
			height,
			depth,
		});
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
