import SectionTitle from "../sectionTitle/SectionTitle";
import classes from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={classes.section}>
      <SectionTitle title={"Welcome"} />
      <p className={classes.message}>
        Thank you for visiting my portfolio page!
      </p>
      <p className={classes.message}>
        I have 1 years experience in Web Development mainly as a frontend
        Engineer!
      </p>
    </div>
  );
};

export default Welcome;
