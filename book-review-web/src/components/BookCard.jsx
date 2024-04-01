import React from 'react';

function BookCard({ book }) {
  return (
    <div className="book-card">
      <img src={book.cover} alt={book.title} />
      <div className="book-details">
        <h2>{book.title}</h2>
        <p>By: {book.author}</p>
      </div>
    </div>
  );
}

export default BookCard;
