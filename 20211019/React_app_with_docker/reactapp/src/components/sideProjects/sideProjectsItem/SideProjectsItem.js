import classes from "./SideProjectsItem.module.css";

const SideProjectsItem = (props) => {
	const skills = props.data.skills.map((skill) => (
		<div
			key={`${props.data.id}${skill}`}
			className={classes["projects-skills"]}
		>
			{skill}
		</div>
	));
	let gitHubUrl = "";
	if (props.data.gitHubUrl) {
		gitHubUrl = (
			<a href={props.data.gitHubUrl} target="_brank" rel="noopener noreferrer">
				<i className={`fab fa-github ${classes["github-icon"]}`}></i>
			</a>
		);
	}
	let demoUrl = "";
	if (props.data.demoUrl) {
		demoUrl = (
			<a href={props.data.demoUrl} target="_brank" rel="noopener noreferrer">
				<i className={`fas fa-search ${classes["github-icon"]}`}></i>
			</a>
		);
	}
	return (
		<div className={classes.sideProjectsItem}>
			<div className={classes["icon-wrap"]}>
				<i className={`${props.data.iconClasses}`}></i>
			</div>
			<p className={classes["projects-type"]}>
				{props.data.personal ? "Personal" : "Group"}
			</p>
			<div className={classes["projects-detail"]}>
				<h2 className={classes["projects-title"]}>{props.data.title}</h2>
				<p className={classes["projects-description"]}>
					{props.data.description}
				</p>
				<div className={classes["projects-using_skills"]}>{skills}</div>
			</div>
			{(props.data.gitHubUrl || props.data.demoUrl) && (
				<div className={classes["projects-links"]}>
					{gitHubUrl}
					{demoUrl}
				</div>
			)}
		</div>
	);
};

export default SideProjectsItem;
