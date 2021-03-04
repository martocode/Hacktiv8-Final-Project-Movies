import { timeNumber } from "../../Services/Users/users.reducer";
import { connect } from "react-redux";

const BillsList = (props) => {
	console.log("BillsList", props);
	return (
		<h1
			style={{ "user-select": "none" }}
			onClick={() => {
				props.dispatch(timeNumber(2));
			}}
		>
			{props.state.users}
		</h1>
	);
};

const mapStateToProps = function (state) {
	return {
		state,
	};
};

export default connect(mapStateToProps)(BillsList);
