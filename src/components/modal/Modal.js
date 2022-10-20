import { useDispatch, useSelector } from "react-redux";
import { HiOutlineX } from "react-icons/hi";
import { modalActions } from "../../store/modalSlice";

function Modal({ uploadHandler = null }) {
  const dispatch = useDispatch();
  const { isOpen, modalTitle, isSubmit, modalText } = useSelector(
    (state) => state.modal
  );

  const modalCloseHandler = () => {
    dispatch(modalActions.toggleModal(false));
    dispatch(modalActions.toggleSubmit(false));
    dispatch(modalActions.addModalTitle(""));
    dispatch(modalActions.addModalText(""));
  };

  return (
    <div className="fixed flex inset-0 z-[10] bg-opacity-70 bg-[#000000]">
      <div className="translate-y-[-5rem] m-auto flex flex-col justify-between bg-[#ffffff] w-[700px] h-[300px] border-[2px] border-black rounded-[7px]">
        <div className="flex justify-between pr-[1.5rem] pl-[2rem] pt-[1.5rem] pb-[0.5rem] border-b-2">
          <h2 className="font-['average'] text-[2rem]">{modalTitle}</h2>
          <button
            onClick={modalCloseHandler}
            type="button"
            className="text-[2rem] cursor-pointer"
          >
            <HiOutlineX />
          </button>
        </div>
        <p className="font-['average'] text-[1.3rem] px-[2rem]">{modalText}</p>
        <div className="flex justify-end gap-[2rem] pb-[1.2rem] pt-[1rem] pr-[2rem] border-t-2">
          <button
            className="cursor-pointer font-['average'] border-[1.5px] border-[#989898] text-[1.2rem] px-[1.7rem] py-[0.7rem] rounded-[5px]"
            type="button"
            onClick={modalCloseHandler}
          >
            Close
          </button>
          {isSubmit && (
            <button
              className="cursor-pointer font-['average'] bg-[#0275D8] text-white text-[1.2rem] px-[1.7rem] py-[0.7rem] rounded-[5px]"
              id="draft"
              type="button"
              onClick={(e) => {
                uploadHandler(e);
                modalCloseHandler();
              }}
            >
              Save as a draft
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
