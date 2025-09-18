import { BufferGeometry, Material, Mesh } from "three";
import Component from "../component";
import { generateUUID } from "three/src/math/MathUtils.js";
import PhysicsComponent from "../physics-component";
import Physics from "../physics";

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
	/**
	 * Add Component to object
	 * @param {Component} component - desc
	 */
	addComponent(component) {
		component.mesh = this.mesh;
		this.components.push(component);

		if (component instanceof PhysicsComponent) {
			return Physics.instance.createPhysicsEntity(component.descriptor);
		}
		return component;
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
