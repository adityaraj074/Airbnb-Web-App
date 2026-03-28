import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import LoginPopup from "./LoginPopup";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const debounceRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  // Sync search input with URL query
  const params = new URLSearchParams(location.search);
  const searchQueryFromURL = params.get("search") || "";
  const [searchText, setSearchText] = useState(searchQueryFromURL);

  // Update input whenever URL changes
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search") || "";
    setSearchText(query);
  }, [location.search]);

  // Handle search navigation
  const handleSearch = useCallback(
    (value) => {
      if (!value.trim()) {
        navigate("/", { replace: true });
      } else {
        navigate(`/?search=${encodeURIComponent(value.trim())}`, {
          replace: true,
        });
      }
    },
    [navigate],
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => handleSearch(value), 400);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") handleSearch(searchText);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setSearchText("");
    navigate("/");
  };

  const handleAddList = () => {
    if (isLoggedIn) navigate("/addList");
    else setShowPopup(true);
  };

  const handleGoToLogin = () => {
    localStorage.setItem("redirectAfterLogin", "/addList");
    navigate("/login");
    setShowPopup(false);
  };

  return (
    <nav style={styles.nav} aria-label="Main navigation">
      {/* Left Section */}
      <div style={styles.left}>
        <span style={styles.brand}>Explore</span>
      </div>

      {/* Search Section */}
      <div style={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search destinations"
          style={styles.input}
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          aria-label="Search destinations"
        />
        <FiSearch
          style={styles.searchIcon}
          onClick={() => handleSearch(searchText)}
          role="button"
          aria-label="Search"
        />
      </div>

      {/* Right Section */}
      <div style={styles.right}>
        <button onClick={handleAddList} style={styles.addListBtn}>
          Add Airbnb
        </button>

        {!isLoggedIn ? (
          <>
            <Link to="/signup" style={styles.link}>
              SignUp
            </Link>
            <Link to="/login" style={styles.link}>
              LogIn
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        )}
      </div>

      {/* Login Popup */}
      {showPopup && (
        <LoginPopup
          onClose={() => setShowPopup(false)}
          onLogin={handleGoToLogin}
        />
      )}
    </nav>
  );
};

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 2rem",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    boxSizing: "border-box",
  },
  left: { display: "flex", gap: 10, alignItems: "center" },
  brand: {
    fontSize: 18,
    fontWeight: 700,
    color: "#ff385c",
    // cursor: "pointer",
  },
  searchWrapper: {
    position: "relative",
    flex: 1,
    maxWidth: 350,
    margin: "0 1rem",
  },
  input: {
    width: "100%",
    padding: "10px 40px 10px 15px",
    borderRadius: 25,
    border: "1px solid #ccc",
    outline: "none",
    fontSize: 14,
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  searchIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 20,
    color: "#777",
    cursor: "pointer",
    transition: "color 0.2s",
  },
  right: {
    display: "flex",
    gap: 15,
    flexShrink: 0,
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#000",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "color 0.2s",
  },
  addListBtn: {
    background: "#0071c2",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    padding: "8px 12px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "background 0.2s",
  },
  logoutBtn: {
    background: "#ff385c",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    padding: "8px 10px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "background 0.2s",
  },
};

export default Navbar;
