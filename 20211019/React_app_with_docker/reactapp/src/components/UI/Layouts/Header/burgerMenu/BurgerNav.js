import AnchorLink from "react-anchor-link-smooth-scroll";
const BurgerNav = (props) => {
  return (
    <AnchorLink href={props.href} offset={props.offset}>
      {props.children}
    </AnchorLink>
  );
};

export default BurgerNav;
