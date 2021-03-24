import { AutoComplete, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import { setinputStatus } from "../../Services/Global/Loading.reducer";
import { updateFilter } from "../../Services/Movies/movies.reducer";
const { Option } = Select;

const MoviesInput = (props) => {
	const { movies } = useStore().getState();
	const {
		movies: { fetch, filter },
	} = useStore().getState();

	const [getValue, setValue] = useState("Title");
	const [getInput, setInput] = useState("");
	const [getOptions, setOptions] = useState([]);
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

	const dispatchInputOnChange = (input) => {
		props.dispatch(inputFilter(input));
	};

	const GetSelections = () =>
		opt.map((v, k) => {
			return (
				<Option key={k} value={v}>
					{v}
				</Option>
			);
		});

	const switchOptions = () =>
		filter.map((v, key) => ({ key, value: v[getValue] }));

	useEffect(() => {
		dispatchInputOnChange(getInput);
	}, [getInput]);

	useEffect(() => {
		setOptions(switchOptions());
	}, [getValue, filter]);

	useEffect(() => {
		dispatch(setinputStatus(getInput));
	}, [filter]);

	return (
		<>
			<Select
				defaultValue="Title"
				style={{ width: 100 }}
				onChange={setValue}
			>
				{GetSelections()}
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
				options={getOptions}
			/>
		</>
	);
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(MoviesInput);
