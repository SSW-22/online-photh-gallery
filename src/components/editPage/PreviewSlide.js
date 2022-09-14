// eslint-disable-next-line react/prop-types
function PreviewSlide({ images }) {
  return (
    <ul>
      {
        // eslint-disable-next-line react/prop-types
        images.map((image) => (
          <li key={image.title}>
            <img src={URL.createObjectURL(image.imgUrl)} alt="" />
          </li>
        ))
      }
    </ul>
  );
}

export default PreviewSlide;
