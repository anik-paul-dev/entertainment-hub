import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { movieApi, debounce, handleApiError } from '../services/api';
import MediaCard from '../components/MediaCard';
import VisitorTracker from '../components/VisitorTracker';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('popularity.desc');
  
  const navigate = useNavigate();

  // Genre options
  const genres = [
    { id: 'all', name: 'All Genres' },
    { id: '28', name: 'Action' },
    { id: '12', name: 'Adventure' },
    { id: '16', name: 'Animation' },
    { id: '35', name: 'Comedy' },
    { id: '80', name: 'Crime' },
    { id: '99', name: 'Documentary' },
    { id: '18', name: 'Drama' },
    { id: '10751', name: 'Family' },
    { id: '14', name: 'Fantasy' },
    { id: '36', name: 'History' },
    { id: '27', name: 'Horror' },
    { id: '10402', name: 'Music' },
    { id: '9648', name: 'Mystery' },
    { id: '10749', name: 'Romance' },
    { id: '878', name: 'Science Fiction' },
    { id: '53', name: 'Thriller' },
    { id: '10752', name: 'War' },
    { id: '37', name: 'Western' }
  ];

  // Year options
  const currentYear = new Date().getFullYear();
  const years = [
    { id: 'all', name: 'All Years' },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: (currentYear - i).toString(),
      name: (currentYear - i).toString()
    }))
  ];

  // Sort options
  const sortOptions = [
    { id: 'popularity.desc', name: 'Most Popular' },
    { id: 'popularity.asc', name: 'Least Popular' },
    { id: 'vote_average.desc', name: 'Highest Rated' },
    { id: 'vote_average.asc', name: 'Lowest Rated' },
    { id: 'release_date.desc', name: 'Newest First' },
    { id: 'release_date.asc', name: 'Oldest First' }
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const movieData = await movieApi.getPopularMovies(1);
        setMovies(movieData);
        setFilteredMovies(movieData);
        setError(null);
      } catch (err) {
        setError(handleApiError(err));
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Debounced search
  const debouncedSearch = debounce(async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredMovies(movies);
      return;
    }

    try {
      const searchResults = await movieApi.searchMovies(searchTerm);
      setFilteredMovies(searchResults);
    } catch (err) {
      console.error('Error searching movies:', err);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  // Filter movies based on selected filters
  useEffect(() => {
    let filtered = [...movies];

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie => 
        movie.genre_ids?.includes(parseInt(selectedGenre))
      );
    }

    // Filter by year
    if (selectedYear !== 'all') {
      filtered = filtered.filter(movie => {
        const movieYear = new Date(movie.release_date).getFullYear().toString();
        return movieYear === selectedYear;
      });
    }

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity.desc':
          return b.popularity - a.popularity;
        case 'popularity.asc':
          return a.popularity - b.popularity;
        case 'vote_average.desc':
          return b.vote_average - a.vote_average;
        case 'vote_average.asc':
          return a.vote_average - b.vote_average;
        case 'release_date.desc':
          return new Date(b.release_date) - new Date(a.release_date);
        case 'release_date.asc':
          return new Date(a.release_date) - new Date(b.release_date);
        default:
          return 0;
      }
    });

    setFilteredMovies(filtered);
  }, [selectedGenre, selectedYear, sortBy, movies]);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading movies...</p>
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
          <i className="fas fa-film me-2"></i>
          Movies
        </h1>
        <div className="text-muted">
          {filteredMovies.length} movies found
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search Movies</Form.Label>
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

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <Row xs={2} md={3} lg={4} xl={5} className="g-3">
          {filteredMovies.map((movie) => (
            <Col key={movie.id}>
              <div onClick={() => handleMovieClick(movie.id)}>
                <MediaCard item={movie} type="movie" />
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">
          <i className="fas fa-info-circle me-2"></i>
          No movies found matching your criteria.
        </Alert>
      )}
      
      <VisitorTracker />
    </Container>
  );
};

export default Movies;