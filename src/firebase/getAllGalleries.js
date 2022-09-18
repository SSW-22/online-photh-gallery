import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

const getAllGalleries = async () => {
  const galleries = [];
  const q = query(collection(db, "gallery"), where("status", "==", "hosted"));
  const docSnaps = await getDocs(q);
  // const docSnaps = await getDocs(collection(db, "gallery"));
  docSnaps.forEach((item) => galleries.push(item.data()));
  return galleries;
};

export default getAllGalleries;
