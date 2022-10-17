import { useDispatch, useSelector } from "react-redux";
import { BsMoon, BsSun } from "react-icons/bs";
import { galleryActions } from "../../store/gallery-slice";

function ModeSelector() {
  const dispatch = useDispatch();

  const isLightMode = useSelector((state) => state.gallery.gallery.lightMode);

  const modeHandler = (e) => {
    if (e.currentTarget.value === "true") {
      dispatch(galleryActions.addMode(true));
    } else {
      dispatch(galleryActions.addMode(false));
    }
  };
  return (
    <div className="flex gap-[1rem] ml-[1rem] items-center relative">
      <label
        className="absolute translate-x-[-50%] left-[1rem]"
        htmlFor="lightMode"
      >
        <input
          id="lightMode"
          type="radio"
          name="modeSelector"
          value="true"
          onChange={modeHandler}
          className="hidden"
        />
        <div
          className={`${
            isLightMode
              ? "cursor-pointer w-[1.3rem] h-[1.3rem] text-[0.8rem] flex items-center justify-center rounded-full bg-[#d9d9d9] outline-[2px] outline-[#000000] outline outline-offset-[1.7px]"
              : "cursor-pointer w-[1.7rem] h-[1.7rem] text-[1rem] flex items-center justify-center rounded-full bg-[#d9d9d9]"
          }`}
        >
          <div>
            <BsSun />
          </div>
        </div>
      </label>
      <label
        className="absolute translate-x-[-50%] left-[3.5rem]"
        htmlFor="darkMode"
      >
        <input
          id="darkMode"
          type="radio"
          name="modeSelector"
          value="false"
          onChange={modeHandler}
          className="hidden"
        />
        <div
          className={`${
            !isLightMode
              ? "cursor-pointer w-[1.3rem] h-[1.3rem] text-[0.8rem] text-white bg-black rotate-[30deg] flex items-center justify-center rounded-full outline-[2px] outline-[#000000] outline outline-offset-[1.7px]"
              : "cursor-pointer w-[1.7rem] h-[1.7rem] text-[1rem] text-white bg-black rotate-[30deg] flex items-center justify-center rounded-full"
          }`}
        >
          <div className="translate-y-[-1px] translate-x-[1px]">
            <BsMoon />
          </div>
        </div>
      </label>
    </div>
  );
}

export default ModeSelector;
