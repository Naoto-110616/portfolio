import classes from "./ToolSet.module.css";
import SectionTItle from "../sectionTitle/SectionTitle";
import Item from "./item/item";
import {
	HTML5,
	CSS3,
	JAVA_SCRIPT,
	J_QUERY,
	REACT,
	PHP,
	GIT,
	GITLAB,
	GITHUB,
	DOCKER,
	WORDPRESS,
	MY_SQL,
} from "../../util/consts";
const FRONT_DATA = [
	{
		title: REACT,
		iconClassName: "fab fa-react",
		rate: "☆☆",
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
];
const BACK_DATA = [
	{
		title: PHP,
		iconClassName: "fab fa-php",
		rate: "☆☆☆",
	},
	{
		title: MY_SQL,
		iconClassName: "fas fa-database",
		rate: "☆☆",
	},
];
const CMS_DATA = [
	{
		title: WORDPRESS,
		iconClassName: "fab fa-wordpress",
		rate: "☆☆☆",
	},
];
const INFRA_DATA = [
	{
		title: DOCKER,
		iconClassName: "fab fa-docker",
		rate: "☆☆",
	},
	{
		title: GIT,
		iconClassName: "fab fa-git-alt",
		rate: "☆☆☆",
	},
	{
		title: GITHUB,
		iconClassName: "fab fa-github-square",
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
	const cmsItems = CMS_DATA.map((data) => (
		<Item key={data.title} data={data} />
	));
	const infraItems = INFRA_DATA.map((data) => (
		<Item key={data.title} data={data} />
	));
	return (
		<section id="toolset" className={classes["toolset-wrap"]}>
			<SectionTItle title={"Toolset"} />
			<h3>Frontend</h3>
			<div className={classes["toolset-item"]}>{frontItems}</div>
			<h3>Backend</h3>
			<div className={classes["toolset-item"]}>{backItems}</div>
			<h3>CMS</h3>
			<div className={classes["toolset-item"]}>{cmsItems}</div>
			<h3>Infrastructure</h3>
			<div className={classes["toolset-item"]}>{infraItems}</div>
		</section>
	);
};
export default ToolSet;
