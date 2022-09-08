import { useSelector } from "react-redux";
import { signInWithGoogle } from "../firebase/googleAuth";

function SignIn() {
  const displayName = useSelector((state) => state.auth.displayName);
  const email = useSelector((state) => state.auth.email);
  const uid = useSelector((state) => state.auth.uid);
  const isAuth = useSelector((state) => state.auth.isAuth);

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
