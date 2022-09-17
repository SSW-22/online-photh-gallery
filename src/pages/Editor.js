import UploadImages from "../components/editPage/UploadImages";
import UploadThumbnail from "../components/editPage/UploadThumbnail";

function Editor() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* <UploadImages /> */}
      <UploadThumbnail />
    </div>
  );
}

export default Editor;
