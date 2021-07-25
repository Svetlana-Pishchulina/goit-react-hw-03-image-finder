import styles from "./ImageGalleryItem.module.css";
const ImageGalleryItem = ({ pictureId, srcWebformat }) => {
  return (
    <li key={pictureId} className={styles.ImageGalleryItem}>
      <img src={srcWebformat} alt="" className={styles.ImageGalleryItemImage} />
    </li>
  );
};
export default ImageGalleryItem;
