import { useState } from "react";
import GalleryZoomedIn from "./GalleryZoomedIn";

function UserGallery({ images, galleryRef, setZoomed, zoomed }) {
  const [image, setImage] = useState();
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
        >
          <div className="drop-shadow-[5px_10px_4px_rgba(0,0,0,0.4)] max-w-max">
            <img
              className="cursor-pointer"
              src={image.imgUrl}
              alt=""
              onClick={(e) => {
                setImage(image);
                setZoomed(true);
              }}
              role="presentation"
            />
          </div>
          <h2 className="self-end mt-6 mr-4 text-black">{image.title}</h2>
        </div>
      ))}
      {zoomed && <GalleryZoomedIn image={image} />}
    </section>
  );
}
export default UserGallery;
