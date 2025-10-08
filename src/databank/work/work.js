export default class Work {
	name;
	start;
	end;
	role;
	thumbnail;

	constructor(w) {
		Object.assign(this, w);
	}
}
