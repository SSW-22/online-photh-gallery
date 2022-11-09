/* eslint-disable no-console */

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const uploadFileProgress = (file, subFolder, imageName) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `${subFolder}/${imageName}`);
    const upload = uploadBytesResumable(storageRef, file);
    upload.on(
      "state_change",
      () => {
        // setProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);
          resolve(url);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export default uploadFileProgress;
