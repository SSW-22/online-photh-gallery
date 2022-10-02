function GalleryThumbnail({
  title,
  name,
  thumbnailBgColor,
  thumbnailTextColor,
}) {
  return (
    <section
      id="thumbnail"
      className="w-[100vw] h-[100vh] flex flex-none items-center relative"
      style={{ backgroundColor: thumbnailBgColor, color: thumbnailTextColor }}
    >
      <h1 className="flex flex-col ml-10">
        <span className="text-[40px]">{name}</span>
        <span className="text-[60px]">{title}</span>
      </h1>
    </section>
  );
}

export default GalleryThumbnail;
