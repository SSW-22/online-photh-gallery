import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase/firebase";
import { authActions } from "./store/auth";

import Gallery from "./pages/Gallery";
import Editor from "./pages/Editor";
import Navbar from "./components/header/Navbar";
import SignIn from "./pages/SignIn";
import Landing from "./pages/Landing";
import MyEvent from "./pages/MyEvent";
import BrowseEvents from "./pages/BrowsEvents";
import Protected from "./components/Protected";
import { checkGallery } from "./store/gallery-slice";
import WithNav from "./components/header/WithNav";
import WithoutNav from "./components/header/WithoutNav";

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
    <Routes>
      <Route element={<WithNav />}>
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
      </Route>
      <Route element={<WithoutNav />}>
        <Route path="/gallery" element={<Gallery />} />
      </Route>
    </Routes>
  );
}

export default App;
