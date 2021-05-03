import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.css";

const animationTiming = {
  enter: 600,
  exit: 400,
};

const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={animationTiming}
        classNames={{
          enter: "",
          enterActive: classes.ModalOpen,
          exit: "",
          exitActive: classes.ModalClosed,
        }}
      >
        {<div className={classes.Modal}>{props.children}</div> || (
          <React.Fragment></React.Fragment>
        )}
      </CSSTransition>
    </React.Fragment>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children,
);
