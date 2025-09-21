import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { movieApi, handleApiError } from '../services/api';
import VisitorTracker from '../components/VisitorTracker';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiExplanation, setAiExplanation] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieData = await movieApi.getMovieDetails(movieId);
        setMovie(movieData);
        setError(null);
      } catch (err) {
        setError(handleApiError(err));
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  const getAiExplanation = async () => {
    if (!movie) return;
    
    setAiLoading(true);
    try {
      // Simulate AI explanation (in real app, this would call an AI service)
      setTimeout(() => {
        setAiExplanation(`This ${movie.genres?.[0]?.name || 'film'} is a compelling story that explores themes of ${movie.overview?.substring(0, 100) || 'human experience'}. Directed by ${movie.director || 'the filmmaker'}, it features outstanding performances and cinematography that brings the narrative to life. The film has been praised for its ${movie.vote_average > 7 ? 'exceptional' : 'solid'} storytelling and emotional depth.`);
        setAiLoading(false);
      }, 2000);
    } catch (err) {
      console.error('Error getting AI explanation:', err);
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading movie details...</p>
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
        <Button variant="primary" onClick={() => navigate('/movies')}>
          Back to Movies
        </Button>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Movie not found.
        </Alert>
        <Button variant="primary" onClick={() => navigate('/movies')}>
          Back to Movies
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Button 
        variant="outline-primary" 
        onClick={() => navigate('/movies')}
        className="mb-4"
      >
        <i className="fas fa-arrow-left me-2"></i>
        Back to Movies
      </Button>

      <Row>
        {/* Movie Poster and Basic Info */}
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ height: '600px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
              }}
            />
            <Card.Body>
              <div className="text-center mb-3">
                <h4>{movie.title}</h4>
                <p className="text-muted">{new Date(movie.release_date).getFullYear()}</p>
              </div>
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <i className="fas fa-star text-warning"></i>
                  <span className="ms-1 fw-bold">{movie.vote_average.toFixed(1)}</span>
                  <span className="text-muted">/10</span>
                </div>
                <div className="text-muted">
                  {movie.vote_count?.toLocaleString()} votes
                </div>
              </div>
              
              <div className="mb-3">
                <h6>Runtime</h6>
                <p>{movie.runtime} minutes</p>
              </div>
              
              <div className="mb-3">
                <h6>Status</h6>
                <Badge bg={movie.status === 'Released' ? 'success' : 'warning'}>
                  {movie.status}
                </Badge>
              </div>
              
              {movie.homepage && (
                <Button 
                  variant="primary" 
                  href={movie.homepage} 
                  target="_blank"
                  className="w-100 mb-2"
                >
                  <i className="fas fa-external-link-alt me-2"></i>
                  Official Website
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Movie Details */}
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <h2 className="mb-3">{movie.title}</h2>
              
              <div className="mb-3">
                <h5>Overview</h5>
                <p>{movie.overview}</p>
              </div>
              
              <div className="mb-3">
                <h5>Genres</h5>
                <div>
                  {movie.genres?.map(genre => (
                    <Badge key={genre.id} bg="secondary" className="me-2 mb-2">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <h5>Release Date</h5>
                <p>{new Date(movie.release_date).toLocaleDateString()}</p>
              </div>
              
              <div className="mb-3">
                <h5>Production Companies</h5>
                <div>
                  {movie.production_companies?.map(company => (
                    <Badge key={company.id} bg="info" className="me-2 mb-2">
                      {company.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <h5>Languages</h5>
                <div>
                  {movie.spoken_languages?.map(language => (
                    <Badge key={language.iso_639_1} bg="warning" className="me-2 mb-2">
                      {language.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* AI Explanation Section */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-robot me-2"></i>
                AI Analysis
              </h5>
            </Card.Header>
            <Card.Body>
              {!aiExplanation ? (
                <div className="text-center">
                  <p>Get AI-powered insights about this movie</p>
                  <Button variant="primary" onClick={getAiExplanation} disabled={aiLoading}>
                    {aiLoading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" />
                        {' '}Analyzing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-magic me-2"></i>
                        Generate AI Analysis
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div>
                  <p>{aiExplanation}</p>
                  <Button variant="outline-primary" size="sm" onClick={getAiExplanation}>
                    <i className="fas fa-sync me-2"></i>
                    Regenerate
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Cast Section */}
          {movie.credits?.cast && movie.credits.cast.length > 0 && (
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-users me-2"></i>
                  Cast
                </h5>
              </Card.Header>
              <Card.Body>
                <Row xs={2} md={3} lg={4} className="g-3">
                  {movie.credits.cast.slice(0, 8).map(actor => (
                    <Col key={actor.id}>
                      <Card className="text-center">
                        <Card.Img
                          variant="top"
                          src={actor.profile_path 
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : 'https://via.placeholder.com/200x300?text=No+Image'
                          }
                          alt={actor.name}
                          style={{ height: '150px', objectFit: 'cover' }}
                        />
                        <Card.Body className="p-2">
                          <Card.Title className="h6">{actor.name}</Card.Title>
                          <Card.Text className="small text-muted">
                            {actor.character}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          )}

          {/* Similar Movies */}
          {movie.similar?.results && movie.similar.results.length > 0 && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-film me-2"></i>
                  Similar Movies
                </h5>
              </Card.Header>
              <Card.Body>
                <Row xs={2} md={3} lg={4} className="g-3">
                  {movie.similar.results.slice(0, 6).map(similarMovie => (
                    <Col key={similarMovie.id}>
                      <Link to={`/movies/${similarMovie.id}`} className="text-decoration-none">
                        <Card className="h-100 media-card">
                          <Card.Img
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w300${similarMovie.poster_path}`}
                            alt={similarMovie.title}
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                          <Card.Body>
                            <Card.Title className="h6 text-dark">{similarMovie.title}</Card.Title>
                            <Card.Text className="small text-muted">
                              <i className="fas fa-star text-warning"></i>
                              {similarMovie.vote_average.toFixed(1)}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      
      <VisitorTracker />
    </Container>
  );
};

export default MovieDetails;