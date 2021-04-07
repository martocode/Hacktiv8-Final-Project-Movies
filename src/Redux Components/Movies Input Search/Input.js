import { Input, Select, Modal } from "antd";
import { useContext, useEffect, useReducer, useState } from "react";
import { setinputStatus } from "../../Services/Global/Loading.reducer";
import { updateFilter } from "../../Services/Movies/movies.reducer";
import { MoviesContext } from "../MyContext/MyContext";
import { useMovieApi } from "../../Services/Movies/Movies.Api";

const MoviesInput = () => {
	const { states, dispatch } = useContext(MoviesContext);
	const {
		movies: { filter },
	} = states;

	const [getInput, setInput] = useState("");
	const { search } = useMovieApi();

	const inputUpdate = ({ target: { value } }) => {
		setInput(
			value
				? value === "" || getInput === "" || value[0] === " "
					? value.trim()
					: value
				: ""
		);
	};

	const onSearch = (v) => {
		console.log(v, "asdvvv");
	};

	useEffect(() => {
		const res = search("");
		console.log(res, "res");
	}, []);

	useEffect(() => {
		// dispatchInputOnChange(getInput);
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
				enterButton="Search"
				onSearch={onSearch}
			/>
		</>
	);
};

export default MoviesInput;
