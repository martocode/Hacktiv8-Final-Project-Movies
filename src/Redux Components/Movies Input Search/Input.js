import { AutoComplete, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { connect, useSelector, useStore } from "react-redux";
import { updateFilter } from "../../Services/Movies/movies.reducer";
const { Option } = Select;

const MoviesInput = (props) => {
	const stores = useStore();
	const movies = useSelector((state) => state.movies);
	const { fetch, filter } = stores.getState().movies;
	const [selected, setSelected] = useState({});
	const [value, setValue] = useState("");
	const opt = ["Title", "Year"];

	const inputFilter = (input) => {
		const lowerCased = input.toLowerCase().trim();
		let filtered;
		if (lowerCased === "") {
			console.log(input);
			return updateFilter(fetch);
		} else {
			filtered = fetch.filter(({ Title }) =>
				Title.toLowerCase().includes(lowerCased)
			);
		}

		console.log(filtered, "getFilter");
		return updateFilter(filtered);
	};

	const inputOnChange = (input) => {
		props.dispatch(inputFilter(input));
		console.log(input, "movies123");
	};

	useEffect(() => {
		setSelected((prev) => (prev.Title = []));
		console.log(selected, "selected");
	}, []);

	useEffect(() => {
		const test = stores.getState();
		console.log(props, "asd", test, "movies");
	}, [filter]);

	return (
		<>
			<Select
				defaultValue="Title"
				style={{ width: 100 }}
				onChange={(e) => console.log(e, "select")}
			>
				{opt.map((v, k) => {
					return (
						<Option key={k} value={v}>
							{v}
						</Option>
					);
				})}
			</Select>
			<Input
				className="movies input"
				placeholder="Filter"
				value={value}
				onChange={(e) => {
					let input = e === "" || value === "" ? e.trim() : e;
					setValue(input);
					inputOnChange(input);
				}}
			/>
			<AutoComplete
				className="movies input"
				placeholder="Search"
				// options={filter.map()}
			/>
		</>
	);
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(MoviesInput);
