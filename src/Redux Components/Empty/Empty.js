import { useStore } from "react-redux";
import { Empty } from "antd";
import { useContext, useEffect } from "react";
import { MoviesContext, MoviesProvider } from "../MyContext/MyContext";

export const EmptyChild = (props) => {
	const { states } = useContext(MoviesContext),
		{
			global: { isInputEmpty, filterType },
		} = states;

	useEffect(() => {
		console.log(isInputEmpty, "isInputEmpty", props, "props");
	}, [states]);

	return (
		<Empty
			description={
				<>
					<div>
						<span>
							"{isInputEmpty}" is not a valid{" "}
							{filterType.toLowerCase()}
						</span>
					</div>
					<div>
						<span>No Data Found!</span>
					</div>
				</>
			}
		/>
	);
};
