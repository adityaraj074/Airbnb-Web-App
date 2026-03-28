import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import "../index.css";

const Signup = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    window.history.replaceState({}, "", "/");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      delete updated.general;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.username.trim()) newErrors.username = "Username is required";
    else if (form.username.trim().length < 3)
      newErrors.username = "Username must be at least 3 characters";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(form.email.trim()))
      newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      const res = await signupUser({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      const errorCode =
        err.response?.data?.error || err.response?.data?.message;

      let newErrors = {};

      if (errorCode === "USERNAME_EXISTS") {
        newErrors.username = "Username already exists";
      } else if (errorCode === "EMAIL_EXISTS") {
        newErrors.email = "Email already exists";
      } else if (errorCode === "USERNAME_TOO_SHORT") {
        newErrors.username = "Username must be at least 3 characters";
      } else if (errorCode === "INVALID_EMAIL") {
        newErrors.email = "Invalid email format";
      } else if (errorCode === "PASSWORD_TOO_SHORT") {
        newErrors.password = "Password must be at least 6 characters";
      } else {
        newErrors.general = "Something went wrong. Try again.";
      }

      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div className="responsive-card" style={styles.card}>
        <h2 style={styles.title}>Sign up</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <input
              className="responsive-input"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              style={styles.input}
            />
            <p style={styles.error}>{errors.username || "\u00A0"}</p>
          </div>

          <div style={styles.field}>
            <input
              className="responsive-input"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
            <p style={styles.error}>{errors.email || "\u00A0"}</p>
          </div>

          <div style={styles.field}>
            <div style={{ position: "relative" }}>
              <input
                className="responsive-input"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                style={styles.input}
              />

              {/* toggle */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eye}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <p style={styles.error}>{errors.password || "\u00A0"}</p>
          </div>

          <p style={styles.errorCenter}>{errors.general || "\u00A0"}</p>

          <button
            className="responsive-btn"
            type="submit"
            style={{
              ...styles.btn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p style={styles.bottom}>
          Already have an account?{" "}
          <Link to="/login" replace style={styles.link}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#f7f7f7",
    boxSizing: "border-box",
    overflowY: "auto",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px 25px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    boxSizing: "border-box",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
  },
  field: {
    marginBottom: "12px",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    padding: "12px",
    background: "#ff385c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "all 0.2s ease",
  },
  bottom: {
    marginTop: "18px",
    textAlign: "center",
    fontSize: "0.9rem",
  },
  link: {
    color: "#ff385c",
    textDecoration: "none",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
    minHeight: "18px",
    margin: "4px 0 0 0",
  },
  errorCenter: {
    color: "red",
    fontSize: "0.85rem",
    textAlign: "center",
    minHeight: "18px",
    marginBottom: "8px",
  },
  eye: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "0.85rem",
    color: "#555",
  },
};

export default Signup;
