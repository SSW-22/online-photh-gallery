// eslint-disable-next-line react/prop-types
function PreviewSlide({ images }) {
  return (
    <ul className="flex border border-black">
      {
        // eslint-disable-next-line react/prop-types
        images.map((image) => (
          <li key={image.title} className="w-[200px] h-[200px] ml-2">
            <img src={image.imgUrl} alt="" />
          </li>
        ))
      }
    </ul>
  );
}

export default PreviewSlide;
