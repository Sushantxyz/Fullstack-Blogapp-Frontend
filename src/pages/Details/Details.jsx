import React, { useContext, useEffect, useState } from "react";
import "../Details/Details.scss";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server, serverpost } from "../../main";
import toast from "react-hot-toast";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setpost] = useState(null);
  const [edit, setedit] = useState(false);
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const userkey = localStorage.getItem("userkey");
  const PF = "http://localhost:3000/images/";

  useEffect(() => {
    async function a() {
      const data = await axios.get(serverpost + `/${id}`, {
        withCredentials: true,
      });
      setpost(data.data.postdata);
    }
    a();
  }, [edit]);

  function deletehandler() {
    const data = axios
      .delete(serverpost + `/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        navigate("/");
      });
  }

  function updatehandler() {
    setedit((prev) => !prev);
    settitle(post.title);
    setdesc(post.description);
  }

  function edithandler() {
    axios
      .put(
        serverpost + `/${id}`,
        {
          title,
          description: desc,
        },
        { withCredentials: true }
      )
      .then((data) => {
        setedit((prev) => !prev);
        toast.success("Updated");
      })
      .catch((error) => {
        toast.error("Make sure to keep title and description unique...");
      });
  }

  return (
    <>
      <div className="Blog-Details">
        {post && <img src={PF + post.photo} alt="" style={{ width: "100%" }} />}{" "}
        <h2>
          {!edit && post && <>Title : {post.title}</>}
          {post && userkey == post.username && (
            <>
              {edit ? (
                <>
                  <input
                    type="text"
                    onChange={(e) => settitle(e.target.value)}
                    value={title}
                    className="titleinput"
                  />
                </>
              ) : (
                <>
                  <div>
                    <button onClick={updatehandler}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button onClick={deletehandler}>
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </h2>
        {post ? (
          <>
            {edit ? (
              <>
                <textarea
                  type=""
                  className="descriptioninput"
                  onChange={(e) => {
                    setdesc(e.target.value);
                  }}
                  value={desc}
                />
              </>
            ) : (
              <p>
                <span>Decription</span> : {post.description}
              </p>
            )}
            <p className="auth">
              Auth :{" "}
              <Link to={`/?username=${post.username}`}>{post.username}</Link>
            </p>

            <p className="posttime">
              Posted on : {post.createdAt.split("T")[0]}
            </p>

            {edit && (
              <button className="updatebutton" onClick={edithandler}>
                Update
              </button>
            )}
          </>
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
    </>
  );
};

export default Details;
