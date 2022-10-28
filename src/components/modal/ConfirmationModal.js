function ConfirmationModal({ showModal, confirmNavigation, cancelNavigation }) {
  const conditionalStyle = showModal ? "fixed" : "hidden";
  return (
    <div
      className={`${conditionalStyle} bg-black bg-opacity-70 inset-0 z-50 flex justify-center items-center font-['average']`}
    >
      <div className="cursor-default translate-y-[-5rem] m-auto flex flex-col justify-between bg-[#ffffff] w-[700px] h-[300px] border-[2px] border-black rounded-[7px]">
        <div className="flex justify-between pr-[1.5rem] pl-[2rem] pt-[1.5rem] pb-[0.5rem] border-b-2">
          <h2 className="text-[2rem]">You have unsaved changes</h2>
          {/* <button
            onClick={modalCloseHandler}
            type="button"
            className="text-[2rem] cursor-pointer"
          >
            <HiOutlineX />
          </button> */}
        </div>
        <p className="text-[1.3rem] px-[2rem]">
          You&apos;ve made updates to your event, but you haven&apos;t saved
          these changes. <br /> Do you want to discard these changes?
        </p>
        <div className="flex justify-end gap-[2rem] pb-[1.2rem] pt-[1rem] pr-[2rem] border-t-2">
          <button
            className="cursor-pointer font-['average'] border-[1.5px] border-[#989898] text-[1.2rem] px-[1.7rem] py-[0.7rem] rounded-[5px]"
            type="button"
            onClick={cancelNavigation}
          >
            Close
          </button>
          <button
            className="bg-[#DC3545] cursor-pointer font-['average'] text-white text-[1.2rem] px-[1.7rem] py-[0.7rem] rounded-[5px]"
            type="button"
            onClick={confirmNavigation}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
