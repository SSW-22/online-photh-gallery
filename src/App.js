import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Landing from "./pages/Landing";
import MyEvent from "./pages/MyEvent";
import BrowseEvents from "./pages/BrowsEvents";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/myevent" element={<MyEvent />} />
        <Route path="/events" element={<BrowseEvents />} />
      </Routes>
    </>
  );
}

export default App;
