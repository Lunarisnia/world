import Entity from "../entity";
import SimpleCubeGeometry from "../geometry/SimpleCubeGeometry";
import InvisibleMaterial from "../material/InvisibleMaterial";

export default class PointEntity {
	constructor() {
		const geom = new SimpleCubeGeometry(1, 1, 1);
		const mat = new InvisibleMaterial();
		const entity = new Entity(geom, mat);
		return entity;
	}
}
