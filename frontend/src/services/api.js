import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get Listings APIs
export const getListings = (searchText = "", userId = null) => {
  const params = new URLSearchParams();
  if (searchText) params.append("search", searchText);
  if (userId) params.append("user_id", userId);

  return API.get(`/listings?${params.toString()}`);
};

// Create Listings APIs
export const createListing = (data) => API.post("/listings", data);

// Delete & Update APIs
export const deleteListing = (id) => API.delete(`/listings/${id}`);
export const updateListing = (id, data) => API.put(`/listings/${id}`, data);

// Auth APIs
export const signupUser = (data) => API.post("/auth/signup", data);
export const loginUser = (data) => API.post("/auth/login", data);
