import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { galleryActions } from "../store/gallery-slice";
import recycleImg from "../asset/recycle-bin-sketch.png";
import pencilImg from "../asset/pencil-tool.png";
import Thumbnail from "./Thumbnail";
import deleteDocument from "../firebase/deleteDocument";
import deleteFile from "../firebase/deleteImageFile";

function MyEventStatus({ userData }) {
  const { status, thumbnailBgColor, thumbnailTextColor, title, name } =
    userData;
  const gallery = useSelector((state) => state.gallery.gallery);
  const uid = useSelector((state) => state.auth.uid);

  const dispatch = useDispatch();

  const deleteBtnHandler = () => {
    if (gallery.images.length > 0) {
      gallery.images.forEach(async (item) => {
        // Check if the deleted image is in firebase storage by using image url address.
        const fbAddress = "https://firebasestorage.googleapis.com/";
        if (item.imgUrl.includes(fbAddress))
          await deleteFile(`gallery/${uid}/${item.id}`);
      });
    }
    if (gallery.status !== "none") {
      deleteDocument(uid);
      dispatch(
        galleryActions.setInitial({
          name: "",
          title: "",
          images: [],
          thumbnailBgColor: "",
          thumbnailTextColor: "",
          email: "",
          status: "none",
        })
      );
    }
  };

  if (status === "none") {
    return (
      <>
        <p className="text-base mb-6 ">You dont have any events created.</p>
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
        <Thumbnail
          status={status}
          title={title}
          name={name}
          thumbnailBgColor={thumbnailBgColor}
          thumbnailTextColor={thumbnailTextColor}
        />
        <NavLink to="/editor" className="flex mt-6 mb-2">
          <span className="w-[20px] h-[20px] mr-2">
            <img src={pencilImg} alt="" className="w-full h-full" />
          </span>
          Click to manage your event
        </NavLink>
        <button
          type="button"
          className="flex font-['average']"
          onClick={deleteBtnHandler}
        >
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
        <Thumbnail
          status={status}
          title={title}
          name={name}
          thumbnailBgColor={thumbnailBgColor}
          thumbnailTextColor={thumbnailTextColor}
        />
        <button
          type="button"
          className="flex mt-6 font-['average']"
          onClick={deleteBtnHandler}
        >
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
