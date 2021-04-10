import { Layout } from "antd";
import React from "react";
import "./App.css";
import "antd/dist/antd.css";

import { PageHeader } from "./Redux Components/Header/Header";
import SideMenu from "./Redux Components/side menu/SideMenu";
import { MoviesProvider } from "./Redux Components/MyContext/MyContext";
import { MainPageSwitcher } from "./Redux Components/Page Switcher/MainPageSwitcher";

const { Content } = Layout;

const App = () => {
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

export default App;
