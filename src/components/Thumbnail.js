import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { navActions } from "../store/nav-slice";

function Thumbnail({
  thumbnailBgColor,
  thumbnailTextColor,
  name,
  title,
  images,
  status,
  email,
  mode,
  lightMode,
}) {
  const dispatch = useDispatch();
  const navHandler = () => {
    dispatch(navActions.toggleNav());
  };

  if (mode === "browse") {
    return (
      <div className="relative group w-fit h-fit">
        <div
          className="w-[200px] h-[200px] flex flex-col justify-center"
          style={{ backgroundColor: thumbnailBgColor }}
        >
          <p className="ml-4 text-sm" style={{ color: thumbnailTextColor }}>
            {name}
          </p>
          <p className="ml-4 text-xl" style={{ color: thumbnailTextColor }}>
            {title}
          </p>
        </div>
        <div className="border border-red-400 w-full h-full text-m cursor-pointer absolute top-0 left-0 invisible group-hover:visible backdrop-opacity-20 backdrop-invert bg-white/30 flex justify-center items-end pb-5">
          <NavLink
            className="text-m cursor-pointer transform transition duration-500 hover:scale-[1.2]"
            to="/gallery"
            state={{
              thumbnailBgColor,
              thumbnailTextColor,
              name,
              title,
              images,
              lightMode,
              email,
            }}
            onClick={navHandler}
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
