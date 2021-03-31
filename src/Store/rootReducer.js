import { useReducer } from "react";
import globalReducer, { globalState } from "../Services/Global/Loading.reducer";
import movieReducer, { movieStates } from "../Services/Movies/movies.reducer";
import { combineReducers } from "../Utils/combineReducers";

export const reducerStates = (global = globalState, movies = movieStates) => {
	return {
		global,
		movies,
	};
};

export default function useRootReducer() {
	return combineReducers(reducerStates(globalReducer, movieReducer));
	/* useReducer(
		combineReducers(initialState(globalReducer, movieReducer)),
		initialState()
	); */
}
