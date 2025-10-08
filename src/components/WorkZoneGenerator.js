import { Color } from "three";
import Component from "../component";
import WorkZoneEntity from "../entities/WorkZoneEntity";
import SimpleMeshMaterial from "../material/SimpleMeshMaterial";
import WorkZone from "./WorkZone";
import TLoader from "../loaders/TLoader";
import Databank from "../databank/databank";

export default class WorkZoneGenerator extends Component {
	count = 1;

	/** @type {[WorkZone]} */
	zones = [];

	offset = 0.0;
	shift = 0;

	workHistory;

	constructor() {
		super();
		const zone = new WorkZoneEntity();
		this.shift = zone.mesh.geometry.parameters.width;

		this.count = Databank.workHistories.length;
	}

	init() {
		for (let i = 0; i < this.count; i++) {
			this.offset = i * this.shift;
			const zoneEntity = new WorkZoneEntity();
			const zone = new WorkZone();
			zoneEntity.addComponent(zone);
			zoneEntity.mesh.position.x = this.offset;

			this.owner.addChild(zoneEntity);
			this.zones.push(zone);
		}

		for (let i = 0; i < this.count; i++) {
			const image = TLoader.load(Databank.workHistories[i].thumbnail);
			this.zones[i].workDisplay.displayMaterial = new SimpleMeshMaterial({
				map: image,
			})
		}
	}

	update() {

	}
}
