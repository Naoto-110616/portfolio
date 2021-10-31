import classes from "./HeaderNav.module.css";
import HeaderNavButton from "./HeaderNavButton";
import { OFFSET_WORK_LOG, OFFSET_TOOL_SET } from "../../../../../util/consts";

const HeaderNav = () => {
	return (
		<nav>
			<ul className={classes["item-list"]}>
				<HeaderNavButton
					navItem={"Work Log"}
					href={"#worklog"}
					offset={OFFSET_WORK_LOG}
				/>
				<HeaderNavButton
					navItem={"Toolset"}
					href={"#toolset"}
					offset={OFFSET_TOOL_SET}
				/>
				<HeaderNavButton navItem={"Side Projects"} href={"#side-projects"} />
			</ul>
		</nav>
	);
};
export default HeaderNav;
