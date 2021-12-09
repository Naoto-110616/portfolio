import classes from "./ToolSet.module.css";
import SectionTItle from "../sectionTitle/SectionTitle";
import Item from "./item/Item";
import {
	HTML5,
	CSS3,
	SASS,
	JAVA_SCRIPT,
	J_QUERY,
	REACT,
	PHP,
	GULP,
	GIT,
	GITLAB,
	GITHUB,
	DOCKER,
	WORDPRESS,
	MY_SQL,
	FIREBASE,
	WEBPACK,
	NPM,
	NODE,
} from "../../util/consts";
const FRONT_DATA = [
	{
		title: REACT,
		iconClassName: "fab fa-react",
		rate: "☆☆☆",
	},
	{
		title: JAVA_SCRIPT,
		iconClassName: "fab fa-js-square",
		rate: "☆☆☆",
	},
	{
		title: J_QUERY,
		iconClassName: "fab fa-js",
		rate: "☆☆",
	},
	{
		title: HTML5,
		iconClassName: "fab fa-html5",
		rate: "☆☆☆☆☆",
	},
	{
		title: CSS3,
		iconClassName: "fab fa-css3-alt",
		rate: "☆☆☆☆☆",
	},
	{
		title: SASS,
		iconClassName: "fab fa-sass",
		rate: "☆☆☆☆☆",
	},
];
const BACK_DATA = [
	{
		title: NODE,
		iconClassName: "fab fa-node",
		rate: "☆",
	},
	{
		title: PHP,
		iconClassName: "fab fa-php",
		rate: "☆☆☆",
	},
	{
		title: MY_SQL,
		iconClassName: "fas fa-server",
		rate: "☆☆",
	},
	{
		title: FIREBASE,
		iconClassName: "fas fa-server",
		rate: "☆☆",
	},
];
const TOOLS = [
	{
		title: WORDPRESS,
		iconClassName: "fab fa-wordpress",
		rate: "☆☆☆",
	},
	{
		title: DOCKER,
		iconClassName: "fab fa-docker",
		rate: "☆☆",
	},
	{
		title: GULP,
		iconClassName: "fab fa-gulp",
		rate: "☆☆",
	},
	{
		title: WEBPACK,
		iconClassName: "fas fa-cube",
		rate: "☆☆",
	},
	{
		title: NPM,
		iconClassName: "fab fa-npm",
		rate: "☆☆",
	},
	{
		title: GIT,
		iconClassName: "fab fa-git-alt",
		rate: "☆☆☆",
	},
	{
		title: GITHUB,
		iconClassName: "fab fa-github",
		rate: "☆☆☆",
	},
	{
		title: GITLAB,
		iconClassName: "fab fa-gitlab",
		rate: "☆☆",
	},
];
const ToolSet = () => {
	const frontItems = FRONT_DATA.map((data) => (
		<Item key={data.title} data={data} />
	));
	const backItems = BACK_DATA.map((data) => (
		<Item key={data.title} data={data} />
	));
	const tools = TOOLS.map((data) => <Item key={data.title} data={data} />);
	return (
		<section id="toolSet" className={classes["toolSet-wrap"]}>
			<SectionTItle title={"ToolSet"} />
			<h3>Frontend</h3>
			<div className={classes["toolSet-item"]}>{frontItems}</div>
			<h3>Backend</h3>
			<div className={classes["toolSet-item"]}>{backItems}</div>
			<h3>Tools</h3>
			<div className={classes["toolSet-item"]}>{tools}</div>
		</section>
	);
};
export default ToolSet;
