import { createContext, useEffect, useReducer } from "react";
import rootReducer, { reducerStates } from "../../Store/rootReducer";

export const MoviesContext = createContext();

export const MoviesProvider = (props) => {
	const [states, dispatch] = useReducer(rootReducer(), reducerStates());

	useEffect(() => {
		console.log(props, "props");
	}, [props]);

	return (
		<MoviesContext.Provider value={{ states, dispatch }}>
			{props.children}
		</MoviesContext.Provider>
	);
};
