import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, ListGroup, Tabs, Tab } from 'react-bootstrap';
import { sportsApi, handleApiError } from '../services/api';
import VisitorTracker from '../components/VisitorTracker';

const LiveScores = () => {
  const [liveScores, setLiveScores] = useState([]);
  const [completedMatches, setCompletedMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSport, setSelectedSport] = useState('all');
  const [aiAnalysis, setAiAnalysis] = useState({});
  const [aiLoading, setAiLoading] = useState(false);

  // Sports options
  const sports = [
    { id: 'all', name: 'All Sports' },
    { id: 'football', name: 'Football' },
    { id: 'cricket', name: 'Cricket' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'tennis', name: 'Tennis' },
    { id: 'hockey', name: 'Hockey' }
  ];

  useEffect(() => {
    fetchSportsData();
    
    // Set up auto-refresh every 30 seconds for live scores
    const interval = setInterval(fetchSportsData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchSportsData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration (in real app, this would fetch from sports API)
      const mockLiveScores = [
        {
          id: 1,
          event: 'Manchester United vs Liverpool',
          sport: 'football',
          league: 'Premier League',
          score: '2 - 1',
          status: 'Live',
          minute: '78',
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          homeScore: 2,
          awayScore: 1,
          homeLogo: 'https://via.placeholder.com/50x50?text=MU',
          awayLogo: 'https://via.placeholder.com/50x50?text=LIV'
        },
        {
          id: 2,
          event: 'India vs Australia',
          sport: 'cricket',
          league: 'Test Match',
          score: '245/7',
          status: 'Live',
          minute: 'Day 3',
          homeTeam: 'India',
          awayTeam: 'Australia',
          homeScore: 245,
          awayScore: 7,
          homeLogo: 'https://via.placeholder.com/50x50?text=IND',
          awayLogo: 'https://via.placeholder.com/50x50?text=AUS'
        },
        {
          id: 3,
          event: 'Lakers vs Celtics',
          sport: 'basketball',
          league: 'NBA',
          score: '98 - 102',
          status: 'Live',
          minute: '4th Qtr',
          homeTeam: 'Lakers',
          awayTeam: 'Celtics',
          homeScore: 98,
          awayScore: 102,
          homeLogo: 'https://via.placeholder.com/50x50?text=LAL',
          awayLogo: 'https://via.placeholder.com/50x50?text=BOS'
        }
      ];

      const mockCompletedMatches = [
        {
          id: 4,
          event: 'Chelsea vs Arsenal',
          sport: 'football',
          league: 'Premier League',
          score: '3 - 1',
          status: 'Completed',
          date: '2024-01-15',
          homeTeam: 'Chelsea',
          awayTeam: 'Arsenal',
          homeScore: 3,
          awayScore: 1,
          homeLogo: 'https://via.placeholder.com/50x50?text=CHE',
          awayLogo: 'https://via.placeholder.com/50x50?text=ARS'
        },
        {
          id: 5,
          event: 'England vs South Africa',
          sport: 'cricket',
          league: 'ODI',
          score: '280/8 - 265',
          status: 'Completed',
          date: '2024-01-14',
          homeTeam: 'England',
          awayTeam: 'South Africa',
          homeScore: 280,
          awayScore: 265,
          homeLogo: 'https://via.placeholder.com/50x50?text=ENG',
          awayLogo: 'https://via.placeholder.com/50x50?text=SA'
        }
      ];

      const mockUpcomingMatches = [
        {
          id: 6,
          event: 'Barcelona vs Real Madrid',
          sport: 'football',
          league: 'La Liga',
          score: 'vs',
          status: 'Upcoming',
          date: '2024-01-20',
          time: '20:00',
          homeTeam: 'Barcelona',
          awayTeam: 'Real Madrid',
          homeLogo: 'https://via.placeholder.com/50x50?text=BAR',
          awayLogo: 'https://via.placeholder.com/50x50?text=RMA'
        },
        {
          id: 7,
          event: 'India vs Pakistan',
          sport: 'cricket',
          league: 'T20',
          score: 'vs',
          status: 'Upcoming',
          date: '2024-01-21',
          time: '14:30',
          homeTeam: 'India',
          awayTeam: 'Pakistan',
          homeLogo: 'https://via.placeholder.com/50x50?text=IND',
          awayLogo: 'https://via.placeholder.com/50x50?text=PAK'
        }
      ];

      setLiveScores(mockLiveScores);
      setCompletedMatches(mockCompletedMatches);
      setUpcomingMatches(mockUpcomingMatches);
      setError(null);
      
    } catch (err) {
      setError(handleApiError(err));
      console.error('Error fetching sports data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getAiMatchAnalysis = async (match) => {
    setAiLoading(true);
    try {
      // Simulate AI analysis (in real app, this would call an AI service)
      setTimeout(() => {
        const analysis = {
          summary: `This ${match.sport} match between ${match.homeTeam} and ${match.awayTeam} is showing ${getMatchIntensity(match)} intensity. ${getTeamPerformance(match)}`,
          keyPlayers: getKeyPlayers(match),
          prediction: getMatchPrediction(match),
          stats: getMatchStats(match)
        };
        setAiAnalysis(prev => ({...prev, [match.id]: analysis}));
        setAiLoading(false);
      }, 2000);
    } catch (err) {
      console.error('Error getting AI analysis:', err);
      setAiLoading(false);
    }
  };

  const getMatchIntensity = (match) => {
    const intensities = ['high', 'medium', 'low'];
    return intensities[Math.floor(Math.random() * intensities.length)];
  };

  const getTeamPerformance = (match) => {
    const performances = [
      'Both teams are showing strong defensive capabilities',
      'The home team has been dominating possession',
      'It\'s a closely contested match with momentum shifting',
      'The away team is creating more scoring opportunities'
    ];
    return performances[Math.floor(Math.random() * performances.length)];
  };

  const getKeyPlayers = (match) => {
    const players = {
      football: ['Key striker', 'Midfield maestro', 'Defensive rock'],
      cricket: ['Star batsman', 'Lead bowler', 'Wicket-keeper'],
      basketball: ['Point guard', 'Center forward', 'Shooting guard'],
      tennis: ['Server', 'Return specialist', 'Net player']
    };
    return players[match.sport] || players.football;
  };

  const getMatchPrediction = (match) => {
    const predictions = [
      'Based on current form, the home team has a slight advantage',
      'This match could go either way depending on key moments',
      'The away team\'s recent performance suggests they might take this',
      'It\'s likely to be a draw given both teams\' current form'
    ];
    return predictions[Math.floor(Math.random() * predictions.length)];
  };

  const getMatchStats = (match) => {
    const stats = {
      football: ['Possession: 52% - 48%', 'Shots: 12 - 8', 'Corners: 6 - 4'],
      cricket: ['Run Rate: 4.5', 'Wickets: 7', 'Overs: 45'],
      basketball: ['Field Goal %: 45%', 'Rebounds: 35 - 32', 'Assists: 18 - 15'],
      tennis: ['Aces: 8 - 5', 'Double Faults: 2 - 4', 'Winners: 25 - 22']
    };
    return stats[match.sport] || stats.football;
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Live': 'danger',
      'Completed': 'success',
      'Upcoming': 'primary'
    };
    return variants[status] || 'secondary';
  };

  const getSportIcon = (sport) => {
    const icons = {
      football: 'fas fa-futbol',
      cricket: 'fas fa-baseball-ball',
      basketball: 'fas fa-basketball-ball',
      tennis: 'fas fa-table-tennis',
      hockey: 'fas fa-hockey-puck'
    };
    return icons[sport] || 'fas fa-trophy';
  };

  const filteredMatches = (matches) => {
    if (selectedSport === 'all') return matches;
    return matches.filter(match => match.sport === selectedSport);
  };

  const MatchCard = ({ match }) => (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Badge bg={getStatusBadge(match.status)} className="mb-2">
              {match.status}
            </Badge>
            <h6 className="mb-1">{match.league}</h6>
            <small className="text-muted">{match.date || match.minute}</small>
          </div>
          <i className={`${getSportIcon(match.sport)} fa-2x text-primary`}></i>
        </div>
        
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="text-center">
            <img 
              src={match.homeLogo} 
              alt={match.homeTeam}
              style={{ width: '40px', height: '40px', objectFit: 'cover', marginBottom: '5px' }}
            />
            <div className="fw-bold">{match.homeTeam}</div>
          </div>
          
          <div className="text-center">
            <div className="h3 mb-0">{match.score}</div>
            {match.status === 'Live' && (
              <small className="text-danger">
                <i className="fas fa-circle me-1"></i>
                {match.minute}
              </small>
            )}
          </div>
          
          <div className="text-center">
            <img 
              src={match.awayLogo} 
              alt={match.awayTeam}
              style={{ width: '40px', height: '40px', objectFit: 'cover', marginBottom: '5px' }}
            />
            <div className="fw-bold">{match.awayTeam}</div>
          </div>
        </div>
        
        <div className="d-flex gap-2">
          <Button 
            variant="outline-primary" 
            size="sm"
            onClick={() => getAiMatchAnalysis(match)}
            disabled={aiLoading}
          >
            <i className="fas fa-robot me-1"></i>
            AI Analysis
          </Button>
          <Button variant="outline-info" size="sm">
            <i className="fas fa-chart-line me-1"></i>
            Stats
          </Button>
        </div>
        
        {aiAnalysis[match.id] && (
          <div className="mt-3 p-3 bg-light rounded">
            <h6><i className="fas fa-magic me-2"></i>AI Analysis</h6>
            <p className="small mb-2">{aiAnalysis[match.id].summary}</p>
            <div className="mb-2">
              <strong>Key Players:</strong>
              <ul className="small mb-0">
                {aiAnalysis[match.id].keyPlayers.map((player, idx) => (
                  <li key={idx}>{player}</li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <strong>Prediction:</strong>
              <p className="small mb-0">{aiAnalysis[match.id].prediction}</p>
            </div>
            <div>
              <strong>Key Stats:</strong>
              <ul className="small mb-0">
                {aiAnalysis[match.id].stats.map((stat, idx) => (
                  <li key={idx}>{stat}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <Container className="py-5">
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading live scores...</p>
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
          <i className="fas fa-trophy me-2"></i>
          Live Scores
        </h1>
        <Button variant="outline-primary" onClick={fetchSportsData}>
          <i className="fas fa-sync me-2"></i>
          Refresh
        </Button>
      </div>

      {/* Sport Filter */}
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex flex-wrap gap-2">
            {sports.map(sport => (
              <Button
                key={sport.id}
                variant={selectedSport === sport.id ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setSelectedSport(sport.id)}
              >
                {sport.name}
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Live Scores Tabs */}
      <Tabs defaultActiveKey="live" className="mb-4">
        <Tab eventKey="live" title={`Live (${filteredMatches(liveScores).length})`}>
          {filteredMatches(liveScores).length > 0 ? (
            filteredMatches(liveScores).map(match => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <Alert variant="info">
              <i className="fas fa-info-circle me-2"></i>
              No live matches at the moment.
            </Alert>
          )}
        </Tab>
        
        <Tab eventKey="completed" title={`Completed (${filteredMatches(completedMatches).length})`}>
          {filteredMatches(completedMatches).length > 0 ? (
            filteredMatches(completedMatches).map(match => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <Alert variant="info">
              <i className="fas fa-info-circle me-2"></i>
              No completed matches found.
            </Alert>
          )}
        </Tab>
        
        <Tab eventKey="upcoming" title={`Upcoming (${filteredMatches(upcomingMatches).length})`}>
          {filteredMatches(upcomingMatches).length > 0 ? (
            filteredMatches(upcomingMatches).map(match => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <Alert variant="info">
              <i className="fas fa-info-circle me-2"></i>
              No upcoming matches found.
            </Alert>
          )}
        </Tab>
      </Tabs>

      {/* Quick Stats */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <i className="fas fa-fire fa-2x text-danger mb-2"></i>
              <h4>{liveScores.length}</h4>
              <p className="mb-0">Live Matches</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <i className="fas fa-check-circle fa-2x text-success mb-2"></i>
              <h4>{completedMatches.length}</h4>
              <p className="mb-0">Completed Today</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <i className="fas fa-clock fa-2x text-primary mb-2"></i>
              <h4>{upcomingMatches.length}</h4>
              <p className="mb-0">Upcoming</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <VisitorTracker />
    </Container>
  );
};

export default LiveScores;