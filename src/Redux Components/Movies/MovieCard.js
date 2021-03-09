import React from "react";
import { Card, Col, Row, Layout, Button } from "antd";
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
				>
					<Meta title={Title} />
				</Card>
			</Col>
		);
	});
};
