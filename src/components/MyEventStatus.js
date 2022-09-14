import { NavLink } from "react-router-dom";
import recycleImg from "../asset/recycle-bin-sketch.png";
import pencilImg from "../asset/pencil-tool.png";

function MyEventStatus({ userData }) {
  const { status, thumbnailBgColor, thumbnailTextColor, title, name } =
    userData;
  if (status === "none") {
    return (
      <>
        <p className="text-base mb-6">You dont have any events created.</p>
        <div className="w-[200px] h-[200px] bg-[#D9D9D9] mb-6" />
        <NavLink to="/editor" className="flex">
          <span className="w-[20px] h-[20px] mr-2">
            <img src={pencilImg} alt="" className="w-full h-full" />
          </span>
          Click to create your event
        </NavLink>

        {/* <a
          href="https://www.flaticon.com/free-icons/pencil"
          title="pencil icons"
        >
          Pencil icons created by smashingstocks - Flaticon
        </a> */}
      </>
    );
  }

  if (status === "draft") {
    return (
      <>
        <p className="text-base mb-6">Your event is currently being built.</p>
        <div
          className="w-[200px] h-[200px] opacity-70 mb-6 flex flex-col justify-center"
          style={{ backgroundColor: thumbnailBgColor }}
        >
          <p className="ml-4 text-sm" style={{ color: thumbnailTextColor }}>
            {name}
          </p>
          <p className="ml-4 text-xl" style={{ color: thumbnailTextColor }}>
            {title}
          </p>
        </div>
        <NavLink to="/editor" className="flex">
          <span className="w-[20px] h-[20px] mr-2">
            <img src={pencilImg} alt="" className="w-full h-full" />
          </span>
          Click to create your event
        </NavLink>
        <button type="button" className="flex">
          <span className="flex w-[20px] h-[20px] mr-2">
            <img src={recycleImg} alt="" className="w-full h-full" />
          </span>
          Click to delete your event. The action you make cannot be undone.
        </button>

        {/* <a href="https://www.flaticon.com/free-icons/trash" title="trash icons">
          Trash icons created by Freepik - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/pencil"
          title="pencil icons"
        >
          Pencil icons created by smashingstocks - Flaticon
        </a> */}
      </>
    );
  }

  if (status === "hosted") {
    return (
      <>
        <p className="text-base mb-6">Your event is currently being hosted.</p>
        {/* <div
          className={`w-[200px] h-[200px] mb-6 flex flex-col justify-center ${thumbnailBgColor}`}
        > */}
        <div
          className="w-[200px] h-[200px] mb-6 flex flex-col justify-center"
          style={{ backgroundColor: thumbnailBgColor }}
        >
          <p className="ml-4 text-sm" style={{ color: thumbnailTextColor }}>
            {name}
          </p>
          <p className="ml-4 text-xl" style={{ color: thumbnailTextColor }}>
            {title}
          </p>
        </div>
        <button type="button" className="flex">
          <span className="flex w-[20px] h-[20px] mr-2">
            <img src={recycleImg} alt="" className="w-full h-full" />
          </span>
          Click to delete your event. The action you make cannot be undone.
        </button>

        {/* <a href="https://www.flaticon.com/free-icons/trash" title="trash icons">
          Trash icons created by Freepik - Flaticon
        </a> */}
      </>
    );
  }
}

export default MyEventStatus;
