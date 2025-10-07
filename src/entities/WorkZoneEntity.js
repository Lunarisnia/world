import { Color } from "three";
import InvisibleMaterial from "../material/InvisibleMaterial";
import SimpleCubeGeometry from "../geometry/SimpleCubeGeometry";
import Entity from "../entity";

export default class WorkZoneEntity {
	constructor() {
		const geom = new SimpleCubeGeometry(15, 1, 15);
		const material = new InvisibleMaterial({
			color: new Color(1.0, 0.0, 0.0),
		});
		const entity = new Entity(geom, material);

		return entity;
	}
}
