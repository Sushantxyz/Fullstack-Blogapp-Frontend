import React, { useContext, useState } from "react";
import "../Register/Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../../main";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { user, setuser, isAuthenticated, setisAuthenticated } =
    useContext(Context);

  const [registerdata, setregisterdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setregisterdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function handlesubmit(e) {
    e.preventDefault();
    axios
      .post(
        server + "/register",
        {
          username: registerdata.username,
          email: registerdata.email,
          password: registerdata.password,
        },
        { withCredentials: true }
      )
      .then((data) => {
        setisAuthenticated(true);
        navigate("/");

        // localStorage.setItem("loginkey", "123456");
        // localStorage.setItem("userkey", registerdata.username);
        // // window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  }

  return (
    <div className="Register">
      <form className="Registerform" onSubmit={handlesubmit} method="post">
        <label htmlFor="">Username</label>
        <input
          type="text"
          placeholder="Enter Username..."
          onChange={handlechange}
          name="username"
          value={registerdata.username}
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          placeholder="Enter Email..."
          onChange={handlechange}
          name="email"
          value={registerdata.email}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Enter Password..."
          onChange={handlechange}
          name="password"
          value={registerdata.password}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
