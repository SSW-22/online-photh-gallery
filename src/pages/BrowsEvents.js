import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Thumbnail from "../components/Thumbnail";
import getAllGalleries from "../firebase/getAllGalleries";
import arrowImg from "../asset/arrow.png";

const PAGE_PER_GALLERIES = 12;

function BrowseEvents() {
  const [galleries, setGalleries] = useState([]);
  const [maxPage, setMaxPage] = useState();
  const [curPage, setCurPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getGalleries = async () => {
      const data = await getAllGalleries();
      setGalleries(data);
      // after get data from database, set max number of page by data length
      setMaxPage(Math.ceil(data.length / PAGE_PER_GALLERIES));
      setIsLoading(false);
    };
    getGalleries();
    // return () => {
    // };
  }, []);

  const pageLastIndex = curPage * PAGE_PER_GALLERIES;
  const pageFirstIndex = pageLastIndex - PAGE_PER_GALLERIES;
  const pageGalleries = galleries.slice(pageFirstIndex, pageLastIndex);

  const pageHandler = (e) => {
    e.preventDefault();
    if (e.target.alt === "next") setCurPage((prev) => prev + 1);
    if (e.target.alt === "previous") setCurPage((prev) => prev - 1);
  };

  if (isLoading) return <div>Loading</div>;
  return (
    <div className="font-['average'] w-[90%] relative m-auto">
      <div className="my-0 max-w-[1000px] mx-auto flex flex-col">
        <h1 className="text-[1.3rem] h-[7vh] ml-[1.1rem]">Events</h1>
        <div className="grid grid-cols-4 grid-rows-3 gap-4 justify-items-center min-h-[70vh]">
          {pageGalleries &&
            pageGalleries.map((gallery) => (
              <Thumbnail
                key={uuid()}
                title={gallery.title}
                name={gallery.name}
                thumbnailBgColor={gallery.thumbnailBgColor}
                thumbnailTextColor={gallery.thumbnailTextColor}
                images={gallery.images}
                mode="browse"
              />
            ))}
        </div>
        <p className="self-end h-[4vh] mr-[1.1rem]">
          Page {curPage} / {maxPage}
        </p>
      </div>

      {curPage !== maxPage && (
        <button
          className="absolute right-0 top-[50%] hover:animate-bounceRight"
          type="button"
          id="nextPage"
          disabled={curPage === maxPage}
          onClick={pageHandler}
        >
          <span className="sr-only">next</span>
          <img className="w-[50px] h-[50px]" src={arrowImg} alt="next" />
        </button>
      )}

      {curPage !== 1 && (
        <button
          className="absolute left-0 top-[50%] hover:animate-bounceLeft"
          type="button"
          id="prevPage"
          disabled={curPage === 1}
          onClick={pageHandler}
        >
          <span className="sr-only">previous</span>
          <img
            className="w-[50px] h-[50px] rotate-180 "
            src={arrowImg}
            alt="previous"
          />
        </button>
      )}
    </div>
  );
}

export default BrowseEvents;
