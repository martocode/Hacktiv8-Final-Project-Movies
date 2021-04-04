import { Layout } from "antd";
import React from "react";
import { PageHeader } from "../Header/Header";
import SideMenu from "../side menu/SideMenu";
import { MoviesProvider } from "../MyContext/MyContext";
import { MainPageSwitcher } from "../Page Switcher/MainPageSwitcher";

const { Content } = Layout;

const UsersTable = () => {
	return (
		<MoviesProvider>
			<PageHeader />
			<Content className="site-layout-content">
				<Layout style={{ padding: "24px 0" }}>
					<SideMenu />
					<MainPageSwitcher />
				</Layout>
			</Content>
		</MoviesProvider>
	);
};

export default UsersTable;
