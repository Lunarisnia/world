export default class Work {
	name;
	start;
	end;
	role;

	constructor(w) {
		Object.assign(this, w);
	}
}
