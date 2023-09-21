import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

export const Context = createContext({ isAuthenticated: false });
export const server = "http://localhost:3000/api/v-1";
export const serverpost = "http://localhost:3000/api/v-1/post";

const Appwrapper = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setuser] = useState("");
  const [reload, setreload] = useState("");
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setisAuthenticated,
        user,
        setuser,
        reload,
        setreload,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Appwrapper />
  </React.StrictMode>
);
