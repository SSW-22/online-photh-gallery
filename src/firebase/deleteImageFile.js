import { deleteObject, ref } from "firebase/storage";
import { storage } from "./firebase";

const deleteFile = async (filePath) => {
  const imageRef = ref(storage, filePath);
  try {
    await deleteObject(imageRef);
  } catch (error) {
    console.log(error);
  }
};

export default deleteFile;
