import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { signInWithGoogle } from "../firebase/googleAuth";
import { auth } from "../firebase/firebase";
import { authActions } from "../store/auth";

function SignIn() {
  const dispatch = useDispatch();
  const displayName = useSelector((state) => state.auth.displayName);
  const email = useSelector((state) => state.auth.email);
  const uid = useSelector((state) => state.auth.uid);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    const authControl = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { displayName, email, uid } = currentUser;
        dispatch(authActions.login({ displayName, email, uid }));
      } else {
        dispatch(authActions.logout());
      }
    });

    return () => {
      authControl();
    };
  }, [dispatch]);

  const signInHandler = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={signInHandler}
        type="button"
        className="bg-black text-white"
      >
        Sign in
      </button>
      <br />

      <div>
        <h1>{displayName}</h1>
        <h1>{email}</h1>
        <h1>{uid}</h1>
        <h1>{isAuth}</h1>
      </div>
    </>
  );
}

export default SignIn;
