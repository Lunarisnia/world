import Entity from "../entity";
import WorkDisplayGeometry from "../geometry/WorkdDisplayGeometry";
import InvisibleMaterial from "../material/InvisibleMaterial";

export default class WorkDisplayEntity {
	constructor() {
		const geom = new WorkDisplayGeometry();
		const material = new InvisibleMaterial();
		const entity = new Entity(geom, material);

		return entity;
	}
}
