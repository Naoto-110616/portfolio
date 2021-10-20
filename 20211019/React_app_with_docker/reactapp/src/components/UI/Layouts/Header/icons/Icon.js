import classes from "./Icon.module.css";

const Icon = (props) => {
	return (
		<div className={classes["icon-wrapper"]}>
			<a href={props.href} target="_brank" rel="noreferrer">
				<i className={`${props.iconStyle} ${classes.icon}`}></i>
			</a>
		</div>
	);
};

export default Icon;
