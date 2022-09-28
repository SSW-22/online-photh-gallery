import { useRef, useEffect } from "react";
import { HiOutlineZoomIn } from "react-icons/hi";

function Zoom({ onZoomChange, zoom, zoomOpen, setRatioOpen, setZoomOpen }) {
  const wrapperRef = useRef(null);
  // click event for close div when click outside of div
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setZoomOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [wrapperRef, setZoomOpen]);
  return (
    <div ref={wrapperRef} className="relative">
      <button
        className={`${
          zoomOpen ? "bg-[#ffffff]" : "bg-[#969696] text-white"
        } text-[0.9rem] w-[25px] h-[25px] flex items-center justify-center rounded-full`}
        onClick={() => {
          setZoomOpen(!zoomOpen);
          setRatioOpen(false);
        }}
        type="button"
      >
        <HiOutlineZoomIn />
      </button>
      {zoomOpen && (
        <div className="absolute bottom-[2rem] flex bg-[#373737] w-[9rem] h-[1.5rem] items-center justify-center rounded-full">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onInput={(e) => {
              onZoomChange(e.target.value);
            }}
            className="slider h-[3px] w-[8rem] color-white accent-white "
          />
        </div>
      )}
    </div>
  );
}

export default Zoom;
