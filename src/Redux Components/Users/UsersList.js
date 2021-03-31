import { Layout } from "antd";
import { useEffect, useReducer } from "react";
import {
	globalState,
	setLoadingStatus,
	setinputStatus,
} from "../../Services/Global/Loading.reducer";
import {
	movieStates,
	getData,
	DataAction,
	updateFilter,
} from "../../Services/Movies/movies.reducer";
import { EmptyChild } from "../Empty/Empty";
import { PageHeader } from "../Header/Header";
import { MovieSkeleton } from "../Loading/Movies Skeleton";
import { SpinLoading } from "../Loading/Spin";
import MoviesList from "../Movies/movies";
import SideMenu from "../side menu/SideMenu";
import rootReducer, { reducerStates } from "../../Store/rootReducer";

const { Content } = Layout;

const UsersTable = (props) => {
	const [states, dispatch] = useReducer(rootReducer(), reducerStates());
	const {
		movies,
		global,
		global: { isLoading, isInputEmpty },
		movies: { fetch, filter },
	} = states;

	const { fetchData } = DataAction;

	const switchLoadingStatus = (boolean) =>
		dispatch(setLoadingStatus(boolean));

	const loadUpSequence = () => {
		switchLoadingStatus(true);
		setTimeout(() => {
			dispatch(updateFilter(fetch));
			switchLoadingStatus(false);
		}, 2000);
	};

	const GetList = () => {
		if (!filter.length && isInputEmpty.length) {
			return <EmptyChild />;
		}

		if (isLoading) {
			return SpinLoading();
		}

		<MoviesList />;
	};

	const dispatchGetData = () => fetchData()(dispatch);

	useEffect(() => {
		// dispatchGetData();
		// dispatch(getData([1, 2]));
		console.log(states, "asd", props, "props22");
	}, []);

	useEffect(() => {
		console.log(movies, "asd12", props, "props");
	}, [movies]);

	useEffect(() => {
		// loadUpSequence();
	}, [fetch]);

	return (
		<>
			<PageHeader />
			<Content className="site-layout-content">
				<Layout style={{ padding: "24px 0" }}>
					<SideMenu dispatch={dispatch} state={{ ...states }} />
					<MovieSkeleton dispatch={dispatch} state={{ ...states }} />
				</Layout>
			</Content>
		</>
	);
};

export default UsersTable;
