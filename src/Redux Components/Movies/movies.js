import { Row, Layout } from "antd";

import { MovieCard } from "./MovieCard";
const { Content } = Layout;

const MoviesList = () => {
	return (
		<Content className="contain movies">
			<Row gutter={[26, 26]} className="movies">
				<MovieCard />
			</Row>
		</Content>
	);
};

export default MoviesList;
