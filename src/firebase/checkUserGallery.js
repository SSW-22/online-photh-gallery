import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const checkUserGallery = async (userUid) => {
  const docRef = doc(db, "gallery", userUid);
  const docSnap = await getDoc(docRef);
  const initialData = {
    status: "none",
    thumbnailBgColor: "",
    thumbnailTextColor: "",
    title: "",
    name: "",
    images: [],
  };

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return initialData;
};

export default checkUserGallery;
