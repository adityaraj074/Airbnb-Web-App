import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getListings } from "../services/api";
import ListingCard from "../components/ListingCard";
import "../index.css";
import Footer from "../components/Footer";
import ListingToggle from "../components/ListingToggle";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchText = queryParams.get("search") || "";

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMyListings, setShowMyListings] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await getListings(
        searchText,
        showMyListings && user ? user.id : null,
      );

      setData(res.data);
      setError(res.data.length === 0 ? "No results found" : "");
    } catch (err) {
      console.error(err);
      setError("Error fetching listings");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [searchText, showMyListings]);

  useEffect(() => {
    const debounce = setTimeout(() => fetchData(), 300);
    return () => clearTimeout(debounce);
  }, [fetchData]);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        {/* Toggle Buttons */}
        <ListingToggle
          showMyListings={showMyListings}
          setShowMyListings={setShowMyListings}
          user={user}
          navigate={navigate}
        />

        {/* Loader */}
        {loading && (
          <div style={styles.loaderWrapper}>
            <div style={styles.loader}></div>
          </div>
        )}

        {/* No Results */}
        {!loading && data.length === 0 && error && (
          <p style={styles.noResult}>{error}</p>
        )}

        {/* Listings Grid */}
        <div className="responsive-container-home" style={styles.container}>
          {!loading &&
            data.length > 0 &&
            data.map((item) => <ListingCard key={item.id} item={item} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    flex: 1,
    marginTop: "60px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
  },

  toggleWrapper: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  toggleBtn: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s",
  },

  container: {
    width: "100%",
    maxWidth: "1400px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px",
    marginTop: "20px",
    justifyContent: "center",
  },

  noResult: {
    gridColumn: "1 / -1",
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
    marginTop: "40px",
  },

  loaderWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },
  loader: {
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #ff385c",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
  },
};

export default Home;
