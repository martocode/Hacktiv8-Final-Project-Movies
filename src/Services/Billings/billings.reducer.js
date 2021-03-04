const GET_BILLS = "GET_BILLS";

export default function reducer(
	state = {
		dataKtp: { ocr_status: "" },
	},
	action
) {
	switch (action.type) {
		case GET_BILLS:
			return state;
		default:
			return state;
	}
}
