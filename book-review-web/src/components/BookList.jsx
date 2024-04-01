import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

function BookList({ searchQuery, handleSearch }) {
  const [books, setBooks] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('title');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  const sortedBooks = [...books].sort((a, b) => {
    if (sortCriteria === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === 'author') {
      return a.author.localeCompare(b.author);
    } else if (sortCriteria === 'genre') {
      return a.genre.localeCompare(b.genre);
    }
  });

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const filteredBooks = sortedBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="book-list">
      <h1>Book List</h1>
      <input
        type="text"
        placeholder="Search by title, author, or genre"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <select value={sortCriteria} onChange={handleSortChange}>
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
        <option value="genre">Sort by Genre</option>
        {/* Add more sorting options as needed */}
      </select>
      <div className="grid-container">
        {filteredBooks.map((book) => (
          <Link to={`/book/${book.id}`} state={{book:book}} key={book.id}>
            <BookCard book={book} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookList;
