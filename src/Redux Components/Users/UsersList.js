import { Layout } from "antd";
import React, { createContext, useEffect, useReducer, useState } from "react";
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
import { MoviesProvider, MoviesContext } from "../MyContext/MyContext";

const { Content } = Layout;

// const MyContext = () => createContext();
const UsersTable = (props) => {
	const [MainPage, setMainPage] = useState(<SpinLoading />);
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

	function GetList() {
		if (!filter.length && isInputEmpty.length) {
			return <EmptyChild />;
		}

		if (isLoading) {
			return <SpinLoading />;
		}
		return <MovieSkeleton />;
	}

	const dispatchGetData = () => fetchData()(dispatch);

	const passedProps = {
		dispatch,
		state: { ...states },
	};

	useEffect(() => {
		// dispatchGetData();
		// dispatch(getData([1, 2]));
		console.log(MainPage, "MainPage1");
		dispatch(setLoadingStatus(true));
		console.log(states, "asd", props, "props21");
		setTimeout(() => {
			dispatch(getData([1, 2]));
			dispatch(setLoadingStatus(false));
		}, 1000);
	}, []);

	useEffect(() => {
		console.log(states, "asd12", props, "props");
	}, [movies]);

	useEffect(() => {
		// loadUpSequence();
		console.log(states, "asd11", props, "props");
	}, [fetch]);

	return (
		<MoviesProvider>
			<PageHeader />
			<Content className="site-layout-content">
				<Layout style={{ padding: "24px 0" }}>
					<SideMenu />
					<GetList />
				</Layout>
			</Content>
		</MoviesProvider>
	);
};

export default UsersTable;
