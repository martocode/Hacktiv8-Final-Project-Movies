import { apiGet } from "../../Apis/Api";

const GET_USERS = "GET_USERS";
const ADD_NUMBER = "ADD_NUMBER";
const MINUS_NUMBER = "MINUS_NUMBER";
const TIME_NUMBER = "TIME_NUMBER";

export default function reducer(state = { users: [] }, action) {
	switch (action.type) {
		case GET_USERS:
			return { ...state, users: action.payload };
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

export function getUsers(data) {
	return { type: GET_USERS, payload: data };
}

export const UsersAction = {
	getUsers: function () {
		return function (dispatch) {
			apiGet()
				.getData({
					url:
						"https://604767bbb801a40017ccc169.mockapi.io/api/v1/users",
				})

				.then((data) => {
					console.log("data123", data);
					dispatch(getUsers(data));
				});
		};
	},
};
