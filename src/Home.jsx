import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]); // To maintain original data while filtering
  const [selectedBook, setSelectedBook] = useState(null);

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  useEffect(() => {
    const getBooksData = async () => {
      try {
        const response = await fetch('http://localhost:8000/getbooks/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // CSRF token from cookies
            'Authorization': `Session ${getCookie('sessionid')}`, // Session ID from cookies
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data); // Initialize filteredBooks with the fetched data
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    getBooksData();
  }, []); 

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  // Handle book click to show details
  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-primary text-white text-center py-5">
        <h1>Welcome to the Book Library</h1>
        <p>Discover your next favorite book</p>
      </header>

      <main className="flex-grow-1 container my-4">
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a book..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {!selectedBook ? (
          // Book list view
          <div className="row">
            {filteredBooks.map((book) => (
              <div key={book.id} className="col-md-3 mb-4">
                <div
                  className="card h-100"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleBookClick(book)}
                >
                  {book.image && (
                    <img
                      src={`http://localhost:8000${book.image}`} // Prepend the base URL
                      alt={book.title}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Book detail view
          <div>
            <button
              className="btn btn-secondary mb-4"
              onClick={() => setSelectedBook(null)}
            >
              Back to Books
            </button>
            <div className="card">
              {selectedBook.image && (
                <img
                  src={`http://localhost:8000${selectedBook.image}`} // Corrected the image reference here
                  alt={selectedBook.title}
                  className="card-img-top"
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                />
              )}
              <div className="card-body">
                <h2>{selectedBook.title}</h2>
                <h5>Author: {selectedBook.author}</h5>
                <p><strong>Description:</strong> {selectedBook.description}</p>
                <p><strong>Publication Date:</strong> {selectedBook.publication_date}</p>
                <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
                <p>
                  <strong>Categories:</strong>{' '}
                  {selectedBook.categories.join(', ')}
                </p>
                <p><strong>Created By:</strong> {selectedBook.created_by}</p>
                <hr />
                <h4>Reviews:</h4>
                {selectedBook.reviews.length > 0 ? (
                  selectedBook.reviews.map((review, index) => (
                    <div key={index} className="mb-3">
                      <p><strong>User:</strong> {review.user}</p>
                      <p><strong>Rating:</strong> {review.rating} / 5</p>
                      <p><strong>Review:</strong> {review.review_text}</p>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p>No reviews available for this book.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
