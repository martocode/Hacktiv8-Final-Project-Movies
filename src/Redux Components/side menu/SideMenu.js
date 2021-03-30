import { UserOutlined } from "@ant-design/icons";
import { Input, Layout, Menu, Select } from "antd";
import { useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import { setinputStatus } from "../../Services/Global/Loading.reducer";
import { updateFilter } from "../../Services/Movies/movies.reducer";
const { Option } = Select;

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideMenu = (props) => {
	const {
		movies: { fetch, filter },
	} = props.state;
	const { dispatch } = props;

	const [getValue, setValue] = useState("Title");
	const [getInput, setInput] = useState("");
	const [getOptions, setOptions] = useState([]);
	const [openKeys, setOpenKeys] = useState(["sub1", "sub2"]);

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
		opt.map((v, k) => {
			return (
				<Option key={k} value={v}>
					{v}
				</Option>
			);
		});

	const switchOptions = () =>
		filter.map((v, key) => ({ key, value: v[getValue] }));

	const onOpenChange = (key) => {
		setOpenKeys(key);
	};

	useEffect(() => {
		dispatchInputUpdate(getInput);
	}, [getInput]);

	useEffect(() => {
		setOptions(switchOptions());
	}, [getValue, filter]);

	useEffect(() => {
		dispatch(setinputStatus(getInput));
	}, [filter]);

	useEffect(() => {
		console.log(props.ref, "ref2", props, "props2");
	}, []);

	return (
		<Sider>
			<Menu
				mode="inline"
				style={{ height: "100%" }}
				openKeys={openKeys}
				onOpenChange={onOpenChange}
			>
				<SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
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
						onChange={({ target: { value } }) =>
							setInput(
								value === "" || getInput === ""
									? value.trim()
									: value
							)
						}
					/>
				</SubMenu>
				<SubMenu
					key="sub2"
					className="filter-card"
					icon={<UserOutlined />}
					title="subnav 2"
				>
					<Menu.Item key="2">option1</Menu.Item>
				</SubMenu>
			</Menu>
		</Sider>
	);
};

export default SideMenu;
