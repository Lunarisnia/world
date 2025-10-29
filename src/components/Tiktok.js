import Component from "../component";
import MeshLoader from "../loaders/MeshLoader";
import TLoader from "../loaders/TLoader";
import MatcapMaterial from "../material/MatcapMaterial";

export default class Tiktok extends Component {
	constructor() {
		super();
	}

	init() {
		const matcap = TLoader.load("/textures/matcap_plastic.png");
		const material = new MatcapMaterial(matcap);
		MeshLoader.load("/models/SocialIcons/Tiktok.obj", (root) => {
			root.scale.setScalar(0.8);
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
