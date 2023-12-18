import React, { useContext, useEffect, useState } from "react";
import "../Update/Update.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context, server } from "../../main";

const Update = () => {
  const [updatedusername, setupdatedusername] = useState("");
  const [password, setpassword] = useState("");
  const [file, setfile] = useState(null);
  const [image, setimage] = useState(null);
  const navigate = useNavigate();
  const { setreload } = useContext(Context);

  function handlechange(file) {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setimage(reader.result);
      };
    }
  }

  useEffect(() => {
    handlechange(file);
  }, [file]);

  function submithandler(e) {
    e.preventDefault();

    const newPost = {
      updatedusername,
      password,
      profilepicture: image,
    };

    axios
      .put(server + "/update", newPost, { withCredentials: true })
      .then((data) => {
        setreload((prev) => !prev);
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data.message);
      });
  }
  return (
    <>
      <div className="update">
        <form onSubmit={submithandler}>
          <label id="updateimg">
            <i className="fa-solid fa-circle-plus"></i> Update Image
          </label>
          <input
            type="file"
            className="updatefile"
            onChange={(e) => setfile(e.target.files[0])}
          />
          <label>Update Username</label>
          <input
            required
            type="text"
            className="updatetext"
            placeholder="Enter Username..."
            onChange={(e) => setupdatedusername(e.target.value)}
          />
          <label>Update Password</label>
          <input
            required
            type="password"
            className="updatetext"
            placeholder="Enter password..."
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            className="updatebutton"
            style={{ width: "250px", marginTop: "1rem" }}
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default Update;
