import { BoxGeometry } from "three";

export default class WorkDisplayGeometry {
	constructor() {

		// TODO: Load the model here
		const geom = new BoxGeometry(1, 1, 1);

		return geom;
	}
}
