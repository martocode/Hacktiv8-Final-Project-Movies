import React, { useEffect } from "react";
import { Card, Col, Row } from "antd";
const { Meta } = Card;

export const imageSrc = (Title, Poster) => (
	<img className="poster image" alt={Title} src={Poster} />
);

export const MovieCard = ({ data }) => {
	return data.map(({ Title, Poster }, k) => (
		<Col span={6} key={k} className="card movie">
			<Card hoverable cover={imageSrc(Title, Poster)}>
				<Meta title={Title} />
			</Card>
		</Col>
	));
};
