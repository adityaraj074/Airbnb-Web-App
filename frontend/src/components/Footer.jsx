import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Brand */}
        <div style={styles.section}>
          <h3 style={styles.logo}>WanderStay</h3>
          <p style={styles.text}>
            Discover amazing places around the world and make your journey
            unforgettable.
          </p>
        </div>

        {/* Links */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Company</h4>
          <p style={styles.link}>About</p>
          <p style={styles.link}>Careers</p>
          <p style={styles.link}>Blog</p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Support</h4>
          <p style={styles.link}>Help Center</p>
          <p style={styles.link}>Terms of Service</p>
          <p style={styles.link}>Privacy Policy</p>
        </div>

        {/* Social */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Follow Us</h4>
          <div style={styles.socials}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF style={{ ...styles.icon, color: "#1877F2" }} />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram style={{ ...styles.icon, color: "#E4405F" }} />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn style={{ ...styles.icon, color: "#0A66C2" }} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={styles.bottom}>
        © {new Date().getFullYear()} WanderStay Private Limited. All rights
        reserved.
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "#111827",
    color: "#f9fafb",
    padding: "20px 20px 20px",
    marginTop: "auto",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "30px",
  },

  section: {
    display: "flex",
    flexDirection: "column",
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  heading: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#d1d5db",
  },

  text: {
    fontSize: "14px",
    color: "#9ca3af",
    lineHeight: "1.5",
  },

  link: {
    fontSize: "14px",
    color: "#9ca3af",
    marginBottom: "6px",
    cursor: "pointer",
    transition: "color 0.2s",
  },

  socials: {
    display: "flex",
    gap: "20px",
  },

  icon: {
    fontSize: "20px",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    padding: 5,
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  bottom: {
    marginTop: "30px",
    borderTop: "1px solid #333",
    paddingTop: "15px",
    textAlign: "center",
    fontSize: "13px",
    color: "#6b7280",
  },
};

export default Footer;
