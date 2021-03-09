import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

export default function configureStore(preLoaderState) {
	// const middlewares = [thunkMiddleware.withExtraArgument];
	const store = createStore(
		rootReducer(),
		preLoaderState,
		applyMiddleware(thunkMiddleware)
	);
	return store;
}
