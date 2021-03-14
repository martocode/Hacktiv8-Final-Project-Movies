import { Button, Input, Row, Col, Layout, Skeleton, Spin } from "antd";
import { connect, useSelector, useStore } from "react-redux";
import MoviesList from "../Movies/movies";
import { PageHeader } from "../Header/Header";
import { useEffect, useState } from "react";
import { UsersAction } from "../../Services/Users/users.reducer";

const { Content } = Layout;

const UsersTable = (props) => {
	const { fetch, filter } = useStore().getState().movies;
	const [isLoading, setLoad] = useState(true);

	useEffect(() => {
		props.dispatch(UsersAction.getUsers());
	}, []);

	useEffect(() => {
		setLoad(false);
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
				{(isLoading && (
					<Spin spinning={isLoading}>
						<content></content>
					</Spin>
				)) || <MoviesList />}
			</Content>
		</>
	);
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(UsersTable);
