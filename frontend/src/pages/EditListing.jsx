import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateListing, getListings } from "../services/api";
import { toast } from "react-toastify";

const EditListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    price: "",
    location: "",
    country: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getListings();

        if (Array.isArray(res.data)) {
          const item = res.data.find((i) => i.id == id);

          if (item) {
            setForm(item);
          } else {
            toast.error("Listing not found");
            navigate("/");
          }
        } else {
          console.error("Invalid data format");
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error("Error fetching listing");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateListing(id, {
        ...form,
        price: Number(form.price),
      });

      // Success toast
      toast.success("Listing updated successfully ✨");

      setTimeout(() => {
        navigate(`/listing/${id}`, { state: form, replace: true });
      }, 1500);
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.error || "Update failed");
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Edit Listing</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            style={styles.input}
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            Update Listing
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: 80,
    display: "flex",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 500,
    padding: 25,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 6,
  },
  textarea: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 6,
  },
  button: {
    padding: 12,
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default EditListing;
