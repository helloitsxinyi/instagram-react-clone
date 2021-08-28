import "./App.css";
import Post from "./Post";

function App() {
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

      <Post />
      {/* Posts */}
      {/* Posts */}
    </div>
  );
}

export default App;
