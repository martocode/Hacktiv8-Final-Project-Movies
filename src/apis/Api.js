import axios from "axios";
import querystring from "querystring";

//https://www.omdbapi.com/?s=man&apikey=65525897

export const apiGet = () => {
	const createQuery = (param) => querystring.stringify(param);
	let apikey;

	return {
		async getData({ option, url = "" } = {}) {
			url = option ? `https://${url}/?${option}` : url;
			return axios
				.get(url)
				.then(({ data }) => data)
				.catch((err) => console.error("err code:", err));
		},

		auth(auth = "") {
			apikey = auth;
		},

		search(s = "") {
			if (!apikey) {
				console.error("Auth key Not Found!");
				return;
			}

			if (!s) {
				console.error("Search Input Can Not Empty!");
				return;
			}

			const fetch = this.getData(s && createQuery({ s, apikey }));
			return { fetch };
		},
	};
};
