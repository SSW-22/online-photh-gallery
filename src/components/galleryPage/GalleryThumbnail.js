import { NavLink, useLocation } from "react-router-dom";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { IoFootstepsSharp } from "react-icons/io5";
import ArcText from "../ArcText";

function GalleryThumbnail() {
  const location = useLocation();
  const { title, name, thumbnailBgColor, thumbnailTextColor } = location.state;

  return (
    <div
      className="h-[100vh] flex items-center relative p-[10rem]"
      style={{
        backgroundColor: thumbnailBgColor,
        color: thumbnailTextColor,
      }}
    >
      <h1 className="flex flex-col">
        <span className="text-[40px]">{name}</span>
        <span className="text-[60px]">{title}</span>
      </h1>
      <NavLink
        to="/events"
        className="absolute right-[3rem] top-[3rem] text-[2.6rem] flex flex-col items-center gap-[0.7rem] font-[200]"
      >
        <p className="text-[0.8rem]">Click to leave</p>
        <BsFillDoorOpenFill />
      </NavLink>
      <div
        style={{ borderColor: thumbnailTextColor }}
        className="fixed bottom-[3rem] right-[3rem] w-[6rem] h-[6rem] flex items-center justify-center border rounded-full"
      >
        <ArcText text="Scroll to  Walk" arc={95} radius={70} />
        <div className="absolute text-[3rem] animate-step">
          <IoFootstepsSharp />
        </div>
      </div>
    </div>
  );
}

export default GalleryThumbnail;
