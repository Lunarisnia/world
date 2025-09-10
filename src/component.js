export default class Component {
	constructor() {
		if (new.target === Component) {
			throw new Error("Cannot instantiate this abstract class");
		}
	}

	update() {

	}
}
