import { NavLink, useLocation } from "react-router-dom";

function GalleryThumbnail() {
  const location = useLocation();
  const { title, name, thumbnailBgColor, thumbnailTextColor } = location.state;

  console.log(name, title, thumbnailBgColor, thumbnailTextColor);
  return (
    <div
      className="h-[100vh] flex items-center relative"
      style={{ backgroundColor: thumbnailBgColor, color: thumbnailTextColor }}
    >
      <h1 className="flex flex-col ml-10">
        <span className="text-[40px]">{name}</span>
        <span className="text-[60px]">{title}</span>
      </h1>
      <NavLink to="/events" className="absolute right-10 top-10">
        Exit
      </NavLink>
      <div className="absolute bottom-10 right-10">Lotating</div>
    </div>
  );
}

export default GalleryThumbnail;
