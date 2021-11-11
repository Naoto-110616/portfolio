import AnchorLink from "react-anchor-link-smooth-scroll";
const BurgerNav = (props) => {
  return (
    <div>
      <AnchorLink
        id={props.id}
        key={props.id}
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
