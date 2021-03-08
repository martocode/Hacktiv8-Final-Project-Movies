import { combineReducers } from "redux";
import bills from "../Services/Billings/billings.reducer";
import users from "../Services/Users/users.reducer";
import movies from "../Services/Movies/movies.reducer";

const makeRootReducer = (history) => {
	return combineReducers({
		bills,
		users,
		movies,
	});
};

export default makeRootReducer;
