import React from 'react';

const About = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-primary text-white text-center py-5">
        <h1>About Us</h1>
        <p>Learn more about the Book Library</p>
      </header>
      <main className="flex-grow-1 container my-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center mb-4">Our Mission</h2>
            <p>
              At Book Library, our mission is to make knowledge and entertainment
              accessible to everyone through the joy of reading. Whether you're a
              casual reader, a literary enthusiast, or someone exploring new genres, we
              aim to provide a platform where you can find and enjoy your favorite books.
            </p>
            <h2 className="text-center mt-5 mb-4">What We Offer</h2>
            <ul>
              <li>Wide range of books from various genres and authors.</li>
              <li>Search and explore books easily using our intuitive interface.</li>
              <li>Personalized experience for readers to find their next favorite read.</li>
              <li>A user-friendly platform for book lovers of all ages.</li>
            </ul>
            <h2 className="text-center mt-5 mb-4">Our Vision</h2>
            <p>
              We believe that books have the power to transform lives, spark creativity, and
              connect people across cultures. Our vision is to create a global community of
              readers and learners who can discover, share, and celebrate the art of storytelling.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
