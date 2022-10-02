function UserGallery({ images, galleryRef }) {
  return (
    <section
      ref={galleryRef}
      id="gallery"
      className="w-[300vw] h-[100vh] flex items-center flex-none"
    >
      {images.map((image) => (
        <div
          key={image.id}
          className="flex flex-col mx-40 max-w-max 2xl:max-w-[650px]"
        >
          <div className="drop-shadow-[5px_10px_4px_rgba(0,0,0,0.4)] max-w-max">
            <img src={image.imgUrl} alt="" />
          </div>
          <h2 className="self-end mt-6 mr-4 text-black">{image.title}</h2>
        </div>
      ))}
    </section>
  );
}
export default UserGallery;
