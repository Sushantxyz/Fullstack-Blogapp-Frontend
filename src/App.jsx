import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/header/Header";
import Details from "./pages/Details/Details";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Post from "./pages/Post/Post";
import Update from "./pages/Update/Update";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "./pages/mediaquery.scss";
import axios from "axios";
import { Context, server } from "./main";

function App() {
  const [loading, setloading] = useState(true);
  const { isAuthenticated, user, setuser, setisAuthenticated } =
    useContext(Context);

  // console.log(isAuthenticated); this is a bug when reload this is false hence login route is displayed everytime.
  useEffect(() => {
    setloading(true);
    axios
      .get(server + "/getuser", { withCredentials: true })
      .then((data) => {
        setloading(false);
        setisAuthenticated(true);
        setuser(data.data._user.username);
      })
      .catch((error) => {
        // console.error(error.response);
        setloading(false);
        setisAuthenticated(false);
      });
  }, []);

  if (loading){
    return
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/post" element={<Post />} />
                <Route path="/update" element={<Update />} />
                <Route path="/:id" element={<Details />} />
              </>
            ) : (
              <>
                <Route path="/*" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
          </>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;

{
  /* <Route path="/" element={<Home />} />
<Route
  path="/register"
  element={isAuthenticated ? <Home /> : <Register />}
/>
<Route
  path="/login"
  element={isAuthenticated ? <Home /> : <Login />}
/>
<Route path="/post" element={<Post />} />
<Route path="/update" element={<Update />} />
<Route path="/:id" element={<Details />} /> */
}
