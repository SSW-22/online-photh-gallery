import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const checkUserGallery = async (userUid) => {
  const docRef = doc(db, "gallery", userUid);
  const docSnap = await getDoc(docRef);
  const initialData = {
    status: "none",
  };
  const data = docSnap.exists() ? docSnap.data() : initialData;
  return {
    ...data,
  };
};

export default checkUserGallery;
