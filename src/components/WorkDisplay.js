import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import Component from "../component";
import Entity from "../entity/entity";
import WorkDisplayGeometry from "../geometry/WorkdDisplayGeometry";
import WorkDisplayMaterial from "../material/WorkDisplayMaterial";
import { Color } from "three";
import InvisibleMaterial from "../material/InvisibleMaterial";
import SimpleMeshMaterial from "../material/SimpleMeshMaterial";
import BoxCollider from "./box-collider";

export default class WorkDisplay extends Component {
	constructor() {
		super();

		const geom = new WorkDisplayGeometry();
		const material = new InvisibleMaterial({
			color: new Color(0.0, 0.0, 0.0),
			transparent: true,
		});
		const entity = new Entity(geom, material);
		entity.addComponent(this);
		entity.mesh.position.y = -0.6;
		entity.mesh.scale.setScalar(0.5);

		entity.mesh.position.x = 8;
		entity.mesh.position.z = -6;

		this.boxCollider = new BoxCollider(3, 4, 0.5);
		entity.addComponent(this.boxCollider);

		// TODO: Centralized loader system
		// TODO: Load texture
		const mat = new SimpleMeshMaterial({
			color: new Color(1.0, 0.0, 0.0),
		});
		const objLoader = new OBJLoader();
		objLoader.load("/models/WorkDisplay/WorkDisplay.obj", (root) => {
			const material = new WorkDisplayMaterial();
			root.traverse((child) => {
				if (child.isMesh) {
					child.material = material;
					if (child.name === "Cube.001") {
						child.material = mat;
					}
				}
			});

			entity.mesh.add(root);
		});

		return entity;
	}

	init() {

	}

	update() {

	}
}
