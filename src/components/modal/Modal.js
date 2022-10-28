/* eslint-disable prettier/prettier */
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineX } from "react-icons/hi";
import { modalActions } from "../../store/modalSlice";

function Modal({ modalHandler = null }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modalTitle, modalType, modalText } = useSelector(
    (state) => state.modal
  );

  const modalCloseHandler = () => {
    if (modalType === "return/myevent") {
      navigate("/myevent");
    }
    dispatch(modalActions.toggleModal(false));
    dispatch(modalActions.addModalType(""));
    dispatch(modalActions.addModalTitle(""));
    dispatch(modalActions.addModalText(""));
  };

  return (
    <div
      onClick={modalCloseHandler}
      role="button"
      tabIndex="0"
      className="fixed flex inset-0 z-[10] bg-opacity-70 bg-[#000000] cursor-default"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="button"
        tabIndex="0"
        className="cursor-default translate-y-[-5rem] m-auto flex flex-col justify-between bg-[#ffffff] w-[700px] h-[300px] border-[2px] border-black rounded-[7px]"
      >
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
          {(modalType === "delete" || modalType === "submit") && (
            <button
              className={`${modalType === "delete" && "bg-[#DC3545]"} ${
                (modalType === "submit" || modalType === "return") &&
                "bg-[#0275D8]"
              } cursor-pointer font-['average'] text-white text-[1.2rem] px-[1.7rem] py-[0.7rem] rounded-[5px]`}
              id="draft"
              type="button"
              onClick={(e) => {
                modalHandler(e);
                modalCloseHandler();
              }}
            >
              {modalType === "delete" && "Delete"}
              {modalType === "submit" && "Save as a draft"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
