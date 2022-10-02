function GalleryZoomedIn({ image }) {
  return (
    <div className="fixed inset-0 w-screen bg-[#F0F0F0] flex items-center justify-center font-['average']">
      <div className="flex flex-col gap-[2.5rem]">
        <div className="drop-shadow-[5px_10px_4px_rgba(0,0,0,0.4)] ">
          <img
            className="object-contain max-w-[900px] max-h-[700px]"
            src={image.imgUrl}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-[0.4rem] drop-shadow-[5px_10px_4px_rgba(0,0,0,0.4)] bg-gradient-to-br from-[#d9d9d9] to-[#ECECED] max-w-[10rem] py-[0.6rem] px-[1rem] self-end">
          <p>{image.title}</p>
          {image.date && (
            <p className="font-[100] text-[0.7rem]">
              {image.date.replaceAll("-", ".")}
            </p>
          )}
          {image.description && (
            <p className="font-[100] text-[0.7rem]">{image.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GalleryZoomedIn;
