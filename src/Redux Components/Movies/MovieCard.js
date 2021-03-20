import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Col } from "antd";
const { Meta } = Card;

export const imageSrc = (Title, Poster) => (
	<img className="poster image" alt={Title} src={Poster} />
);

export const MovieCard = () => {
	const { filter } = useSelector((state) => state.movies);

	return filter.map(({ Title, Poster }, k) => (
		<Col span={6} key={k} className="card movie">
			<Card hoverable cover={imageSrc(Title, Poster)}>
				<Meta title={Title} />
			</Card>
		</Col>
	));
};
