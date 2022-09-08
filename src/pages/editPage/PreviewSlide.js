// eslint-disable-next-line react/prop-types
function PreviewSlide({ images }) {
  return (
    <ul>
      {
        // eslint-disable-next-line react/prop-types
        images.map((image, index) => (
          <li key={image.title}>
            <img src={URL.createObjectURL(image.imgUrl)} alt="" />
            {/* eslint-disable-next-line react/prop-types */}
          </li>
        ))
      }
    </ul>
  );
}

export default PreviewSlide;
