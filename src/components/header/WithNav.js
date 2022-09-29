import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

function WithNav() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
export default WithNav;
