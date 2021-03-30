import { useReducer } from "react";
import globalReducer, { globalState } from "../Services/Global/Loading.reducer";
import movieReducer, { movieStates } from "../Services/Movies/movies.reducer";
import { combineReducers } from "../Utils/combineReducers";

export default function useRootReducer() {
	const defArr = (global = globalState, movies = movieStates) => ({
		global: global,
		movies: movies,
	});

	return useReducer(
		combineReducers(defArr(globalReducer, movieReducer)),
		defArr()
	);
}
