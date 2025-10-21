import Component from "../component";
import GroundBorderEntity from "../entities/GroundBorderEntity";
import flatShading from "../geometry/flatShading";
import MeshLoader from "../loaders/MeshLoader";
import TLoader from "../loaders/TLoader";
import MatcapMaterial from "../material/MatcapMaterial";
import BoxCollider from "./box-collider";
import GroundBorderZone from "./GroundBorderZone";

export default class Podium extends Component {
	onInteract = () => { };
	displayedEntity;

	constructor(displayModelEntity) {
		super();
		this.displayedEntity = displayModelEntity;
	}

	init() {
		this.boxCollider = new BoxCollider(2.5, 3.5, 2.5);
		this.owner.addComponent(this.boxCollider);

		this.infoZone = new GroundBorderEntity();
		const zone = new GroundBorderZone();
		zone.onInteract = this.onInteract;
		this.infoZone.addComponent(zone);
		this.owner.addChild(this.infoZone);
		this.infoZone.mesh.position.z = 5;
		this.infoZone.mesh.position.y = -3.49;

		const podiumMatcap = TLoader.load("/textures/matcap_shiny.png");
		const podiumMaterial = new MatcapMaterial(podiumMatcap);
		MeshLoader.load("/models/CenterPiecePodium/CenterPiecePodium.obj", (root) => {
			root.scale.setScalar(0.5);
			root.position.y = -3;
			root.traverse((child) => {
				if (child.isMesh) {
					child.material = podiumMaterial;
					child.geometry = flatShading(child.geometry);
				}
			});
			this.mesh.add(root);
		});

		this.mesh.position.y = 3;

		this.owner.addChild(this.displayedEntity);
	}

	update() {

	}
}
