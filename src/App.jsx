import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState, lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context, server } from "./main";
import Header from "./components/header/Header";
// import Home from "./pages/Home/Home";
// import Details from "./pages/Details/Details";
// import Login from "./pages/Login/Login";
// import Post from "./pages/Post/Post";
// import Register from "./pages/Register/Register";
// import Update from "./pages/Update/Update";

const Home = lazy(() => import("./pages/Home/Home"));
const Details = lazy(() => import("./pages/Details/Details"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Post = lazy(() => import("./pages/Post/Post.jsx"));
const Update = lazy(() => import("./pages/Update/Update"));
import "./pages/mediaquery.scss";

function App() {
  const [loading, setloading] = useState(true);

  const { isAuthenticated, setuser, setisAuthenticated, reload } =
    useContext(Context);

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
        setloading(false);
        setisAuthenticated(false);
      });
  }, [reload]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<h2>Loading ....</h2>}>
        <Routes>
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
        </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
