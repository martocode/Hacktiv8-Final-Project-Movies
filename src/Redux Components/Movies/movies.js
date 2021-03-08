import { Card, Col, Row, Layout, Button } from "antd";
import { useState, useEffect } from "react";
import { connect, useSelector, useStore } from "react-redux";
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from "@ant-design/icons";

import { getData } from "../../Services/Movies/movies.reducer";

import { MovieCard } from "./MovieCard";
const { Meta } = Card;
const { Content } = Layout;

export const MoviesList = (props) => {
	const [data, setData] = useState();
	const [inputText, setInput] = useState("");
	const [getDataOninput, setDataOninput] = useState();
	const [getFetch, setFetch] = useState();
	const [getFilter, setFilter] = useState([]);
	const [movies, setMovies] = useState();
	const { fetch, filter } = useSelector((state) => state.movies);
	const store = useStore();

	const imageSrc = (Title, Poster) => (
		<img className="poster image" alt={Title} src={Poster} />
	);

	const updateTable = () => {
		return data && <MovieCard data={data} />;
	};

	useEffect(() => {
		props.dispatch(getData());
	}, []);

	useEffect(() => {
		// const { fetch, filter } = props.state.movies;
		setFilter(filter);
		setData((filter.length === 0 && fetch) || filter);
	}, [filter]);

	useEffect(() => {
		setData((filter.length === 0 && fetch) || filter);
	}, [fetch]);

	useEffect(() => {
		setMovies(updateTable());
	}, [data]);

	useEffect(
		() =>
			store.subscribe(() => {
				// if (filter.length ===0) setData(fetch)
				setData((filter.length === 0 && fetch) || filter);
				setMovies(updateTable());
				console.log(data, "data");
			}),
		[filter]
	);

	return (
		<Content style={{ padding: "0 50px" }}>
			<Row gutter={[24, 24]} style={{ padding: "24px" }}>
				{movies}
			</Row>
		</Content>
	);
};

const mapStateToProps = function (state) {
	return { state };
};

export default connect(mapStateToProps)(MoviesList);
