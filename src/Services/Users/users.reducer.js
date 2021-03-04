const GET_USERS = "GET_USERS";
const ADD_NUMBER = "ADD_NUMBER";
const MINUS_NUMBER = "MINUS_NUMBER";
const TIME_NUMBER = "TIME_NUMBER";

export default function reducer(state = 0, action) {
	switch (action.type) {
		case GET_USERS:
			return state;
		case ADD_NUMBER:
			return state + action.payload;
		case MINUS_NUMBER:
			return state - action.payload;
		case TIME_NUMBER:
			return state * action.payload;
		default:
			return state;
	}
}

export function addNumber(data) {
	return { type: ADD_NUMBER, payload: data };
}

export function minusNumber(data) {
	return { type: MINUS_NUMBER, payload: data };
}

export function timeNumber(data) {
	return { type: TIME_NUMBER, payload: data };
}
