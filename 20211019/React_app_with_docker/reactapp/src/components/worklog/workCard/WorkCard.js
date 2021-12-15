import Card from "../../UI/Card/Card";
import classes from "./WorkCard.module.css";

const WorkCard = (props) => {
	const tasks = props.data.tasks.map((task) => (
		<div key={`${props.data.id}_${task}`} className={classes["card-skill"]}>
			{task}
		</div>
	));
	const using = props.data.using.map((using) => (
		<div key={`${props.data.id}_${using}`} className={classes["card-skill"]}>
			{using}
		</div>
	));
	return (
		<Card className={classes.workCard}>
			<div className={classes.workLog}>
				<h3>{props.data.companyName}</h3>
				<h4>{props.data.companyBusiness}</h4>
				<div>{props.data.jobTitle}</div>
				<div>{props.data.term}</div>
				<div>{props.data.place}</div>
			</div>
			<div className={classes.wasWork}>
				<div>Tasks</div>
				<div className={classes.wrap}>{tasks}</div>
				<div>Using</div>
				<div className={classes.wrap}>{using}</div>
			</div>
		</Card>
	);
};

export default WorkCard;
