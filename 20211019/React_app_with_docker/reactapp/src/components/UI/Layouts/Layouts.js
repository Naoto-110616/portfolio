import classes from "./Layouts.module.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import BurgerMenu from "./Header/burgerMenu/BurgerMenu";
import MediaQuery from "react-responsive";

const Layouts = (props) => {
	return (
		<>
			<MediaQuery query="(max-width: 767px)">
				<BurgerMenu />
			</MediaQuery>
			<Header />
			<main className={classes.main}>{props.children}</main>
			<Footer />
		</>
	);
};

export default Layouts;
