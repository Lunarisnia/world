import { TextureLoader } from "three";

export default class TLoader {
	static loadedTextures = new Map();
	static loader = new TextureLoader();
	static isLoading = false;

	/**
	 * Load texture
	 * @param {string} path - desc
	 */
	static load(path) {
		if (this.loadedTextures.has(path)) {
			return this.loadedTextures.get(path);
		}

		const texture = this.loader.load(path, (texture) => {
			this.onLoad(path, texture);
		}, (event) => {
			this.onProgress(event);
		}, (error) => {
			this.onError(error);
		});

		return texture;
	}

	static onLoad(path, texture) {
		this.loadedTextures.set(path, texture);
	}

	static onProgress(_event) {
		this.isLoading = true;
	}

	static onError(_error) {
		this.isLoading = false;
	}
}
