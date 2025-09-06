import { BufferGeometry, Material, Mesh } from "three";

export default class Object {
	/** @type {Material} */
	material;
	/** @type {BufferGeometry} */
	geometry;
	/** @type {Mesh} */
	mesh;

	/**
	 * Create Object
	 * @param {BufferGeometry} geometry - desc
	 * @param {Material} material - desc
	 */
	constructor(geometry, material) {
		this.geometry = geometry;
		this.material = material;
		this.mesh = new Mesh(geometry, material);
	}
};
