import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import React from "react";

const modalRoot = document.getElementById("modal-root");
class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener("keydown", this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.hendleKeyDown);
  }

  hendleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.toggleModal();
    }
  };

  hendleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div onClick={this.hendleBackdropClick} className={styles.Overlay}>
        <div className={styles.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
