import { OrthographicCamera } from "three";

export default class ViewportCamera {
	/** @type {Number} */
	near;
	/** @type {Number} */
	far;

	/**
	 * description
	 * @param {Number} near - desc
	 * @param {Number} far - desc
	 */
	constructor(near, far) {
		this.near = near;
		this.far = far;
		const camera = new OrthographicCamera();

		return camera;
	}
};
