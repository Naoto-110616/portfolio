import classes from "./WorkLog.module.css";
import SectionTitle from "../sectionTitle/SectionTitle";
import WorkCard from "./workCard/WorkCard";
import {
	HTML5,
	CSS3,
	HTML_CODER,
	JAVA_SCRIPT,
	OSAKA_JAPAN,
	PHP,
	CODING,
	J_QUERY,
	GIT,
	GITLAB,
	DOCKER,
	WORDPRESS,
	MY_SQL,
} from "../../util/consts";
const DATA_LIST = [
	{
		id: "1",
		companyName: "ideaimage Co.Ltd.",
		companyBusiness: "Homepage update",
		jobTitle: HTML_CODER,
		term: "May 2021 - Present",
		place: OSAKA_JAPAN,
		tasks: ["Create web pages", CODING],
		using: [
			JAVA_SCRIPT,
			HTML5,
			CSS3,
			J_QUERY,
			PHP,
			WORDPRESS,
			DOCKER,
			GIT,
			GITLAB,
			MY_SQL,
		],
	},
];

const WorkLog = () => {
	const workCard = DATA_LIST.map((data) => (
		<WorkCard key={data.id} data={data} />
	));
	return (
		<section id="workLog" className={classes["workLog-section"]}>
			<SectionTitle title="Work Log" className={classes.title} />
			<div className={classes["workLog-cards"]}>{workCard}</div>
		</section>
	);
};
export default WorkLog;
