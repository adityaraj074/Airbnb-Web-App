import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../index.css";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
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
    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      const res = await loginUser({
        username: form.username.trim(),
        password: form.password.trim(),
      });

      if (res?.data?.token) localStorage.setItem("token", res.data.token);
      if (res?.data?.user)
        localStorage.setItem("user", JSON.stringify(res.data.user));

      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      const errorCode =
        err.response?.data?.error || err.response?.data?.message;

      let newErrors = {};

      if (errorCode === "INVALID_USERNAME") {
        newErrors.general = "Invalid credentials";
      } else if (errorCode === "INVALID_PASSWORD") {
        newErrors.password = "Incorrect password";
      } else if (errorCode === "Invalid credentials") {
        newErrors.general = "Invalid credentials";
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
        <h2 style={styles.title}>Log in</h2>

        {errors.general && <div style={styles.errorBox}>{errors.general}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              style={styles.input}
            />
            <p style={styles.error}>{errors.username || "\u00A0"}</p>
          </div>

          <div style={styles.field}>
            <div style={{ position: "relative" }}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                style={styles.input}
              />

              {/* Toggle */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eye}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <p style={styles.error}>{errors.password || "\u00A0"}</p>
          </div>

          <button
            type="submit"
            style={{
              ...styles.btn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p style={styles.bottom}>
          Don't have an account?{" "}
          <Link to="/signup" replace style={styles.link}>
            Sign up
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
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: 25,
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
  errorBox: {
    background: "#fdecea",
    color: "#d93025",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "0.9rem",
    marginBottom: "15px",
    textAlign: "center",
    border: "1px solid #f5c6cb",
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

export default Login;
