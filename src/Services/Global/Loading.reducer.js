const GET_LOADING_STATUS = "GLOBAL/LOADING_STATUS";
const GET_INPUT_STATUS = "GLOBAL/INPUT_STATUS";

export default function reducer(
	state = { isLoading: true, isInputEmpty: true },
	action
) {
	switch (action.type) {
		case GET_LOADING_STATUS:
			return {
				...state,
				isLoading: action.payload,
			};
		case GET_INPUT_STATUS:
			return {
				...state,
				isInputEmpty: action.payload,
			};
		default:
			return state;
	}
}

export const getLoadingStatus = (data) => {
	return { type: GET_LOADING_STATUS, payload: data };
};

export const getinputStatus = (data) => {
	return { type: GET_INPUT_STATUS, payload: data };
};
