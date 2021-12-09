import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import BurgerNav from "./BurgerNav";
import {
	OFFSET_WORK_LOG,
	OFFSET_TOOL_SET,
	OFFSET_SIDE_PROJECTS,
} from "../../../../../util/consts";

const BurgerMenu = () => {
	const [isOpen, setOpen] = useState(false);
	const handleIsOpen = () => {
		setOpen(!isOpen);
	};
	const closeSideBar = () => {
		setOpen(false);
	};
	const BURGER_NAV = [
		{
			id: "burger_workLog",
			name: "Work Log",
			handler: closeSideBar,
			href: "#workLog",
			offset: OFFSET_WORK_LOG,
		},
		{
			id: "burger_toolSet",
			name: "ToolSet",
			handler: closeSideBar,
			href: "#toolSet",
			offset: OFFSET_TOOL_SET,
		},
		{
			id: "burger_side-projects",
			name: "Side Projects",
			handler: closeSideBar,
			href: "#side-projects",
			offset: OFFSET_SIDE_PROJECTS,
		},
	];
	const burgerNav = BURGER_NAV.map((data) => {
		return (
			<BurgerNav
				id={data.id}
				key={data.id}
				onClick={data.handler}
				href={data.href}
				offset={data.offset}
			>
				{data.name}
			</BurgerNav>
		);
	});
	return (
		<Menu right isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>
			{burgerNav}
		</Menu>
	);
};

export default BurgerMenu;
