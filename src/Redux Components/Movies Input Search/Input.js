import { Input, Button } from "antd";
import { useContext, useEffect, useState } from "react";
import { setinputStatus } from "../../Services/Global/Loading.reducer";
import { fetchData } from "../../Services/Movies/movies.reducer";
import { MoviesContext } from "../MyContext/MyContext";
import { useApi } from "../../Apis/Api";

const HeaderSearch = () => {
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
		const client = auth("65525897");
		const res = await client.search(input);
		if (!res) return;

		return dispatch(fetchData(res.Search));
	};

	const onSearch = () => {
		if (buttonStatus) return;

		setButtonStatus(true);
		setTimeout(() => {
			getSearchResult(getInput);
			setTimeout(() => {
				setButtonStatus(false);
			}, 2000);
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

	useEffect(() => {
		setTimeout(() => {
			setButtonStatus(isLoading);
		}, 500);
	}, [isLoading]);

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
