/* eslint-disable react/prop-types */
import { useState } from "react";
import PreviewSlide from "./PreviewSlide";
import addDocument from "../../firebase/addDocument";
import uploadFileProgress from "../../firebase/uploadFileProgress";

// eslint-disable-next-line react/prop-types
function UploadImages({ user }) {
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState({});

  // Handling the title, and description for the current user-selected image and save as an obj.
  const inputHandler = (e) => {
    const { id, value } = e.target;

    setImageData((prev) => {
      return { ...prev, [id]: value };
    });
  };

  // Grab current user-selected image and add into imageData.
  const imageHandler = (e) => {
    const newImg = e.target.files[0];
    setImageData((prev) => {
      return { ...prev, imgUrl: newImg };
    });
  };

  // push the current image with title, description and url into images array for preview and update to firestore.
  const submitHandler = (e) => {
    e.preventDefault();
    if (!imageData.title || !imageData.description || !imageData.imgUrl) {
      console.log("wrong info");
      return;
    }
    setImages((prev) => {
      return [...prev, imageData];
    });
    setImageData({});
    e.target.reset();
  };

  // upload to the firestore.
  const uploadHandler = (e) => {
    e.preventDefault();
    // wait till all the images uploaded into firebase store and return all urls within single attempt.
    Promise.all(
      images.map(async (image) => {
        const imageName = new Date().getTime() + image.title;
        const url = await uploadFileProgress(
          image.imgUrl,
          `gallery/${user.uid}`,
          imageName,
          setProgress
        );
        return { ...image, imgUrl: url };
      })
    )
      .then(async (data) => {
        const galleryDoc = {
          ...user,
          images: data,
        };
        await addDocument("gallery", galleryDoc, user.uid);
        console.log(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          id="title"
          placeholder="title"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="description"
          id="description"
          onChange={inputHandler}
        />
        <input
          type="file"
          id="imageURL"
          accept="image/png, image/jpeg"
          onChange={imageHandler}
        />
        <button type="submit">Add to preview</button>
      </form>

      {imageData.imgUrl && (
        <div>
          <img src={URL.createObjectURL(imageData.imgUrl)} alt="" />
        </div>
      )}

      <PreviewSlide images={images} />

      <button type="submit" onClick={uploadHandler}>
        Upload
      </button>
    </div>
  );
}

export default UploadImages;
