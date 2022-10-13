function GalleryThumbnail({
  title,
  name,
  thumbnailBgColor,
  thumbnailTextColor,
  email,
}) {
  return (
    <section
      id="thumbnail"
      className="w-[100vw] h-[100vh] flex flex-none items-center relative"
      style={{ backgroundColor: thumbnailBgColor, color: thumbnailTextColor }}
    >
      <h1 className="flex flex-col ml-20">
        <span className="text-[40px]">{name}</span>
        <span className="text-[60px]">{title}</span>
      </h1>
      {email && (
        <p className="absolute bottom-20 left-20 text-[20px]">
          Contact: {email}
        </p>
      )}
    </section>
  );
}

export default GalleryThumbnail;
