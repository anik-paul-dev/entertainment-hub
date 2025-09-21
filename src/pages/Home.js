import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { movieApi, musicApi, booksApi, handleApiError } from '../services/api';
import MediaCard from '../components/MediaCard';
import VisitorTracker from '../components/VisitorTracker';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [music, setMusic] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch movies
        const movieData = await movieApi.getPopularMovies(1);
        setMovies(movieData.slice(0, 10)); // Limit to 10 movies
        
        // Fetch music
        const musicData = await musicApi.getPopularTracks(10);
        setMusic(musicData);
        
        // Fetch books (searching for popular books)
        const booksData = await booksApi.searchBooks('bestsellers', 10);
        setBooks(booksData);
        
        setError(null);
      } catch (err) {
        setError(handleApiError(err));
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const renderSection = (title, data, type, link) => (
    <div className="section-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="section-title">{title}</h2>
        <Link to={link} className="btn btn-outline-primary btn-sm">
          View All <i className="fas fa-arrow-right ms-1"></i>
        </Link>
      </div>
      
      {data.length > 0 ? (
        <Row xs={2} md={3} lg={5} className="g-3">
          {data.map((item, index) => (
            <Col key={`${type}-${index}`}>
              <MediaCard item={item} type={type} />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">No {title.toLowerCase()} available at the moment.</Alert>
      )}
    </div>
  );

  if (loading) {
    return (
      <Container className="py-5">
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading amazing content...</p>
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
    <>
      <Container fluid className="py-4">
        {/* Hero Section */}
        <div className="bg-primary text-white rounded-3 p-5 mb-5 text-center">
          <h1 className="display-4 fw-bold mb-3">
            <i className="fas fa-play-circle me-3"></i>
            Media & Entertainment Hub
          </h1>
          <p className="lead">
            Discover the latest movies, music, books, weather, sports, and more - all in one place!
          </p>
          <Button variant="light" size="lg" className="mt-3">
            Start Exploring <i className="fas fa-rocket ms-2"></i>
          </Button>
        </div>

        {/* Content Sections */}
        {renderSection('Popular Movies', movies, 'movie', '/movies')}
        {renderSection('Trending Music', music, 'music', '/music')}
        {renderSection('Bestselling Books', books, 'book', '/books')}

        {/* Quick Access Grid */}
        <div className="section-container">
          <h2 className="section-title">Quick Access</h2>
          <Row xs={2} md={3} lg={4} className="g-3">
            <Col>
              <Card className="text-center h-100 media-card">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <i className="fas fa-dragon fa-3x text-primary mb-3"></i>
                  <Card.Title>Anime</Card.Title>
                  <Card.Text>Discover amazing anime content</Card.Text>
                  <Link to="/anime" className="btn btn-primary mt-auto">
                    Explore
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center h-100 media-card">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <i className="fas fa-child fa-3x text-success mb-3"></i>
                  <Card.Title>Cartoons</Card.Title>
                  <Card.Text>Fun cartoons for all ages</Card.Text>
                  <Link to="/cartoons" className="btn btn-success mt-auto">
                    Explore
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center h-100 media-card">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <i className="fas fa-feather fa-3x text-warning mb-3"></i>
                  <Card.Title>Poems</Card.Title>
                  <Card.Text>Beautiful poetry collection</Card.Text>
                  <Link to="/poems" className="btn btn-warning mt-auto">
                    Explore
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center h-100 media-card">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <i className="fas fa-cloud-sun fa-3x text-info mb-3"></i>
                  <Card.Title>Weather</Card.Title>
                  <Card.Text>Check weather worldwide</Card.Text>
                  <Link to="/weather" className="btn btn-info mt-auto">
                    Explore
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center h-100 media-card">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <i className="fas fa-football-ball fa-3x text-danger mb-3"></i>
                  <Card.Title>Sports</Card.Title>
                  <Card.Text>Latest sports news</Card.Text>
                  <Link to="/sports" className="btn btn-danger mt-auto">
                    Explore
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center h-100 media-card">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <i className="fas fa-trophy fa-3x text-warning mb-3"></i>
                  <Card.Title>Live Scores</Card.Title>
                  <Card.Text>Real-time match scores</Card.Text>
                  <Link to="/live-scores" className="btn btn-warning mt-auto">
                    Explore
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center h-100 media-card">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <i className="fas fa-chart-line fa-3x text-secondary mb-3"></i>
                  <Card.Title>Trends</Card.Title>
                  <Card.Text>Analyze trending topics</Card.Text>
                  <Link to="/trend-analyzer" className="btn btn-secondary mt-auto">
                    Explore
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center h-100 media-card">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <i className="fas fa-magic fa-3x text-purple mb-3"></i>
                  <Card.Title>AI Insights</Card.Title>
                  <Card.Text>Powered by AI analysis</Card.Text>
                  <Button variant="purple" className="mt-auto">
                    Coming Soon
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
      
      <VisitorTracker />
    </>
  );
};

export default Home;