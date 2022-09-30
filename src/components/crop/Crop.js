import { useMemo, useState } from "react";
import Cropper from "react-easy-crop";
import Dropdown from "../Dropdown";
import Zoom from "../Zoom";

const aspectRatios = [
  { value: 4 / 3, text: "4:3" },
  { value: 1 / 1, text: "1:1" },
  { value: 4 / 5, text: "4:5" },
  { value: 16 / 9, text: "16:9" },
];

function Crop({ imgUrl, onCropComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(aspectRatios[0]);

  const [ratioOpen, setRatioOpen] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);

  // save url to useMemo to not to re-render
  const url = useMemo(() => {
    if (typeof imgUrl === "string") {
      return imgUrl;
    }
    return URL.createObjectURL(imgUrl);
  }, [imgUrl]);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };
  const onAspectChange = (e) => {
    // const val = e.target.value;
    const val = e.value;
    const ratio = aspectRatios.find((ratio) => ratio.value === +val);
    setAspect(ratio);
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
        {imgUrl && (
          <Cropper
            image={url}
            crop={crop}
            zoom={zoom}
            aspect={aspect.value}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
            objectFit="horizontal-cover"
          />
        )}
      </div>
      <div className="absolute bottom-0 left-0 flex gap-[1rem] p-[1rem]">
        <Dropdown
          options={aspectRatios}
          onAspectChange={onAspectChange}
          ratioOpen={ratioOpen}
          setRatioOpen={setRatioOpen}
          setZoomOpen={setZoomOpen}
        />
        <Zoom
          onZoomChange={onZoomChange}
          zoom={zoom}
          zoomOpen={zoomOpen}
          setRatioOpen={setRatioOpen}
          setZoomOpen={setZoomOpen}
        />
      </div>
    </div>
  );
}

export default Crop;
