import AnchorLink from "react-anchor-link-smooth-scroll";
const BurgerNav = (props) => {
  return (
    <div>
      <AnchorLink
        onClick={props.onClick}
        href={props.href}
        offset={props.offset}
      >
        {props.children}
      </AnchorLink>
    </div>
  );
};

export default BurgerNav;
