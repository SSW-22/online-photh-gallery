import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { signInWithGoogle, signOutWithGoogle } from "../firebase/googleAuth";
import { auth } from "../firebase/firebase";
import UploadingImages from "./editPage/UploadImages";

function SignIn() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unSub();
    };
  }, []);

  const signInHandler = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const signOutHandler = async () => {
    try {
      await signOutWithGoogle();
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
      <button
        onClick={signOutHandler}
        type="button"
        className="bg-black text-white"
      >
        Log out
      </button>
      {user ? (
        <div>
          <h1>{user.displayName}</h1>
          <h1>{user.email}</h1>
        </div>
      ) : (
        <h1>logged out</h1>
      )}

      <UploadingImages user={user} />
    </>
  );
}

export default SignIn;
