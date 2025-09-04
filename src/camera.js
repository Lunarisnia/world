import { PerspectiveCamera } from "three";

export default class Camera {
	/** @type {PerspectiveCamera} */
	instance;

	/** @type {Number} */
	fov;
	/** @type {Number} */
	aspect;
	/** @type {Number} */
	near;
	/** @type {Number} */
	far;

	/**
	 * description
	 * @param {Number} fov - desc
	 * @param {Number} aspect - desc
	 * @param {Number} near - desc
	 * @param {Number} far - desc
	 */
	constructor(fov, aspect, near, far) {
		this.fov = fov;
		this.aspect = aspect;
		this.near = near;
		this.far = far;
		this.instance = new PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
	}
};
