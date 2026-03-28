import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setAuthLoading(false);
  }, []);

  if (authLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>Loading...</div>
    );
  }

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <AppRoutes
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        searchText={searchText}
      />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default App;
