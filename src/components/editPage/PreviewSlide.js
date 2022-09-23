import { useDispatch } from "react-redux";
import { galleryActions } from "../../store/gallery-slice";

function PreviewSlide({ images, setDeletedItem, onImages }) {
  const dispatch = useDispatch();

  const removeItem = async (image) => {
    // Now the image is deleted only in the gallery store, and the data still remains in Firebase. Only when "Save as draft" or "" is clicked, the data is finally erased and updated with new data.
    const { id, imgUrl } = image;
    // Save deleted image info separately due to check if the deleted image is current data or draft data. That info will be used when the final update occurs by clicking save as draft or post gallery.
    setDeletedItem((prev) => {
      return [...prev, { id, imgUrl }];
    });
    // deleting the image data from gallery redux store.
    dispatch(galleryActions.removeImage(id));
    // Deleting the file that stored in regular state for upload to firebase.
    onImages((prev) => {
      return prev.filter((image) => image.id !== id);
    });
  };
  return (
    <ul className="flex border border-black">
      {
        // eslint-disable-next-line react/prop-types
        images.map((image) => (
          <li key={image.id} className="w-[200px] h-[200px] ml-2">
            <img src={image.imgUrl} alt="" />
            <button type="button" onClick={removeItem.bind(this, image)}>
              X
            </button>
          </li>
        ))
      }
    </ul>
  );
}

export default PreviewSlide;
