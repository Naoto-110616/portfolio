import AnchorLink from "react-anchor-link-smooth-scroll";
const BurgerNav = (props) => {
	return (
		<AnchorLink
			id={props.id}
			key={props.id}
			onClick={props.onClick}
			href={props.href}
			offset={props.offset}
		>
			<div>{props.children}</div>
		</AnchorLink>
	);
};

export default BurgerNav;
