import Component from "../component";
import Entity from "../entity";

export default class EntityPositionInfo extends Component {
	/** @type {Entity} */
	entity;

	/**
	 * description
	 * @param {Entity} entity - desc
	 * @param {String} uniform - 
	 */
	constructor(entity, uniform) {
		super();
		this.entity = entity;
		this.uniform = uniform;
	}

	init() {

	}

	update() {
		this.owner.mesh.material.uniforms[this.uniform] = { value: this.entity.mesh.position };
		//console.log(this.owner.mesh.material.uniforms);
	}
}
