import styles from "./ImageGallery.module.css";
const ImageGallery = ({ children }) => {
  return (
    <ul className={styles.ImageGallery} id="gal">
      {children}
    </ul>
  );
};

export default ImageGallery;
