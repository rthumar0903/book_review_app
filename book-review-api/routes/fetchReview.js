const express = require("express");
const router = express.Router();
const Review = require("../models/Review"); // Review model

// Define a route to fetch reviews for a particular book
router.get("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;

    // Query the database for reviews associated with the bookId
    const reviews = await Review.find({ bookId });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
