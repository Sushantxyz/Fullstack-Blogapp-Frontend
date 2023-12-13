import React from "react";
import "../BlogCard/BlogCard.scss";

const BlogCard = ({ post }) => {
  const PF = "https://blogapp-backend-sj5x.onrender.com/images/";
  return (
    <>
      <div className="BlogCard">
        <img loading="lazy" src={PF + post.photo} alt="" />
        <b>Title : {post.title}</b>
        <span>
          <span>Posted on :</span> {post.createdAt.split("T")[0]}
        </span>
        <p>Description : {post.description.slice(0, 150)}...</p>
      </div>
    </>
  );
};

export default BlogCard;
