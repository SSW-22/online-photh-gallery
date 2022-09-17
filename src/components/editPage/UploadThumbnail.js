import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { galleryActions } from "../../store/gallery-slice";
import Thumbnail from "../Thumbnail";

const randomBg = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
const randomTxt = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

function UploadThumbnail() {
  const { title, name, thumbnailBgColor, thumbnailTextColor } = useSelector(
    (state) => state.gallery
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const initialColor = () => {
      dispatch(galleryActions.addThumbnailBgColor(randomBg));
      dispatch(galleryActions.addThumbnailTextColor(randomTxt));
    };

    return () => {
      if (!thumbnailBgColor || !thumbnailTextColor) {
        initialColor();
      }
    };
  }, [dispatch, thumbnailBgColor, thumbnailTextColor]);

  const titleInputHandler = (event) => {
    event.preventDefault();
    dispatch(galleryActions.addTitle(event.target.value));
  };

  const nameInputHandler = (event) => {
    event.preventDefault();
    dispatch(galleryActions.addName(event.target.value));
  };

  const thumbnailColorHandler = (event) => {
    event.preventDefault();
    dispatch(galleryActions.addThumbnailBgColor(event.target.value));
  };
  const thumbnailTextColorHandler = (event) => {
    event.preventDefault();
    dispatch(galleryActions.addThumbnailTextColor(event.target.value));
  };
  return (
    <div className="flex font-['average'] gap-[25rem] mt-[10rem]">
      <div className="flex flex-col">
        <label htmlFor="title" className="flex flex-col mb-[2.5rem]">
          <h1 className="text-[3rem]">Add Title</h1>
          <input
            className="p-1 focus:outline-[#ddd]"
            id="title"
            placeholder="Add Title"
            value={title}
            onChange={(e) => titleInputHandler(e)}
          />
        </label>
        <label htmlFor="name" className="flex flex-col mb-[2.5rem]">
          <h1 className="text-[2rem]">Add Name</h1>
          <input
            className="p-1 focus:outline-[#ddd]"
            id="name"
            placeholder="Add Name"
            value={name}
            onChange={(e) => nameInputHandler(e)}
          />
        </label>
        <div className="flex flex-col mb-[3rem]">
          <h1 className="text-[1.2rem] mb-[1rem]">
            Choose a thumbnail background colour
          </h1>
          <div className="relative overflow-hidden w-[3rem] h-[3rem] rounded-full border-2 border-[#ddd]">
            <input
              className="absolute w-[4rem] h-[4rem] rounded-full appearance-none outline-none top-[-10px] left-[-10px]"
              type="color"
              id="Thumbnail-color"
              value={thumbnailBgColor}
              onChange={(e) => {
                thumbnailColorHandler(e);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col mb-[3rem]">
          <h1 className="text-[1.2rem] mb-[1rem]">
            Choose a thumbnail text colour
          </h1>
          <div className="relative overflow-hidden w-[3rem] h-[3rem] rounded-full border-2 border-[#ddd]">
            <input
              className="absolute w-[4rem] h-[4rem] rounded-full appearance-none outline-none top-[-10px] left-[-10px]"
              type="color"
              id="Thumbnail-text-color"
              value={thumbnailTextColor}
              onChange={(e) => thumbnailTextColorHandler(e)}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Thumbnail
          title={title}
          name={name}
          thumbnailBgColor={thumbnailBgColor}
          thumbnailTextColor={thumbnailTextColor}
        />
      </div>
    </div>
  );
}

export default UploadThumbnail;
