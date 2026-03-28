import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteListing } from "../services/api";
import { toast } from "react-toastify";

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

        <p>{state.description}</p>
        <p>
          <strong>₹{Number(state.price).toLocaleString("en-IN")}</strong>
        </p>
        <p>{state.location}</p>
        <p>{state.country}</p>

        {/* Only show buttons if user is owner */}
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

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
    marginTop: 70,
  },
  card: {
    width: "100%",
    maxWidth: 500,
    border: "1px solid #eee",
    padding: 20,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  title: {
    margin: "0 0 10px 0",
  },
  img: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: 10,
  },
  btnContainer: {
    marginTop: 15,
    display: "flex",
    gap: 10,
  },
  editBtn: {
    flex: 1,
    padding: 10,
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  deleteBtn: {
    flex: 1,
    padding: 10,
    background: "#ff385c",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: 25,
    borderRadius: 10,
    width: 300,
    textAlign: "center",
  },
  modalBtns: {
    display: "flex",
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    padding: 10,
    background: "#ccc",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  confirmBtn: {
    flex: 1,
    padding: 10,
    background: "#ff385c",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default ListingDetails;
