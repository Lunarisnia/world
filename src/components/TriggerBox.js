import { Color, Mesh, Vector2, Vector3 } from "three";
import Component from "../component";
import Game from "../game";
import SimpleCubeGeometry from "../geometry/SimpleCubeGeometry";
import SimpleMeshMaterial from "../material/SimpleMeshMaterial";

export default class TriggerBox extends Component {
	intersecting = false;
	/** @type {Function} */
	onTriggerEnter = () => { }
	/** @type {Function} */
	onTriggerExit = () => { }

	constructor(hx, hy, hz) {
		super();
		this.halfWidth = hx;
		this.halfHeight = hy;
		this.halfDepth = hz;

	}

	init() {
		this.player = Game.instance.world.player;
		this.mesh.position.z = -4;

		const cubeGeom = new SimpleCubeGeometry(this.halfWidth * 2.0, this.halfHeight * 2.0, this.halfDepth * 2.0);
		const cubeMaterial = new SimpleMeshMaterial({
			color: new Color(0.0, 1.0, 0.0),
		});
		cubeMaterial.wireframe = true;
		this.gizmo = new Mesh(cubeGeom, cubeMaterial);
		this.mesh.add(this.gizmo);
	}

	update() {
		this.gizmo.visible = Game.instance.debug.gizmo;
		this.updateTriggerPosition();
		const pPos = new Vector3();
		this.player.mesh.getWorldPosition(pPos);
		if (pPos.x >= this.bottomLeft.x && pPos.x <= this.topRight.x && pPos.z <= this.bottomLeft.y && pPos.z >= this.topRight.y) {
			if (!this.intersecting) {
				this.onTriggerEnter();
			}
			this.intersecting = true;
			return;
		}

		if (this.intersecting) {
			this.onTriggerExit();
		}
		this.intersecting = false;
	}

	updateTriggerPosition() {
		const wPos = new Vector3();
		this.mesh.getWorldPosition(wPos);

		this.bottomLeft = new Vector2(wPos.x - (this.halfWidth), wPos.z + (this.halfHeight));
		this.topRight = new Vector2(wPos.x + (this.halfWidth), wPos.z - (this.halfHeight));
	}
}
