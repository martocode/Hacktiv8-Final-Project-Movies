import { createContext, useReducer } from "react";
import rootReducer, { reducerStates } from "../../Store/rootReducer";

export const MoviesContext = createContext();

export const MoviesProvider = (props) => {
	const [states, dispatch] = useReducer(rootReducer(), reducerStates());

	return (
		<MoviesContext.Provider value={{ states, dispatch }}>
			{props.children}
		</MoviesContext.Provider>
	);
};
