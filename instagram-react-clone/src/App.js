import React, { useState } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "xinz",
      caption: "my first post!",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg1MndL-Xp1JcnqaB0YOqTp6zDjrwYyGKsPA&usqp=CAU",
    },
    {
      username: "xinz",
      caption: "my first post!",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg1MndL-Xp1JcnqaB0YOqTp6zDjrwYyGKsPA&usqp=CAU",
    },
  ]);

  // runs piece of code based on specific condition
  useEffect(() => {}, []);

  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          alt=""
          height="60px"
          width="150px"
          className="app__headerImage"
        />
      </div>

      {posts.map((post) => (
        <Post
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
