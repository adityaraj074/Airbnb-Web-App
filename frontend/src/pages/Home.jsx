import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getListings } from "../services/api";
import ListingCard from "../components/ListingCard";
import "../index.css";
import { styles } from "../styles/HomeStyles";
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
      // console.error(err);
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

        {/* Listings */}
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

export default Home;
