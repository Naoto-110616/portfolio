import classes from "./Header.module.css";
import HeaderNav from "./headerNav/HeaderNav";
import Icons from "./icons/Icons";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Header = () => {
	return (
		<header className={classes.header}>
			<AnchorLink href="#root">
				<h1>Portfolio</h1>
			</AnchorLink>
			<div className={classes["header-item"]}>
				<Icons />
				<HeaderNav />
			</div>
		</header>
	);
};

export default Header;
