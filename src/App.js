import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Anime from './pages/Anime';
import Cartoons from './pages/Cartoons';
import Music from './pages/Music';
import MusicDetails from './pages/MusicDetails';
import Books from './pages/Books';
import Poems from './pages/Poems';
import Weather from './pages/Weather';
import Sports from './pages/Sports';
import LiveScores from './pages/LiveScores';
import TrendAnalyzer from './pages/TrendAnalyzer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/cartoons" element={<Cartoons />} />
          <Route path="/music" element={<Music />} />
          <Route path="/music/:trackId" element={<MusicDetails />} />
          <Route path="/books" element={<Books />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/live-scores" element={<LiveScores />} />
          <Route path="/trend-analyzer" element={<TrendAnalyzer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;