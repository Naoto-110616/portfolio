import classes from "./HeaderNav.module.css";
import HeaderNavButton from "./HeaderNavButton";
import {
  OFFSET_WORK_LOG,
  OFFSET_TOOL_SET,
  OFFSET_SIDE_PROJECTS,
} from "../../../../../util/consts";

const HeaderNav = () => {
  const HEADER_NAV = [
    {
      id: "worklog",
      navItem: "Work Log",
      href: "#worklog",
      offset: OFFSET_WORK_LOG,
    },
    {
      id: "toolset",
      navItem: "Toolset",
      href: "#toolset",
      offset: OFFSET_TOOL_SET,
    },
    {
      id: "side-projects",
      navItem: "Side Projects",
      href: "#side-projects",
      offset: OFFSET_SIDE_PROJECTS,
    },
  ];
  const headerNav = HEADER_NAV.map((data) => {
    return (
      <HeaderNavButton
        id={data.id}
        key={data.id}
        navItem={data.navItem}
        href={data.href}
        offset={data.offset}
      ></HeaderNavButton>
    );
  });

  return (
    <nav>
      <ul className={classes["item-list"]}>{headerNav}</ul>
    </nav>
  );
};
export default HeaderNav;
