import { Modal } from "antd";
import axios from "axios";
import querystring from "querystring";
import { useState } from "react";

//https://www.omdbapi.com/?s=man&apikey=65525897

export const useApi = () => {
	const [apikey, setApikey] = useState("");
	const [errorStatus, setErrorStatus] = useState("");

	const getData = async (option, url = "") => {
		url = option ? `https://${url}/?${option}` : url;
		return axios
			.get(url)
			.then(({ data }) => data)
			.catch((err) => console.error("err code:", err));
	};
	const createQuery = (param) => querystring.stringify(param);

	const fetch = (s, url) => getData(createQuery({ s, apikey }, url));

	const errorModal = (content) =>
		Modal.error({
			title: "Error message",
			content,
		});

	const errorWarn = (errorMsg) => {
		console.error(errorMsg);
		return errorModal(errorMsg);
	};

	const auth = (auth) => {
		setApikey(auth);

		if (!apikey) {
			console.log("auth");
			errorWarn("Auth key Not Found!");
			return;
		}

		return {
			search(url) {
				return function (search) {
					if (!search)
						return errorWarn("Search Input Can Not Empty!");

					return fetch(url, search);
				};
			},
		};
	};

	return {
		getData,
		auth,
		createQuery,
	};
};
