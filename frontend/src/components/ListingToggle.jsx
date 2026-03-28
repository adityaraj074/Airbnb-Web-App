import React from "react";

const ListingToggle = ({
  showMyListings,
  setShowMyListings,
  user,
  navigate,
}) => {
  return (
    <div style={styles.toggleWrapper}>
      <button
        style={{
          ...styles.toggleBtn,
          background: !showMyListings ? "#ff385c" : "#eee",
          color: !showMyListings ? "#fff" : "#333",
        }}
        onClick={() => setShowMyListings(false)}
      >
        All Listings
      </button>

      <button
        style={{
          ...styles.toggleBtn,
          background: showMyListings ? "#ff385c" : "#eee",
          color: showMyListings ? "#fff" : "#333",
        }}
        onClick={() => {
          if (!user) return navigate("/login");
          setShowMyListings(true);
        }}
      >
        My Listings
      </button>
    </div>
  );
};

const styles = {
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
};

export default ListingToggle;
