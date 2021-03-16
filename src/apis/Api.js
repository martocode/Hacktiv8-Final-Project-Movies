import axios from "axios";
import querystring from "querystring";

//https://www.omdbapi.com/?s=man&apikey=65525897

const createQuery = (param) => querystring.stringify(param);

export const apiGet = () => {
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
			const fetch = this.getData(s && createQuery({ s, apikey }));
			return { fetch };
		},
	};
};
