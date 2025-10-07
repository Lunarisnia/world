import Entity from "../entity";
import GroundBorderGeometry from "../geometry/GroundBorderGeometry";
import OuterGroundBorderMaterial from "../material/OuterGroundBorderMaterial";
import { degToRad } from "three/src/math/MathUtils";

export default class GroundBorderEntity {
	constructor() {
		const width = 7;
		const height = 4;
		const thickness = 0.25;

		const geom = new GroundBorderGeometry(width, height, thickness);
		const material = new OuterGroundBorderMaterial();
		const entity = new Entity(geom, material);
		entity.mesh.rotateX(degToRad(-90));

		return entity;
	}
}
