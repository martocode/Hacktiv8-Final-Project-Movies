import { React, useState } from "react";
import { Layout, Row, Col, Button, Badge } from "antd";
import { SearchOutlined, ClockCircleOutlined } from "@ant-design/icons";
import MoviesInput from "../Movies Input Search/Input";

const { Header, Content } = Layout;

export const PageHeader = () => {
	const [show, setShow] = useState(false);

	return (
		<Header
			style={{
				background: "#639bd0",
			}}
		>
			<Row>
				<Col span={6}>
					<div style={{ color: "white" }}>asdasdasd</div>
				</Col>
				{/* <Col span={6} offset={12} id="center"></Col> */}
			</Row>
			<Row classname="child-header">
				<Col span={12} offset={9} id="center">
					<Button shape="circle" icon={<SearchOutlined />}></Button>
					<MoviesInput />
				</Col>
			</Row>
		</Header>
	);
};
