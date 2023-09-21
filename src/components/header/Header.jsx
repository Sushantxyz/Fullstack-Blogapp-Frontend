import React, { useContext, useEffect, useState } from "react";
import "../header/Header.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../../main";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const [openprofile, setopenprofile] = useState(false);
  // const [user, setuser] = useState(false);
  const [userdata, setuserdata] = useState();
  const PF = "http://localhost:3000/images/";
  const token = localStorage.getItem("loginkey");
  const username = localStorage.getItem("userkey");
  const { isAuthenticated, setisAuthenticated, user, setuser } =
    useContext(Context);

  useEffect(() => {
    if (isAuthenticated) {
      // setuser(true);
      axios.get(server + "/getuser", { withCredentials: true }).then((data) => {
        setuserdata(data.data._user.profilepicture);
      });
    } else {
      // navigate("/login");
    }
  }, [isAuthenticated]);

  function handleSignOut() {
    setopenprofile((prev) => !prev);
    // localStorage.removeItem("loginkey");
    // localStorage.removeItem("userkey");

    const data = axios
      .post(
        server + "/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        navigate("/login");
        setisAuthenticated(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  }

  return (
    <>
      <div className="container">
        <div className="logo">Sundar Blog</div>

        {isAuthenticated && (
          <nav className="generalnav">
            <ul>
              <Link
                to={isAuthenticated ? "/" : "/login"}
                style={{ textDecoration: "none" }}
              >
                Home
              </Link>
            </ul>
            <ul>About</ul>
            <ul>Contact Us</ul>
            <ul>
              <Link
                to={isAuthenticated ? `/?username=${username}` : "/login"}
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
                  <img src={PF + userdata} />
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
                  <img src={PF + userdata} />
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
                  to={isAuthenticated ? `/?username=${username}` : "/login"}
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
