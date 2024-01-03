import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../../main";
import "../header/Header.scss";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const [openprofile, setopenprofile] = useState(false);
  const [userdata, setuserdata] = useState();
  const PF = "https://blogapp-backend-sj5x.onrender.com/images/";

  const {
    isAuthenticated,
    setisAuthenticated,
    user,
    setuser,
    reload,
    setreload,
  } = useContext(Context);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get(server + "/getuser", { withCredentials: true }).then((data) => {
        setuserdata(data.data._user.profilepicture.url);
      });
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, reload]); // need check

  function handleSignOut() {
    setopenprofile((prev) => !prev);

    const data = axios
      .post(
        server + "/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        setisAuthenticated(false);
        setreload((prev) => !prev);
        setuser("");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }
  
  return (
    <>
      <div className="container">
        <div className="logo" onClick={()=>navigate("/")} >
          Sundar Blog
        </div>

        {isAuthenticated && (
          <nav className="generalnav">
            <ul>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                Home
              </Link>
            </ul>
            <ul>About</ul>
            <ul>Contact Us</ul>
            <ul>
              <Link
                to={`/?username=${user}`}
                style={{ textDecoration: "none" }}
              >
                My Pages
              </Link>
            </ul>
          </nav>
        )}

        {!isAuthenticated ? (
          <div className="nav-auth">
            <div className="nav-login">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                Login
              </Link>
            </div>
            <div className="nav-register">
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                Register
              </Link>
            </div>
          </div>
        ) : (
          <div
            className="profile"
            onClick={() => setopenprofile((prev) => !prev)}
          >
            {!openprofile ? (
              <div className="profile-pic">
                {!userdata ? (
                  <i
                    className="fa-solid fa-user"
                    style={{ paddingInline: "0.2rem" }}
                  ></i>
                ) : (
                  <img src={userdata} />
                )}
                <i className="fa-solid fa-magnifying-glass"></i>{" "}
              </div>
            ) : (
              <div className="profile-pic">
                {!userdata ? (
                  <i
                    className="fa-solid fa-user"
                    style={{ paddingInline: "0.2rem" }}
                  ></i>
                ) : (
                  <img src={userdata} />
                )}
                <i className="fa-solid fa-magnifying-glass"></i>{" "}
              </div>
            )}
          </div>
        )}

        {openprofile && (
          <div className="profile-details">
            <ul>
              <li
                className="phonenav nav"
                onClick={() => setopenprofile((prev) => !prev)}
              >
                <i className="fa-solid fa-house"></i>
                <Link
                  to={isAuthenticated ? "/" : "/login"}
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
              </li>

              <li className="nav">
                <i className="fa-solid fa-plus"></i>
                <Link to="/post">
                  <button onClick={() => setopenprofile((prev) => !prev)}>
                    Create Post
                  </button>
                </Link>
              </li>

              <li className="nav">
                <i className="fa-solid fa-pen"></i>
                <Link to="/update">
                  <button onClick={() => setopenprofile((prev) => !prev)}>
                    Update profile
                  </button>
                </Link>
              </li>

              <li
                className="phonenav nav"
                onClick={() => setopenprofile((prev) => !prev)}
              >
                <i className="fa-solid fa-file-circle-plus"></i>
                <Link
                  to={isAuthenticated ? `/?username=${user}` : "/login"}
                  style={{ textDecoration: "none" }}
                >
                  My Pages
                </Link>
              </li>

              <li
                className="phonenav nav"
                onClick={() => setopenprofile((prev) => !prev)}
              >
                <i className="fa-solid fa-message"></i>
                Contact us
              </li>

              <li className="nav">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <button onClick={handleSignOut}>Signout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
