import { Input, Select, Modal, Button } from "antd";
import { useContext, useEffect, useReducer, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
	setinputStatus,
	setLoadingStatus,
} from "../../Services/Global/Loading.reducer";
import { getData, updateFilter } from "../../Services/Movies/movies.reducer";
import { MoviesContext } from "../MyContext/MyContext";
import { useMovieApi } from "../../Services/Movies/Movies.Api";
import querystring from "querystring";
import { useApi } from "../../Apis/Api";

const MoviesInput = () => {
	const { states, dispatch } = useContext(MoviesContext);
	const {
		global: { isLoading },
		movies: { filter },
	} = states;

	const [getInput, setInput] = useState("");
	const [buttonStatus, setButtonStatus] = useState("active");

	// const { search } = useMovieApi();
	const { search, auth, setParam, createQuery } = useApi();

	const inputUpdate = ({ target: { value } }) => {
		setInput(
			value
				? value === "" || getInput === "" || value[0] === " "
					? value.trim()
					: value
				: ""
		);
	};

	const getSearchResult = async () => {
		const client = auth("65525897");
		const { Search } = await client.search("peter");
		dispatch(getData(Search));
	};

	const onSearch = (v) => {
		setTimeout(() => {
			getSearchResult();
		}, 5000);
	};

	const searchButton = () => {
		return (
			<Button
				className="ant-btn-loading"
				id={buttonStatus}
				type="primary"
			>
				Search123
			</Button>
		);
	};

	const globalLoading = (status = true) => dispatch(setLoadingStatus(status));

	useEffect(() => {}, []);

	useEffect(() => {
		// dispatchInputOnChange(getInput);
		const d = () => (getInput.length <= 2 ? "inactive" : "active");
		setButtonStatus(d);
		console.log(d(), "input");
	}, [getInput]);

	useEffect(() => {
		dispatch(setinputStatus(getInput));
	}, [filter]);

	return (
		<>
			<Input.Search
				className="movies input header-search"
				allowClear
				placeholder="Filter"
				value={getInput}
				onChange={inputUpdate}
				enterButton={searchButton()}
				onSearch={onSearch}
			/>
		</>
	);
};

export default MoviesInput;
