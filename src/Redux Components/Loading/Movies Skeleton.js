import { Card, Col, Row, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { imageSrc } from "../Movies/MovieCard";

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
	const [] = useState();
	const [] = useState();

	useEffect(() => {
		// setTitle(filter[0].Title);
		// setPoster(filter[0].Poster);
		console.log(props, "fff");
	}, [filter]);

	return (
		<Content className="contain movies">
			<Row gutter={[26, 26]} className="movies">
				{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
					<Col key={k} className="card movie skeleton">
						<Card hoverable cover={<Skeleton.Image />}>
							<Skeleton active paragraph=""></Skeleton>
						</Card>
					</Col>
				))}

				<Col className="card movie skeleton">
					<Card
						hoverable
						cover={imageSrc(filter[0].Title, filter[0].Poster)}
					>
						<Meta title={filter[0].Title} />
					</Card>
				</Col>
			</Row>
		</Content>
	);
};
