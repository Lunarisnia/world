import { BufferGeometry } from "three";

/** @param {BufferGeometry} geometry  */
export default function flatShading(geometry) {
	const geom = geometry.toNonIndexed();
	geom.computeVertexNormals();
	return geom;
}
