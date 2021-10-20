import Icons from "../Header/icons/Icons";
import classes from "./Footer.module.css";

const Footer = (props) => {
	return (
		<footer className={classes.footer}>
			<Icons className={classes.icon} />
		</footer>
	);
};

export default Footer;
