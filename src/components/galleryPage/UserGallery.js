import { useState, createRef, useRef } from "react";
import GalleryZoomedIn from "./GalleryZoomedIn";

function UserGallery({ images, galleryRef, setZoomed, zoomed }) {
  const [index, setIndex] = useState();
  const scrollRefs = useRef([]);
  // initiate ref to save element for scrollintoview
  scrollRefs.current = images.map(() => createRef());
  // function to move page to given imgage index
  const scrollSmoothHandler = (index) => {
    scrollRefs.current[index].current.scrollIntoView({
      inline: "center",
    });
  };

  // next, prev btn handler
  const indexHandler = (e) => {
    e.preventDefault();
    if (
      (e.target.parentNode.title || e.target.parentNode.parentNode.title) ===
      "next"
    ) {
      //  if next btn is clicked move background page to specific index
      scrollSmoothHandler(index + 1);
      // set index++
      setIndex((prev) => prev + 1);
    }
    if (
      (e.target.parentNode.title || e.target.parentNode.parentNode.title) ===
      "previous"
    ) {
      // same but deduct index
      scrollSmoothHandler(index - 1);
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <section
      ref={galleryRef}
      id="gallery"
      className="w-[300vw] h-[100vh] flex items-center flex-none"
    >
      {images.map((image, i) => (
        <div
          id={i}
          key={image.id}
          className="flex flex-col mx-40 max-w-max 2xl:max-w-[650px]"
          ref={scrollRefs.current[i]}
        >
          <div className="drop-shadow-[5px_10px_4px_rgba(0,0,0,0.4)] max-w-max">
            <img
              className="cursor-pointer"
              src={image.imgUrl}
              alt=""
              onClick={() => {
                setIndex(i);
                setZoomed(true);
              }}
              role="presentation"
            />
          </div>
          <h2 className="self-end mt-6 mr-4 text-black">{image.title}</h2>
        </div>
      ))}
      {zoomed && (
        <GalleryZoomedIn
          images={images}
          curImgIndex={index}
          setIndex={indexHandler}
          maxImgIndex={images.length - 1}
        />
      )}
    </section>
  );
}
export default UserGallery;
