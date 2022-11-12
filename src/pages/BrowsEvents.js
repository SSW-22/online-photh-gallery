/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import uuid from "react-uuid";
import Thumbnail from "../components/Thumbnail";
import getAllGalleries from "../firebase/getAllGalleries";
import Loading from "../components/Loading";

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
  // const pageGalleries = galleries.slice(pageFirstIndex, pageLastIndex);

  const pageHandler = (e) => {
    e.preventDefault();
    if (
      (e.target.parentNode.parentNode.title || e.target.parentNode.title) ===
      "next"
    )
      setCurPage((prev) => prev + 1);
    if (
      (e.target.parentNode.parentNode.title || e.target.parentNode.title) ===
      "previous"
    )
      setCurPage((prev) => prev - 1);
  };

  if (isLoading)
    return (
      <div className="w-full min-h-[80vh] justify-center flex">
        <Loading />
      </div>
    );

  return (
    <div className="font-['average'] relative flex justify-center 2xl:py-[2rem]">
      <div className="my-0 max-w-[816px] 2xl:max-w-[876px] flex flex-col">
        <h1 className="text-[1.3rem]">Events</h1>
        <div className="flex flex-wrap min-h-[70vh] gap-[1.5rem]">
          {galleries
            .concat(
              new Array(PAGE_PER_GALLERIES * maxPage - galleries.length).fill(
                ""
              )
            )
            .slice(pageFirstIndex, pageLastIndex)
            .map((gallery) => {
              return gallery === "" ? (
                <div
                  key={uuid()}
                  className="w-[185px] h-[180px] 2xl:w-[200px] 2xl:h-[200px] bg-slate-400 opacity-60"
                />
              ) : (
                <Thumbnail
                  key={uuid()}
                  title={gallery.title}
                  subtitle={gallery.subtitle}
                  thumbnailBgColor={gallery.thumbnailBgColor}
                  thumbnailTextColor={gallery.thumbnailTextColor}
                  images={gallery.images}
                  lightMode={gallery.lightMode}
                  email={gallery.email}
                  mode="browse"
                />
              );
            })}
        </div>
        <p className="self-end mr-[1.1rem] mt-[1rem]">
          Page {curPage} / {maxPage}
        </p>
      </div>

      {curPage !== maxPage && (
        <button
          className="absolute right-0 top-[50%] hover:opacity-50 duration-[300ms]"
          type="button"
          id="nextPage"
          disabled={curPage === maxPage}
          onClick={pageHandler}
        >
          <span className="sr-only">next</span>
          <div className="text-[3rem]" title="next">
            <MdOutlineArrowForwardIos />
          </div>
        </button>
      )}

      {curPage !== 1 && (
        <button
          className="absolute left-0 top-[50%] hover:opacity-50 duration-[300ms]"
          type="button"
          id="prevPage"
          disabled={curPage === 0}
          onClick={pageHandler}
        >
          <span className="sr-only">previous</span>
          <div className="text-[3rem]" title="previous">
            <MdOutlineArrowBackIos />
          </div>
        </button>
      )}
    </div>
  );
}

export default BrowseEvents;
