import React from "react";
import styles from "./Searchbar.module.css";

class Searchbar extends React.Component {
  state = {
    searchWord: "",
  };

  inputChangeHandler = (evt) => {
    this.setState({ searchWord: evt.target.value });
  };

  formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.props.onSubmit(this.state.searchWord);
    this.reset();
  };

  reset = () => {
    this.setState({ searchWord: "" });
  };

  render() {
    return (
      <>
        <header className={styles.Searchbar}>
          <form className={styles.SearchForm} onSubmit={this.formSubmitHandler}>
            <button type="submit" className={styles.SearchFormButton}>
              <span className={styles.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              onChange={this.inputChangeHandler}
              className={styles.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.searchWord}
            />
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;
