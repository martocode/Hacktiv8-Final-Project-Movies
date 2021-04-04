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
import { setinputStatus } from "../../Services/Global/Loading.reducer";
import { updateFilter } from "../../Services/Movies/movies.reducer";
import { MoviesContext } from "../MyContext/MyContext";
import { Search } from "../../Apis/data.json";

const { Option } = Select;

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideMenu = (props) => {
	const { states, dispatch } = useContext(MoviesContext),
		{
			global: { isInputEmpty },
			movies: { fetch, filter },
		} = states;

	const [getSelected, setSelected] = useState("Title"),
		[getInput, setInput] = useState(""),
		[getOptions, setOptions] = useState([]),
		[openKeys, setOpenKeys] = useState(["sub1", "sub2"]);

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

	const dispatchInputUpdate = (input) => {
		dispatch(inputFilter(input));
	};

	const GetSelections = () =>
		opt.map((v, k) => (
			<Radio.Button key={k} value={v}>
				{v}
			</Radio.Button>
		));

	const switchOptions = () =>
		filter.map((v, key) => {
			console.log(v, "vvv");
			return { key, value: v[getSelected] };
		});

	const onOpenChange = (key) => {
		setOpenKeys(key);
	};

	const radioUpdate = ({ target: { value } }) => {
		setSelected(value);
	};

	const inputUpdate = ({ target: { value } }) =>
		setInput(value === "" || getInput === "" ? value.trim() : value);

	useEffect(() => {
		dispatchInputUpdate(getInput);
	}, [getInput]);

	useEffect(() => {
		setOptions(switchOptions());
		console.log(getOptions, "getOptions");
	}, [getSelected, filter]);

	useEffect(() => {
		dispatch(setinputStatus(getInput && !isInputEmpty));
	}, [filter]);

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
							className="movies input"
							placeholder="Search"
							options={getOptions}
						/>
					</div>
				</SubMenu>
				<SubMenu
					key="sub2"
					className="filter-card"
					icon={<FilterTwoTone />}
					title="subnav 2"
				>
					<AutoComplete
						className="movies input"
						placeholder="Search"
						options={getOptions}
					/>
				</SubMenu>
				<Button
					type="primary"
					shape="round"
					icon={<SearchOutlined />}
					size="large"
				/>
			</Menu>
		</Sider>
	);
};

export default SideMenu;
