import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";

function Post({ username, caption, imageUrl }) {
  return (
    <div>
      <div className="post">
        <div className="post__header">
          <Avatar
            className="post__avatar"
            alt={username}
            src="/static/images/avatar/1.jpg"
          />
          <h3>{username}</h3>
        </div>
        {/* header: avatar + username */}
        <img src={imageUrl} alt="react avatar" className="post__image" />
        {/* image */}

        <h4 className="post__text">
          <strong>{username}</strong> {caption}!
        </h4>
        {/* username, caption */}
      </div>
    </div>
  );
}

export default Post;
