import React, { useEffect } from "react";
import { useStore } from "react-redux";
import { Card, Col } from "antd";
const { Meta } = Card;

export const imageSrc = (Title, Poster) => (
	<img className="poster image" alt={Title} src={Poster} />
);

export const MovieCard = () => {
	const {
		movies: { filter },
	} = useStore().getState();

	return filter.map(({ Title, Poster }, k) => (
		<Col key={k} className="card movie">
			<Card cover={imageSrc(Title, Poster)}>
				<Meta title={<a className="card title">{Title}</a>} />
			</Card>
		</Col>
	));
};
