import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { movieApi, debounce, handleApiError } from '../services/api';
import MediaCard from '../components/MediaCard';
import VisitorTracker from '../components/VisitorTracker';

const Anime = () => {
  const [anime, setAnime] = useState([]);
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('popularity.desc');
  
  const navigate = useNavigate();

  // Anime-specific genres
  const genres = [
    { id: 'all', name: 'All Genres' },
    { id: 'action', name: 'Action' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'drama', name: 'Drama' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'horror', name: 'Horror' },
    { id: 'mystery', name: 'Mystery' },
    { id: 'romance', name: 'Romance' },
    { id: 'sci-fi', name: 'Sci-Fi' },
    { id: 'slice-of-life', name: 'Slice of Life' },
    { id: 'sports', name: 'Sports' },
    { id: 'supernatural', name: 'Supernatural' },
    { id: 'thriller', name: 'Thriller' }
  ];

  // Year options
  const currentYear = new Date().getFullYear();
  const years = [
    { id: 'all', name: 'All Years' },
    ...Array.from({ length: 15 }, (_, i) => ({
      id: (currentYear - i).toString(),
      name: (currentYear - i).toString()
    }))
  ];

  // Sort options
  const sortOptions = [
    { id: 'popularity.desc', name: 'Most Popular' },
    { id: 'popularity.asc', name: 'Least Popular' },
    { id: 'rating.desc', name: 'Highest Rated' },
    { id: 'rating.asc', name: 'Lowest Rated' },
    { id: 'date.desc', name: 'Newest First' },
    { id: 'date.asc', name: 'Oldest First' }
  ];

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        // Using TMDB API with animation genre filter
        const animeData = await movieApi.getAnimeMovies(1);
        setAnime(animeData);
        setFilteredAnime(animeData);
        setError(null);
      } catch (err) {
        setError(handleApiError(err));
        console.error('Error fetching anime:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  // Debounced search
  const debouncedSearch = debounce(async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredAnime(anime);
      return;
    }

    try {
      const searchResults = await movieApi.searchMovies(searchTerm);
      // Filter for animation genre
      const animeResults = searchResults.filter(movie => 
        movie.genre_ids?.includes(16) // 16 is the genre ID for Animation
      );
      setFilteredAnime(animeResults);
    } catch (err) {
      console.error('Error searching anime:', err);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  // Filter and sort anime
  useEffect(() => {
    let filtered = [...anime];

    // Filter by year
    if (selectedYear !== 'all') {
      filtered = filtered.filter(movie => {
        const movieYear = new Date(movie.release_date).getFullYear().toString();
        return movieYear === selectedYear;
      });
    }

    // Sort anime
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity.desc':
          return b.popularity - a.popularity;
        case 'popularity.asc':
          return a.popularity - b.popularity;
        case 'rating.desc':
          return b.vote_average - a.vote_average;
        case 'rating.asc':
          return a.vote_average - b.vote_average;
        case 'date.desc':
          return new Date(b.release_date) - new Date(a.release_date);
        case 'date.asc':
          return new Date(a.release_date) - new Date(b.release_date);
        default:
          return 0;
      }
    });

    setFilteredAnime(filtered);
  }, [selectedYear, sortBy, anime]);

  const handleAnimeClick = (animeId) => {
    navigate(`/anime/${animeId}`);
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading anime...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>
          <i className="fas fa-dragon me-2"></i>
          Anime Movies
        </h1>
        <div className="text-muted">
          {filteredAnime.length} anime found
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search Anime</Form.Label>
                <div className="search-container">
                  <i className="fas fa-search search-icon"></i>
                  <Form.Control
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Col>
            
            <Col md={3}>
              <Form.Group>
                <Form.Label>Genre</Form.Label>
                <Form.Select 
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={3}>
              <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years.map(year => (
                    <option key={year.id} value={year.id}>
                      {year.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={2}>
              <Form.Group>
                <Form.Label>Sort By</Form.Label>
                <Form.Select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map(sort => (
                    <option key={sort.id} value={sort.id}>
                      {sort.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Anime Grid */}
      {filteredAnime.length > 0 ? (
        <Row xs={2} md={3} lg={4} xl={5} className="g-3">
          {filteredAnime.map((movie) => (
            <Col key={movie.id}>
              <div onClick={() => handleAnimeClick(movie.id)}>
                <MediaCard item={movie} type="movie" />
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">
          <i className="fas fa-info-circle me-2"></i>
          No anime found matching your criteria.
        </Alert>
      )}
      
      <VisitorTracker />
    </Container>
  );
};

export default Anime;