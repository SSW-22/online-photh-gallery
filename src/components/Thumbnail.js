import { NavLink } from "react-router-dom";

function Thumbnail({
  thumbnailBgColor,
  thumbnailTextColor,
  subtitle,
  title,
  images,
  status,
  email,
  mode,
  lightMode,
}) {
  if (mode === "browse") {
    return (
      <div className="relative group w-fit h-fit">
        <div
          className="w-[155px] h-[150px] 2xl:w-[200px] 2xl:h-[200px] flex flex-col justify-center"
          style={{ backgroundColor: thumbnailBgColor }}
        >
          <p className="ml-4 text-sm" style={{ color: thumbnailTextColor }}>
            {subtitle}
          </p>
          <p
            className="ml-4 text-lg 2xl:text-xl"
            style={{ color: thumbnailTextColor }}
          >
            {title}
          </p>
        </div>
        <div className="w-full h-full text-m cursor-pointer absolute top-0 left-0 invisible group-hover:visible backdrop-opacity-20 backdrop-invert bg-white/30 flex justify-center items-end pb-5">
          <NavLink
            className="text-sm cursor-pointer transform transition duration-500 hover:scale-[1.2]"
            to="/gallery"
            state={{
              thumbnailBgColor,
              thumbnailTextColor,
              subtitle,
              title,
              images,
              lightMode,
              email,
            }}
          >
            Buy a Ticket
          </NavLink>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`w-[200px] h-[200px] flex flex-col justify-center 
      ${status === "draft" && "opacity-60"}`}
      style={{ backgroundColor: thumbnailBgColor || "#ddd" }}
    >
      <p
        className="ml-4 text-sm"
        style={{ color: thumbnailTextColor || "#000000" }}
      >
        {subtitle}
      </p>
      <p
        className="ml-4 text-xl"
        style={{ color: thumbnailTextColor || "#000000" }}
      >
        {title}
      </p>
    </div>
  );
}

export default Thumbnail;
