import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { galleryActions } from "../../store/gallery-slice";

function PreviewSlide({ setDeletedItem, setImageFiles }) {
  const images = useSelector((state) => state.gallery.gallery.images);
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
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="galleries" direction="horizontal">
        {(provided) => (
          <ul
            className="flex items-center bg-[#D9D9D9] overflow-x-auto w-[100%] h-[250px] scroll-auto"
            // eslint-disable-next-line react/jsx-props-no-spreading
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
                      className="shrink-0 w-[180px] h-[130px] ml-6 relative"
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...provided.draggableProps}
                      // eslint-disable-next-line react/jsx-props-no-spreading
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
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default PreviewSlide;
