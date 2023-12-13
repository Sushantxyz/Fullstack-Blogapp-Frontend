import React, { useContext, useState } from "react";
import "../Login/Login.scss";
import axios from "axios";
import { Context, server } from "../../main.jsx";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [logindata, setlogindata] = useState({ username: "", password: "" });

  const { isAuthenticated, setisAuthenticated, setreload } =
    useContext(Context);

  const handlechange = (e) => {
    setlogindata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  
  function handlesubmit(e) {
    e.preventDefault();
    axios
      .post(
        server + "/login",
        {
          username: logindata.username,
          password: logindata.password,
        },
        { withCredentials: true }
      )
      .then((data) => {
        setisAuthenticated(true);
        setreload((prev) => !prev);
        <Navigate to={"/"} />;
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    setlogindata({ username: "", password: "" });
  }

  return (
    <>
      <div className="login">
        <form className="loginform" onSubmit={handlesubmit} method="post">
          <label htmlFor="">Username</label>
          <input
            type="text"
            value={logindata.username}
            name="username"
            placeholder="Enter Username..."
            onChange={(e) => handlechange(e)}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={logindata.password}
            name="password"
            placeholder="Enter Password..."
            onChange={(e) => handlechange(e)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;

