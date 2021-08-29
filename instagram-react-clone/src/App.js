import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [posts, setPosts] = useState([]);

  async function getPosts(db) {
    const postsCol = collection(db, "posts");
    const postsSnapshot = await getDocs(postsCol);
    // should return array, then set posts as the returned array.
    // map method only works on arrays.
    setPosts(postsSnapshot.docs.map((doc) => doc.data()));
  }

  useEffect(() => {
    getPosts(db);
    // runs piece of code based on specific condition
    // onSnapshot(snapshot): listener.
    // When document added/changed/modified, update and re-execute code
    // db.collection("posts").onSnapshot((snapshot) => {
    //   // data gives properties of document. eg caption, username
    //   setPosts(snapshot.docs.map((doc) => doc.data()));
    // });
  }, []);

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
