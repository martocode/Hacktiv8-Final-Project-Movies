const GET_DATA = "MOVIES/GET_DATA";
const UPDATE_FILTER = "MOVIES/UPDATE_DATA";

export default function reducer(state = { fetch: [], filter: [] }, action) {
	switch (action.type) {
		case GET_DATA:
			state.fetch = [
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
			return state;
		case UPDATE_FILTER:
			state.filter = action.payload;
			return state;
		default:
			return state;
	}
}

export function getData(data) {
	return { type: GET_DATA, payload: data };
}

export function updateFilter(data) {
	return { type: UPDATE_FILTER, payload: data };
}