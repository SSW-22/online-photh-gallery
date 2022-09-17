function Thumbnail(props) {
  const { title, name, thumbnailBgColor, thumbnailTextColor } = props;

  return (
    <div className="translate-y-[-5rem]">
      <h1 className="mb-[1rem] text-[1.4rem]">Event thumnail preview</h1>
      <div
        style={{ backgroundColor: thumbnailBgColor, color: thumbnailTextColor }}
        className="w-[13rem] h-[13rem] flex flex-col justify-center p-[1.1rem] gap-[0.5rem]"
      >
        <p className="text-[1.2rem]">{name}</p>
        <p className="text-[1.5rem]">{title}</p>
      </div>
    </div>
  );
}

export default Thumbnail;
