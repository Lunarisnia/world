import { Color } from "three";
import SimpleCubeGeometry from "../geometry/SimpleCubeGeometry";
import Entity from "../entity";
import SimpleMeshMaterial from "../material/SimpleMeshMaterial";

export default class WorkZoneEntity {
	constructor() {
		const geom = new SimpleCubeGeometry(15, 1, 15);
		const material = new SimpleMeshMaterial({
			color: new Color(1.0, 1.0, 1.0),
			wireframe: true,
		});
		const entity = new Entity(geom, material);

		return entity;
	}
}
