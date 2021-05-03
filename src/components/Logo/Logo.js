import React from "react";

import BurgerLogo from "../../assets/images/burger-logo.png";

import classes from "./Logo.css";

const Logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={BurgerLogo} alt="Burger Booking Logo" />
  </div>
);

export default Logo;
