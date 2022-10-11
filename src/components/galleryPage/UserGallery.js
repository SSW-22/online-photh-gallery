import { useState, createRef, useRef } from "react";
import { motion } from "framer-motion";
import GalleryZoomedIn from "./GalleryZoomedIn";

const variants = {
  open: {
    scale: 1.6,
    y: -17,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
  closed: {
    scale: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function UserGallery({ images, galleryRef, setZoomed, zoomed, lightMode }) {
  const [index, setIndex] = useState();
  const scrollRefs = useRef([]);
  // initiate ref to save element for scrollintoview
  scrollRefs.current = images.map(() => createRef());
  // function to move page to given imgage index
  const scrollSmoothHandler = (index) => {
    scrollRefs.current[index].current.scrollIntoView({
      inline: "center",
      behavior: "smooth",
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
      className="w-[300vw] h-[100vh] flex items-center flex-none justify-around mr-[20rem]"
    >
      {images.map((image, i) => (
        <div
          id={i}
          key={image.id}
          className="flex flex-col mx-40 justify-center"
          ref={scrollRefs.current[i]}
        >
          <div className="drop-shadow-[5px_10px_4px_rgba(0,0,0,0.4)]">
            <motion.img
              className="cursor-pointer max-w-[550px] max-h-[450px] object-contain"
              src={image.imgUrl}
              alt=""
              onClick={() => {
                setIndex(i);
                setZoomed(true);
                scrollSmoothHandler(i);
              }}
              role="presentation"
              animate={zoomed && index === i ? "open" : "closed"}
              variants={variants}
            />
          </div>
          <h2
            className={`${
              lightMode ? "text-black" : "text-white"
            } self-end mt-6 mr-4`}
          >
            {image.title}
          </h2>
        </div>
      ))}
      {zoomed && (
        <GalleryZoomedIn
          images={images}
          curImgIndex={index}
          setIndex={indexHandler}
          maxImgIndex={images.length - 1}
          lightMode={lightMode}
        />
      )}
    </section>
  );
}
export default UserGallery;
