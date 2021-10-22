import classes from "./HeaderNav.module.css";
import HeaderNavButton from "./HeaderNavButton";
import { OFFSET_WORK_LOG } from "../../../../../util/consts";

const HeaderNav = () => {
	return (
		<nav>
			<ul className={classes["item-list"]}>
				<HeaderNavButton
					navItem={"Work Log"}
					href={"#worklog"}
					offset={OFFSET_WORK_LOG}
				/>
				<HeaderNavButton navItem={"Toolset"} href={"#toolset"} />
				<HeaderNavButton navItem={"Side Projects"} href={"#sideProjects"} />
			</ul>
		</nav>
	);
};
export default HeaderNav;
