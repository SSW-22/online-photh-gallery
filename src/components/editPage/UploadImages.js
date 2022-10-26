/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */

import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { ImCancelCircle } from "react-icons/im";
import uuid from "react-uuid";
import { galleryActions } from "../../store/gallery-slice";
import PreviewSlide from "./PreviewSlide";
import getCroppedImg from "../crop/cropimage";
import Crop from "../crop/Crop";
import ModeSelector from "./ModeSelector";

function UploadImages({ setImageFiles, setDeletedItem, previewHandler }) {
  const dispatch = useDispatch();
  const [imageData, setImageData] = useState({
    title: "",
    date: "",
    description: "",
    imgUrl: "",
    id: uuid(),
  });
  const [selected, setSelected] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const currentImages = useSelector((state) => state.gallery.gallery.images);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      if (typeof imageData.imgUrl === "object") {
        const { file, url } = await getCroppedImg(
          URL.createObjectURL(imageData.imgUrl),
          croppedAreaPixels
        );
        // Save selected image files to seperate state since redux can not store non-serializable value which is image file.
        setImageFiles((prev) => {
          return [...prev, { ...imageData, imgUrl: file }];
        });

        dispatch(
          galleryActions.addImage({
            ...imageData,
            imgUrl: url,
          })
        );
      } else {
        dispatch(galleryActions.addImage(imageData));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Handling the title, and description for the current user-selected image and save as an obj.
  const inputHandler = (e) => {
    const { id, value } = e.target;

    setImageData((prev) => {
      return { ...prev, [id]: value };
    });
  };

  // Grab current user-selected image and add into imageData.
  const onDrop = useCallback((acceptedFiles) => {
    const newImg = acceptedFiles[0];
    setImageData((prev) => {
      // return { ...prev, imgUrl: newImg, id: uuid() };
      return { ...prev, imgUrl: newImg };
    });
  }, []);

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    maxFiles: 1,
    disabled: !!(
      currentImages.length >= 10 && selected.length === 0
    ) /** If the user try to upload more than 10, it will prohibit to upload input. */,
  });

  /** Update current image with data into redux. This function only update redux stroe. */
  const submitHandler = (e) => {
    e.preventDefault();
    if (!imageData.title || !imageData.imgUrl) {
      console.log("wrong info");
      setErrorInput(true);
      return;
    }
    console.log(selected);
    cropImage();
    setSelected("");
    setImageData({
      title: "",
      date: "",
      description: "",
      imgUrl: "",
      id: uuid(),
    });
    console.log(selected);
    setErrorInput(false);
    e.target.reset();
  };

  const addNewPic = (e) => {
    e.preventDefault();
    // Reset current selected image
    setSelected("");
    setImageData({
      title: "",
      date: "",
      description: "",
      imgUrl: "",
      id: uuid(),
    });
  };

  return (
    <div className="container mx-auto h-full font-['average'] border border-black">
      <p>Maximum 10 photos per event are supported</p>
      <div className="flex mt-5 flex-col items-center justify-center md:flex-row md:justify-start">
        <div className="w-[300px] h-[300px] bg-[#D9D9D9] flex flex-col justify-center items-center relative">
          {imageData.imgUrl && (
            <button
              className="absolute top-0 right-0 m-[1rem] z-[99]"
              type="button"
              onClick={() => {
                setImageData((prev) => {
                  return { ...prev, imgUrl: "" };
                });
              }}
            >
              <ImCancelCircle />
            </button>
          )}
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {!imageData.imgUrl && (
              <>
                <p className="cursor-pointer">
                  Drop your image here, or{" "}
                  <span className="text-[#007BED]">browse</span>
                </p>
                <p>Support jpeg, jpg, png</p>
                {currentImages.length >= 10 && !selected && (
                  <p className="text-red-500 mt-5">
                    All available space has been fulfilled. <br /> 10 / 10{" "}
                  </p>
                )}
                {/* <p>Only 1 file is the <br /> maximum number of files<br />you can drop here.</p> */}
              </>
            )}
          </div>
          {imageData.imgUrl && (
            <Crop imgUrl={imageData.imgUrl} onCropComplete={onCropComplete} />
          )}
        </div>
        {fileRejections[0]?.file && (
          <p className="text-red-500">
            {fileRejections[0].errors[0].code === "too-many-files" &&
              "Please select one file in each"}
            {/* Only *.jpeg and *.png images will be accepted */}
          </p>
        )}

        {errorInput && imageData.imgUrl.length <= 0 && (
          <p className="text-red-500">Please select the image</p>
        )}
        <form
          onSubmit={submitHandler}
          className="w-[300px] flex flex-col mt-[1rem] md:ml-[2rem] md:mt-0"
        >
          <label htmlFor="title" className="flex flex-col h-[70px]">
            Image title
            <input
              className={`border-b focus:outline-none font-['average']
              ${
                errorInput && imageData.title.length <= 0
                  ? "border-red-500"
                  : "border-black"
              }`}
              id="title"
              type="text"
              value={imageData.title}
              onChange={inputHandler}
            />
            {errorInput && imageData.title.length <= 0 && (
              <p className="text-red-500">Please fill out this field</p>
            )}
          </label>
          <label htmlFor="date" className="flex flex-col h-[70px]">
            Date
            <input
              className="border-b border-black font-['average']"
              type="date"
              id="date"
              value={imageData.date}
              onChange={inputHandler}
            />
          </label>
          <label htmlFor="description" className="flex flex-col">
            Description
            <textarea
              className="border border-black resize-none focus:outline-none font-['average'] h-[90px]"
              id="description"
              value={imageData.description}
              onChange={inputHandler}
            />
          </label>

          <button
            className="rounded-[5px] mt-[1rem] bg-[#D9D9D9] self-end px-4 py-2 hover:bg-black hover:text-[#ffffff] duration-[500ms] font-['average']"
            type="submit"
          >
            {selected ? "Edit" : "Add to preview"}
          </button>
          {/* <button type="button" onClick={cancelHandler}>
            Cancel
          </button> */}
        </form>
      </div>

      <div className="flex justify-between mt-[2rem]">
        <div className="flex mb-[1rem] items-center">
          <p>Choose your theme: </p>
          <ModeSelector />
        </div>
        <button
          className="rounded-[5px] mb-[1rem] bg-[#D9D9D9] self-end px-4 py-2 hover:bg-black hover:text-[#ffffff] duration-[500ms] font-['average']"
          type="button"
          onClick={previewHandler}
        >
          View in gallery Mode
        </button>
      </div>
      <PreviewSlide
        setDeletedItem={setDeletedItem}
        setImageFiles={setImageFiles}
        setImageData={setImageData}
        addNewPic={addNewPic}
        setSelected={setSelected}
        selected={selected}
        getInputProps={getInputProps}
        getRootProps={getRootProps}
      />
    </div>
  );
}

export default UploadImages;
