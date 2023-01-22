import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <ul className="flex gap-[2rem] justify-center items-center w-full min-h-[2rem] font-['average'] ">
      <li className="flex">
        <p className="pr-[0.2rem] text-[0.8rem] self-center">©</p>
        <p>2022 onlinephotogallery.ca</p>
      </li>
      <li>
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
      <li>
        <NavLink to="/libraries">Third Party Licenses</NavLink>
      </li>
    </ul>
  );
}

export default Footer;
