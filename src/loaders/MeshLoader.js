import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default class MeshLoader {
	static loadedMeshes = new Map();
	static loader = new OBJLoader();
	static isLoading = false;

	static load(path, onLoad) {
		if (this.loadedMeshes.has(path)) {
			onLoad(this.loadedMeshes.get(path));
			return;
		}

		this.loader.load(path, (root) => {
			this.isLoading = false;
			this.loadedMeshes.set(path, root);
			onLoad(root);
		}, (event) => {
			this.onProgress(event);
		}, (error) => {
			this.onError(error);
		});
	}

	static onProgress(_event) {
		this.isLoading = true;
	}

	static onError(_error) {
		this.isLoading = false;
	}
}
