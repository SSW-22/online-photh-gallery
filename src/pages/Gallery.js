import { useEffect, useRef, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { IoFootstepsSharp } from "react-icons/io5";
import { HiOutlineX } from "react-icons/hi";
import ArcText from "../components/ArcText";
import GalleryThumbnail from "../components/galleryPage/GalleryThumbnail";
import UserGallery from "../components/galleryPage/UserGallery";
import GalleryLoading from "../components/galleryPage/GalleryLoading";

const options = {
  threshold: 0.015,
};

function Gallery() {
  const location = useLocation();
  const { title, name, thumbnailBgColor, thumbnailTextColor, images } =
    location.state;
  const galleryRef = useRef();
  const [galleryVisible, setGalleryVisible] = useState();
  const [zoomed, setZoomed] = useState(false);
  const [imgsLoaded, setImgsLoaded] = useState(false);

  // Scroll event to change all icon's color when user move tha section from tumbnail to gallery
  useEffect(() => {
    if (imgsLoaded) {
      /** Trigger observer when scrolling to the gallery section */
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        // whenever the user get into gallery section, it will return true. Otherwise, it will return false
        setGalleryVisible(entry.isIntersecting);
      }, options);
      observer.observe(galleryRef.current);
    }
  }, [imgsLoaded]);

  return (
    <main
      className="flex overflow-x-scroll w-full h-[100vh] overflow-y-hidden font-['average']"
      style={{ color: galleryVisible ? "black" : thumbnailTextColor }}
    >
      {!imgsLoaded && (
        <GalleryLoading images={images} setImgsLoaded={setImgsLoaded} />
      )}
      {imgsLoaded && (
        <>
          <GalleryThumbnail
            title={title}
            name={name}
            thumbnailBgColor={thumbnailBgColor}
            thumbnailTextColor={thumbnailTextColor}
          />
          <UserGallery
            images={images || ""}
            galleryRef={galleryRef}
            setZoomed={setZoomed}
            zoomed={zoomed}
          />
          <NavLink
            to="/events"
            className="
        absolute right-[3rem] top-[3rem] w-[6rem] h-[6rem] text-[2.6rem] flex flex-col items-center gap-[0.7rem] font-[200] z-[99]
        "
          >
            <p className="text-[0.8rem]">Click to leave</p>
            <BsFillDoorOpenFill />
          </NavLink>
          {!zoomed && (
            <div
              style={{
                borderColor: galleryVisible ? "black" : thumbnailTextColor,
              }}
              className="fixed bottom-[3rem] right-[3rem] w-[6rem] h-[6rem] flex items-center justify-center border rounded-full z-[99]"
            >
              <ArcText text="Scroll to  Walk" arc={95} radius={70} />
              <div className="absolute text-[3rem] animate-step">
                <IoFootstepsSharp />
              </div>
            </div>
          )}
          {zoomed && (
            <button
              type="button"
              className="fixed bottom-[3rem] right-[3rem] w-[6rem] h-[6rem] flex flex-col items-center justify-center z-[99]"
              onClick={(e) => {
                setZoomed(false);
              }}
            >
              <p className="text-[0.8rem] font-[100]">Back</p>
              <div className="text-[4rem]">
                <HiOutlineX />
              </div>
            </button>
          )}
        </>
      )}
    </main>
  );
}

export default Gallery;
