export const styles = {
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
