import { FilterTwoTone, SearchOutlined } from "@ant-design/icons";
import {
	Input,
	Layout,
	Menu,
	Select,
	Radio,
	AutoComplete,
	Divider,
	Button,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import {
	setFilterType,
	setinputStatus,
} from "../../Services/Global/Loading.reducer";
import { updateFilter } from "../../Services/Movies/movies.reducer";
import { MoviesContext } from "../MyContext/MyContext";
import { Search } from "../../Apis/data.json";

const { Option } = Select;

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideMenu = (props) => {
	const { states, dispatch } = useContext(MoviesContext),
		{
			global: { filterType },
			movies: { fetch, filter },
		} = states;

	const [getInput, setInput] = useState(""),
		[getOptions, setOptions] = useState([]),
		[openKeys, setOpenKeys] = useState(["sub1", "sub2"]);

	const opt = ["Title", "Year"];

	const inputFilter = (input) => {
		const lowerCased = input.toLowerCase().trim();
		const filtered =
			lowerCased === ""
				? fetch
				: fetch.filter((data) =>
						data[filterType].toLowerCase().includes(lowerCased)
				  );
		return updateFilter(filtered);
	};

	const GetSelections = () =>
		opt.map((v, k) => (
			<Radio.Button key={k} value={v}>
				{v}
			</Radio.Button>
		));

	const switchOptions = () =>
		filter.map((v, key) => {
			return { key, value: v[filterType] };
		});

	const onOpenChange = (key) => {
		setOpenKeys(key);
	};

	const radioUpdate = ({ target: { value } }) => {
		dispatch(setFilterType(value));
	};

	const inputUpdate = (value) =>
		setInput(
			value
				? value === "" || getInput === "" || value[0] === " "
					? value.trim()
					: value
				: ""
		);

	useEffect(() => {
		// dispatchInputUpdate(getInput);
		dispatch(setinputStatus(getInput));
		console.log(states, "states", getInput, "getInput");
	}, [getInput]);

	useEffect(() => {
		setOptions(switchOptions());
		console.log(getOptions, "getOptions");
	}, [filterType, filter]);

	return (
		<Sider className="sider">
			<Menu
				mode="inline"
				style={{ height: "100%" }}
				openKeys={openKeys}
				onOpenChange={onOpenChange}
			>
				<SubMenu
					key="sub1"
					className="sider-filter"
					icon={<FilterTwoTone />}
					title="Filters"
				>
					<div className="filter-inner">
						<p>Show Me</p>
						<Radio.Group
							defaultValue="Title"
							buttonStyle="solid"
							onChange={radioUpdate}
						>
							<GetSelections />
						</Radio.Group>
					</div>
					<Divider />
					<div className="filter-inner">
						<p>Filter</p>
						<AutoComplete
							allowClear
							className="movies input"
							value={getInput}
							placeholder="Search"
							options={getOptions}
							onChange={inputUpdate}
						/>
					</div>
				</SubMenu>
				<Button
					type="primary"
					shape="round"
					icon={<SearchOutlined />}
					size="large"
					onClick={() => dispatch(inputFilter(getInput))}
				/>
			</Menu>
		</Sider>
	);
};

export default SideMenu;
