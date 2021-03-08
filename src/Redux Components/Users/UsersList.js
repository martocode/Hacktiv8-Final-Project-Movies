import { Button, Input, Row, Col, Layout } from "antd";
import { connect, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addNumber, minusNumber } from "../../Services/Users/users.reducer";
import BillsList from "../Billings/BillsList";
import MoviesList from "../Movies/movies";
import { getData, updateFilter } from "../../Services/Movies/movies.reducer";

const { Content } = Layout;
// import configureStore from "../../Store/store";
// const store = configureStore();

const UsersTable = (props) => {
	const [getInput, setInput] = useState();
	const [getDataOninput, setDataOninput] = useState();
	const [getFetch, setFetch] = useState();
	const [getFilter, setFilter] = useState([]);
	const movies = useSelector((state) => state.movies);
	let { fetch, filter } = movies;

	const inputFilter = (input) => {
		const lowerCased = input.toLowerCase().trim();
		const filterInput = () => {
			if (lowerCased === "") return fetch;
			return fetch.filter(({ Title }) =>
				Title.toLowerCase().includes(lowerCased)
			);
		};
		const filtered = filterInput();
		console.log(filtered, "getFilter");
		return filtered;
	};

	const inputOnChange = (input) => {
		// setDataOninput(inputFilter(input));
		props.dispatch(updateFilter(inputFilter(input)));
		console.log(movies, "movies");
	};

	useEffect(() => {
		fetch = movies.fetch;
		filter = movies.filter;
		// props.dispatch(updateFilter(fetch));
		// console.log(movies, "123");
	}, []);

	return (
		<>
			<Content
				className="site-layout-content"
				/* style={{
					margin: "24px 16px",
					padding: 24,
					minHeight: 280,
				}} */
			>
				<Row>
					<Col span={11} offset={4}>
						<Input
							placeholder="Basic usage"
							onChange={(e) => inputOnChange(e.target.value)}
						/>
					</Col>
				</Row>
				{/* <Button
					onClick={() => props.dispatch(addNumber(1))}
					type="primary"
				>
					Plus Button {props.state.users}
				</Button>
				<Button
					onClick={() => props.dispatch(minusNumber(1))}
					type="primary"
				>
					Minus Button {props.state.users}
				</Button>
				<BillsList /> */}
				<MoviesList />
			</Content>
		</>
	);
};

const mapStateToProps = function (state) {
	return {
		state,
	};
};

export default connect(mapStateToProps)(UsersTable);
