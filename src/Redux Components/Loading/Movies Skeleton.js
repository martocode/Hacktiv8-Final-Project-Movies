import { Card, Col, Row, Skeleton } from "antd";
import { Content } from "antd/lib/layout/layout";

export const MovieSkeleton = () => {
	return (
		<Content className="contain movies">
			<Row gutter={[26, 26]} className="movies">
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => (
					<Col key={k} className="card movie skeleton">
						<Card hoverable cover={<Skeleton.Image />}>
							<Skeleton active paragraph=""></Skeleton>
						</Card>
					</Col>
				))}
			</Row>
		</Content>
	);
};
