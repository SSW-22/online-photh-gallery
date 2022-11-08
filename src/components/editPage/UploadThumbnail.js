// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { galleryActions } from "../../store/gallery-slice";
import Thumbnail from "../Thumbnail";

// const randomBg = `#${Math.floor(Math.random() * 16777215)
//   .toString(16)
//   .padStart(6, "0")}`;
// const randomTxt = `#${Math.floor(Math.random() * 16777215)
//   .toString(16)
//   .padStart(6, "0")}`;

function UploadThumbnail() {
  const { title, subtitle, thumbnailBgColor, thumbnailTextColor } = useSelector(
    (state) => state.gallery.gallery
  );
  // const [inputError, setInputError] = useState();
  // console.log(inputError);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const initialColor = () => {
  //     dispatch(galleryActions.addThumbnailBgColor(randomBg));
  //     dispatch(galleryActions.addThumbnailTextColor(randomTxt));
  //   };

  //   if (!thumbnailBgColor || !thumbnailTextColor) {
  //     initialColor();
  //   }
  // }, [dispatch, thumbnailBgColor, thumbnailTextColor]);

  const titleInputHandler = (event) => {
    event.preventDefault();
    dispatch(galleryActions.addTitle(event.target.value));
  };

  const subtitleInputHandler = (event) => {
    event.preventDefault();
    dispatch(galleryActions.addSubtitle(event.target.value));
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
    <div className="flex items-center font-['average'] gap-[25rem] mt-[8rem]">
      <div className="flex flex-col">
        <label htmlFor="title" className="flex flex-col mb-[2.5rem]">
          <h2 className="text-[1.5rem]">Event title</h2>
          <input
            className="p-1 focus:outline-none border-b border-black font-['average']"
            id="title"
            value={title}
            onChange={(e) => titleInputHandler(e)}
          />
        </label>
        <label htmlFor="name" className="flex flex-col mb-[2.5rem]">
          <h2 className="text-[1.5rem]">Event subtitle</h2>
          <input
            className="p-1 focus:outline-none border-b border-black font-['average']"
            id="name"
            value={subtitle}
            onChange={(e) => subtitleInputHandler(e)}
          />
        </label>
        <div className="flex flex-col mb-[3rem]">
          <h2 className="text-[1.2rem] mb-[1rem]">
            Choose a thumbnail background colour
          </h2>
          <div className="relative overflow-hidden w-[3rem] h-[3rem] rounded-full border-2 border-[#ddd]">
            <input
              className="absolute w-[4rem] h-[4rem] rounded-full appearance-none outline-none top-[-10px] left-[-10px] cursor-pointer"
              type="color"
              id="Thumbnail-color"
              value={thumbnailBgColor || "#ffffff"}
              onChange={(e) => {
                thumbnailColorHandler(e);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col mb-[3rem]">
          <h2 className="text-[1.2rem] mb-[1rem]">
            Choose a thumbnail text colour
          </h2>
          <div className="relative overflow-hidden w-[3rem] h-[3rem] rounded-full border-2 border-[#ddd]">
            <input
              className="absolute w-[4rem] h-[4rem] rounded-full appearance-none outline-none top-[-10px] left-[-10px] cursor-pointer"
              type="color"
              id="Thumbnail-text-color"
              value={thumbnailTextColor || "#ffffff"}
              onChange={(e) => thumbnailTextColorHandler(e)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-[1.4rem] mb-2">Event thumnail preview</p>
        <Thumbnail
          title={title}
          subtitle={subtitle}
          thumbnailBgColor={thumbnailBgColor}
          thumbnailTextColor={thumbnailTextColor}
        />
      </div>
    </div>
  );
}

export default UploadThumbnail;
