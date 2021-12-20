import classes from "./Item.module.css";

const Item = (props) => {
	return (
		<div className={classes["item-wrap"]}>
			<i className={`${props.iconClassName} ${classes["item-icon"]}`}></i>
			<p className={classes["item-name"]}>{props.title}</p>
			<span className={classes.rate}>{props.rate}</span>
		</div>
	);
};

export default Item;
