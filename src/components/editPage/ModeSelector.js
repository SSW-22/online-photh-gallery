import { useDispatch, useSelector } from "react-redux";
import { HiOutlineSun } from "react-icons/hi";
import { MdOutlineNightlight } from "react-icons/md";
import { galleryActions } from "../../store/gallery-slice";

function ModeSelector() {
  const dispatch = useDispatch();

  const lightMode = useSelector((state) => state.gallery.gallery.lightMode);

  const modeHandler = (e) => {
    if (e.currentTarget.value === "true") {
      dispatch(galleryActions.addMode("light"));
    } else {
      dispatch(galleryActions.addMode("dark"));
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
            lightMode === "light"
              ? "cursor-pointer w-[1.3rem] h-[1.3rem] text-[1rem] text-black flex items-center justify-center rounded-full bg-[#D9D9D9] outline-[2px] outline-[#000000] outline outline-offset-[1.7px]"
              : "cursor-pointer w-[1.7rem] h-[1.7rem] text-[1.2rem] text-black flex items-center justify-center rounded-full bg-[#D9D9D9]"
          }`}
        >
          <div>
            <HiOutlineSun />
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
            lightMode === "dark"
              ? "cursor-pointer w-[1.3rem] h-[1.3rem] text-[1rem] text-white bg-[#363636] flex items-center justify-center rounded-full outline-[2px] outline-[#000000] outline outline-offset-[1.7px]"
              : "cursor-pointer w-[1.7rem] h-[1.7rem] text-[1.2rem] text-white bg-[#363636] flex items-center justify-center rounded-full"
          }`}
        >
          <div className="">
            <MdOutlineNightlight />
          </div>
        </div>
      </label>
    </div>
  );
}

export default ModeSelector;
