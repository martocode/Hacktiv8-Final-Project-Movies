import axios from "axios";

export const apiGet = (url = "", params = "") => {
	return axios
		.get(`${url}${params}`)
		.then(({ data }) => data)
		.catch((err) => console.log("err", err));
};
