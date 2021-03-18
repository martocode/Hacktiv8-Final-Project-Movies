import { AutoComplete, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { connect, useSelector, useStore } from "react-redux";
import { getinputStatus } from "../../Services/Global/Loading.reducer";
import { updateFilter } from "../../Services/Movies/movies.reducer";
import { delay } from "../../Utils/Delay";
const { Option } = Select;

const MoviesInput = (props) => {
	const stores = useStore();
	const { fetch, filter } = stores.getState().movies;
	const { isInputEmpty } = stores.getState().global;
	const [selected, setSelected] = useState({});
	const [getValue, setValue] = useState("");
	const opt = ["Title", "Year"];
	const printer = (a) => console.log(a);

	const inputFilter = (input) => {
		const lowerCased = input.toLowerCase().trim();
		const filtered =
			lowerCased === ""
				? fetch
				: fetch.filter(({ Title }) =>
						Title.toLowerCase().includes(lowerCased)
				  );
		console.log(filtered, "filtered");
		return updateFilter(filtered);
	};

	const inputOnChange = (input) => {
		props.dispatch(inputFilter(input));
	};

	useEffect(() => {
		setSelected((prev) => (prev.Title = []));
	}, []);

	useEffect(() => {
		const test = stores.getState();
		console.log(props, "asd", test, "movies");
	}, [filter]);

	useEffect(() => {
		inputOnChange(getValue);
		props.dispatch(getinputStatus(getValue));
	}, [getValue]);

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
				value={getValue}
				onChange={({ target: { value } }) => {
					// const { value } = e.target;

					let input =
						value === "" || getValue === "" ? value.trim() : value;
					setValue(input);
				}}
			/>
			<AutoComplete
				className="movies input"
				placeholder="Search"
				options={filter.map(({ Title }) => ({ value: Title }))}
			/>
		</>
	);
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(MoviesInput);
