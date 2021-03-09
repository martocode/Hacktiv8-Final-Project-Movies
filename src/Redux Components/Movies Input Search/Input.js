import { Input } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateFilter } from "../../Services/Movies/movies.reducer";

export const MoviesInput = (props) => {
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
		<Input
			placeholder="Basic usage"
			onChange={(e) => inputOnChange(e.target.value)}
		/>
	);
};
