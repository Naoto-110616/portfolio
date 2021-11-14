import classes from "./HeaderNavButton.module.css";
import Card from "../../../Card/Card";
import AnchorLink from "react-anchor-link-smooth-scroll";

const HeaderNavButton = (props) => {
	return (
		<AnchorLink
			id={props.id}
			key={props.id}
			href={props.href}
			offset={props.offset}
		>
			<Card className={classes["header-nav-item"]}>{props.navItem}</Card>
		</AnchorLink>
	);
};
export default HeaderNavButton;
