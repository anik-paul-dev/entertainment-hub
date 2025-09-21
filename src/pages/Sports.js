import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert, Badge, ListGroup } from 'react-bootstrap';
import { sportsApi, handleApiError } from '../services/api';
import VisitorTracker from '../components/VisitorTracker';

const Sports = () => {
  const [sportsData, setSportsData] = useState([]);
  const [filteredSports, setFilteredSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  
  // Sports options
  const sports = [
    { id: 'all', name: 'All Sports' },
    { id: 'football', name: 'Football' },
    { id: 'cricket', name: 'Cricket' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'tennis', name: 'Tennis' },
    { id: 'hockey', name: 'Hockey' },
    { id: 'baseball', name: 'Baseball' },
    { id: 'rugby', name: 'Rugby' },
    { id: 'golf', name: 'Golf' },
    { id: 'boxing', name: 'Boxing' }
  ];

  // Leagues options
  const leagues = [
    { id: 'all', name: 'All Leagues' },
    { id: 'premier-league', name: 'Premier League' },
    { id: 'la-liga', name: 'La Liga' },
    { id: 'nba', name: 'NBA' },
    { id: 'ipl', name: 'IPL' },
    { id: 'nfl', name: 'NFL' },
    { id: 'mlb', name: 'MLB' },
    { id: 'nhl', name: 'NHL' }
  ];

  // Sort options
  const sortOptions = [
    { id: 'popularity', name: 'Most Popular' },
    { id: 'name', name: 'Name (A-Z)' },
    { id: 'league', name: 'League' },
    { id: 'recent', name: 'Recent Activity' }
  ];

  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        setLoading(true);
        
        // Mock sports data (in real app, this would fetch from sports API)
        const mockSportsData = [
          {
            id: 1,
            name: 'Manchester United',
            sport: 'football',
            league: 'premier-league',
            country: 'England',
            founded: 1878,
            stadium: 'Old Trafford',
            capacity: 74140,
            logo: 'https://via.placeholder.com/100x100?text=MU',
            description: 'One of the most successful football clubs in England',
            recentForm: 'WWDLW',
            position: 4
          },
          {
            id: 2,
            name: 'Los Angeles Lakers',
            sport: 'basketball',
            league: 'nba',
            country: 'USA',
            founded: 1947,
            stadium: 'Crypto.com Arena',
            capacity: 20000,
            logo: 'https://via.placeholder.com/100x100?text=LAL',
            description: 'Legendary NBA team with multiple championships',
            recentForm: 'LWWLW',
            position: 3
          },
          {
            id: 3,
            name: 'India National Cricket Team',
            sport: 'cricket',
            league: 'international',
            country: 'India',
            founded: 1932,
            stadium: 'Various',
            capacity: 'N/A',
            logo: 'https://via.placeholder.com/100x100?text=IND',
            description: 'Dominant force in international cricket',
            recentForm: 'WWWWW',
            position: 1
          },
          {
            id: 4,
            name: 'Real Madrid',
            sport: 'football',
            league: 'la-liga',
            country: 'Spain',
            founded: 1902,
            stadium: 'Santiago Bernabéu',
            capacity: 81044,
            logo: 'https://via.placeholder.com/100x100?text=RM',
            description: 'Most successful club in European football',
            recentForm: 'WWWLW',
            position: 1
          },
          {
            id: 5,
            name: 'Novak Djokovic',
            sport: 'tennis',
            league: 'atp',
            country: 'Serbia',
            founded: 'N/A',
            stadium: 'Various',
            capacity: 'N/A',
            logo: 'https://via.placeholder.com/100x100?text=ND',
            description: 'World No. 1 tennis player with multiple Grand Slams',
            recentForm: 'WWWWW',
            position: 1
          },
          {
            id: 6,
            name: 'New York Yankees',
            sport: 'baseball',
            league: 'mlb',
            country: 'USA',
            founded: 1903,
            stadium: 'Yankee Stadium',
            capacity: 46385,
            logo: 'https://via.placeholder.com/100x100?text=NYY',
            description: 'Most successful team in MLB history',
            recentForm: 'WLWLW',
            position: 2
          }
        ];
        
        setSportsData(mockSportsData);
        setFilteredSports(mockSportsData);
        setError(null);
        
      } catch (err) {
        setError(handleApiError(err));
        console.error('Error fetching sports data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsData();
  }, []);

  // Filter and sort sports data
  useEffect(() => {
    let filtered = [...sportsData];

    // Filter by sport
    if (selectedSport !== 'all') {
      filtered = filtered.filter(sport => sport.sport === selectedSport);
    }

    // Filter by league
    if (selectedLeague !== 'all') {
      filtered = filtered.filter(sport => sport.league === selectedLeague);
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(sport => 
        sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sport.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sport.league.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort sports data
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'league':
          return a.league.localeCompare(b.league);
        case 'recent':
          return b.position - a.position;
        default:
          return 0;
      }
    });

    setFilteredSports(filtered);
  }, [selectedSport, selectedLeague, sortBy, searchTerm, sportsData]);

  const getSportIcon = (sport) => {
    const icons = {
      football: 'fas fa-futbol',
      cricket: 'fas fa-baseball-ball',
      basketball: 'fas fa-basketball-ball',
      tennis: 'fas fa-table-tennis',
      hockey: 'fas fa-hockey-puck',
      baseball: 'fas fa-baseball-ball',
      rugby: 'fas fa-football-ball',
      golf: 'fas fa-golf-ball',
      boxing: 'fas fa-fist-raised'
    };
    return icons[sport] || 'fas fa-trophy';
  };

  const getFormBadge = (form) => {
    return form.split('').map((result, index) => {
      let variant = 'secondary';
      if (result === 'W') variant = 'success';
      if (result === 'L') variant = 'danger';
      if (result === 'D') variant = 'warning';
      
      return (
        <Badge key={index} bg={variant} className="me-1">
          {result}
        </Badge>
      );
    });
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading sports data...</p>
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
          <i className="fas fa-football-ball me-2"></i>
          Sports Directory
        </h1>
        <div className="text-muted">
          {filteredSports.length} sports entities found
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search Sports</Form.Label>
                <div className="search-container">
                  <i className="fas fa-search search-icon"></i>
                  <Form.Control
                    type="text"
                    placeholder="Search teams, players, or leagues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Col>
            
            <Col md={3}>
              <Form.Group>
                <Form.Label>Sport</Form.Label>
                <Form.Select 
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                >
                  {sports.map(sport => (
                    <option key={sport.id} value={sport.id}>
                      {sport.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={3}>
              <Form.Group>
                <Form.Label>League</Form.Label>
                <Form.Select 
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(e.target.value)}
                >
                  {leagues.map(league => (
                    <option key={league.id} value={league.id}>
                      {league.name}
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

      {/* Sports Grid */}
      {filteredSports.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-3">
          {filteredSports.map((sport) => (
            <Col key={sport.id}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex align-items-start mb-3">
                    <img 
                      src={sport.logo} 
                      alt={sport.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '15px' }}
                    />
                    <div className="flex-grow-1">
                      <Card.Title className="h5">{sport.name}</Card.Title>
                      <Card.Subtitle className="mb-2">
                        <i className={`${getSportIcon(sport.sport)} me-1`}></i>
                        {sport.sport.charAt(0).toUpperCase() + sport.sport.slice(1)}
                      </Card.Subtitle>
                    </div>
                  </div>
                  
                  <Card.Text className="small text-muted mb-3">
                    {sport.description}
                  </Card.Text>
                  
                  <ListGroup variant="flush" className="mb-3">
                    <ListGroup.Item className="px-0">
                      <strong>Country:</strong> {sport.country}
                    </ListGroup.Item>
                    {sport.founded !== 'N/A' && (
                      <ListGroup.Item className="px-0">
                        <strong>Founded:</strong> {sport.founded}
                      </ListGroup.Item>
                    )}
                    {sport.stadium !== 'N/A' && (
                      <ListGroup.Item className="px-0">
                        <strong>Stadium:</strong> {sport.stadium}
                      </ListGroup.Item>
                    )}
                    {sport.capacity !== 'N/A' && (
                      <ListGroup.Item className="px-0">
                        <strong>Capacity:</strong> {sport.capacity.toLocaleString()}
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                  
                  {sport.recentForm && (
                    <div className="mb-3">
                      <strong>Recent Form:</strong>
                      <div className="mt-1">
                        {getFormBadge(sport.recentForm)}
                      </div>
                    </div>
                  )}
                  
                  {sport.position && (
                    <div className="mb-3">
                      <strong>Current Position:</strong>
                      <Badge bg="primary" className="ms-2">
                        #{sport.position}
                      </Badge>
                    </div>
                  )}
                  
                  <Button variant="primary" className="w-100">
                    <i className="fas fa-info-circle me-2"></i>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">
          <i className="fas fa-info-circle me-2"></i>
          No sports entities found matching your criteria.
        </Alert>
      )}
      
      <VisitorTracker />
    </Container>
  );
};

export default Sports;