import { useState } from "react";
import { fallDown as Menu } from "react-burger-menu";
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
  const BURGERNAV = [
    {
      id: "workLog",
      name: "Work Log",
      handler: closeSideBar,
      href: "#worklog",
      offset: OFFSET_WORK_LOG,
    },
    {
      id: "toolset",
      name: "Toolset",
      handler: closeSideBar,
      href: "#toolset",
      offset: OFFSET_TOOL_SET,
    },
    {
      id: "side-projects",
      name: "Side Projects",
      handler: closeSideBar,
      href: "#side-projects",
      offset: OFFSET_SIDE_PROJECTS,
    },
  ];
  const burgerNav = BURGERNAV.map((data) => {
    return (
      <BurgerNav
        id={data.id}
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

export default BurderMenu;
