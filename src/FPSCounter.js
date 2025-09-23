export default class FPSCounter {
	fps = 0;
	frames = 0;
	lastTime = 0;

	init() {
		this.lastTime = performance.now();
	}

	tick() {
		const now = performance.now();
		const delta = now - this.lastTime;
		this.frames++;

		if (delta >= 1000) {
			this.fps = this.frames;
			this.frames = 0;
			this.lastTime = now;
			console.log("FPS: ", this.fps);
		}
	}
}
