import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { musicApi, debounce, handleApiError } from '../services/api';
import MediaCard from '../components/MediaCard';
import VisitorTracker from '../components/VisitorTracker';

const Music = () => {
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  
  const navigate = useNavigate();

  // Genre options for music
  const genres = [
    { id: 'all', name: 'All Genres' },
    { id: 'pop', name: 'Pop' },
    { id: 'rock', name: 'Rock' },
    { id: 'hip-hop', name: 'Hip Hop' },
    { id: 'electronic', name: 'Electronic' },
    { id: 'jazz', name: 'Jazz' },
    { id: 'classical', name: 'Classical' },
    { id: 'country', name: 'Country' },
    { id: 'r&b', name: 'R&B' },
    { id: 'reggae', name: 'Reggae' }
  ];

  // Sort options
  const sortOptions = [
    { id: 'popularity', name: 'Most Popular' },
    { id: 'title', name: 'Title (A-Z)' },
    { id: 'artist', name: 'Artist (A-Z)' },
    { id: 'album', name: 'Album (A-Z)' },
    { id: 'duration', name: 'Duration (Longest First)' }
  ];

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const tracksData = await musicApi.getPopularTracks(50);
        setTracks(tracksData);
        setFilteredTracks(tracksData);
        setError(null);
      } catch (err) {
        setError(handleApiError(err));
        console.error('Error fetching tracks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  // Debounced search
  const debouncedSearch = debounce(async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredTracks(tracks);
      return;
    }

    try {
      const searchResults = await musicApi.searchTracks(searchTerm);
      setFilteredTracks(searchResults);
    } catch (err) {
      console.error('Error searching tracks:', err);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  // Filter and sort tracks
  useEffect(() => {
    let filtered = [...tracks];

    // Filter by genre (this is a simplified filter as Deezer API doesn't provide genre in basic response)
    if (selectedGenre !== 'all') {
      // In real implementation, you would filter by actual genre data
      filtered = filtered.filter(track => {
        // This is a placeholder - actual genre filtering would need genre data from API
        return true;
      });
    }

    // Sort tracks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.rank || 0) - (a.rank || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return (a.artist?.name || '').localeCompare(b.artist?.name || '');
        case 'album':
          return (a.album?.title || '').localeCompare(b.album?.title || '');
        case 'duration':
          return (b.duration || 0) - (a.duration || 0);
        default:
          return 0;
      }
    });

    setFilteredTracks(filtered);
  }, [selectedGenre, sortBy, tracks]);

  const handleTrackClick = (trackId) => {
    navigate(`/music/${trackId}`);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading music tracks...</p>
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
          <i className="fas fa-music me-2"></i>
          Music Tracks
        </h1>
        <div className="text-muted">
          {filteredTracks.length} tracks found
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Search Tracks</Form.Label>
                <div className="search-container">
                  <i className="fas fa-search search-icon"></i>
                  <Form.Control
                    type="text"
                    placeholder="Search by title or artist..."
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

      {/* Tracks Grid */}
      {filteredTracks.length > 0 ? (
        <Row xs={1} md={2} lg={3} xl={4} className="g-3">
          {filteredTracks.map((track) => (
            <Col key={track.id}>
              <Card className="h-100 media-card">
                <div style={{ position: 'relative' }}>
                  <Card.Img
                    variant="top"
                    src={track.album?.cover_medium || 'https://via.placeholder.com/300x300?text=No+Image'}
                    alt={track.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Play preview audio if available
                        if (track.preview) {
                          const audio = new Audio(track.preview);
                          audio.play();
                        }
                      }}
                      disabled={!track.preview}
                    >
                      <i className="fas fa-play"></i>
                    </Button>
                  </div>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-truncate" title={track.title}>
                    {track.title}
                  </Card.Title>
                  
                  <Card.Subtitle className="mb-2 text-muted">
                    {track.artist?.name}
                  </Card.Subtitle>
                  
                  <Card.Text className="small text-muted mb-2">
                    Album: {track.album?.title}
                  </Card.Text>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-success">
                      {track.rank ? `#${track.rank}` : 'New'}
                    </span>
                    <span className="text-muted">
                      {formatDuration(track.duration)}
                    </span>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    className="mt-auto"
                    onClick={() => handleTrackClick(track.id)}
                  >
                    View Details <i className="fas fa-arrow-right ms-1"></i>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">
          <i className="fas fa-info-circle me-2"></i>
          No tracks found matching your criteria.
        </Alert>
      )}
      
      <VisitorTracker />
    </Container>
  );
};

export default Music;