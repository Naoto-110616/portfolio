import { fallDown as Menu } from "react-burger-menu";
import BurgerNav from "./BurgerNav";
import {
  OFFSET_WORK_LOG,
  OFFSET_TOOL_SET,
  OFFSET_SIDE_PROJECTS,
} from "../../../../../util/consts";

const BurderMenu = () => {
  return (
    <Menu right>
      <BurgerNav href={"#worklog"} offset={OFFSET_WORK_LOG}>
        Work Log
      </BurgerNav>
      <BurgerNav href={"#toolset"} offset={OFFSET_TOOL_SET}>
        Toolset
      </BurgerNav>
      <BurgerNav href={"#side-projects"} offset={OFFSET_SIDE_PROJECTS}>
        Side Projects
      </BurgerNav>
    </Menu>
  );
};

export default BurderMenu;
