import { useStore } from "react-redux";
import { EmptyChild } from "../Empty/Empty";
import { SpinLoading } from "../Loading/Spin";
import MoviesList from "../Movies/movies";

export const GetList = () => {
	const {
		global: { isLoading, isInputEmpty },
		movies: { filter },
	} = useStore().getState();

	if (!filter.length && isInputEmpty.length) {
		return <EmptyChild />;
	}

	if (!isLoading) {
		return <MoviesList />;
	}

	if (isLoading) {
		return SpinLoading();
	}
};
