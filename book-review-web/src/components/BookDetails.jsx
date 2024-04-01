import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    user: "",
    rating: "",
    comment: "",
  });
  const location = useLocation()
  const { book } = location?.state||null;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/getreview/${id}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, [id]);

  // Submit review

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.user || !newReview.rating || !newReview.comment) {
      alert("Please fill in all fields.");
      return;
    }

    await axios
      .post(`http://localhost:5000/api/reviews/${id}`, newReview)
      .then((response) => {
        toast("Review posted successfully");
        setReviews([...reviews, response?.data?.review]);
        setNewReview({ user: "", rating: "", comment: "" });
      })
      .catch((error) => {
        console.error("Error submitting review:", error.response.data);
      });
  };

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  return (
    <div className="book-details-container">
      <div className="book-details-box">
        <h1>Book Details</h1>
        <p>Title: {book?.title}</p>
        <p>Author: {book?.author}</p>
        <p>Description: {book?.description}</p>
        <p>Genre : {book?.genre}</p>
      </div>

      <div className="reviews-container">
        <h2>Post Review</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <label>
            User Name:
            <input
              type="text"
              name="user"
              value={newReview.user}
              onChange={handleChange}
            />
          </label>
          <label>
            Rating:
            <input
              type="number"
              min="1"
              max="5"
              name="rating"
              value={newReview.rating}
              onChange={handleChange}
            />
          </label>
          <label>
            Comment:
            <textarea
              name="comment"
              value={newReview.comment}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="submit-button">
            Submit Review
          </button>
        </form>

        <h2>User Reviews</h2>
        <div className="review-boxes-container">
          {reviews?.map((review, index) => (
            <div className="review-box" key={index}>
              <p>User: {review.user}</p>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default BookDetails;
