import Entity from "../entity";
import CenterPieceGeometry from "../geometry/CenterPieceGeometry";
import CenterPieceMaterial from "../material/CenterPieceMaterial";

export default class CenterPieceEntity {
	/**
	 * description
	 * @returns {Entity} - desc
	 */
	constructor() {
		const geom = new CenterPieceGeometry();
		const material = new CenterPieceMaterial();
		const entity = new Entity(geom, material);
		return entity;
	}
}
