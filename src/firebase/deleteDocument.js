import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

const deleteDocument = async (id) => {
  try {
    await deleteDoc(doc(db, "gallery", id));
    console.log("deleted");
  } catch (error) {
    console.log(error);
  }
};

export default deleteDocument;
