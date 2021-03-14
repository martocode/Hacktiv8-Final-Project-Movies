import { apiGet } from "../../apis/Api";

const GET_DATA = "MOVIES/GET_DATA";
const UPDATE_FILTER = "MOVIES/UPDATE_DATA";

export default function reducer(state = { fetch: [], filter: [] }, action) {
	switch (action.type) {
		case GET_DATA:
			return {
				...state,
				fetch: [...state.fetch, ...action.payload],
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
			const data = [
				{
					Title: "Iron Man",
					Year: "2008",
					imdbID: "tt0371746",
					Type: "movie",
					Poster:
						"https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
				},
				{
					Title: "xa",
					Year: "2018",
					imdbID: "tt0371746",
					Type: "movie",
					Poster:
						"https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
				},
				{
					Title: "y",
					Year: "2006",
					imdbID: "tt0371746",
					Type: "movie",
					Poster:
						"https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
				},
			];
			dispatch(getData(data));
		};
	},
};
