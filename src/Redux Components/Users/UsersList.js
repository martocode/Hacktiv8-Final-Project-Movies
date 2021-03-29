import { Layout } from "antd";
import { useEffect, useReducer } from "react";
import { connect, useStore } from "react-redux";
import useReducerWithThunk from "use-reducer-thunk";
import { setLoadingStatus } from "../../Services/Global/Loading.reducer";
import movieReducer, {
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

const { Content } = Layout;

const UsersTable = (props) => {
	const defArr = {
		fetch: [],
		filter: [],
	};
	const [movies, dispatch] = useReducer(movieReducer, defArr);
	const { fetch, filter } = movies;
	const {
		global: { isLoading, isInputEmpty },
		// movies: { fetch, filter },
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

	const dispatchGetData = () => fetchData()(dispatch);

	useEffect(() => {
		// dispatchGetData();
		// dispatch(getData([1, 2]));
		// console.log(movies, "asd", props, "props");
	}, []);

	useEffect(() => {
		console.log(movies, "asd", props, "props");
	}, [movies]);

	useEffect(() => {
		// loadUpSequence();
	}, [fetch]);

	return (
		<>
			<PageHeader />
			<Content className="site-layout-content">
				<Layout style={{ padding: "24px 0" }}>
					<SideMenu />
					<MovieSkeleton dispatch={dispatch} state={{ movies }} />
				</Layout>
			</Content>
		</>
	);
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(UsersTable);
