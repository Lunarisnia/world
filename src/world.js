import Game from "./game";
import basicVert from "/shaders/basic/basic.vert?url&raw"
import solidColor from "/shaders/basic/solid-color.frag?url&raw"
import normalViz from "/shaders/basic/normal-viz.frag?url&raw"
import Spawner from "./entity/spawner";
import { Vector3 } from "three/webgpu";
import Entity from "./entity/entity";
import Player from "./components/player";
import { Color, LineSegments, WireframeGeometry } from "three";
import TriggerBox from "./components/trigger-box";

export default class World {
	/** @type {Map} */
	entities = new Map();

	constructor() {
		this.testWorld();
	}

	testWorld() {
		this.player = Spawner.CreateCubeWithShaderMaterial({
			width: 1.0,
			height: 1.0,
			// heightSegments: 30,
			// widthSegments: 30,
		}, {
			vertexShader: basicVert,
			fragmentShader: solidColor,
			uniforms: {
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
		this.addEntity(this.floor);

		const space = 10;
		for (let i = 0; i < 5; i++) {
			const x = Math.floor(Math.random() * space);
			const z = Math.floor(Math.random() * space);

			const cube = Spawner.CreateSimpleCube({
				width: 1, depth: 1, height: 1,
				color: new Color(1.0, 0.0, 0.0),
			});
			cube.mesh.position.set(x, 0.0, z);
			this.addEntity(cube);
		}

		this.testTriggerBox = Spawner.CreateSimpleCube({
			width: 3,
			height: 1,
			depth: 2,
		});
		this.testTriggerBox.addComponent(new TriggerBox());
		this.testTriggerBox.mesh.position.z = -4;
		this.testTriggerBox.material.wireframe = true;
		this.addEntity(this.testTriggerBox);

		Game.instance.mainCamera.instance.position.z = 5;

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
		for (const entity of this.entities.values()) {
			entity.init();
		}
	}

	update() {
		for (const entity of this.entities.values()) {
			entity.update();
		}
	}
};
