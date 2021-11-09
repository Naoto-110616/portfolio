import classes from "./Header.module.css";
import HeaderNav from "./headerNav/HeaderNav";
import Icons from "./icons/Icons";
import AnchorLink from "react-anchor-link-smooth-scroll";
import MediaQuery from "react-responsive";

const Header = () => {
	return (
		<header className={classes.header}>
			<AnchorLink href="#root">
				<h1>Portfolio</h1>
			</AnchorLink>
			<div className={classes["header-item"]}>
				<Icons />
				<MediaQuery query="(min-width: 768px)">
					<HeaderNav />
				</MediaQuery>
			</div>
		</header>
	);
};

export default Header;
