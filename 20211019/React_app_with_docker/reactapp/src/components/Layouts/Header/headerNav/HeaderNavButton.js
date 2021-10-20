import classes from "./HeaderNavButton.module.css";
import Card from "../../../UI/Card";
import AnchorLink from "react-anchor-link-smooth-scroll";

const HeaderNavButton = (props) => {
	return (
		<AnchorLink href={props.href}>
			<Card className={classes["header-nav-item"]}>{props.navItem}</Card>
		</AnchorLink>
	);
};
export default HeaderNavButton;
