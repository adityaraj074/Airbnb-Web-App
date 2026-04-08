import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../services/api";
import { toast } from "react-toastify";
import "../index.css";
import { styles } from "../styles/AddListStyles";

const AddList = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    price: "",
    location: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.title) newErrors.title = "Title is required";
    if (!form.image_url) newErrors.image_url = "Image URL is required";
    if (!form.price) newErrors.price = "Price is required";
    if (form.price && form.price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!form.location) newErrors.location = "Location is required";
    if (!form.country) newErrors.country = "Country is required";
    if (!form.description) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      await createListing({
        ...form,
        price: Number(form.price),
      });

      setForm({
        title: "",
        description: "",
        image_url: "",
        price: "",
        location: "",
        country: "",
      });

      // Toast success
      toast.success("Listing added successfully 🎉");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div className="responsive-card-addlist" style={styles.card}>
        <h2 style={styles.heading}>Add New Listing</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Title */}
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.title ? "red" : "#ccc",
            }}
          />
          <p style={styles.fieldError}>{errors.title || "\u00A0"}</p>

          {/* Image URL */}
          <input
            name="image_url"
            placeholder="Image URL"
            value={form.image_url}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.image_url ? "red" : "#ccc",
            }}
          />
          <p style={styles.fieldError}>{errors.image_url || "\u00A0"}</p>

          {/* Price */}
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.price ? "red" : "#ccc",
            }}
          />
          <p style={styles.fieldError}>{errors.price || "\u00A0"}</p>

          {/* Location */}
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.location ? "red" : "#ccc",
            }}
          />
          <p style={styles.fieldError}>{errors.location || "\u00A0"}</p>

          {/* Country */}
          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.country ? "red" : "#ccc",
            }}
          />
          <p style={styles.fieldError}>{errors.country || "\u00A0"}</p>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={{
              ...styles.textarea,
              borderColor: errors.description ? "red" : "#ccc",
            }}
          />
          <p style={styles.fieldError}>{errors.description || "\u00A0"}</p>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Adding..." : "Add Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddList;
