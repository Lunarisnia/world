import Work from "./work/work";

export default class Databank {
	static baseURL = "https://raw.githubusercontent.com"
	static streamPath = "refs/heads/main"
	//static githubUsername = import.meta.env.VITE_GITHUB_USERNAME;
	//static publicDataRepoName = import.meta.env.VITE_PUBLIC_DATA_REPO_NAME;
	// NOTE: Don't wanna deal with this right now
	static githubUsername = "Lunarisnia";
	static publicDataRepoName = "porto-public-data";
	static workHistories;

	/**
	 * Get Full URL
	 * @returns {String}
	 */
	static getFullURL() {
		return `${this.baseURL}/${this.githubUsername}/${this.publicDataRepoName}/${this.streamPath}`
	}

	/**
	 * Fetch work histories
	 * @async
	 */
	// TODO: Maybe just add the JSON to this repository?
	static async getWorkHistories() {
		const workHistories = [];
		try {
			const response = await fetch(`${this.getFullURL()}/work-history.json`);
			const body = await response.json();
			for (const w of body.workplaces) {
				const work = new Work(w);
				workHistories.push(work);
			}

			this.workHistories = workHistories;
			return workHistories;
		} catch (err) {
			return workHistories;
		}
	}
};
