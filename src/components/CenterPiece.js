import Component from "../component";
import Game from "../game";
import MeshLoader from "../loaders/MeshLoader";
import BoxCollider from "./box-collider";
import TLoader from "../loaders/TLoader";
import MatcapMaterial from "../material/MatcapMaterial";

export default class CenterPiece extends Component {
	constructor() {
		super();
	}

	init() {
		this.boxCollider = new BoxCollider(2.5, 3.5, 2.5);
		this.owner.addComponent(this.boxCollider);

		const podiumMatcap = TLoader.load("/textures/matcap_plastic.png");
		const podiumMaterial = new MatcapMaterial(podiumMatcap);
		MeshLoader.load("/models/CenterPiecePodium/CenterPiecePodium.obj", (root) => {
			root.scale.setScalar(0.5);
			root.position.y = -3;
			root.traverse((child) => {
				if (child.isMesh) {
					child.material = podiumMaterial;
				}
			});
			this.mesh.add(root);
		});

		this.mesh.position.x = 4;
		this.mesh.position.y = 3;

		const matcap = TLoader.load("/textures/matcap_plastic.png");
		this.mesh.material.uniforms.uMatcap = { value: matcap };
	}

	update() {
		this.mesh.material.uniforms.uTime.value = Game.instance.clock.getElapsedTime();
		const cameraPosition = Game.instance.mainCamera.instance.position;
		this.mesh.material.uniforms.uCameraPosition.value = cameraPosition;
	}
}
