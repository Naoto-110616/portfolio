import classes from "./SideProjectsItem.module.css";

const SideProjectsItem = () => {
	return (
		<div className={classes.sideProjectsItem}>
			<div className={classes["icon-wrap"]}>
				<i class="fas fa-question"></i>
			</div>
			<p className={classes["projects-type"]}>Personal</p>
			<div className={classes["projects-detail"]}>
				<h2 className={classes["projects-title"]}>DAMMY APP</h2>
				<p className={classes["projects-description"]}>DAMMY APP</p>
				<div className={classes["projects-using_skills"]}>
					<div>skills</div>
					<div>skills</div>
					<div>skills</div>
				</div>
			</div>
			<div className={classes["projects-links"]}>
				<a href="/#" target="_brank" rel="noopener noreferrer">
					Git Hub
				</a>
				<a href="/#" target="_brank" rel="noopener noreferrer">
					URL
				</a>
			</div>
		</div>
	);
};

export default SideProjectsItem;
