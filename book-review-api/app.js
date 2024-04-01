// app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/books");
const reviewRoutes = require("./routes/reviews");
const fetchReviewRoutes = require("./routes/fetchReview");
const {
  reviewValidationRules,
  validateReview,
} = require("./validators/reviewValidator");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Connect to MongoDB
const uri =
  "mongodb+srv://thumarraj999:Raj7777@cluster0.hbxnui7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewValidationRules(), validateReview, reviewRoutes);
app.use("/api/getreview", fetchReviewRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
