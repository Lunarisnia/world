import Component from "../component";
import WorkDisplayMaterial from "../material/WorkDisplayMaterial";
import { Color } from "three";
import SimpleMeshMaterial from "../material/SimpleMeshMaterial";
import BoxCollider from "./box-collider";
import MeshLoader from "../loaders/MeshLoader";

export default class WorkDisplay extends Component {
	constructor() {
		super();
	}

	init() {
		this.owner.mesh.scale.setScalar(0.5);

		this.boxCollider = new BoxCollider(3, 4, 0.5);
		this.owner.addComponent(this.boxCollider);

		const workDisplayMaterial = new WorkDisplayMaterial();
		// TODO: Load texture
		const mat = new SimpleMeshMaterial({
			color: new Color(1.0, 0.0, 0.0),
		});
		MeshLoader.load("/models/WorkDisplay/WorkDisplay.obj", (root) => {
			root.traverse((child) => {
				if (child.isMesh) {
					child.material = workDisplayMaterial;
					if (child.name === "Cube.001") {
						child.material = mat;
					}
				}
			});
			this.owner.mesh.add(root);
		});
	}

	update() {
	}
}
