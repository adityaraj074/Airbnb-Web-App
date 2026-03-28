const express = require("express");
const router = express.Router();
const {
  getListings,
  addListing,
  removeListing,
  editListing,
} = require("../controllers/listingController");

const authenticate = require("../middlewares/authMiddleware");

router.get("/", getListings);
router.post("/", authenticate, addListing);

router.delete("/:id", authenticate, removeListing);
router.put("/:id", authenticate, editListing);

module.exports = router;
