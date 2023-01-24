import React from "react";

import "./SinglePost.css";

function SinglePost({ color, name, pantone, year }) {
  console.log(typeof color)
  return (
    <div className="single-post">
      <div className="single-post_color" style={{backgroundColor: `${color}`}}>
      </div>
      <div>
        <p>PANTONE®</p>
        <p>{pantone}</p>
        <p>{name}</p>
        <p>{year}</p>
      </div>
    </div>
  );
}

export default SinglePost;
