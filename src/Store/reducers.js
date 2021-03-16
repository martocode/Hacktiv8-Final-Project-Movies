import { combineReducers } from "redux";
import bills from "../Services/Billings/billings.reducer";
import users from "../Services/Users/users.reducer";
import movies from "../Services/Movies/movies.reducer";
import global from "../Services/Global/Loading.reducer";

const makeRootReducer = (history) => {
	return combineReducers({
		users,
		movies,
		global,
	});
};

export default makeRootReducer;
