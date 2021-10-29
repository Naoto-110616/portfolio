import SectionTitle from "../sectionTitle/SectionTitle";
import classes from "./SideProjects.module.css";
import SideProjectsItem from "./sideProjectsItem/SideProjectsItem";
import { REACT } from "../../util/consts";
const PROJECTS = [
	{
		id: 1,
		title: "DAMMY APP",
		descrioption: "DAMMY APP",
		skills: [REACT],
		githubUrl: "https:dammy.com",
		demoUrl: "https://demo.com",
		personal: true,
	},
	{
		id: 1,
		title: "DAMMY APP",
		descrioption: "DAMMY APP",
		skills: [REACT],
		githubUrl: "https:dammy.com",
		demoUrl: "https://demo.com",
		personal: true,
	},
];

const SideProjects = () => {
	const sideProject = PROJECTS.map((projects) => (
		<SideProjectsItem key={projects.id} data={projects} />
	));
	return (
		<section id="side-projects" className={classes["side-propjects"]}>
			<SectionTitle title={"Side Projects"} />
			<div className={classes["side-projects_list"]}>{sideProject}</div>
		</section>
	);
};
export default SideProjects;
