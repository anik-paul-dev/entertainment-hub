import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert, Badge, ListGroup, Tabs, Tab } from 'react-bootstrap';
import { handleApiError } from '../services/api';
import VisitorTracker from '../components/VisitorTracker';

const TrendAnalyzer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // Popular trending topics
  const popularTopics = [
    'Artificial Intelligence',
    'Climate Change',
    'Space Exploration',
    'Renewable Energy',
    'Cryptocurrency',
    'Metaverse',
    'Electric Vehicles',
    'Remote Work',
    'Sustainable Living',
    'Digital Transformation'
  ];

  useEffect(() => {
    // Load search history from localStorage
    const history = localStorage.getItem('trendSearchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const analyzeTrend = async (topic) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate trend analysis (in real app, this would call trend analysis APIs)
      setTimeout(() => {
        const mockTrendData = {
          topic: topic,
          popularity: Math.floor(Math.random() * 100) + 1,
          sentiment: Math.random() > 0.5 ? 'positive' : 'neutral',
          growth: Math.floor(Math.random() * 200) - 100, // -100 to +100
          relatedTopics: getRelatedTopics(topic),
          sources: getSources(topic),
          timeline: getTimelineData(topic),
          demographics: getDemographics(topic),
          keywords: getKeywords(topic),
          regions: getRegions(topic)
        };
        
        setTrendData(mockTrendData);
        setLoading(false);
        
        // Add to search history
        const newHistory = [topic, ...searchHistory.filter(h => h !== topic)].slice(0, 10);
        setSearchHistory(newHistory);
        localStorage.setItem('trendSearchHistory', JSON.stringify(newHistory));
        
      }, 2000);
      
    } catch (err) {
      setError(handleApiError(err));
      console.error('Error analyzing trend:', err);
      setLoading(false);
    }
  };

  const getRelatedTopics = (topic) => {
    const relatedMaps = {
      'Artificial Intelligence': ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Automation'],
      'Climate Change': ['Global Warming', 'Carbon Footprint', 'Renewable Energy', 'Sustainability'],
      'Space Exploration': ['Mars Mission', 'SpaceX', 'NASA', 'Astronomy'],
      'Renewable Energy': ['Solar Power', 'Wind Energy', 'Hydroelectric', 'Green Technology'],
      'Cryptocurrency': ['Bitcoin', 'Ethereum', 'Blockchain', 'DeFi'],
      'Metaverse': ['Virtual Reality', 'AR/VR', 'Digital Assets', 'Web3'],
      'Electric Vehicles': ['Tesla', 'EV Charging', 'Battery Technology', 'Sustainable Transport'],
      'Remote Work': ['Work From Home', 'Digital Nomad', 'Collaboration Tools', 'Productivity'],
      'Sustainable Living': ['Eco-Friendly', 'Zero Waste', 'Green Lifestyle', 'Environmental Impact'],
      'Digital Transformation': ['Cloud Computing', 'Digitalization', 'Innovation', 'Technology']
    };
    
    return relatedMaps[topic] || ['Related Topic 1', 'Related Topic 2', 'Related Topic 3', 'Related Topic 4'];
  };

  const getSources = (topic) => {
    return [
      { name: 'Tech News', url: 'https://example.com/tech-news', credibility: 85 },
      { name: 'Industry Report', url: 'https://example.com/industry', credibility: 92 },
      { name: 'Research Paper', url: 'https://example.com/research', credibility: 95 },
      { name: 'Social Media', url: 'https://example.com/social', credibility: 60 }
    ];
  };

  const getTimelineData = (topic) => {
    return [
      { date: '2024-01-01', mentions: Math.floor(Math.random() * 1000) },
      { date: '2024-01-07', mentions: Math.floor(Math.random() * 1500) },
      { date: '2024-01-14', mentions: Math.floor(Math.random() * 2000) },
      { date: '2024-01-21', mentions: Math.floor(Math.random() * 2500) }
    ];
  };

  const getDemographics = (topic) => {
    return {
      age: {
        '18-24': Math.floor(Math.random() * 30) + 10,
        '25-34': Math.floor(Math.random() * 35) + 20,
        '35-44': Math.floor(Math.random() * 25) + 15,
        '45-54': Math.floor(Math.random() * 20) + 10,
        '55+': Math.floor(Math.random() * 15) + 5
      },
      gender: {
        'Male': Math.floor(Math.random() * 40) + 30,
        'Female': Math.floor(Math.random() * 40) + 30,
        'Other': Math.floor(Math.random() * 10) + 5
      }
    };
  };

  const getKeywords = (topic) => {
    const keywords = [
      topic.toLowerCase().replace(/\s+/g, ''),
      'trending',
      'analysis',
      'data',
      'insights',
      'research',
      'report',
      'statistics'
    ];
    return keywords.slice(0, 5);
  };

  const getRegions = (topic) => {
    return [
      { name: 'North America', percentage: Math.floor(Math.random() * 30) + 20 },
      { name: 'Europe', percentage: Math.floor(Math.random() * 25) + 15 },
      { name: 'Asia', percentage: Math.floor(Math.random() * 35) + 25 },
      { name: 'Other', percentage: Math.floor(Math.random() * 15) + 10 }
    ];
  };

  const getAiInsights = async (topic) => {
    setAiLoading(true);
    try {
      // Simulate AI analysis (in real app, this would call an AI service)
      setTimeout(() => {
        const insights = `Based on current data analysis, "${topic}" is showing ${trendData?.growth > 0 ? 'positive' : 'negative'} growth trends. The topic has gained significant attention across multiple platforms and demographics. Key insights:

1. **Current Trend**: The topic is experiencing ${trendData?.popularity > 70 ? 'high' : trendData?.popularity > 40 ? 'moderate' : 'low'} popularity with ${trendData?.sentiment} public sentiment.

2. **Growth Pattern**: Over the past month, this topic has shown a ${Math.abs(trendData?.growth)}% ${trendData?.growth > 0 ? 'increase' : 'decrease'} in mentions and engagement.

3. **Key Demographics**: The topic resonates most strongly with ${Object.entries(trendData?.demographics?.age || {}).reduce((a, b) => a[1] > b[1] ? a : b)[0]} age group.

4. **Regional Impact**: ${trendData?.regions?.[0]?.name} shows the highest engagement rate at ${trendData?.regions?.[0]?.percentage}%.

5. **Future Outlook**: Based on current trajectory, this topic is expected to ${trendData?.growth > 0 ? 'continue gaining' : 'stabilize in'} momentum over the next quarter.

6. **Recommendations**: For businesses and content creators, this represents an opportunity to ${trendData?.growth > 0 ? 'capitalize on the growing interest' : 'monitor for potential shifts in public attention'}.`;
        
        setAiAnalysis(insights);
        setAiLoading(false);
      }, 3000);
    } catch (err) {
      console.error('Error getting AI insights:', err);
      setAiLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      analyzeTrend(searchTerm);
    }
  };

  const handleQuickSearch = (topic) => {
    setSearchTerm(topic);
    analyzeTrend(topic);
  };

  const getSentimentBadge = (sentiment) => {
    const variants = {
      positive: 'success',
      negative: 'danger',
      neutral: 'warning'
    };
    return variants[sentiment] || 'secondary';
  };

  const getGrowthBadge = (growth) => {
    if (growth > 0) return 'success';
    if (growth < 0) return 'danger';
    return 'secondary';
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>
          <i className="fas fa-chart-line me-2"></i>
          AI Trend Analyzer
        </h1>
        <Button variant="outline-primary" onClick={() => setTrendData(null)}>
          <i className="fas fa-refresh me-2"></i>
          New Analysis
        </Button>
      </div>

      {/* Search Section */}
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="g-3">
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Enter Topic to Analyze</Form.Label>
                  <div className="search-container">
                    <i className="fas fa-search search-icon"></i>
                    <Form.Control
                      type="text"
                      placeholder="Enter any topic, trend, or keyword..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>&nbsp;</Form.Label>
                  <Button type="submit" className="w-100" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" />
                        {' '}Analyzing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-analytics me-2"></i>
                        Analyze Trend
                      </>
                    )}
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          
          {/* Popular Topics */}
          <div className="mt-3">
            <h6>Popular Topics:</h6>
            <div className="d-flex flex-wrap gap-2">
              {popularTopics.map(topic => (
                <Button
                  key={topic}
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleQuickSearch(topic)}
                  disabled={loading}
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="mt-3">
              <h6>Recent Searches:</h6>
              <div className="d-flex flex-wrap gap-2">
                {searchHistory.map(topic => (
                  <Button
                    key={topic}
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleQuickSearch(topic)}
                    disabled={loading}
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      )}

      {trendData && (
        <>
          {/* Trend Overview */}
          <Card className="mb-4">
            <Card.Header>
              <h4 className="mb-0">
                <i className="fas fa-chart-bar me-2"></i>
                Trend Analysis: {trendData.topic}
              </h4>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={3}>
                  <Card bg="light">
                    <Card.Body className="text-center">
                      <i className="fas fa-fire fa-2x text-danger mb-2"></i>
                      <h4>{trendData.popularity}</h4>
                      <p className="mb-0">Popularity Score</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card bg="light">
                    <Card.Body className="text-center">
                      <i className="fas fa-smile fa-2x text-success mb-2"></i>
                      <h4>
                        <Badge bg={getSentimentBadge(trendData.sentiment)}>
                          {trendData.sentiment}
                        </Badge>
                      </h4>
                      <p className="mb-0">Sentiment</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card bg="light">
                    <Card.Body className="text-center">
                      <i className="fas fa-chart-line fa-2x text-primary mb-2"></i>
                      <h4>
                        <Badge bg={getGrowthBadge(trendData.growth)}>
                          {trendData.growth > 0 ? '+' : ''}{trendData.growth}%
                        </Badge>
                      </h4>
                      <p className="mb-0">Growth Rate</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card bg="light">
                    <Card.Body className="text-center">
                      <i className="fas fa-hashtag fa-2x text-info mb-2"></i>
                      <h4>{trendData.keywords.length}</h4>
                      <p className="mb-0">Keywords</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Detailed Analysis Tabs */}
          <Tabs defaultActiveKey="overview" className="mb-4">
            <Tab eventKey="overview" title="Overview">
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <h5>Related Topics</h5>
                      <ListGroup>
                        {trendData.relatedTopics.map((topic, index) => (
                          <ListGroup.Item key={index}>
                            <i className="fas fa-link me-2"></i>
                            {topic}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                    <Col md={6}>
                      <h5>Keywords</h5>
                      <div className="d-flex flex-wrap gap-2">
                        {trendData.keywords.map((keyword, index) => (
                          <Badge key={index} bg="primary" className="p-2">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Tab>
            
            <Tab eventKey="sources" title="Sources">
              <Card>
                <Card.Body>
                  <h5>Information Sources</h5>
                  <ListGroup>
                    {trendData.sources.map((source, index) => (
                      <ListGroup.Item key={index}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{source.name}</strong>
                            <br />
                            <small className="text-muted">{source.url}</small>
                          </div>
                          <Badge bg={source.credibility > 80 ? 'success' : source.credibility > 60 ? 'warning' : 'danger'}>
                            {source.credibility}% Credibility
                          </Badge>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Tab>
            
            <Tab eventKey="demographics" title="Demographics">
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <h5>Age Distribution</h5>
                      {Object.entries(trendData.demographics.age).map(([age, percentage]) => (
                        <div key={age} className="mb-2">
                          <div className="d-flex justify-content-between">
                            <span>{age}</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className="progress">
                            <div 
                              className="progress-bar" 
                              role="progressbar" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </Col>
                    <Col md={6}>
                      <h5>Gender Distribution</h5>
                      {Object.entries(trendData.demographics.gender).map(([gender, percentage]) => (
                        <div key={gender} className="mb-2">
                          <div className="d-flex justify-content-between">
                            <span>{gender}</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className="progress">
                            <div 
                              className="progress-bar" 
                              role="progressbar" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Tab>
            
            <Tab eventKey="regions" title="Regions">
              <Card>
                <Card.Body>
                  <h5>Regional Distribution</h5>
                  {trendData.regions.map((region, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex justify-content-between">
                        <strong>{region.name}</strong>
                        <span>{region.percentage}%</span>
                      </div>
                      <div className="progress">
                        <div 
                          className="progress-bar" 
                          role="progressbar" 
                          style={{ width: `${region.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>

          {/* AI Analysis */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-robot me-2"></i>
                AI-Powered Insights
              </h5>
            </Card.Header>
            <Card.Body>
              {!aiAnalysis ? (
                <div className="text-center">
                  <p>Get comprehensive AI analysis of this trend</p>
                  <Button variant="primary" onClick={() => getAiInsights(trendData.topic)} disabled={aiLoading}>
                    {aiLoading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" />
                        {' '}Generating Insights...
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
                  <div className="bg-light p-3 rounded mb-3">
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                      {aiAnalysis}
                    </pre>
                  </div>
                  <Button variant="outline-primary" size="sm" onClick={() => getAiInsights(trendData.topic)}>
                    <i className="fas fa-sync me-2"></i>
                    Regenerate Analysis
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </>
      )}
      
      <VisitorTracker />
    </Container>
  );
};

export default TrendAnalyzer;