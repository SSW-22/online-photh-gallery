/* eslint-disable no-console */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import Gallery from "./Gallery";
import addDocument from "../firebase/addDocument";
import uploadFileProgress from "../firebase/uploadFileProgress";
import UploadThumbnail from "../components/editPage/UploadThumbnail";
import deleteFile from "../firebase/deleteImageFile";
import { checkGallery } from "../store/gallery-slice";
import { modalActions } from "../store/modalSlice";
import { navActions } from "../store/nav-slice";
import UploadImages from "../components/editPage/UploadImages";
import Submission from "../components/editPage/Submission";
import Modal from "../components/modal/Modal";
import useNumber from "../hooks/use-number";
import ConfirmationModal from "../components/modal/ConfirmationModal";
import useCallbackPrompt from "../hooks/useCallbackPrompt";
import modalMessages from "../components/modal/modal-messages";

function Editor() {
  const FormHeaders = ["Create your event", "Upload photos", "Submission"];
  const dispatch = useDispatch();
  const { uid, email } = useSelector((state) => state.auth);
  const galleryData = useSelector((state) => state.gallery.gallery);
  const galleryUpdated = useSelector((state) => state.gallery.updated);
  const modalData = useSelector((state) => state.modal);

  const dataStatus = useSelector((state) => state.gallery);
  const [showStatus, setShowStatus] = useState(false);
  // const [disableBtn, setDisableBtn] = useState(false);
  // console.log(galleryUpdated);
  // console.log(dataStatus.status);
  console.log(showStatus);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (dataStatus.status === "loading") {
      setShowStatus(true);
    }
    const timeoutId = setTimeout(() => {
      console.log("timer");
      if (dataStatus.status === "loading") {
        setShowStatus(false);
      }
    }, 5000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [dataStatus.status]);

  const numbGalleries = useNumber();
  const [showDialog, setShowDialog] = useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const [emailError, setEmailError] = useState(false);
  const [previewSlide, setPreviewSlide] = useState(false);
  const [deletedItem, setDeletedItem] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [page, setPage] = useState(0);

  const pageHandler = (e) => {
    if (
      (e.target.parentNode.parentNode.title || e.target.parentNode.title) ===
      "next"
    )
      setPage((prev) => prev + 1);
    if (
      (e.target.parentNode.parentNode.title || e.target.parentNode.title) ===
      "previous"
    )
      setPage((prev) => prev - 1);
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
    // setDisableBtn(true);

    // ========
    // ERROR: need error handling that 10 images must be uploaded and checked contact info before hosting ==========.
    const status = e.target.id;

    if (status === "hosted") {
      if (galleryData.email === "") {
        setEmailError(true);
        return;
      }
      if (numbGalleries > 36) {
        dispatch(modalActions.toggleModal(true));
        dispatch(modalActions.addModalType("submit"));
        dispatch(modalActions.addModalTitle(modalMessages[4].title));
        dispatch(modalActions.addModalText(modalMessages[4].message));
        return;
      }
      if (
        galleryData.title === "" ||
        galleryData.subtitle === "" ||
        galleryData.thumbnailBgColor === "" ||
        galleryData.thumbnailTextColor === ""
      ) {
        console.log(galleryData);
        dispatch(modalActions.toggleModal(true));
        dispatch(modalActions.addModalType("emptySubmit"));
        dispatch(modalActions.addModalTitle(modalMessages[3].title));
        dispatch(modalActions.addModalText(modalMessages[3].message));
        return;
      }

      if (galleryData.images.length === 0) {
        dispatch(modalActions.toggleModal(true));
        dispatch(modalActions.addModalType(""));
        dispatch(modalActions.addModalTitle("Important"));
        dispatch(
          modalActions.addModalText(
            "At least one image file is needed for submit"
          )
        );
        return;
      }
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
      // Reset deleted items array
      setDeletedItem([]);
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
        // Now, new data will be updated into firebase and redux store
        await addDocument("gallery", galleryDoc, uid);
        dispatch(checkGallery(uid));
        // Reset the images file array
        setImageFiles([]);
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

    if (status === "hosted") {
      dispatch(modalActions.toggleModal(true));
      dispatch(modalActions.addModalType("return/myevent"));
      dispatch(modalActions.addModalTitle(modalMessages[2].title));
      dispatch(modalActions.addModalText(modalMessages[2].message));
    }
    // setShowStatus(false);
  };

  const previewHandler = () => {
    setPreviewSlide((prev) => !prev);
    dispatch(navActions.toggleNav(false));
  };

  // const submitDisableHandler = () => {
  //   if (galleryUpdated)
  // };

  useEffect(() => {
    if (galleryUpdated) {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  }, [galleryUpdated]);

  if (previewSlide) {
    return <Gallery previewData={galleryData} setClose={setPreviewSlide} />;
  }
  return (
    <main>
      <ConfirmationModal
        showModal={showPrompt}
        confirmNavigation={confirmNavigation}
        cancelNavigation={cancelNavigation}
      />
      <section className="max-w-[1000px] my-0 mx-auto flex flex-col font-['average'] relative">
        {modalData.isOpen && <Modal modalHandler={uploadHandler} />}
        <h1 className="text-[3rem]">{FormHeaders[page]}</h1>
        {page === 0 && <UploadThumbnail />}
        {page === 1 && (
          <UploadImages
            setImageFiles={setImageFiles}
            setDeletedItem={setDeletedItem}
            previewHandler={previewHandler}
          />
        )}
        {page === 2 && <Submission userEmail={email} emailError={emailError} />}
        <div className="flex justify-end mt-2">
          {showStatus && <p>{dataStatus.status}</p>}
          <button
            id="draft"
            type="button"
            className="rounded-[5px] bg-[#D9D9D9] self-end px-4 py-2 hover:bg-black hover:text-[#ffffff] duration-[500ms] font-['average'] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            onClick={uploadHandler}
            disabled={!galleryUpdated}
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
          className="absolute right-[1rem] top-[50%] hover:animate-bounceRight"
          type="button"
          id="nextPage"
          disabled={page === FormHeaders.length - 1}
          onClick={pageHandler}
        >
          <span className="sr-only">next</span>
          <div className="text-[3rem]" title="next">
            <MdOutlineArrowForwardIos />
          </div>
        </button>
      )}

      {page !== 0 && (
        <button
          className="absolute left-[1rem] top-[50%] hover:animate-bounceLeft"
          type="button"
          id="prevPage"
          disabled={page === 0}
          onClick={pageHandler}
        >
          <span className="sr-only">previous</span>
          <div className="text-[3rem]" title="previous">
            <MdOutlineArrowBackIos />
          </div>
        </button>
      )}
    </main>
  );
}

export default Editor;
