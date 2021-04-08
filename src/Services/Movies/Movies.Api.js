import { useApi } from "../../Apis/Api";

export const useMovieApi = () => {
	// const {auth, createQuery } = useApi();
	const { search: apiSearch, auth: apiAuth } = useApi();

	const search = () => {
		apiAuth("65525897");
		console.error("search1");

		return apiSearch;
	};
	return { search: search() };
};
