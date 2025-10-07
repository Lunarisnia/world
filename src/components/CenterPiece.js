import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import Component from "../component";
import Entity from "../entity/entity";
import Game from "../game";
import CenterPieceGeometry from "../geometry/CenterPieceGeometry";
import CenterPieceMaterial from "../material/CenterPieceMaterial";
import SimpleMeshMaterial from "../material/SimpleMeshMaterial";
import { Color } from "three";

export default class CenterPiece extends Component {
	constructor() {
		super();

		const geom = new CenterPieceGeometry();
		const material = new CenterPieceMaterial();
		const entity = new Entity(geom, material);
		entity.addComponent(this);

		const objLoader = new OBJLoader();
		const podiumMaterial = new SimpleMeshMaterial({
			color: new Color(0.9, 0.9, 0.9),
		});
		objLoader.load("/models/CenterPiecePodium/CenterPiecePodium.obj", (root) => {
			root.scale.setScalar(0.5);
			root.position.y = -3;
			root.traverse((child) => {
				if (child.isMesh) {
					child.material = podiumMaterial;
				}
			});

			entity.mesh.add(root);
		});

		return entity;
	}

	init() {
		this.mesh.position.x = 4;
		this.mesh.position.y = 3;
	}

	update() {
		this.mesh.material.uniforms.uTime.value = Game.instance.clock.getElapsedTime();
		const cameraPosition = Game.instance.mainCamera.instance.position;
		this.mesh.material.uniforms.uCameraPosition.value = cameraPosition;
	}
}
