/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { galleryActions } from "../../store/gallery-slice";

function PreviewSlide({
  deleteImage,
  setImageData,
  addNewImage,
  setSelected,
  selected,
  getInputProps,
  getRootProps,
}) {
  const scrollRef = useRef();
  const images = useSelector((state) => state.gallery.gallery.images);
  const mode = useSelector((state) => state.gallery.gallery.lightMode);
  const dispatch = useDispatch();

  /**  Handling image order by draging image. */
  const handleOnDragEnd = (result) => {
    // Duplicate images
    const previousImages = [...images];
    // Remove and save dragged item content
    const [reorderedItem] = previousImages.splice(result.source.index, 1);
    // Switch the position
    previousImages.splice(result.destination.index, 0, reorderedItem);
    // Update with re-orderd images array into redux
    dispatch(galleryActions.sortImages(previousImages));
  };

  /** function that user can select their previous added image and adjust */
  const onImgClickHandler = (img) => {
    setSelected(img.id);
    setImageData(img);
  };
  /** If user select one of their images from preview slide, other images will be grayout */
  const conditionalClass = (imageId) => {
    if (selected.length === 0 || selected === null || selected === imageId) {
      return "";
    }
    return "opacity-30";
  };

  /** Change scroll direction. */
  const wheelHandler = (e) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const ref = scrollRef.current;
    ref.addEventListener("wheel", wheelHandler);

    return () => {
      ref.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="galleries" direction="horizontal">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <ul
              ref={scrollRef}
              className={`${
                !mode && "bg-gradient-radial from-[#989898] to-[#484848]"
              } flex items-center overflow-x-auto  w-[100%] h-[250px] border border-black`}
            >
              {images.map((image, index) => {
                return (
                  <Draggable
                    key={image.id}
                    draggableId={image.id.replace(/-/g, "").toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        className={`shrink-0 relative ml-20 last:mx-20 ${conditionalClass(
                          image.id
                        )}`}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <img
                          src={image.imgUrl}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          onClick={() => onImgClickHandler(image)}
                          role="presentation"
                          className="max-w-[220px] max-h-[120px] object-contain shadow-xl"
                          // className="max-w-[250px] max-h-[150px] object-contain"
                        />
                        {selected === image.id && (
                          <button
                            className="absolute top-1.5 right-2 bg-[#D9D9D9] py-0.25 px-1.5 rounded-full"
                            type="button"
                            onClick={deleteImage.bind(this, image)}
                          >
                            <span className="sr-only">Remove this Item</span>X
                          </button>
                        )}
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {images.length < 10 && (
                <li className="cursor-pointer text-[50px] shrink-0 relative flex justify-center items-center mx-20 w-[80px] h-[80px] border border-black rounded-full">
                  <div {...getRootProps({ onClick: addNewImage })}>
                    <input {...getInputProps()} />+
                    <span className="sr-only">Add new picture</span>
                  </div>
                </li>
              )}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default PreviewSlide;
