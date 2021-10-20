import Icons from "../Header/icons/Icons";
import classes from "./Footer.module.css";

const Footer = (props) => {
	return (
		<footer className={classes.footer}>
			<div>
				<p>© Copyright 2021 busainu.com</p>
			</div>
			<Icons className={classes.icon} />
		</footer>
	);
};

export default Footer;
