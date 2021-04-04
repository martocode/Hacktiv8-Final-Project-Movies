import React, { useContext, useEffect, useReducer, useState } from "react";
import { setLoadingStatus } from "../../Services/Global/Loading.reducer";
import {
	DataAction,
	getData,
	updateFilter,
} from "../../Services/Movies/movies.reducer";
import { EmptyChild } from "../Empty/Empty";
import { SpinLoading } from "../Loading/Spin";
import { Card, Col, Row, Skeleton, Layout } from "antd";
import Meta from "antd/lib/card/Meta";
// import { Content } from "antd/lib/layout/layout";
import { imageSrc } from "../Movies/MovieCard";
import { MovieSkeleton } from "../Loading/Movies Skeleton";
import { MoviesContext } from "../MyContext/MyContext";
import data from "../../Apis/data.json";

const { Content } = Layout;

const Asd = () => {
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
	return (
		<Content className="contain movies">
			<Row gutter={[26, 26]} className="movies">
				{data.Search.map(({ Title, Poster }, k) => (
					<Col key={k} className="card movie skeleton">
						<Card hoverable cover={imageSrc(Title, Poster)}>
							<Meta title={Title} />
						</Card>
					</Col>
				))}
			</Row>
		</Content>
	);
};

export const MainPageSwitcher = () => {
	const { states, dispatch } = useContext(MoviesContext),
		{
			global: { isLoading, isInputEmpty },
			movies: { fetch, filter },
		} = states;

	const { fetchData } = DataAction;

	const switchLoadingStatus = (boolean) =>
		dispatch(setLoadingStatus(boolean));

	const loadUpSequence = () => {
		switchLoadingStatus(true);
		setTimeout(() => {
			dispatch(updateFilter(fetch));
			switchLoadingStatus(false);
		}, 2000);
	};
	const dispatchGetData = () => fetchData()(dispatch);

	useEffect(() => {
		// dispatchGetData();
		// dispatch(getData([1, 2]));
		console.log(data, "isLoading");
		dispatch(setLoadingStatus(true));
		setTimeout(() => {
			dispatch(getData(data.Search));
			dispatch(setLoadingStatus(false));
			// dispatchGetData();
			console.log(isLoading, "isLoading123", states, "states");
		}, 5000);
	}, []);

	/* return !filter.length && isInputEmpty.length ? (
		<EmptyChild />
	) : isLoading ? (
		<SpinLoading />
	) : (
		<MovieSkeleton />
	); */

	if (!filter.length && isInputEmpty.length) {
		return <EmptyChild />;
	}

	if (isLoading) {
		return <MovieSkeleton />;
	}

	return <Asd />;
};
