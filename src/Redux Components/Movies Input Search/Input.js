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
import { useApi, errorModal } from "../../Apis/Api";

const MoviesInput = () => {
	const { auth } = useApi();

	const { states, dispatch } = useContext(MoviesContext);
	const {
		global: { isLoading },
		movies: { filter },
	} = states;

	const [getInput, setInput] = useState("");
	const [buttonStatus, setButtonStatus] = useState(false);

	const buttonCheckStatus = () => setButtonStatus(getInput.length <= 2);

	const inputUpdate = ({ target: { value } }) => {
		setInput(
			value
				? value === "" || getInput === "" || value[0] === " "
					? value.trim()
					: value
				: ""
		);
	};

	const getSearchResult = async (input) => {
		const jsonBool = (bool) => JSON.parse(bool.toLowerCase());

		const client = auth("65525897");
		const res = await client.search(input);

		if (!jsonBool(res.Response)) {
			errorModal("Wrong input keyword!");
			return;
		}

		return dispatch(getData(res.Search));
	};

	const onSearch = () => {
		if (buttonStatus) return;

		setButtonStatus(true);
		setTimeout(() => {
			getSearchResult(getInput);
			setButtonStatus(false);
		}, 5000);
	};

	const searchButton = () => {
		return (
			<Button active={buttonStatus.toString()} type="primary">
				Search
			</Button>
		);
	};

	useEffect(() => {
		buttonCheckStatus();
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
				onPressEnter={onSearch}
			/>
		</>
	);
};

export default MoviesInput;
