import classes from "./Layouts.module.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layouts = (props) => {
	return (
		<>
			<Header />
			<main className={classes.main}>{props.children}</main>
			<Footer />
		</>
	);
};

export default Layouts;
