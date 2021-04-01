import { UserOutlined } from "@ant-design/icons";
import { Input, Layout, Menu, Select, Radio, AutoComplete } from "antd";
import { useContext, useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import { setinputStatus } from "../../Services/Global/Loading.reducer";
import { updateFilter } from "../../Services/Movies/movies.reducer";
import { MoviesContext } from "../MyContext/MyContext";

const { Option } = Select;

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideMenu = (props) => {
	const { states, dispatch } = useContext(MoviesContext),
		{
			global: { isInputEmpty },
			movies: { fetch, filter },
		} = states;

	const [getValue, setValue] = useState("Title"),
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
		filter.map((v, key) => ({ key, value: v[getValue] }));

	const onOpenChange = (key) => {
		setOpenKeys(key);
	};

	const radioUpdate = ({ target: { value } }) => {
		setValue(value);
	};

	const inputUpdate = ({ target: { value } }) =>
		setInput(value === "" || getInput === "" ? value.trim() : value);

	useEffect(() => {
		dispatchInputUpdate(getInput);
	}, [getInput]);

	useEffect(() => {
		setOptions(switchOptions());
	}, [getValue, filter]);

	useEffect(() => {
		dispatch(setinputStatus(getInput && !isInputEmpty));
	}, [filter]);

	useEffect(() => {
		console.log(states, "ref2", props, "props2");
	}, []);

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
					className="sub-nav-1"
					icon={<UserOutlined />}
					title={<span className="submenu-title">Filters</span>}
				>
					<p>Show Me</p>
					<Radio.Group
						defaultValue="Title"
						style={{ width: 100 }}
						buttonStyle="solid"
						onChange={radioUpdate}
					>
						{GetSelections()}
					</Radio.Group>
					<Input
						className="movies input"
						placeholder="Filter"
						value={getInput}
						onChange={inputUpdate}
					/>
				</SubMenu>
				<SubMenu
					key="sub2"
					className="filter-card"
					icon={<UserOutlined />}
					title="subnav 2"
				>
					<AutoComplete
						className="movies input"
						placeholder="Search"
						options={getOptions}
					/>
				</SubMenu>
			</Menu>
		</Sider>
	);
};

export default SideMenu;
