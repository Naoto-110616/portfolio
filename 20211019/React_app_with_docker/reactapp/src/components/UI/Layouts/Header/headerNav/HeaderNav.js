import classes from "./HeaderNav.module.css";
import HeaderNavButton from "./HeaderNavButton";

const HeaderNav = () => {
	return (
		<nav>
			<ul className={classes["item-list"]}>
				<HeaderNavButton navItem={"Work Log"} href={"#worklog"} />
				<HeaderNavButton navItem={"Toolset"} href={""} />
				<HeaderNavButton navItem={"Side Projects"} href={""} />
			</ul>
		</nav>
	);
};
export default HeaderNav;
