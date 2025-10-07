import { BufferGeometry, Material, Mesh } from "three";
import { generateUUID } from "three/src/math/MathUtils.js";
import Component from "./component";

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
	/** @type {[Entity]} */
	children = new Array();

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
		component.owner = this;
		this.components.push(component);

		return component;
	}

	/**
	 * Add child
	 * @param {Entity} child - desc
	 */
	addChild(child) {
		this.mesh.add(child.mesh);
		this.children.push(child);
	}

	init() {
		for (const component of this.components.values()) {
			component.init();
		}
		for (const child of this.children.values()) {
			child.init();
		}
	}

	update() {
		for (const component of this.components.values()) {
			component.update();
		}

		for (const child of this.children.values()) {
			child.update();
		}
	}
};
