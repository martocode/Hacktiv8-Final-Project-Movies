import { Card, Col, Row, Layout, Button } from "antd";
import { useState, useEffect } from "react";
import { connect, useSelector, useStore } from "react-redux";
import querystring from "querystring";

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
import axios from "axios";
const { Meta } = Card;
const { Content } = Layout;

const MoviesList = (props) => {
	const { fetch, filter } = useSelector((state) => state.movies);

	return (
		<Content style={{ padding: "0 50px" }}>
			<Row gutter={[16, 16]} className="movies">
				<MovieCard data={filter} />
			</Row>
		</Content>
	);
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(MoviesList);
