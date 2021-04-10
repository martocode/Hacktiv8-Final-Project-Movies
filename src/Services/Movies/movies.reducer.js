import { useApi } from "../../Apis/Api";

const GET_DATA = "MOVIES/GET_DATA";
const UPDATE_FILTER = "MOVIES/UPDATE_DATA";
export const movieStates = {
	fetch: [],
	filter: [],
};

export default function reducer(state = movieStates, action) {
	switch (action.type) {
		case GET_DATA:
			return {
				...state,
				fetch: [...action.payload],
			};
		case UPDATE_FILTER:
			return {
				...state,
				filter: [...action.payload],
			};
		default:
			return state;
	}
}

export const fetchData = (data) => {
	return { type: GET_DATA, payload: data };
};

export function updateFilter(data) {
	return { type: UPDATE_FILTER, payload: data };
}

export const DataAction = {
	fetchDefaultData() {
		return async (dispatch) => {
			const client = useApi().auth("65525897");
			const { Search } = await client.search("man");

			return dispatch(fetchData(Search));
		};
	},
};
