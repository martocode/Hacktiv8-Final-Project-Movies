import { AutoComplete, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import { setinputStatus } from "../../Services/Global/Loading.reducer";
import { updateFilter } from "../../Services/Movies/movies.reducer";
const { Option } = Select;

const MoviesInput = (props) => {
	const {
		movies: { fetch, filter },
	} = useStore().getState();

	const [getValue, setValue] = useState("Title");
	const [getInput, setInput] = useState("");
	const { dispatch } = props;
	const opt = ["Title", "Year"];

	const inputFilter = (input) => {
		const lowerCased = input.toLowerCase().trim();
		const filtered =
			lowerCased === ""
				? fetch
				: fetch.filter(({ Title }) =>
						Title.toLowerCase().includes(lowerCased)
				  );
		return updateFilter(filtered);
	};

	const inputOnChange = (input) => {
		props.dispatch(inputFilter(input));
	};

	const GetOptions = () =>
		opt.map((v, k) => {
			return (
				<Option key={k} value={v}>
					{v}
				</Option>
			);
		});

	useEffect(() => {
		inputOnChange(getInput);
		dispatch(setinputStatus(getInput));
	}, [getInput]);

	return (
		<>
			<Select
				defaultValue="Title"
				style={{ width: 100 }}
				onChange={setValue}
			>
				{GetOptions()}
			</Select>
			<Input
				className="movies input"
				placeholder="Filter"
				value={getInput}
				onChange={({ target: { value } }) => {
					let input =
						value === "" || getInput === "" ? value.trim() : value;
					setInput(input);
				}}
			/>
			<AutoComplete
				className="movies input"
				placeholder="Search"
				options={filter.map((v) => {
					return { value: v[getValue] };
				})}
			/>
		</>
	);
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(MoviesInput);
