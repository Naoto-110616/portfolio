import classes from "./HeaderNav.module.css";
import HeaderNavButton from "./HeaderNavButton";
import { OFFSET_WORK_LOG, OFFSET_TOOL_SET } from "../../../../../util/consts";
import MediaQuery from "react-responsive";

const HeaderNav = () => {
  return (
    <nav>
      <MediaQuery query="(min-width:768px)">
        <ul className={classes["item-list"]}>
          <HeaderNavButton
            navItem={"Work Log"}
            href={"#worklog"}
            offset={OFFSET_WORK_LOG}
          />
          <HeaderNavButton
            navItem={"Toolset"}
            href={"#toolset"}
            offset={OFFSET_TOOL_SET}
          />
          <HeaderNavButton navItem={"Side Projects"} href={"#side-projects"} />
        </ul>
      </MediaQuery>
      <MediaQuery query="(max-width:767px)">
		  
	  </MediaQuery>
    </nav>
  );
};
export default HeaderNav;
