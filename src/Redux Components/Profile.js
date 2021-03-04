import { Avatar, Card, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { ActionButton } from "../Not redux/ChildIconSetting/IndexAction";
const { Meta } = Card;

function Profile(props) {
	// console.log("ActionButton", ActionButton);
	const [enabled, setEnable] = useState(false);
	const [isloading, setloading] = useState(true);
	const avatar = () => (
		<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
	);
	const [getImg, setImg] = useState();
	const profileSettings = {
		Setting: true,
		Edit: false,
		Ellipsis: true,
	};

	useEffect(() => {
		if (props.children === "Amarto") {
			setEnable(profileSettings);
		}
	}, []);

	useEffect(() => {
		setImg(
			<img
				alt="example"
				src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
			/>
		);
	}, []);

	useEffect(() => {
		setloading(false);
	}, [getImg]);

	return (
		<Card
			// loading={true}
			title={props.children}
			style={{ width: 300 }}
			cover={getImg}
			actions={ActionButton(enabled)}
		>
			<Skeleton loading={false} avatar active>
				<Meta
					avatar={avatar()}
					title="Card title"
					description="This is description"
				/>
			</Skeleton>
		</Card>
	);
}

export default Profile;
