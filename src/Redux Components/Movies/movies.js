import { Row, Layout } from "antd";

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

export default MoviesList;
