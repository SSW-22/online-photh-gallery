import { useEffect, useRef, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import GalleryThumbnail from "../components/galleryPage/GalleryThumbnail";
import UserGallery from "../components/galleryPage/UserGallery";

const options = {
  threshold: 0.015,
};

function Gallery() {
  const location = useLocation();
  const { title, name, thumbnailBgColor, thumbnailTextColor, images } =
    location.state;
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
      style={{ color: thumbnailTextColor }}
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
        className={`fixed right-10 top-10 ${galleryVisible && "text-black"}`}
      >
        Exit
      </NavLink>
      <div
        className={`fixed bottom-10 right-10 ${galleryVisible && "text-black"}`}
      >
        Lotating
      </div>
    </main>
  );
}

export default Gallery;
