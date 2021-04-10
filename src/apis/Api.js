import { Modal } from "antd";
import axios from "axios";
import querystring from "querystring";

//https://www.omdbapi.com/?s=man&apikey=65525897

export const useApi = () => {
	let apikey, params;
	let getUrl = `https://www.omdbapi.com/`;

	const setParam = (url) => (...param) => {
		url.searchParams.append(...param);
		return setParam(url);
	};

	const fetchData = () => {
		const url = getUrl + "?" + params;
		return axios
			.get(url)
			.then(({ data }) => {
				if (data.Response === "False") {
					errorWarn(`Invalid Input! ${data.Error}`);
					throw new Error("Invalid Input");
				}

				return data;
			})
			.catch((err) => {
				errorWarn(`${err}`);
				console.error("Error: ", err);
			});
	};

	const createQuery = (param) => querystring.stringify(param);

	const parseQuery = (param) => querystring.parse(param);

	const search = (search) => {
		if (!search) {
			errorWarn("Search Input Can Not Empty!");
			return;
		}

		const s = search;
		params = createQuery({ ...parseQuery(apikey), s });

		return fetchData();
	};

	const auth = (auth) => {
		apikey = createQuery({ apikey: auth });
		return { search };
	};

	return {
		fetchData,
		auth,
		search,
	};
};

export function errorModal(content) {
	return Modal.error({
		title: "Error message",
		content,
	});
}

export function errorWarn(errorMsg) {
	console.error(errorMsg);
	return errorModal(errorMsg);
}
