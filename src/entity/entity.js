import { BufferGeometry, Material, Mesh } from "three";
import Component from "../component";
import { generateUUID } from "three/src/math/MathUtils.js";

export default class Entity {
	/** @type {string} */
	id;
	/** @type {Material} */
	material;
	/** @type {BufferGeometry} */
	geometry;
	/** @type {Mesh} */
	mesh;
	/** @type {[Component]} */
	components = new Array();

	/**
	 * Create Object
	 * @param {BufferGeometry} geometry - desc
	 * @param {Material} material - desc
	 */
	constructor(geometry, material) {
		this.id = generateUUID();
		this.geometry = geometry;
		this.material = material;
		this.mesh = new Mesh(geometry, material);
	}

	// NOTE: Maybe it should check for uniqueness later
	addComponent(component) {
		component.mesh = this.mesh;
		this.components.push(component);
	}

	init() {
		for (const component of this.components.values()) {
			component.init();
		}
	}

	update() {
		for (const component of this.components.values()) {
			component.update();
		}
	}
};
