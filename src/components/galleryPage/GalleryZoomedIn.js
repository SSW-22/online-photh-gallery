import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import { motion } from "framer-motion";
import GalleryZoomedImage from "./GalleryZoomedImage";

function GalleryZoomedIn({
  images,
  curImgIndex,
  setIndex,
  maxImgIndex,
  lightMode,
}) {
  return (
    <motion.div
      className={`${
        lightMode === "true"
          ? "bg-[#F0F0F0]"
          : "bg-gradient-radial from-[#ffffff] to-[#484848]"
      } fixed inset-0 w-screen flex items-center justify-center`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 1,
          duration: 0.2,
        },
      }}
    >
      <GalleryZoomedImage image={images[curImgIndex]} />
      <div className="w-[75%] absolute">
        {curImgIndex !== maxImgIndex && (
          <button
            className="absolute right-0 top-[50%]"
            type="button"
            id="nextPage"
            disabled={curImgIndex === maxImgIndex}
            onClick={setIndex}
          >
            <span className="sr-only">next</span>
            <div
              className="text-[4rem] hover:opacity-50 duration-[300ms]"
              title="next"
            >
              <MdOutlineArrowForwardIos />
            </div>
          </button>
        )}

        {curImgIndex !== 0 && (
          <button
            className="absolute left-0 top-[50%]"
            type="button"
            id="prevPage"
            disabled={curImgIndex === 0}
            onClick={setIndex}
          >
            <span className="sr-only">previous</span>
            <div
              className="text-[4rem] hover:opacity-50 duration-[300ms]"
              title="previous"
            >
              <MdOutlineArrowBackIos />
            </div>
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default GalleryZoomedIn;
