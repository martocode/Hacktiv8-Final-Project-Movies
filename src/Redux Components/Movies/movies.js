import { Row, Layout } from "antd";
import { connect } from "react-redux";

import { MovieCard } from "./MovieCard";
const { Content } = Layout;

const MoviesList = () => {
	return (
		<Content className="contain movies">
			<Row gutter={[48, 48]} className="movies">
				<MovieCard />
			</Row>
		</Content>
	);
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(MoviesList);
