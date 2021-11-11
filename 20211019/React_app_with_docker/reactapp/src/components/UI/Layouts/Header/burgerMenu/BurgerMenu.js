import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import BurgerNav from "./BurgerNav";
import {
	OFFSET_WORK_LOG,
	OFFSET_TOOL_SET,
	OFFSET_SIDE_PROJECTS,
} from "../../../../../util/consts";

const BurderMenu = () => {
	const [isOpen, setOpen] = useState(false);
	const handleIsOpen = () => {
		setOpen(!isOpen);
	};
	const closeSideBar = () => {
		setOpen(false);
	};
	return (
		<Menu right isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>
			<BurgerNav
				closeSideBar={closeSideBar}
				href={"#worklog"}
				offset={OFFSET_WORK_LOG}
			>
				Work Log
			</BurgerNav>
			<BurgerNav
				closeSideBar={closeSideBar}
				href={"#toolset"}
				offset={OFFSET_TOOL_SET}
			>
				Toolset
			</BurgerNav>
			<BurgerNav
				closeSideBar={closeSideBar}
				href={"#side-projects"}
				offset={OFFSET_SIDE_PROJECTS}
			>
				Side Projects
			</BurgerNav>
		</Menu>
	);
};

export default BurderMenu;
