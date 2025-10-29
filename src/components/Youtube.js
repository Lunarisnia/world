import Component from "../component";
import MeshLoader from "../loaders/MeshLoader";
import TLoader from "../loaders/TLoader";
import MatcapMaterial from "../material/MatcapMaterial";

export default class Youtube extends Component {
	constructor() {
		super();
	}

	init() {
		const matcap = TLoader.load("/textures/matcap_plastic.png");
		const material = new MatcapMaterial(matcap);
		MeshLoader.load("/models/SocialIcons/Youtube.obj", (root) => {
			root.scale.setScalar(0.5);
			root.traverse((child) => {
				if (child.isMesh) {
					child.material = material;
					child.castShadow = true;
				}
			});
			this.mesh.add(root);
		});
	}

	update() {

	}
}
