import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateListing, getListings } from "../services/api";
import { toast } from "react-toastify";
import { styles } from "../styles/AddListStyles";

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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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
        }
      } catch (err) {
        toast.error("Error fetching listing");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

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
      setUpdating(true);

      await updateListing(id, {
        ...form,
        price: Number(form.price),
      });

      toast.success("Listing updated successfully ✨");

      setTimeout(() => {
        navigate(`/listing/${id}`, { state: form, replace: true });
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={styles.container}>
      <div className="responsive-card-addlist" style={styles.card}>
        <h2 style={styles.heading}>Edit Listing</h2>

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

          <button type="submit" style={styles.button} disabled={updating}>
            {updating ? "Updating..." : "Update Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditListing;
