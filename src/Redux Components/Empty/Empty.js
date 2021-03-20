import { useStore } from "react-redux";
import { Empty } from "antd";

export const EmptyChild = () => {
	const {
		global: { isInputEmpty },
	} = useStore().getState();

	return (
		<Empty
			description={
				<>
					<div>
						<span>"{isInputEmpty}" is not a valid title</span>
					</div>
					<div>
						<span>No Data Found!</span>
					</div>
				</>
			}
		/>
	);
};
