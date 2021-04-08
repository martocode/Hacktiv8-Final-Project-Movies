import React, { useContext, useEffect } from "react";
import { Card, Col } from "antd";
import { MoviesContext } from "../MyContext/MyContext";
import { updateFilter } from "../../Services/Movies/movies.reducer";
import { setLoadingStatus } from "../../Services/Global/Loading.reducer";
const { Meta } = Card;

export const imageSrc = (Title, Poster) => (
	<img className="poster image" alt={Title} src={Poster} />
);

export const MovieCard = () => {
	const { states, dispatch } = useContext(MoviesContext),
		{
			movies: { fetch, filter },
		} = states;

	return filter.map(({ Title, Poster }, k) => (
		<Col key={k} className="card movie">
			<Card cover={imageSrc(Title, Poster)}>
				<Meta title={Title} />
			</Card>
		</Col>
	));
};
