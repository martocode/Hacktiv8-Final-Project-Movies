import { React } from "react";
import { Layout, Row, Col } from "antd";
import HeaderSearch from "../Movies Input Search/Input";

const { Header } = Layout;

export const PageHeader = () => {
	const Title = () => (
		<Col span={6}>
			<div style={{ color: "white" }}>asdasdasd</div>
		</Col>
	);

	return (
		<Header className="header fixed">
			<Row>
				<Title />
			</Row>
			<Row id="center">
				<HeaderSearch />
			</Row>
		</Header>
	);
};
