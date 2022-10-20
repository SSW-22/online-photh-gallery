/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */

import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { galleryActions } from "../../store/gallery-slice";

function PreviewSlide({
  setDeletedItem,
  setImageFiles,
  setImageData,
  addNewPic,
}) {
  const images = useSelector((state) => state.gallery.gallery.images);
  const mode = useSelector((state) => state.gallery.gallery.lightMode);
  const dispatch = useDispatch();
  const removeItem = (image) => {
    // Now the image is deleted only in the gallery store, and the data still remains in Firebase. Only when "Save as draft" or "" is clicked, the data is finally erased and updated with new data.
    const { id, imgUrl } = image;
    // Save deleted image info separately due to check if the deleted image is current data or draft data. That info will be used when the final update occurs by clicking save as draft or post gallery.
    setDeletedItem((prev) => {
      return [...prev, { id, imgUrl }];
    });
    // deleting the image data from gallery redux store.
    dispatch(galleryActions.removeImage(id));
    // Deleting the file that stored in regular state for upload to firebase.
    setImageFiles((prev) => {
      return prev.filter((image) => image.id !== id);
    });
  };
  // Handling image order by draging image.
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
  const onImgClickHandler = (img) => {
    setImageData(img);
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="galleries" direction="horizontal">
        {(provided) => (
          <ul
            className={`${
              !mode && "bg-gradient-radial from-[#989898] to-[#484848]"
            } flex items-center overflow-x-auto  w-[100%] h-[250px] scroll-auto border`}
            {...provided.droppableProps}
            ref={provided.innerRef}
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
                      className="shrink-0 relative ml-20"
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

                      <button
                        className="absolute top-1.5 right-2 bg-[#D9D9D9] py-0.25 px-1.5 rounded-full"
                        type="button"
                        onClick={removeItem.bind(this, image)}
                      >
                        X
                      </button>
                    </li>
                  )}
                </Draggable>
              );
            })}
            <li className="cursor-pointer text-[50px] shrink-0 relative flex justify-center items-center ml-20 w-[80px] h-[80px] border border-black rounded-full">
              <button type="button" onClick={addNewPic}>
                +<span className="sr-only">Add new picture</span>
              </button>
            </li>
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default PreviewSlide;
