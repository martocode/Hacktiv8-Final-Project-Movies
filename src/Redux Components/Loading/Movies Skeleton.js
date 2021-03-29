import { Card, Col, Row, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useReducer, useState } from "react";
import { useStore } from "react-redux";
import { imageSrc } from "../Movies/MovieCard";
import movieReducer from "../../Services/Movies/movies.reducer";

const filter = [
	{
		Title: "Iron Man",
		Year: "2008",
		imdbID: "tt0371746",
		Type: "movie",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
	},
];

export const MovieSkeleton = (props) => {
	// const {
	// 	movies: { fetch, filter },
	// } = props;
	const [Title, setTitle] = useState();
	const [Poster, setPoster] = useState();

	useEffect(() => {
		// setTitle(filter[0].Title);
		// setPoster(filter[0].Poster);
		console.log(filter, "fff");
	}, [filter]);

	return (
		<Content style={{ padding: "0 50px" }}>
			<Row gutter={[16, 16]} className="movies">
				{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
					<Col span={6} key={k} className="card movie skeleton">
						<Card hoverable cover={<Skeleton.Image />}>
							<Skeleton active paragraph=""></Skeleton>
						</Card>
					</Col>
				))}

				<Col span={6} className="card movie skeleton">
					<Card
						hoverable
						cover={imageSrc(filter[0].Title, filter[0].Poster)}
					>
						<Meta
							title={
								<div className="card title">
									{filter[0].Title}
								</div>
							}
						/>
					</Card>
				</Col>
			</Row>
		</Content>
	);
};
