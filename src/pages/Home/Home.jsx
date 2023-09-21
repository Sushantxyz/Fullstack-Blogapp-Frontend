import React, { useContext, useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import axios from "axios";
import "../../pages/Home/Home.scss";
import { Link, useLocation } from "react-router-dom";
import { Context, serverpost } from "../../main";
import { Category } from "../../components/Slider/Slider";

const Home = () => {
  const { user, setuser } = useContext(Context);
  const [posts, setposts] = useState([]);

  const location = useLocation();
  useEffect(() => {
    async function a() {
      try {
        const res = await axios.get(serverpost + `/${location.search}`, {
          withCredentials: true,
        });
        setposts(res.data.posts);
      } catch (error) {
        console.log(error);
      }
    }
    a();
  }, [location]);

  return (
    <>
      <Category key="unique-key" />
      <div className="Blogwrapper">
        {posts ? (
          posts.map((post, index) => (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/${post._id}`}
              key={index}
            >
              <BlogCard post={post} />
            </Link>
          ))
        ) : (
          <>
            <h1>Loadings...</h1>
            <p>If it takes too long check internet or reload</p>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
