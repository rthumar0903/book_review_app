// routes/books.js
const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET /api/books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
