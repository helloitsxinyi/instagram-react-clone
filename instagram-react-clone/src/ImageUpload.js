import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "./firebase";
// import firebase from "firebase";

function ImageUpload(username) {
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
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            // add timestamps to sort by timing
            db.collections("posts").add({
              // leave out timestamp for the moment, find fix
              // timestamp: firebase.firestore.FieldValue.serverTimeStamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setImage(null);
            setCaption("");
          });
      }
    );
  };

  return (
    <div>
      {/* want to have */}
      {/* caption input */}
      {/* file picker */}
      {/* post button */}

      {/* html progress tag */}
      <progress value={progress} max="100" />
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
