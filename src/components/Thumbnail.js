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
      <div
        className="w-[200px] h-[200px] flex flex-col justify-center relative group"
        style={{ backgroundColor: thumbnailBgColor }}
      >
        <p className="ml-4 text-sm" style={{ color: thumbnailTextColor }}>
          {name}
        </p>
        <p className="ml-4 text-xl" style={{ color: thumbnailTextColor }}>
          {title}
        </p>
        <NavLink
          className="text-m self-center cursor-pointer absolute bottom-2 transition-all hover:scale-125 mb-[0.5rem] invisible group-hover:visible"
          style={{ color: thumbnailTextColor }}
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
