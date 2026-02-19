import React from 'react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
  return (
    <section className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        <div className="row-slider">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieRow;
