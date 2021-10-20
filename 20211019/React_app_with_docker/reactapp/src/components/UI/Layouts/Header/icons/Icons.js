import classes from "./Icons.module.css";
import Icon from "./Icon";
import { GITHUB_URL, LINKED_IN } from "../../../../../util/consts";

const Icons = () => {
	return (
		<div className={classes.icons}>
			<Icon iconStyle={"fab fa-github"} href={GITHUB_URL} />
			<Icon iconStyle={"fab fa-linkedin"} href={LINKED_IN} />
		</div>
	);
};
export default Icons;
