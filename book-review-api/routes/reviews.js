const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// POST /api/reviews/:id
// Submit a review for a book
router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user, rating, comment } = req.body;

    // Validate request body
    if (!user || !rating || !comment) {
      return res
        .status(400)
        .json({ message: "User, rating, and comment are required" });
    }

    // Create a new review
    const review = new Review({
      bookId: id,
      user,
      rating,
      comment,
    });

    // Save the review to the database
    await review.save();

    res.status(201).json({ message: "Review submitted successfully", review });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
