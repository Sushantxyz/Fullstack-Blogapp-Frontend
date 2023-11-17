import React, { useContext, useEffect, useState } from "react";
import "../Register/Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../../main";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const { isAuthenticated, setisAuthenticated, setreload } =
    useContext(Context);

  const [strongpassword, setstrongpassword] = useState(false);

  const [registerdata, setregisterdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (checkpasswordstrength(registerdata.password)) {
      setstrongpassword(true);
    } else {
      setstrongpassword(false);
    }
  }, [registerdata.password]);

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
        setreload((prev) => !prev);
      })
      .catch((error) => {
        // toast.error(error.response.data.message);
        console.log(error);
      });
  }

  if (isAuthenticated) return navigate("/");

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
        {!strongpassword && (
          <div style={{marginLeft:"auto",color:"red",paddingRight:"1rem",fontSize:"1rem",marginBlock:"0.5rem"}} >
            <p>Enter Strong password !!</p>
          </div>
        )}
        <button disabled={!strongpassword}>Register</button>
      </form>
    </div>
  );
};

export default Register;

function checkpasswordstrength(pass) {
  const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialchar = "@#$%&!?_";
  const numbers = "0123456789";

  if (pass) {
    if (pass.length >= 8 && alphabets.includes(pass[0])) {
      let num = false;
      let special = false;
      for (let i = 1; i < pass.length; i++) {
        if (specialchar.includes(pass[i])) {
          special = true;
        }
        if (numbers.includes(pass[i])) {
          num = true;
        }
        if (num && special) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
