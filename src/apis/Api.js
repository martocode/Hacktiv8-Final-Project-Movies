import { Modal } from "antd";
import axios from "axios";
import querystring from "querystring";
import { useState } from "react";

//https://www.omdbapi.com/?s=man&apikey=65525897

export const useApi = () => {
	// const [apikey, setApikey] = useState("");
	let apikey, params;
	let getUrl = `https://www.omdbapi.com/`;
	const [errorStatus, setErrorStatus] = useState("");

	const setParam = (url) => (...param) => {
		url.searchParams.append(...param);
		return setParam(url);
	};

	const getData = () => {
		const url = getUrl + "?" + params;
		return axios
			.get(url)
			.then(({ data }) => data)
			.catch((err) => {
				errorWarn(`${err}`);
				console.error("err code:", err);
			});
	};
	const createQuery = (param) => querystring.stringify(param);

	const parseQuery = (param) => querystring.parse(param);

	const fetch = () => getData();

	function errorModal(content) {
		return Modal.error({
			title: "Error message",
			content,
		});
	}

	function errorWarn(errorMsg) {
		console.error(errorMsg);
		return errorModal(errorMsg);
	}

	const search = (search) => {
		if (!search) {
			errorWarn("Search Input Can Not Empty!");
			return;
		}

		const s = search;
		params = createQuery({ ...parseQuery(apikey), s });

		return fetch();
	};

	const auth = (auth) => {
		apikey = createQuery({ apikey: auth });
		return { search };
		/* 
		if (!apikey) {
			console.log("auth");
			errorWarn("Auth key Not Found!");
			return;
		} */
	};

	return {
		getData,
		auth,
		createQuery,
		search,
		setParam,
	};
};
