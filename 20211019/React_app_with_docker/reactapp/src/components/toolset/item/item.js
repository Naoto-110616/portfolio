import classes from "./Item.module.css";

const Item = (props) => {
  return (
    <div className={classes["item-wrap"]}>
      <i className={`${props.data.iconClassName} ${classes["item-icon"]}`}></i>
      <p className={classes["item-name"]}>{props.data.title}</p>
      <span className={classes.rate}>{props.data.rate}</span>
    </div>
  );
};

export default Item;
