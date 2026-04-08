export const styles = {
  container: {
    marginTop: 60,
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
    minHeight: "calc(100vh - 80px)",
    backgroundColor: "#f7f7f7",
  },

  card: {
    width: "100%",
    maxWidth: 500,
    background: "#fff",
    padding: "20px",
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },

  heading: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: 600,
    textAlign: "center",
    color: "#333",
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  input: {
    padding: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 15,
    outline: "none",
  },

  textarea: {
    padding: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
    minHeight: 60,
    fontSize: 15,
    outline: "none",
    resize: "vertical",
  },

  button: {
    marginTop: 10,
    padding: 14,
    background: "#ff385c",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
  },

  fieldError: {
    color: "red",
    fontSize: 12,
    height: "14px",
    marginTop: "4px",
    marginBottom: "6px",
  },
};
