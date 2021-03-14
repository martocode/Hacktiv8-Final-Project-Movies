import { Button, Input, Row, Col, Layout, Menu, Breadcrumb } from "antd";

import { connect, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UsersAction } from "../../Services/Users/users.reducer";

const { Header, Content, Footer } = Layout;

const UsersTable = (props) => {
	const [getUsersTable, setUsersTable] = useState([]);
	const Users = useSelector((state) => state.users);

	useEffect(() => {
		props.dispatch(UsersAction.getUsers());
	}, []);

	useEffect(() => {
		setUsersTable(Users.users);
		console.log("zzz", Users, "aB");
	}, [getUsersTable]);

	return (
		<>
			<Layout className="layout">
				<Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
					<div className="logo" />
				</Header>
				<Content
					className="site-layout"
					style={{ padding: "0 50px", marginTop: 64 }}
				>
					<br style={{ margin: "16px 0" }} />
					<div style={{ padding: 24, minHeight: 64 }}>
						<Row>
							<Col span={10}>
								<Input
									placeholder="Search Users"
									enterButton="Search"
									allowClear
								></Input>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							{Users.users.map((v, k) => {
								return (
									<Col key={k}>
										<img src={v.avatar} alt={v.name} />
										<h1>{v.name}</h1>
									</Col>
								);
							})}
						</Row>
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>asdasd</Footer>
			</Layout>
		</>
	);
};

const mapStateToProps = function (state) {
	return {
		state,
	};
};

export default connect(mapStateToProps)(UsersTable);
