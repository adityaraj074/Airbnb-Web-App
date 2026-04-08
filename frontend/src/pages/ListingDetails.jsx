import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteListing } from "../services/api";
import { toast } from "react-toastify";
import { styles } from "../styles/ListingDetailStyles";

const ListingDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [showConfirm, setShowConfirm] = useState(false);

  if (!state) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>No Data Found</h2>
    );
  }

  const isOwner = user && user.id === state.user_id;

  const handleDelete = async () => {
    try {
      await deleteListing(state.id);

      toast.success("Listing deleted successfully 🗑️");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    navigate(`/edit/${state.id}`, { state, replace: true });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{state.title}</h2>

        <img src={state.image_url} alt="" style={styles.img} />

        <p style={styles.description}> {state.description}</p>
        <p style={styles.price}>
          ₹{Number(state.price).toLocaleString("en-IN")}
        </p>
        <p style={styles.location}>
          {state.location}, {state.country}
        </p>
        {/* <p style={styles.location}>{state.country}</p> */}

        {/* Only buttons show if user is owner */}
        {isOwner && (
          <div style={styles.btnContainer}>
            <button style={styles.editBtn} onClick={handleEdit}>
              Edit
            </button>

            <button
              style={styles.deleteBtn}
              onClick={() => setShowConfirm(true)}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <p style={{ marginBottom: 20 }}>
              Are you sure you want to delete this listing?
            </p>

            <div style={styles.modalBtns}>
              <button
                style={styles.cancelBtn}
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                style={styles.confirmBtn}
                onClick={() => {
                  setShowConfirm(false);
                  handleDelete();
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
