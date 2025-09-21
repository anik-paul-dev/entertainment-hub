import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { musicApi, handleApiError } from '../services/api';
import VisitorTracker from '../components/VisitorTracker';

const MusicDetails = () => {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiExplanation, setAiExplanation] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { trackId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        setLoading(true);
        const trackData = await musicApi.getTrackDetails(trackId);
        setTrack(trackData);
        setError(null);
      } catch (err) {
        setError(handleApiError(err));
        console.error('Error fetching track details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (trackId) {
      fetchTrackDetails();
    }
  }, [trackId]);

  const getAiExplanation = async () => {
    if (!track) return;
    
    setAiLoading(true);
    try {
      // Simulate AI explanation (in real app, this would call an AI service)
      setTimeout(() => {
        setAiExplanation(`This track "${track.title}" by ${track.artist?.name} is a ${getGenreDescription(track)} piece that showcases ${track.artist?.name}'s unique musical style. The song features ${getMusicalDescription(track)} and has resonated with audiences worldwide, reaching ${track.rank ? `#${track.rank}` : 'high positions'} on music charts. It's a perfect example of contemporary ${track.album?.title ? 'album' : 'music'} production.`);
        setAiLoading(false);
      }, 2000);
    } catch (err) {
      console.error('Error getting AI explanation:', err);
      setAiLoading(false);
    }
  };

  const getGenreDescription = (track) => {
    // This is a simplified genre detection based on title/artist
    const title = track.title?.toLowerCase() || '';
    const artist = track.artist?.name?.toLowerCase() || '';
    
    if (title.includes('love') || title.includes('heart')) return 'romantic';
    if (title.includes('dance') || title.includes('party')) return 'upbeat';
    if (title.includes('sad') || title.includes('cry')) return 'emotional';
    if (artist.includes('rock') || title.includes('rock')) return 'rock';
    if (artist.includes('pop') || title.includes('pop')) return 'pop';
    return 'captivating';
  };

  const getMusicalDescription = (track) => {
    const descriptions = [
      'catchy melodies and rhythmic beats',
      'sophisticated arrangements and harmonies',
      'powerful vocals and dynamic instrumentation',
      'innovative production techniques',
      'memorable hooks and engaging lyrics'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  const handlePlayPreview = () => {
    if (track?.preview) {
      const audio = new Audio(track.preview);
      audio.play();
      setIsPlaying(true);
      
      audio.onended = () => {
        setIsPlaying(false);
      };
    }
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
          <p className="mt-3">Loading track details...</p>
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
        <Button variant="primary" onClick={() => navigate('/music')}>
          Back to Music
        </Button>
      </Container>
    );
  }

  if (!track) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Track not found.
        </Alert>
        <Button variant="primary" onClick={() => navigate('/music')}>
          Back to Music
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Button 
        variant="outline-primary" 
        onClick={() => navigate('/music')}
        className="mb-4"
      >
        <i className="fas fa-arrow-left me-2"></i>
        Back to Music
      </Button>

      <Row>
        {/* Track Cover and Basic Info */}
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={track.album?.cover_big || 'https://via.placeholder.com/300x300?text=No+Image'}
              alt={track.title}
              style={{ height: '400px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
              }}
            />
            <Card.Body>
              <div className="text-center mb-3">
                <h4>{track.title}</h4>
                <p className="text-muted">{track.artist?.name}</p>
              </div>
              
              <div className="d-grid gap-2">
                {track.preview && (
                  <Button 
                    variant="primary" 
                    onClick={handlePlayPreview}
                    disabled={isPlaying}
                  >
                    {isPlaying ? (
                      <>
                        <i className="fas fa-pause me-2"></i>
                        Playing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-play me-2"></i>
                        Play Preview
                      </>
                    )}
                  </Button>
                )}
                
                {track.link && (
                  <Button 
                    variant="outline-primary" 
                    href={track.link} 
                    target="_blank"
                  >
                    <i className="fas fa-external-link-alt me-2"></i>
                    Listen on Deezer
                  </Button>
                )}
              </div>
              
              <div className="mt-3">
                <h6>Track Info</h6>
                <ListGroup variant="flush">
                  <ListGroup.Item className="px-0">
                    <strong>Duration:</strong> {formatDuration(track.duration)}
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0">
                    <strong>Rank:</strong> {track.rank ? `#${track.rank}` : 'N/A'}
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0">
                    <strong>Explicit:</strong> {track.explicit_lyrics ? 'Yes' : 'No'}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Track Details */}
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <h2 className="mb-3">{track.title}</h2>
              
              <div className="mb-3">
                <h5>Artist</h5>
                <p>{track.artist?.name}</p>
              </div>
              
              <div className="mb-3">
                <h5>Album</h5>
                <div className="d-flex align-items-center">
                  <img 
                    src={track.album?.cover_small || 'https://via.placeholder.com/50x50?text=No+Image'}
                    alt={track.album?.title}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                  />
                  <div>
                    <strong>{track.album?.title}</strong>
                    <br />
                    <small className="text-muted">
                      {track.album?.track_count} tracks
                    </small>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <h5>Release Information</h5>
                <p>
                  Released: {track.album?.release_date ? new Date(track.album.release_date).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              
              {track.contributors && track.contributors.length > 0 && (
                <div className="mb-3">
                  <h5>Contributors</h5>
                  <div>
                    {track.contributors.map(contributor => (
                      <Badge key={contributor.id} bg="info" className="me-2 mb-2">
                        {contributor.name} ({contributor.role})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
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
                  <p>Get AI-powered insights about this track</p>
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

          {/* Lyrics Section (Placeholder) */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-file-alt me-2"></i>
                Lyrics
              </h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="info">
                <i className="fas fa-info-circle me-2"></i>
                Lyrics are not available due to copyright restrictions. Please check official sources for lyrics.
              </Alert>
            </Card.Body>
          </Card>

          {/* Similar Tracks */}
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-music me-2"></i>
                More from {track.artist?.name}
              </h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="info">
                <i className="fas fa-info-circle me-2"></i>
                Similar tracks and recommendations would be displayed here in a full implementation.
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <VisitorTracker />
    </Container>
  );
};

export default MusicDetails;