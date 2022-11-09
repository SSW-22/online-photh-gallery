/* eslint-disable prettier/prettier */

import { useRef, useEffect, useState } from "react";
import { MdAspectRatio } from "react-icons/md";

function Dropdown({
  options,
  onAspectChange,
  ratioOpen,
  setRatioOpen,
  setZoomOpen,
}) {
  const [selected, setSelected] = useState("");
  const wrapperRef = useRef(null);
  // click event for close div when click outside of div
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setRatioOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [wrapperRef, setRatioOpen]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        className={`${
          ratioOpen ? "bg-[#969696]" : "bg-[#363636]"
        } text-[0.9rem] w-[25px] h-[25px] flex items-center justify-center rounded-full text-white`}
        onClick={() => {
          setRatioOpen(!ratioOpen);
          setZoomOpen(false);
        }}
        type="button"
      >
        <MdAspectRatio />
      </button>
      {ratioOpen && (
        <div className="absolute bg-[#373737] text-[0.7rem] text-white flex flex-col w-[5rem] bottom-[2rem] items-center opacity-90 rounded-[1rem]">
          {options.map((ratio) => (
            <div
              className={`${
                ratio.text === selected ? "text-white" : "text-slate-300"
              } w-full h-[1.7rem] flex border-b border-slate-300 last:border-none`}
              key={ratio.value}
            >
              <button
                className="w-full"
                onClick={() => {
                  onAspectChange(ratio);
                  setSelected(ratio.text);
                }}
                type="button"
              >
                {ratio.text}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
