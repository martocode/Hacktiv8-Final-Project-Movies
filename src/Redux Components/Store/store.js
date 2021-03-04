import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

export default function configureStore(preLoaderState) {
	const history = createBrowserHistory();
	const store = createStore(
		rootReducer(history),
		preLoaderState,
		applyMiddleware(thunkMiddleware)
	);
	return store;
}
