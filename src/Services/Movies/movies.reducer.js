import { apiGet } from "../../Apis/Api";

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

export const getData = (data) => {
	return { type: GET_DATA, payload: data };
};

export function updateFilter(data) {
	return { type: UPDATE_FILTER, payload: data };
}

export const DataAction = {
	fetchData: () => {
		return (dispatch) => {
			apiGet()
				.getData({
					url: "https://www.omdbapi.com/?s=man&apikey=65525897",
				})
				.then(({ Search }) => {
					const data = Search;
					dispatch(getData(data));
				})
				.catch((e) => console.error(e));
		};
	},
};
