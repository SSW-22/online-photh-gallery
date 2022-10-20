/* eslint-disable no-console */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Gallery from "./Gallery";
import arrowImg from "../asset/arrow.png";
import addDocument from "../firebase/addDocument";
import uploadFileProgress from "../firebase/uploadFileProgress";
import UploadThumbnail from "../components/editPage/UploadThumbnail";
import deleteFile from "../firebase/deleteImageFile";
import { checkGallery } from "../store/gallery-slice";
import { modalActions } from "../store/modalSlice";
import UploadImages from "../components/editPage/UploadImages";
import Submission from "../components/editPage/Submission";
import Modal from "../components/modal/Modal";
import useNumber from "../hooks/use-number";
import { navActions } from "../store/nav-slice";

const maxNumbErrorMsg =
  "Please note that our gallery can accomodate up to 36 events and currently we are at full capacity. You will only be able to host your event when slots become available.";

function Editor() {
  const FormHeaders = ["Create your event", "Upload photos", "Submission"];
  const [previewSlide, setPreviewSlide] = useState(false);
  const dispatch = useDispatch();
  const { uid, email } = useSelector((state) => state.auth);
  const galleryData = useSelector((state) => state.gallery.gallery);
  const modalData = useSelector((state) => state.modal);

  const numbGalleries = useNumber();
  // const numbGalleries = 36;

  const [deletedItem, setDeletedItem] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [page, setPage] = useState(0);

  const pageHandler = (e) => {
    if (e.target.alt === "next") setPage((prev) => prev + 1);
    if (e.target.alt === "previous") setPage((prev) => prev - 1);
  };

  /**  Create hash map for checking duplicate data and overwrite the map entries with current image array. */
  const updateData = (newData, status) => {
    const imagesHash = {};
    galleryData.images.forEach((item) => {
      imagesHash[item.id] = item;
    });
    newData.forEach((item) => {
      imagesHash[item.id] = item;
    });
    const results = Object.values(imagesHash);

    const galleryDoc = {
      ...galleryData,
      status,
      images: results,
    };

    return galleryDoc;
  };

  /**  Upload to the firestore. Until this button is "clicked", all data is not saved in Firebase, but only in Gallery Redux. */
  const uploadHandler = async (e) => {
    e.preventDefault();
    // ========
    // ERROR: need error handling that 10 images must be uploaded and checked contact info before hosting ==========.
    const status = e.target.id;
    if (status === "hosted" && numbGalleries > 35) {
      dispatch(modalActions.toggleModal(true));
      dispatch(modalActions.toggleSubmit(true));
      dispatch(modalActions.addModalTitle("Important"));
      dispatch(modalActions.addModalText(maxNumbErrorMsg));
      return;
    }

    // Since both, the draft image previously saved by the user and the newly added image is in one place which is gallery redux, only the previously saved draft images are deleted here. Newly added images (not updated to firebase yet) will be deleted from the Redux Store when the user clicks the delete button in preview slide section.
    if (deletedItem.length > 0) {
      console.log("deleting");
      // At this point, the data of image in gallery redux already deleted. Now the image has to be delete in firebase storage.
      deletedItem.forEach(async (item) => {
        // Check if the deleted image is in firebase storage by using image url address.
        const fbAddress = "https://firebasestorage.googleapis.com/";
        if (item.imgUrl.includes(fbAddress))
          await deleteFile(`gallery/${uid}/${item.id}`);
      });
    }
    // wait till all the images uploaded into firebase storage and return all urls within single attempt.
    if (imageFiles.length > 0) {
      try {
        const newData = await Promise.all(
          imageFiles.map(async (image) => {
            const imageName = image.id;
            const url = await uploadFileProgress(
              image.imgUrl,
              `gallery/${uid}`,
              imageName
              // setProgress
            );
            return { ...image, imgUrl: url };
          })
        );
        const galleryDoc = updateData(newData, status);
        // Now, new data will be updated
        await addDocument("gallery", galleryDoc, uid);
        // Reset the images file array and deletedItem array
        dispatch(checkGallery(uid));
        setImageFiles([]);
        setDeletedItem([]);
        console.log("uploaded with new pics");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      const galleryDoc = { ...galleryData, status };
      await addDocument("gallery", galleryDoc, uid);
      dispatch(checkGallery(uid));
      console.log("uploaded without new pics");
    }
  };

  const previewHandler = () => {
    setPreviewSlide((prev) => !prev);
    dispatch(navActions.toggleNav());
  };

  if (previewSlide) {
    return <Gallery previewData={galleryData} setClose={setPreviewSlide} />;
  }
  return (
    <main>
      <section className="max-w-[1000px] my-0 mx-auto flex flex-col font-['average'] relative">
        {modalData.isOpen && <Modal uploadHandler={uploadHandler} />}
        <h1 className="text-[3rem]">{FormHeaders[page]}</h1>
        {page === 0 && <UploadThumbnail />}
        {page === 1 && (
          <UploadImages
            setImageFiles={setImageFiles}
            setDeletedItem={setDeletedItem}
            previewHandler={previewHandler}
          />
        )}
        {page === 2 && <Submission userEmail={email} />}
        <div className="flex justify-end mt-2">
          <button
            id="draft"
            type="button"
            className="rounded-[5px] bg-[#D9D9D9] self-end px-4 py-2 hover:bg-black hover:text-[#ffffff] duration-[500ms] font-['average']"
            onClick={uploadHandler}
          >
            Save as a draft
          </button>
          {page === 2 && (
            <button
              id="hosted"
              type="button"
              className="rounded-[5px] bg-[#D9D9D9] self-end px-4 py-2 hover:bg-black hover:text-[#ffffff] duration-[500ms] ml-2 font-['average']"
              onClick={uploadHandler}
            >
              Submit
            </button>
          )}
        </div>
      </section>
      {page !== 2 && (
        <button
          className="absolute right-10 top-[50%] hover:animate-bounceRight"
          type="button"
          id="nextPage"
          disabled={page === FormHeaders.length - 1}
          onClick={pageHandler}
        >
          <span className="sr-only">next</span>
          <img className="w-[50px] h-[50px]" src={arrowImg} alt="next" />
        </button>
      )}

      {page !== 0 && (
        <button
          className="absolute left-10 top-[50%] hover:animate-bounceLeft"
          type="button"
          id="prevPage"
          disabled={page === 0}
          onClick={pageHandler}
        >
          <span className="sr-only">previous</span>
          <img
            className="w-[50px] h-[50px] rotate-180 "
            src={arrowImg}
            alt="previous"
          />
        </button>
      )}
    </main>
  );
}

export default Editor;
