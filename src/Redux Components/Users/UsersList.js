import { Button, Input, Row, Col, Layout, Skeleton, Spin, Empty } from "antd";
import { connect, useSelector, useStore } from "react-redux";
import MoviesList from "../Movies/movies";
import { PageHeader } from "../Header/Header";
import { useEffect, useState } from "react";
import { UsersAction } from "../../Services/Users/users.reducer";
import { DataAction, updateFilter } from "../../Services/Movies/movies.reducer";

const { Content } = Layout;

const UsersTable = (props) => {
	const { fetch, filter } = useStore().getState().movies;
	const [isLoading, setLoad] = useState(true);

	const SpinLoading = () => {
		return (
			<Spin spinning={isLoading}>
				<content></content>
			</Spin>
		);
	};

	const getList = () => {
		if (!filter.length) {
			console.log(filter);
			return <Empty description={<span>No Data Found!</span>} />;
		}
		if (isLoading) {
			console.log(isLoading, "load");
			return SpinLoading();
		} else {
			return <MoviesList />;
		}
	};

	useEffect(() => {
		props.dispatch(DataAction.fetchData());
	}, []);

	useEffect(() => {
		setLoad(false);
		props.dispatch(updateFilter(fetch));
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
				{getList()}
			</Content>
		</>
	);
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(UsersTable);
