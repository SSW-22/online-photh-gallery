import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { signInWithGoogle } from "../firebase/googleAuth";
import { checkGallery } from "../store/gallery-slice";

function SignIn() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const uid = useSelector((state) => state.auth.uid);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(checkGallery(uid));
      navigate("/myevent");
    }
  }, [isAuth, navigate, dispatch, uid]);

  const signInHandler = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[80%] flex flex-col items-center justify-center mx-auto mt-[5rem] font-['average'] gap-[10rem]">
      <div className="flex flex-col">
        <h1 className="font-[500] text-[1.5rem] mb-[4rem]">Welcomne to OPG</h1>
        <p className="font-light leading-[2rem]">
          Unleashing the power of digital.
          <br />
          Here at OPG, you can express your works, ideas, and thoughts with just
          a few clicks to a worldwide audience. <br />
          Please note that only one event can be hosted per account. If you
          would like to host your second event, you would need to wait until
          your first event gets expired.
        </p>
      </div>
      <button
        onClick={signInHandler}
        type="button"
        className="text-[1.1rem] bg-[#E1E1E1] h-[3rem] px-[3rem] rounded-full hover:text-[#ffffff] hover:bg-black duration-[500ms]"
      >
        Sign in with your Google account
      </button>
    </div>
  );
}

export default SignIn;
