import React, { useEffect, useState } from "react";
import "../Update/update.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";
const Update = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [file, setfile] = useState(null);
  const [user, setuser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    function a() {
      axios.get(server + "/getuser", { withCredentials: true }).then((data) => {
        setuser(data.data._user);
      });
    }
    a();
  }, []);

  function submithandler(e) {
    e.preventDefault();
    const newPost = {
      username,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.profilepicture = filename;

      axios
        .post(server + "/upload", data, { withCredentials: true })
        .then(() => {
          toast.success("Updated successsfull !!");
        })
        .catch((error) => {
          toast.error("Error while uploading file ...");
        });
    }
    axios
      .put(server + "/update", newPost, { withCredentials: true })
      .then((data) => {
        navigate(`/`);
        // window.location.reload();
      })
      .catch((error) => {
        toast.error("Error updating file ....");
      });
  }
  return (
    <>
      <div className="update">
        <form action="" onSubmit={submithandler}>
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
            type="text"
            className="updatetext"
            placeholder="Enter Username..."
            onChange={(e) => setusername(e.target.value)}
          />
          <label>Update Password</label>
          <input
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
