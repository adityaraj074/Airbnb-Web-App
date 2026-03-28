import React from "react";

const LoginPopup = ({ onClose, onLogin }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>Please Login</h2>
        <p>You need to login to add listing.</p>

        <div style={styles.actions}>
          <button onClick={onLogin} style={styles.loginBtn}>
            Go to Login
          </button>
          <button onClick={onClose} style={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
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
    zIndex: 2000,
  },
  popup: {
    background: "#fff",
    padding: 30,
    borderRadius: 10,
    textAlign: "center",
    width: 300,
  },
  actions: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  loginBtn: {
    background: "#ff385c",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: 5,
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#ccc",
    border: "none",
    padding: "10px 15px",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default LoginPopup;
