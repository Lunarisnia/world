import Component from "../component";
import Entity from "../entity/entity";
import Game from "../game";
import CenterPieceGeometry from "../geometry/CenterPieceGeometry";
import CenterPieceMaterial from "../material/CenterPieceMaterial";

export default class CenterPiece extends Component {
	constructor() {
		super();

		const geom = new CenterPieceGeometry();
		const material = new CenterPieceMaterial();
		const entity = new Entity(geom, material);
		entity.addComponent(this);

		return entity;
	}

	init() {
		this.mesh.position.x = 4;
		this.mesh.position.y = 1;
	}

	update() {
		this.mesh.material.uniforms.uTime.value = Game.instance.clock.getElapsedTime();
		const cameraPosition = Game.instance.mainCamera.instance.position;
		this.mesh.material.uniforms.uCameraPosition.value = cameraPosition;
	}
}
