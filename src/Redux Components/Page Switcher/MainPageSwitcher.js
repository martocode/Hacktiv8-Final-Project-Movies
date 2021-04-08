import React, { useContext, useEffect } from "react";
import { setLoadingStatus } from "../../Services/Global/Loading.reducer";
import {
	DataAction,
	getData,
	updateFilter,
} from "../../Services/Movies/movies.reducer";
import { EmptyChild } from "../Empty/Empty";
import { Card, Col, Row, Layout } from "antd";
import Meta from "antd/lib/card/Meta";
import { imageSrc } from "../Movies/MovieCard";
import { MovieSkeleton } from "../Loading/Movies Skeleton";
import { MoviesContext } from "../MyContext/MyContext";
import data from "../../Apis/data.json";

const { Content } = Layout;

const Asd = (filter) => {
	return (
		<Content className="contain movies">
			<Row gutter={[26, 26]} className="movies">
				{filter.map(({ Title, Poster }, k) => (
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
		dispatch(updateFilter(fetch));
		setTimeout(() => {
			switchLoadingStatus(false);
		}, 2000);
	};
	const dispatchGetData = () => fetchData()(dispatch);

	useEffect(() => {
		dispatch(setLoadingStatus(true));
		// dispatchGetData();
		dispatch(getData(data.Search));
	}, []);

	useEffect(() => {
		console.log("fetch123");
		dispatch(updateFilter(fetch));
		loadUpSequence();
	}, [fetch]);

	function Conditions() {
		if (!filter.length && isInputEmpty) {
			return <EmptyChild />;
		}

		if (isLoading) {
			return <MovieSkeleton />;
		}

		return Asd(filter);
	}

	return <Conditions />;
};
