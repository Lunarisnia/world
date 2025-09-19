import { Mesh } from "three";
import Entity from "./entity/entity";

export default class Component {
	/** @type {Entity} */
	owner;
	/** @type {Mesh} */
	mesh;

	constructor() {
		if (new.target === Component) {
			throw new Error("Cannot instantiate this abstract class");
		}
	}

	init() {

	}

	update() {

	}
}
