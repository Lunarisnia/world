import Game from "./game";
import basicVert from "/shaders/basic/basic.vert?url&raw"
import solidColor from "/shaders/basic/solid-color.frag?url&raw"
import Spawner from "./entity/spawner";
import { Vector3 } from "three/webgpu";
import Entity from "./entity/entity";
import Player from "./components/player";

export default class World {
	/** @type {Game} */
	entities = new Map();

	constructor() {
		this.sphere = Spawner.CreateSphereWithShaderMaterial({
			radius: 1.0,
			heightSegments: 30,
			widthSegments: 30,
		}, {
			vertexShader: basicVert,
			fragmentShader: solidColor,
			uniforms: {
				color: {
					value: new Vector3(1.0, 1.0, 1.0),
				},
			},
		});
		this.sphere.addComponent(new Player());
		this.addEntity(this.sphere);

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

	update() {
		for (const entity of this.entities.values()) {
			entity.update();
		}
		// this.sphere.mesh.position.x = Math.cos(this.game.clock.getElapsedTime());
		// this.sphere.mesh.position.y = Math.sin(this.game.clock.getElapsedTime());
	}
};
