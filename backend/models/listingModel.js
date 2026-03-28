const db = require("../config/db");

// All Listings
const getAllListings = async (user_id = null) => {
  try {
    let query = "SELECT * FROM listings";
    const values = [];

    if (user_id) {
      query += " WHERE user_id=$1";
      values.push(user_id);
    }

    query += " ORDER BY id DESC";
    const result = await db.query(query, values);
    return result.rows;
  } catch (err) {
    console.error("Error fetching listings:", err);
    throw err;
  }
};

// Search Listing
const searchListings = async (search, user_id = null) => {
  let query = "SELECT * FROM listings WHERE title ILIKE $1";
  const values = [`%${search}%`];

  if (user_id) {
    query += " AND user_id=$2";
    values.push(user_id);
  }

  query += " ORDER BY id DESC";

  const result = await db.query(query, values);
  return result.rows;
};

// Add Listings
const createListing = async (data) => {
  try {
    const { title, description, image_url, price, location, country, user_id } =
      data;

    if (
      !title ||
      !description ||
      !image_url ||
      !price ||
      !location ||
      !country ||
      !user_id
    ) {
      throw new Error("All fields are required");
    }

    if (isNaN(price)) throw new Error("Price must be a number");

    const result = await db.query(
      `INSERT INTO listings (title, description, image_url, price, location, country, user_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [title, description, image_url, price, location, country, user_id],
    );

    return result.rows[0];
  } catch (err) {
    console.error("Error creating listing:", err);
    throw err;
  }
};

// DELETE
const deleteListing = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM listings WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error deleting listing:", err);
    throw err;
  }
};

// UPDATE
const updateListing = async (id, data) => {
  try {
    const { title, description, image_url, price, location, country } = data;

    if (
      !title ||
      !description ||
      !image_url ||
      !price ||
      !location ||
      !country
    ) {
      throw new Error("All fields are required");
    }

    const result = await db.query(
      `UPDATE listings 
       SET title=$1, description=$2, image_url=$3, price=$4, location=$5, country=$6
       WHERE id=$7 RETURNING *`,
      [title, description, image_url, price, location, country, id],
    );

    return result.rows[0];
  } catch (err) {
    console.error("Error updating listing:", err);
    throw err;
  }
};

const getListingById = async (id) => {
  const result = await db.query("SELECT * FROM listings WHERE id=$1", [id]);
  return result.rows[0];
};

module.exports = {
  getAllListings,
  searchListings,
  createListing,
  deleteListing,
  updateListing,
  getListingById,
};
