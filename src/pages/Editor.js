import { useState } from "react";
import { useSelector } from "react-redux";
import arrowImg from "../asset/arrow.png";
import addDocument from "../firebase/addDocument";
import uploadFileProgress from "../firebase/uploadFileProgress";
import UploadImages from "../components/editPage/UploadImages";
import UploadThumbnail from "../components/editPage/UploadThumbnail";

function Editor() {
  const FormHeaders = ["Create your event", "Upload photos", "Submission"];
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const uid = useSelector((state) => state.auth.uid);
  const galleryData = useSelector((state) => state.gallery.gallery);
  const [page, setPage] = useState(0);

  const pageHandler = (e) => {
    if (e.target.alt === "next") setPage((prev) => prev + 1);
    if (e.target.alt === "previous") setPage((prev) => prev - 1);
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
          `gallery/${uid}`,
          imageName,
          setProgress
        );
        return { ...image, imgUrl: url };
      })
    )
      .then(async (imgArray) => {
        const galleryDoc = {
          ...galleryData,
          images: imgArray,
          status: "draft",
        };
        await addDocument("gallery", galleryDoc, uid);
        console.log("uploaded");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <div className="max-w-[1000px] my-0 mx-auto flex flex-col font-['average'] relative">
        <h1 className="text-[3rem]">{FormHeaders[page]}</h1>
        {page === 0 && <UploadThumbnail />}
        {page === 1 && <UploadImages images={images} onImages={setImages} />}
        <button
          type="button"
          className="bg-[#D9D9D9] self-end px-4 py-2"
          onClick={uploadHandler}
        >
          Save as draft
        </button>
      </div>
      {page !== 2 && (
        <button
          className="absolute right-10 top-[50%]"
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
          className="absolute left-10 top-[50%]"
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
    </div>
  );
}

export default Editor;
