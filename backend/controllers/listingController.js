const Listing = require("../models/listingModel");

// All Listing
const getListings = async (req, res) => {
  try {
    const { search, user_id } = req.query;

    let data;

    const userIdInt = user_id ? parseInt(user_id) : null;

    if (search && search.trim() !== "") {
      data = await Listing.searchListings(search.trim(), userIdInt);
    } else {
      data = await Listing.getAllListings(userIdInt);
    }

    res.json(data);
  } catch (err) {
    console.error("Error in getListings:", err.message);
    res.status(500).json({ error: "Server error fetching listings" });
  }
};

// Add Listing
const addListing = async (req, res) => {
  try {
    const data = { ...req.body, user_id: req.user.id };
    const newListing = await Listing.createListing(data);
    res.json(newListing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
const removeListing = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const listing = await Listing.getListingById(id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    if (listing.user_id !== userId)
      return res
        .status(403)
        .json({ error: "You can only delete your own listing" });

    const deleted = await Listing.deleteListing(id);
    res.json({ message: "Deleted successfully", data: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const editListing = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const listing = await Listing.getListingById(id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    if (listing.user_id !== userId)
      return res
        .status(403)
        .json({ error: "You can only edit your own listing" });

    const updated = await Listing.updateListing(id, req.body);
    res.json({ message: "Updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getListings, addListing, removeListing, editListing };
