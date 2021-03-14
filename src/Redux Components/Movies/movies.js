import { Card, Col, Row, Layout, Button } from "antd";
import { useState, useEffect } from "react";
import { connect, useSelector, useStore } from "react-redux";
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from "@ant-design/icons";

import {
	DataAction,
	getData,
	updateFilter,
} from "../../Services/Movies/movies.reducer";

import { MovieCard } from "./MovieCard";
import { UsersAction } from "../../Services/Users/users.reducer";
import { apiGet } from "../../apis/Api";
const { Meta } = Card;
const { Content } = Layout;

const MoviesList = (props) => {
	const { fetch, filter } = useSelector((state) => state.movies);

	useEffect(() => {
		props.dispatch(DataAction.fetchData());
		// props.dispatch(UsersAction.getUsers());
		apiGet.getData({
			url: "https://www.omdbapi.com/?s=man&apikey=65525897",
		});
		console.log(getData(), "getData()");
	}, []);

	useEffect(() => {
		props.dispatch(updateFilter(fetch));
	}, [fetch]);

	return (
		<Content style={{ padding: "0 50px" }}>
			<Row gutter={[16, 46]} className="movies">
				<MovieCard data={filter} />
			</Row>
		</Content>
	);
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(MoviesList);
