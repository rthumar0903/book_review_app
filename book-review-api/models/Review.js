const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  bookId: { type: Number, ref: "Book", required: true },
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  // Other fields as needed
});

module.exports = mongoose.model("Review", reviewSchema);
