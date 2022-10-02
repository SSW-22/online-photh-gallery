import { useEffect, useRef, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { IoFootstepsSharp } from "react-icons/io5";
import ArcText from "../components/ArcText";
import GalleryThumbnail from "../components/galleryPage/GalleryThumbnail";
import UserGallery from "../components/galleryPage/UserGallery";

const options = {
  threshold: 0.015,
};

function Gallery() {
  const location = useLocation();
  const { title, name, thumbnailBgColor, thumbnailTextColor, images } =
    location.state;
  console.log(images);
  const galleryRef = useRef();
  const [galleryVisible, setGalleryVisible] = useState();
  useEffect(() => {
    /** Trigger observer when scrolling to the gallery section */
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      // whenever the user get into gallery section, it will return true. Otherwise, it will return false
      setGalleryVisible(entry.isIntersecting);
    }, options);
    observer.observe(galleryRef.current);
  }, []);

  return (
    <main
      className="flex overflow-x-scroll w-full h-[100vh] overflow-y-hidden"
      style={{ color: galleryVisible ? "black" : thumbnailTextColor }}
    >
      <GalleryThumbnail
        title={title}
        name={name}
        thumbnailBgColor={thumbnailBgColor}
        thumbnailTextColor={thumbnailTextColor}
      />
      <UserGallery images={images || ""} galleryRef={galleryRef} />
      <NavLink
        to="/events"
        className="
        absolute right-[3rem] top-[3rem] text-[2.6rem] flex flex-col items-center gap-[0.7rem] font-[200] 
        "
      >
        <p className="text-[0.8rem]">Click to leave</p>
        <BsFillDoorOpenFill />
      </NavLink>
      <div
        style={{ borderColor: galleryVisible ? "black" : thumbnailTextColor }}
        className="fixed bottom-[3rem] right-[3rem] w-[6rem] h-[6rem] flex items-center justify-center border rounded-full"
      >
        <ArcText text="Scroll to  Walk" arc={95} radius={70} />
        <div className="absolute text-[3rem] animate-step">
          <IoFootstepsSharp />
        </div>
      </div>
    </main>
  );
}

export default Gallery;
