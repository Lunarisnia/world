import { Mesh } from "three";

export default class Component {
	/** @type {Mesh} */
	mesh;

	constructor() {
		if (new.target === Component) {
			throw new Error("Cannot instantiate this abstract class");
		}
	}

	update() {

	}
}
