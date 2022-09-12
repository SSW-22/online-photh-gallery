import recycleImg from "../asset/recycle-bin-sketch.png";
import pencelImg from "../asset/pencil-tool.png";

function MyEventStatus({ userData }) {
  const { status, thumbnailBgColor, thumbnailTextColor, title, name } =
    userData;
  if (status === "none") {
    return (
      <>
        <p className="text-base mb-6">You dont have any events created.</p>
        <div className="w-[200px] h-[200px] bg-[#D9D9D9] mb-6" />
        <p className="flex">
          <span className="w-[20px] h-[20px] mr-2">
            <img src={pencelImg} alt="" className="w-full h-full" />
          </span>
          Click to create your event
        </p>

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
          className={`w-[200px] h-[200px] ${thumbnailBgColor} opacity-70 mb-6 flex flex-col justify-center`}
        >
          <p className={`${thumbnailTextColor} ml-4 text-sm`}>{name}</p>
          <p className={`${thumbnailTextColor} ml-4 text-xl`}>{title}</p>
        </div>
        <p className="flex">
          <span className="w-[20px] h-[20px] mr-2">
            <img src={pencelImg} alt="" className="w-full h-full" />
          </span>
          Click to create your event
        </p>
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
        <div
          className={`w-[200px] h-[200px] ${thumbnailBgColor} mb-6 flex flex-col justify-center`}
        >
          <p className={`${thumbnailTextColor} ml-4 text-sm`}>{name}</p>
          <p className={`${thumbnailTextColor} ml-4 text-xl`}>{title}</p>
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
