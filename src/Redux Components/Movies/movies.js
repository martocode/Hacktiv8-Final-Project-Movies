import { Row, Layout } from "antd";
import { connect, useSelector } from "react-redux";

import { MovieCard } from "./MovieCard";
const { Content } = Layout;

const MoviesList = () => {
	const { filter } = useSelector((state) => state.movies);

	return (
		<Content style={{ padding: "0 50px" }}>
			<Row gutter={[16, 16]} className="movies">
				<MovieCard data={filter} />
			</Row>
		</Content>
	);
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(MoviesList);
