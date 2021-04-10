import React, { useContext, useEffect } from "react";

import { setLoadingStatus } from "../../Services/Global/Loading.reducer";
import { DataAction, updateFilter } from "../../Services/Movies/movies.reducer";
import { EmptyChild } from "../Empty/Empty";
import { MovieSkeleton } from "../Loading/Movies Skeleton";
import { MoviesContext } from "../MyContext/MyContext";
import MoviesList from "../Movies/movies";

const { fetchDefaultData } = DataAction;

export const MainPageSwitcher = () => {
	const { states, dispatch } = useContext(MoviesContext),
		{
			global: { isLoading, isInputEmpty },
			movies: { fetch, filter },
		} = states;

	const switchLoadingStatus = (boolean) =>
		dispatch(setLoadingStatus(boolean));

	const loadUpSequence = () => {
		switchLoadingStatus(true);
		dispatch(updateFilter(fetch));
		setTimeout(() => {
			switchLoadingStatus(false);
		}, 2000);
	};

	useEffect(() => {
		fetchDefaultData()(dispatch);
	}, []);

	useEffect(() => {
		loadUpSequence();
	}, [fetch]);

	function Conditions() {
		if (!filter.length && isInputEmpty) {
			return <EmptyChild />;
		}

		if (isLoading) {
			return <MovieSkeleton />;
		}

		return <MoviesList />;
	}

	return <Conditions />;
};
