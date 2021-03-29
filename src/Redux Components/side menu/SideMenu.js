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
	} = useStore().getState();

	const [getValue, setValue] = useState("Title");
	const [getInput, setInput] = useState("");
	const [getOptions, setOptions] = useState([]);
	const [openKeys, setOpenKeys] = useState(["sub1", "sub2"]);

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

	const onOpenChange = (key) => {
		setOpenKeys(key);
	};

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
						onChange={({ target: { value } }) => {
							let input =
								value === "" || getInput === ""
									? value.trim()
									: value;
							setInput(input);
						}}
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

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(SideMenu);
