import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "./firebase";
import { snapshotEqual } from "@firebase/firestore";

function ImageUpload() {
  const [caption, setCaption] = useState();
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  // change event fired when user finishes selecting files.
  // can access files in e.target.files, which is a FileList Object.
  // each item in FileList is a File Object.
  const handleChange = (e) => {
    if (e.target.files[0]) {
      // set only first selected image in upload
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    // listen to state changed. async
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // as state changes, give snapshots of progress.
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        // err function
        console.log(err);
        alert(err.message);
      },
      () => {
        // complete function
        // get download link
        storage.ref("images").child(image.name).getDownloadURL();
      }
    );
  };

  return (
    <div>
      {/* want to have */}
      {/* caption input */}
      {/* file picker */}
      {/* post button */}

      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
      />
      {/* input type file lets user select a file */}
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}> Upload </Button>
    </div>
  );
}

export default ImageUpload;
