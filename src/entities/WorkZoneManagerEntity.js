import { Color } from "three";
import Entity from "../entity";
import SimpleCubeGeometry from "../geometry/SimpleCubeGeometry";
import InvisibleMaterial from "../material/InvisibleMaterial";

export default class WorkZoneManagerEntity {
	constructor() {
		const geom = new SimpleCubeGeometry(1, 1, 1);
		const material = new InvisibleMaterial({
			color: new Color(1, 1, 1),
		});
		const entity = new Entity(geom, material);

		return entity;
	}
}
