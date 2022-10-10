import { useSelector, useDispatch } from "react-redux";
import { galleryActions } from "../../store/gallery-slice";

function Submission({ userEmail }) {
  const userContactSharing = useSelector(
    (state) => state.gallery.gallery.email
  );

  const dispatch = useDispatch();

  /** check if the user want to share their email. */
  const checkInitialValue = () => {
    if (userContactSharing === "") return null;
    return userContactSharing;
  };

  const radioHandler = (e) => {
    const sharingEmail = e.target.value;
    dispatch(galleryActions.addEmail(sharingEmail));
  };

  return (
    <div className="h-[450px] flex flex-col text-[20px]">
      <h2 className="font-normal mt-20">
        Once submitted, your event will be hosted for 7 days unless you choose
        to delete your event. No changes can be made to the event once
        submitted. Please be sure all the information is correct.
      </h2>
      <p className="mt-10">Share your contact: {userEmail}</p>
      <div className="my-4">
        <label htmlFor="yes">
          <input
            id="yes"
            type="radio"
            value="yes"
            name="emailCheck"
            checked={checkInitialValue() === "yes"}
            onChange={radioHandler}
            className="mr-2"
          />
          Yes
        </label>
        <label htmlFor="no" className="ml-4">
          <input
            id="no"
            type="radio"
            value="no"
            name="emailCheck"
            checked={checkInitialValue() === "no"}
            onChange={radioHandler}
            className="mr-2"
          />
          No
        </label>
      </div>
      {checkInitialValue() === null && (
        <p className="text-red-400">Please select an option.</p>
      )}
    </div>
  );
}

export default Submission;
