import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { auth, db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button, Input } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { createUserWithEmailAndPassword } from "@firebase/auth";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser);
        // cookie tracking
        // refresh and set state again, persistent.
        // state is non persistent, disappears after refresh
        setUser(authUser);

        if (authUser.displayName) {
          // don't update username.
        } else {
          // if new user
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
        // user has logged out
      }
    });
    return () => {
      // perform some cleanup actions before re-fire useEffect
      unsubscribe();
    };

    // user and username dependencies change here
  }, [user, username]);

  async function getPosts(db) {
    const postsCol = collection(db, "posts");
    const postsSnapshot = await getDocs(postsCol);
    // should return array, then set posts as the returned array.
    // map method only works on arrays.
    setPosts(
      postsSnapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
    );
  }

  useEffect(() => {
    getPosts(db);
    // runs piece of code based on specific condition
    // onSnapshot(snapshot): listener.
    // When document added/changed/modified, update and re-execute code
  }, []);

  const signUp = (event) => {
    // prevent refresh
    event.preventDefault();
    // email, password from state
    createUserWithEmailAndPassword(email, password).catch((err) =>
      alert(err.message)
    );
  };

  // const handleLogin = () => {};

  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                height="60px"
                width="150px"
                alt=""
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* type submit so that form is submitted when you hit enter. */}
            <Button type="submit" onClick={signUp}>
              {" "}
              Sign up!{" "}
            </Button>
          </form>
        </div>
      </Modal>

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

      <Button onClick={() => setOpen(true)}>Sign up</Button>

      {posts.map(({ id, post }) => (
        <Post
          // so that react knows it is a different post (thru id) & does not re-render previous posts.
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
