import { Layout, Spin } from "antd";
import { useStore } from "react-redux";
const { Content } = Layout;

export const SpinLoading = () => {
	const {
		global: { isLoading },
	} = useStore().getState();

	return (
		<Spin spinning={isLoading}>
			<Content />
		</Spin>
	);
};
