import { useApi } from "../../Apis/Api";

export const useMovieApi = () => {
	// const {auth, createQuery } = useApi();
	const { search } = useApi().auth("65525897");
	return { search: search("www.omdbapi.com") };
};
