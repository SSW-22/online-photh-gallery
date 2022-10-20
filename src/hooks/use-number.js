import { useEffect, useState } from "react";
import getAllGalleries from "../firebase/getAllGalleries";

const useNumber = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const getGalleries = async () => {
      const data = await getAllGalleries();
      setNumber(data.length);
    };
    getGalleries();
  }, []);

  return number;
};

export default useNumber;
