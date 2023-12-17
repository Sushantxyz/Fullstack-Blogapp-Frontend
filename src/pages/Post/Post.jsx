import React, { useContext, useEffect, useState } from "react";
import "./Post.scss";
import axios from "axios";
import { Context, server, serverpost } from "../../main";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { category } from "../../assets/data/data.js";

const Post = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [file, setfile] = useState(null);
  const [cat, setcat] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(Context);

  function displaycategory(catdata) {
    if (cat.includes(catdata)) {
      setcat((prev) => prev.filter((c) => c !== catdata));
    } else {
      setcat((prev) => [...prev, catdata]);
    }
  }

  function submithandler(e) {
    e.preventDefault();

    const newPost = {
      username: user,
      title,
      description,
      category: cat,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      axios
        .post(server + "/upload", data, { withCredentials: true })
        .then((data) => {})
        .catch((error) => {
          toast.error("Error updating file ....");
        });
    }
    axios
      .post(serverpost + "/create", newPost, { withCredentials: true })
      .then((data) => {
        toast.success("Posted created !!");
        navigate(`/${data.data.id}`);
      })
      .catch((error) => {
        toast.error("make sure contain is unique !!");
      });
  }

  return (
    <>
      <div className="post">
        <div className={file && "postimg"} >
          {file && <img src={URL.createObjectURL(file)} alt="" />}
        </div>

        <form onSubmit={submithandler}>
          <label htmlFor="fileimg">
            <i className="fa-solid fa-circle-plus"></i>
            {file ? file.name : " Upload Image"}
          </label>

          <div>
            Categories :
            {category.map((data, index) => (
              <span
                key={index}
                className={cat.includes(data.category) ? "selected" : ""}
                onClick={(e) => displaycategory(data.category)}
              >
                {data.category}
              </span>
            ))}
          </div>

          <input
            type="file"
            id="fileimg"
            onChange={(e) => setfile(e.target.files[0])}
            style={{ display: "none" }}
          />

          <input
            type="text"
            placeholder="Title..."
            onChange={(e) => settitle(e.target.value)}
          />

          <textarea
            name=""
            id=""
            placeholder="Write your story..."
            onChange={(e) => setdescription(e.target.value)}
          />

          <button type="submit">Publish</button>
        </form>
      </div>
    </>
  );
};

export default Post;
