import React from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem";
import Button from "./components/Button";
import Modal from "./components/Modal";
import api from "./servises/api";
import styles from "./components/ImageGalleryItem/ImageGalleryItem.module.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class App extends React.Component {
  state = {
    pictures: [],
    request: "",
    currentPage: 1,
    largeImageURL: "",
    isModalOpen: false,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.request !== this.state.request) {
      this.fatchPictures();
    }
    window.scrollTo({
      top: document.getElementById("gal").scrollHeight,
      behavior: "smooth",
    });
  }

  onChangeRequest = (query) => {
    this.setState({
      pictures: [],
      request: query,
      currentPage: 1,
      error: null,
    });
  };

  fatchPictures = () => {
    const { request, currentPage } = this.state;
    const option = { request, currentPage };

    this.setState({ isLoading: true });

    api
      .fatchPictures(option)
      .then((picturesArr) =>
        this.setState((prevState) => ({
          pictures: [...prevState.pictures, ...picturesArr],
          currentPage: prevState.currentPage + 1,
        }))
      )
      .catch((error) => this.setState({ error: error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onPictureClick = (url) => {
    this.setState({ largeImageURL: url });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { pictures, isLoading, largeImageURL, isModalOpen } = this.state;
    const shouldRenderLoadMoreButton = pictures.length > 0 && !isLoading;
    return (
      <>
        <Searchbar onSubmit={this.onChangeRequest}></Searchbar>

        <ImageGallery>
          {pictures.map(({ id, webformatURL, largeImageURL }) => (
            <li
              key={id}
              onClick={() => this.onPictureClick(largeImageURL)}
              className={styles.ImageGalleryItem}
            >
              <ImageGalleryItem srcWebformat={webformatURL} />
            </li>
          ))}
        </ImageGallery>
        {isModalOpen && (
          <Modal toggleModal={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        )}
        {shouldRenderLoadMoreButton && <Button onClick={this.fatchPictures} />}
      </>
    );
  }
}

export default App;
