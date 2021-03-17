import { Button, Input, Row, Col, Layout, Skeleton, Spin, Empty } from "antd";
import { connect, useSelector, useStore } from "react-redux";
import MoviesList from "../Movies/movies";
import { PageHeader } from "../Header/Header";
import { useEffect, useState } from "react";
import { UsersAction } from "../../Services/Users/users.reducer";
import { DataAction, updateFilter } from "../../Services/Movies/movies.reducer";
import { getLoadingStatus } from "../../Services/Global/Loading.reducer";

const { Content } = Layout;

const UsersTable = (props) => {
	const { fetch, filter } = useStore().getState().movies;
	const { isLoading, isInputEmpty } = useStore().getState().global;
	// const [isLoading, setLoad] = useState(true);

	const SpinLoading = () => {
		return (
			<Spin spinning={isLoading}>
				<content></content>
			</Spin>
		);
	};

	const GetList = () => {
		if (!filter.length && isInputEmpty.length) {
			console.log(isLoading, "getList");
			return (
				<Empty
					description={
						<div>
							<div>
								<span>
									"{isInputEmpty}" is not a valid title
								</span>
							</div>
							<div>
								<span>No Data Found!</span>
							</div>
						</div>
					}
				/>
			);
		}

		if (!isLoading) {
			return <MoviesList />;
		}

		if (isLoading) {
			console.log(isLoading, "load");
			return SpinLoading();
		}
	};

	const loadUpSequence = () => {
		setTimeout(() => {
			props.dispatch(getLoadingStatus(false));
			props.dispatch(updateFilter(fetch));
		}, 300);
	};

	useEffect(() => {
		props.dispatch(DataAction.fetchData());
	}, []);

	useEffect(() => {
		loadUpSequence();
	}, [fetch]);

	return (
		<>
			<PageHeader />
			<Content
				className="site-layout-content"
				/* style={{
					margin: "24px 16px",
					padding: 24,
					minHeight: 280,
				}} */
			>
				<GetList />
			</Content>
		</>
	);
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(UsersTable);
