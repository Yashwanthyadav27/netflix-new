import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} />
      <div className="movie-card-overlay">
        <h4>{movie.title}</h4>
      </div>
    </div>
  );
};

export default MovieCard;
