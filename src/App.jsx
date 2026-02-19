import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { trending, popular, topRated } from './data/movies';
import './index.css';

const Browse = () => (
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/browse" 
            element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
