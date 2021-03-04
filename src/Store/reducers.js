import { combineReducers } from "redux";
import bills from "../Services/Billings/billings.reducer";
import users from "../Services/Users/users.reducer";

const makeRootReducer = (history) => {
	return combineReducers({
		bills,
		users,
	});
};

export default makeRootReducer;
