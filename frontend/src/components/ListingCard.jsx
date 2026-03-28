import React from "react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${item.id}`, { state: item });
  };

  return (
    <div
      style={styles.card}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <img src={item.image_url} alt="" style={styles.img} />

      <h4 style={styles.title}>{item.title}</h4>

      <p style={styles.price}>
        ₹{Number(item.price).toLocaleString("en-IN")} / night
      </p>
    </div>
  );
};

const styles = {
  card: {
    cursor: "pointer",
    border: "1px solid #eee",
    padding: 10,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "all 0.25s ease",
  },
  img: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    borderRadius: 10,
  },
  title: {
    margin: "8px 0 4px",
    fontSize: 15,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "gray",
  },
};

export default ListingCard;
