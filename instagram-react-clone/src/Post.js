import React from "react";
import "./Post.css";

function Post() {
  return (
    <div>
      <div className="post">
        <h3>Username</h3>
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
