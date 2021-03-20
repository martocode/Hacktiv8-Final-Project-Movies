import { Layout } from "antd";
import { connect, useStore } from "react-redux";
import { useEffect } from "react";

import { PageHeader } from "../Header/Header";

import { DataAction, updateFilter } from "../../Services/Movies/movies.reducer";
import { setLoadingStatus } from "../../Services/Global/Loading.reducer";
import { EmptyChild } from "../Empty/Empty";
import MoviesList from "../Movies/movies";
import { SpinLoading } from "../Loading/Spin";

const { Content } = Layout;

const UsersTable = (props) => {
	const {
		global: { isLoading, isInputEmpty },
		movies: { fetch, filter },
	} = useStore().getState();

	const { fetchData } = DataAction;

	const switchLoadingStatus = (boolean) =>
		props.dispatch(setLoadingStatus(boolean));

	const loadUpSequence = () => {
		switchLoadingStatus(true);
		setTimeout(() => {
			props.dispatch(updateFilter(fetch));
			switchLoadingStatus(false);
		}, 2000);
	};

	const GetList = () => {
		if (!filter.length && isInputEmpty.length) {
			return <EmptyChild />;
		}

		if (!isLoading) {
			return <MoviesList />;
		}

		if (isLoading) {
			return SpinLoading();
		}
	};

	const getData = () => props.dispatch(fetchData());

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		loadUpSequence();
	}, [fetch]);

	return (
		<>
			<PageHeader />
			<Content className="site-layout-content">
				<GetList />
			</Content>
		</>
	);
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(UsersTable);
