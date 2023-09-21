import React from "react";
import "../BlogCard/BlogCard.scss";
import { Link, useNavigate } from "react-router-dom";

const BlogCard = ({post}) => {
  const PF = "http://localhost:3000/images/";
  return (
    <>
      <div className="BlogCard">
        <img src={PF + post.photo} alt="" />
        <b>Title : {post.title}</b>
        <span><span>Posted on :</span> {(post.createdAt).split("T")[0]}</span>
        <p>
          Description : {(post.description).slice(0,250)}...
        </p>
      </div>
    </>
  );
};

export default BlogCard;
