function Thumbnail({
  thumbnailBgColor,
  thumbnailTextColor,
  name,
  title,
  status,
  mode,
}) {
  if (mode === "browse") {
    return (
      <div
        className={`w-[200px] h-[200px] flex flex-col justify-center relative 
      ${status === "draft" && "opacity-60"}`}
        style={{ backgroundColor: thumbnailBgColor }}
      >
        <p className="ml-4 text-sm" style={{ color: thumbnailTextColor }}>
          {name}
        </p>
        <p className="ml-4 text-xl" style={{ color: thumbnailTextColor }}>
          {title}
        </p>
        <p
          className="text-m self-center cursor-pointer absolute bottom-2 transition-all hover:scale-125"
          style={{ color: thumbnailTextColor }}
        >
          Buy a Ticket
        </p>
      </div>
    );
  }
  return (
    <div
      className={`w-[200px] h-[200px] flex flex-col justify-center 
      ${status === "draft" && "opacity-60"}`}
      style={{ backgroundColor: thumbnailBgColor }}
    >
      <p className="ml-4 text-sm" style={{ color: thumbnailTextColor }}>
        {name}
      </p>
      <p className="ml-4 text-xl" style={{ color: thumbnailTextColor }}>
        {title}
      </p>
    </div>
  );
}

export default Thumbnail;
