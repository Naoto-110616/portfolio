import classes from "./Header.module.css";
import HeaderNav from "./headerNav/HeaderNav";
import Icons from "./icons/Icons";

const Header = () => {
	return (
		<header className={classes.header}>
			<a href="#top">
				<h1>Portfolio</h1>
			</a>
			<div className={classes["header-item"]}>
				<Icons />
				<HeaderNav />
			</div>
		</header>
	);
};

export default Header;
