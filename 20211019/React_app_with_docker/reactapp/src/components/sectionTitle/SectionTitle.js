import classes from "./SectionTitle.module.css";

const sectionTitle = (props) => {
	return (
		<h2
			id={props.id}
			className={`${classes["section-title"]} ${props.className}`}
		>
			{props.title}
		</h2>
	);
};
export default sectionTitle;
