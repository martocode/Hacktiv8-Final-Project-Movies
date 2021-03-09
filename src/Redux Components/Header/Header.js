import { React } from "react";
import { Layout, Row, Col } from "antd";
import { MoviesInput } from "../Movies Input Search/Input";

const { Header, Content } = Layout;

export const PageHeader = () => {
	return (
		<Header style={{ background: "#639bd0" }}>
			<Row>
				<Col span={12}>
					<div style={{ color: "white" }}>asdasdasd</div>
				</Col>
				<Col span={12}>
					<MoviesInput />
				</Col>
			</Row>
		</Header>
	);
};
