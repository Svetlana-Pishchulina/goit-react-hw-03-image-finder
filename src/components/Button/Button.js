import React from "react";
import styles from "./Button.module.css";

class Button extends React.Component {
  buttonLoadMoreHandler = () => {
    this.props.onClick();
  };

  render() {
    return (
      <button
        className={styles.Button}
        type="button"
        onClick={this.buttonLoadMoreHandler}
      >
        Load more
      </button>
    );
  }
}
export default Button;
