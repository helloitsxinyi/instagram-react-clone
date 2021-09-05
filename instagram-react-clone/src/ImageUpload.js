import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

function ImageUpload() {
  const [caption, setCaption] = useState();
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = () => {};
  const handleUpload = () => {};

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
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}> Upload </Button>
    </div>
  );
}

export default ImageUpload;
