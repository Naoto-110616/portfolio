import classes from "./BurgerMenu";
import { fallDown as Menu } from "react-burger-menu";
import AnchorLink from "react-anchor-link-smooth-scroll";

const BurderMenu = () => {
  return (
    <Menu right>
      <AnchorLink>test</AnchorLink>
      <AnchorLink>test2</AnchorLink>
      <AnchorLink>test3</AnchorLink>
    </Menu>
  );
};

export default BurderMenu;
