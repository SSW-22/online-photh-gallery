import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase/firebase";
import { authActions } from "./store/auth";

import Editor from "./pages/Editor";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Landing from "./pages/Landing";
import MyEvent from "./pages/MyEvent";
import BrowseEvents from "./pages/BrowsEvents";
import Protected from "./components/Protected";
import { checkGallery } from "./store/gallery-slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authControl = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { displayName, email, uid } = currentUser;
        dispatch(authActions.login({ displayName, email, uid }));
        dispatch(checkGallery(uid));
      } else {
        dispatch(authActions.logout());
      }
    });

    return () => {
      authControl();
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/myevent"
          element={
            <Protected>
              <MyEvent />
            </Protected>
          }
        />
        <Route
          path="/editor"
          element={
            <Protected>
              <Editor />
            </Protected>
          }
        />
        <Route path="/events" element={<BrowseEvents />} />
      </Routes>
    </>
  );
}

export default App;
