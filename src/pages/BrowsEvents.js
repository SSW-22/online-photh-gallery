import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import getAllGalleries from "../firebase/getAllGalleries";

function BrowseEvents() {
  const [galleries, setGalleries] = useState([]);
  useEffect(() => {
    const getGalleries = async () => {
      const data = await getAllGalleries();
      setGalleries(data);
    };
    getGalleries();
  }, []);
  return (
    <div className="max-w-[1000px] my-0 mx-auto flex flex-col font-['average'] relative">
      <h1 className="text-[1.3rem] h-[5vh] ml-[1.1rem]">Events</h1>
      <div className="grid grid-cols-4 grid-rows-3 gap-4 justify-items-center min-h-[80vh]">
        {galleries &&
          galleries.map((gallery) => (
            <EventCard
              key={gallery.title}
              title={gallery.title}
              name={gallery.name}
              thumbnailBgColor={gallery.thumbnailBgColor}
              thumbnailTextColor={gallery.thumbnailTextColor}
              mode="browse"
            />
          ))}
      </div>
      <p className="self-end h-[4vh]">Page 1 / 3</p>
      <button type="button" className="absolute right-[-150px] top-[50%]">
        Arrow
      </button>
    </div>
  );
}

export default BrowseEvents;
