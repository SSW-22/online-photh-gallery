/* eslint-disable prettier/prettier */
import uuid from "react-uuid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { galleryActions } from "../../store/gallery-slice";
import PreviewSlide from "./PreviewSlide";

function UploadImages({ setImageFiles, setDeletedItem }) {
  const dispatch = useDispatch();
  const [imageData, setImageData] = useState({
    title: "",
    date: "",
    description: "",
    imgUrl: "",
  });
  const [errorInput, setErrorInput] = useState(false);

  /**  Handling the title, and description for the current user-selected image and save as an obj. */
  const inputHandler = (e) => {
    const { id, value } = e.target;

    setImageData((prev) => {
      return { ...prev, [id]: value };
    });
  };

  /** Grab current user-selected image and add into imageData. */
  const imageHandler = (e) => {
    const newImg = e.target.files[0];
    setImageData((prev) => {
      return { ...prev, imgUrl: newImg, id: uuid() };
    });
  };

  /** Update user image info into gallery redux. Those data will be updated to the firestore later */
  const submitHandler = (e) => {
    e.preventDefault();
    if (!imageData.title || !imageData.imgUrl) {
      console.log("wrong info");
      setErrorInput(true);
      return;
    }
    // Save selected image files to seperate state since redux can not store non-serializable value which is image file.
    setImageFiles((prev) => {
      return [...prev, imageData];
    });
    // update user gallery info with fake image url to gallery redux store due to display preview images.
    dispatch(
      galleryActions.addImage({
        ...imageData,
        imgUrl: URL.createObjectURL(imageData.imgUrl),
      })
    );
    // reset image data and error input handler
    setImageData({
      title: "",
      date: "",
      description: "",
    });
    setErrorInput(false);
    e.target.reset();
  };

  return (
    <div className="container mx-auto h-full font-['average']">
      <p>Maximum 10 photos per event is supported</p>
      <div className="flex mt-5">
        <div className="w-[250px] h-[250px] bg-[#D9D9D9] flex flex-col justify-center items-center">
          {!imageData.imgUrl && (
            <>
              <p>
                Drop your image here, or{" "}
                <span className="text-[#007BED]">browse</span>
              </p>
              <p>Support jpeg, jpg, png</p>
            </>
          )}
          {imageData.imgUrl && (
            <img src={URL.createObjectURL(imageData.imgUrl)} alt="" />
          )}

          {errorInput && imageData.imgUrl.length <= 0 && (
            <p className="text-red-500">Please select the image</p>
          )}
        </div>
        <form onSubmit={submitHandler} className="flex flex-col ml-[2.5rem]">
          <label htmlFor="title" className="flex flex-col h-[70px]">
            Title
            <input
              className={`border-b 
              ${
                errorInput && imageData.title.length <= 0
                  ? "border-red-500"
                  : "border-black"
              }`}
              id="title"
              type="text"
              placeholder="My Youth..."
              onChange={inputHandler}
            />
            {errorInput && imageData.title.length <= 0 && (
              <p className="text-red-500">Please fill out this field</p>
            )}
          </label>
          <label htmlFor="date" className="flex flex-col h-[70px]">
            Date (YYYY.MM.DD)
            <input
              className="border-b border-black"
              type="date"
              id="date"
              onChange={inputHandler}
            />
          </label>
          <label htmlFor="description" className="flex flex-col">
            Description
            <textarea
              className="border border-black resize-none"
              placeholder="description"
              id="description"
              onChange={inputHandler}
            />
          </label>
          <input
            type="file"
            id="imageURL"
            accept="image/png, image/jpeg"
            onChange={imageHandler}
          />
          <button type="submit">Add to preview</button>
        </form>
      </div>

      <div className="flex justify-between mt-20">
        <p>Choose your theme: </p>
        <button type="button">View in gallery Mode</button>
      </div>
      <PreviewSlide
        // images={data.images}
        setDeletedItem={setDeletedItem}
        setImageFiles={setImageFiles}
      />
    </div>
  );
}

export default UploadImages;
