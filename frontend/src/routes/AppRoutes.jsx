import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import RedirectIfAuth from "../components/RedirectIfAuth";
import AddList from "../pages/AddList";
import ListingDetails from "../pages/ListingDetails";
import EditListing from "../pages/EditListing";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = ({ isLoggedIn, setIsLoggedIn, searchText }) => {
  return (
    <Routes>
      <Route path="/" element={<Home searchText={searchText} />} />

      <Route
        path="/login"
        element={
          <RedirectIfAuth isLoggedIn={isLoggedIn}>
            <Login setIsLoggedIn={setIsLoggedIn} />
          </RedirectIfAuth>
        }
      />

      <Route
        path="/signup"
        element={
          <RedirectIfAuth isLoggedIn={isLoggedIn}>
            <Signup setIsLoggedIn={setIsLoggedIn} />
          </RedirectIfAuth>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/addList"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <AddList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <EditListing />
          </ProtectedRoute>
        }
      />

      {/* Public */}
      <Route path="/listing/:id" element={<ListingDetails />} />
    </Routes>
  );
};

export default AppRoutes;
