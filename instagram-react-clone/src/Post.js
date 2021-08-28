import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";

function Post() {
  return (
    <div>
      <div className="post">
        <div className="post__header">
          <Avatar
            className="post__avatar"
            alt="xinz"
            src="/static/images/avatar/1.jpg"
          />
          <h3>Username</h3>
        </div>
        {/* header: avatar + username */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg1MndL-Xp1JcnqaB0YOqTp6zDjrwYyGKsPA&usqp=CAU"
          alt="react avatar"
          className="post__image"
        />
        {/* image */}

        <h4 className="post__text">
          <strong>xinz</strong> my first post!
        </h4>
        {/* username, caption */}
      </div>
    </div>
  );
}

export default Post;
