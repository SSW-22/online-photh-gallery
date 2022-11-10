/* eslint-disable prettier/prettier */
/* eslint-disable no-console */

import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutWithGoogle } from "../../firebase/googleAuth";
import { authActions } from "../../store/auth";
import { navActions } from "../../store/nav-slice";

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isNavOpen = useSelector((state) => state.nav.isOpen);
  const signOutHandler = async () => {
    try {
      await signOutWithGoogle();
      dispatch(authActions.logout());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.pathname !== "/gallery") {
      dispatch(navActions.toggleNav(true));
    }
  }, [dispatch, location]);

  return (
    <div
      className={`
      h-[5rem] ${
        isNavOpen && location.pathname !== "/gallery" ? "flex" : "hidden"
      } item-center`}
    >
      <ul className="flex justify-between w-[90%] self-center mx-auto text-[20px] font-['average']">
        <li>
          <NavLink to="/">OPG</NavLink>
        </li>
        <div className="flex gap-[7rem]">
          <li>
            <NavLink to="/events">Browse Events</NavLink>
          </li>
          {!isAuth && (
            <li>
              <NavLink to="/signin">Host Your Event at OPG</NavLink>
            </li>
          )}
          {isAuth && (
            <li>
              <NavLink to="/myevent">My event</NavLink>
            </li>
          )}
          {isAuth && (
            <li>
              <button
                onClick={signOutHandler}
                type="button"
                className="font-['average']"
              >
                Log out
              </button>
            </li>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
