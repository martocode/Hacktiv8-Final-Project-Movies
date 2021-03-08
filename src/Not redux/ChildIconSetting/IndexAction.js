import { ActionEdit } from "./ChildActionEdit";
import { ActionEllipsis } from "./ChildActionEllipsis";
import { ActionSetting } from "./ChildActionSetting";

export const ActionButton = (props) => {
	const { Setting, Edit, Ellipsis } = props;

	const arrBulean = Object.entries(props).filter(([v, bolean]) => bolean);

	return arrBulean;
};
