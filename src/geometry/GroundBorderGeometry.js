import { BufferAttribute, BufferGeometry, Float32BufferAttribute } from "three";

export default class GroundBorderGeometry {
	constructor(width, height, thickness) {
		this.width = width;
		this.height = height;
		this.thickness = thickness;

		const length = 8;

		const vertices = new Float32Array(length * 3);
		const indices = new Uint32Array(length * 6);

		const outerWidth = this.width;
		const outerHeight = this.height;

		const outerWidthHalf = outerWidth * 0.5;
		const outerHeightHalf = outerHeight * 0.5;

		const innerWidth = outerWidth - this.thickness;
		const innerHeight = outerHeight - this.thickness;

		const innerWidthHalf = innerWidth * 0.5;
		const innerHeightHalf = innerHeight * 0.5;


		vertices[0 * 3 + 0] = outerWidthHalf;
		vertices[0 * 3 + 1] = outerHeightHalf;
		vertices[0 * 3 + 2] = 0;

		vertices[1 * 3 + 0] = outerWidthHalf;
		vertices[1 * 3 + 1] = -outerHeightHalf;
		vertices[1 * 3 + 2] = 0;

		vertices[2 * 3 + 0] = -outerWidthHalf;
		vertices[2 * 3 + 1] = outerHeightHalf;
		vertices[2 * 3 + 2] = 0;

		vertices[3 * 3 + 0] = -outerWidthHalf;
		vertices[3 * 3 + 1] = -outerHeightHalf;
		vertices[3 * 3 + 2] = 0;

		// ---------- INNER -------------------
		vertices[4 * 3 + 0] = innerWidthHalf;
		vertices[4 * 3 + 1] = innerHeightHalf;
		vertices[4 * 3 + 2] = 0;

		vertices[5 * 3 + 0] = innerWidthHalf;
		vertices[5 * 3 + 1] = -innerHeightHalf;
		vertices[5 * 3 + 2] = 0;

		vertices[6 * 3 + 0] = -innerWidthHalf;
		vertices[6 * 3 + 1] = innerHeightHalf;
		vertices[6 * 3 + 2] = 0;

		vertices[7 * 3 + 0] = -innerWidthHalf;
		vertices[7 * 3 + 1] = -innerHeightHalf;
		vertices[7 * 3 + 2] = 0;


		// 2 -------- 0
		// | 6------4 |
		// | |      | |
		// | |	    | |
		// | 7------5 |
		// 3 -------- 1

		// --------- INDEX -------------------
		indices[0 * 3 + 0] = 0;
		indices[0 * 3 + 1] = 4;
		indices[0 * 3 + 2] = 5;

		indices[1 * 3 + 0] = 0;
		indices[1 * 3 + 1] = 5;
		indices[1 * 3 + 2] = 1;

		indices[2 * 3 + 0] = 1;
		indices[2 * 3 + 1] = 5;
		indices[2 * 3 + 2] = 3;

		indices[3 * 3 + 0] = 5;
		indices[3 * 3 + 1] = 7;
		indices[3 * 3 + 2] = 3;

		indices[4 * 3 + 0] = 3;
		indices[4 * 3 + 1] = 7;
		indices[4 * 3 + 2] = 2;

		indices[5 * 3 + 0] = 7;
		indices[5 * 3 + 1] = 6;
		indices[5 * 3 + 2] = 2;

		indices[6 * 3 + 0] = 2;
		indices[6 * 3 + 1] = 6;
		indices[6 * 3 + 2] = 0;

		indices[7 * 3 + 0] = 6;
		indices[7 * 3 + 1] = 4;
		indices[7 * 3 + 2] = 0;


		const uvs = new Float32Array(length * 2);
		const innerUMin = this.thickness / this.width;
		const innerVMin = this.thickness / this.height;

		const innerUMax = 1.0 - innerUMin;
		const innerVMax = 1.0 - innerVMin;

		// Outer verts
		uvs[0 * 2 + 0] = 1.0; uvs[0 * 2 + 1] = 1.0; // top right
		uvs[1 * 2 + 0] = 1.0; uvs[1 * 2 + 1] = 0.0; // bottom right
		uvs[2 * 2 + 0] = 0.0; uvs[2 * 2 + 1] = 1.0; // top left
		uvs[3 * 2 + 0] = 0.0; uvs[3 * 2 + 1] = 0.0; // bottom left

		// Inner verts (map them to a smaller box in UV space)
		uvs[4 * 2 + 0] = innerUMax; uvs[4 * 2 + 1] = innerVMax;
		uvs[5 * 2 + 0] = innerUMax; uvs[5 * 2 + 1] = innerVMin;
		uvs[6 * 2 + 0] = innerUMin; uvs[6 * 2 + 1] = innerVMax;
		uvs[7 * 2 + 0] = innerUMin; uvs[7 * 2 + 1] = innerVMin;


		const geometry = new BufferGeometry()

		geometry.setIndex(new BufferAttribute(indices, 1, false));

		geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
		geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));

		geometry.parameters = {
			width: this.width,
			height: this.height,
			thickness: this.thickness,
		}

		return geometry;
	}
}
