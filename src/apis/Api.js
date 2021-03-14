import axios from "axios";

//https://www.omdbapi.com/?s=man&apikey=65525897

export const apiGet = {
	authKey: "",
	getData({ option, authKey, url = "" } = {}) {
		url = option && authKey ? `${url}${option}${authKey}` : url;
		return axios
			.get(url)
			.then(({ data }) => data)
			.catch((err) => console.log("err code:", err));
	},

	auth(auth = "") {
		this.authKey = `&apikey=${auth}`;
	},

	search(Name = "") {
		if (!this.authKey) {
			console.error("Auth key Not Found!");
			return;
		}
		const fetch = () => this.getData(Name || `/?s=${Name}`, this.authKey);
		return { fetch };
	},
};
