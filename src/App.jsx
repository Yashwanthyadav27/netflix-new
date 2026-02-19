import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import { trending, popular, topRated } from './data/movies';
import './index.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <main className="main-content">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="Popular on Netflix" movies={popular} />
        <MovieRow title="Top Rated" movies={topRated} />
      </main>
    </div>
  );
}

export default App;
