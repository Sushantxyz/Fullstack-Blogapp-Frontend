import React, { useContext, useState } from "react";
import "./Post.scss";
import axios from "axios";
import { Context, server, serverpost } from "../../main";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Post = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [file, setfile] = useState(null);
  const navigate = useNavigate();
  // const userkey = localStorage.getItem("userkey");
  const { user } = useContext(Context);

  function submithandler(e) {
    e.preventDefault();


    const newPost = {
      username: user,
      title,
      description,
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
        <div className="postimg">
          {file && <img src={URL.createObjectURL(file)} alt="" />}
        </div>

        <form action="" onSubmit={submithandler}>
          <label htmlFor="fileimg">
            <i className="fa-solid fa-circle-plus"></i>
            {file ? file.name : " Upload Image"}
          </label>

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
