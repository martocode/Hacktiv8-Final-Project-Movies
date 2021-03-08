import React from "react";
import { Card, Col, Row, Layout, Button } from "antd";
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

export const imageSrc = (Title, Poster) => (
	<img className="poster image" alt={Title} src={Poster} />
);

export const MovieCard = (props) => {
	const { data } = props;

	return data.map(({ Title, Poster }, k) => {
		return (
			<Col key={k}>
				<Card
					hoverable
					className="card movie"
					cover={imageSrc(Title, Poster)}
					actions={[
						<SettingOutlined key="setting" />,
						<EditOutlined key="edit" />,
						<EllipsisOutlined key="ellipsis" />,
					]}
				>
					<Meta title={Title} />
				</Card>
			</Col>
		);
	});
};
