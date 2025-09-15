import { PerspectiveCamera, Vector3 } from "three";
import Game from "./game";

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

		this.cameraPosition = new Vector3(4.0, 6.0, 5.0);
	}

	init() {
		this.player = Game.instance.world.player;
		this.playerWorldPos = new Vector3();
	}

	update() {
		this.player.mesh.getWorldPosition(this.playerWorldPos);
		const offset = this.cameraPosition.clone().add(this.playerWorldPos);

		this.instance.position.lerp(offset, 0.2);
		// this.instance.position.set(offset.x, offset.y, offset.z);
		this.instance.lookAt(this.playerWorldPos);
	}
};
