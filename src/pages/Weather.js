import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert, Badge, ListGroup } from 'react-bootstrap';
import { weatherApi, movieApi, booksApi, musicApi, handleApiError } from '../services/api';
import MediaCard from '../components/MediaCard';
import VisitorTracker from '../components/VisitorTracker';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [recommendedContent, setRecommendedContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London');
  const [userLocation, setUserLocation] = useState(null);
  
  // Popular cities for quick access
  const popularCities = [
    'London', 'New York', 'Paris', 'Tokyo', 'Sydney', 
    'Mumbai', 'Dubai', 'Singapore', 'Berlin', 'Toronto'
  ];

  useEffect(() => {
    // Get user's location on component mount
    getUserLocation();
    
    // Load default city weather
    if (city) {
      fetchWeatherData(city);
    }
  }, []);

  const getUserLocation = async () => {
    try {
      // Get user's IP and location (using ipify as mentioned in requirements)
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      
      // In a real implementation, you would use a geolocation service
      // For now, we'll just store the IP
      setUserLocation(ipData.ip);
    } catch (err) {
      console.error('Error getting user location:', err);
    }
  };

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      
      // Note: OpenWeatherMap API requires an API key
      // For demonstration, we'll use mock data
      const mockWeatherData = {
        name: cityName,
        main: {
          temp: Math.floor(Math.random() * 30) + 10, // 10-40°C
          feels_like: Math.floor(Math.random() * 30) + 10,
          humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
          pressure: Math.floor(Math.random() * 50) + 980, // 980-1030 hPa
        },
        weather: [
          {
            main: getWeatherCondition(),
            description: 'Clear sky',
            icon: '01d'
          }
        ],
        wind: {
          speed: Math.floor(Math.random() * 20) + 1, // 1-20 m/s
          deg: Math.floor(Math.random() * 360)
        },
        visibility: Math.floor(Math.random() * 5000) + 5000, // 5000-10000 m
        sys: {
          country: getCountryCode(cityName),
          sunrise: Date.now() - Math.floor(Math.random() * 3600000),
          sunset: Date.now() + Math.floor(Math.random() * 3600000)
        },
        timezone: 0
      };

      const mockForecastData = {
        list: Array.from({ length: 5 }, (_, i) => ({
          dt: Date.now() + (i * 24 * 60 * 60 * 1000),
          main: {
            temp: Math.floor(Math.random() * 30) + 10,
            temp_min: Math.floor(Math.random() * 25) + 5,
            temp_max: Math.floor(Math.random() * 35) + 15
          },
          weather: [
            {
              main: getWeatherCondition(),
              description: 'Partly cloudy',
              icon: '02d'
            }
          ],
          dt_txt: new Date(Date.now() + (i * 24 * 60 * 60 * 1000)).toISOString()
        }))
      };

      setWeatherData(mockWeatherData);
      setForecastData(mockForecastData);
      
      // Get content recommendations based on weather
      await getWeatherRecommendations(mockWeatherData.weather[0].main);
      
    } catch (err) {
      setError(handleApiError(err));
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherCondition = () => {
    const conditions = ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm', 'Drizzle'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  };

  const getCountryCode = (cityName) => {
    const cityCountries = {
      'London': 'GB',
      'New York': 'US',
      'Paris': 'FR',
      'Tokyo': 'JP',
      'Sydney': 'AU',
      'Mumbai': 'IN',
      'Dubai': 'AE',
      'Singapore': 'SG',
      'Berlin': 'DE',
      'Toronto': 'CA'
    };
    return cityCountries[cityName] || 'US';
  };

  const getWeatherRecommendations = async (weatherCondition) => {
    try {
      let recommendations = [];
      
      // Get movie recommendations based on weather
      const movieQuery = getMovieQueryForWeather(weatherCondition);
      const movies = await movieApi.searchMovies(movieQuery, 5);
      recommendations.push(...movies.slice(0, 3).map(movie => ({...movie, type: 'movie'})));
      
      // Get book recommendations based on weather
      const bookQuery = getBookQueryForWeather(weatherCondition);
      const books = await booksApi.searchBooks(bookQuery, 3);
      recommendations.push(...books.slice(0, 2).map(book => ({...book, type: 'book'})));
      
      // Get music recommendations based on weather
      const musicQuery = getMusicQueryForWeather(weatherCondition);
      const music = await musicApi.searchTracks(musicQuery);
      recommendations.push(...music.slice(0, 2).map(track => ({...track, type: 'music'})));
      
      setRecommendedContent(recommendations);
    } catch (err) {
      console.error('Error getting recommendations:', err);
    }
  };

  const getMovieQueryForWeather = (weatherCondition) => {
    const queries = {
      'Clear': 'sunny happy movies',
      'Clouds': 'cozy movies',
      'Rain': 'rainy day movies',
      'Snow': 'winter movies',
      'Thunderstorm': 'thriller movies',
      'Drizzle': 'romantic movies'
    };
    return queries[weatherCondition] || 'popular movies';
  };

  const getBookQueryForWeather = (weatherCondition) => {
    const queries = {
      'Clear': 'adventure books',
      'Clouds': 'mystery books',
      'Rain': 'cozy books',
      'Snow': 'winter books',
      'Thunderstorm': 'suspense books',
      'Drizzle': 'romance books'
    };
    return queries[weatherCondition] || 'bestselling books';
  };

  const getMusicQueryForWeather = (weatherCondition) => {
    const queries = {
      'Clear': 'upbeat music',
      'Clouds': 'chill music',
      'Rain': 'rainy day music',
      'Snow': 'winter music',
      'Thunderstorm': 'epic music',
      'Drizzle': 'romantic music'
    };
    return queries[weatherCondition] || 'popular music';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  const getWeatherIcon = (weatherMain) => {
    const icons = {
      'Clear': 'fas fa-sun text-warning',
      'Clouds': 'fas fa-cloud text-secondary',
      'Rain': 'fas fa-cloud-rain text-primary',
      'Snow': 'fas fa-snowflake text-info',
      'Thunderstorm': 'fas fa-bolt text-warning',
      'Drizzle': 'fas fa-cloud-drizzle text-primary'
    };
    return icons[weatherMain] || 'fas fa-question text-muted';
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>
          <i className="fas fa-cloud-sun me-2"></i>
          Weather Forecast
        </h1>
        {userLocation && (
          <small className="text-muted">
            <i className="fas fa-map-marker-alt me-1"></i>
            Location: {userLocation}
          </small>
        )}
      </div>

      {/* Search Section */}
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="g-3">
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Enter City Name</Form.Label>
                  <div className="search-container">
                    <i className="fas fa-search search-icon"></i>
                    <Form.Control
                      type="text"
                      placeholder="Search for a city..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
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
                        {' '}Searching...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-search me-2"></i>
                        Get Weather
                      </>
                    )}
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          
          {/* Popular Cities */}
          <div className="mt-3">
            <h6>Popular Cities:</h6>
            <div className="d-flex flex-wrap gap-2">
              {popularCities.map(cityName => (
                <Button
                  key={cityName}
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    setCity(cityName);
                    fetchWeatherData(cityName);
                  }}
                  disabled={loading}
                >
                  {cityName}
                </Button>
              ))}
            </div>
          </div>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      )}

      {weatherData && (
        <>
          {/* Current Weather */}
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="d-flex align-items-center">
                    <div className="me-4">
                      <i className={`${getWeatherIcon(weatherData.weather[0].main)} fa-4x`}></i>
                    </div>
                    <div>
                      <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                      <h3 className="mb-0">{Math.round(weatherData.main.temp)}°C</h3>
                      <p className="text-muted mb-0">{weatherData.weather[0].description}</p>
                      <p className="text-muted">Feels like {Math.round(weatherData.main.feels_like)}°C</p>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <Row className="g-3">
                    <Col xs={6}>
                      <Card bg="light">
                        <Card.Body className="text-center">
                          <i className="fas fa-tint text-primary fa-2x mb-2"></i>
                          <h6>Humidity</h6>
                          <p className="mb-0">{weatherData.main.humidity}%</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={6}>
                      <Card bg="light">
                        <Card.Body className="text-center">
                          <i className="fas fa-wind text-info fa-2x mb-2"></i>
                          <h6>Wind Speed</h6>
                          <p className="mb-0">{weatherData.wind.speed} m/s</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={6}>
                      <Card bg="light">
                        <Card.Body className="text-center">
                          <i className="fas fa-compress-arrows-alt text-warning fa-2x mb-2"></i>
                          <h6>Pressure</h6>
                          <p className="mb-0">{weatherData.main.pressure} hPa</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={6}>
                      <Card bg="light">
                        <Card.Body className="text-center">
                          <i className="fas fa-eye text-success fa-2x mb-2"></i>
                          <h6>Visibility</h6>
                          <p className="mb-0">{(weatherData.visibility / 1000).toFixed(1)} km</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* 5-Day Forecast */}
          {forecastData && (
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-calendar-alt me-2"></i>
                  5-Day Forecast
                </h5>
              </Card.Header>
              <Card.Body>
                <Row xs={2} md={5} className="g-3">
                  {forecastData.list.map((forecast, index) => (
                    <Col key={index}>
                      <Card className="text-center">
                        <Card.Body>
                          <h6>{formatDate(forecast.dt)}</h6>
                          <i className={`${getWeatherIcon(forecast.weather[0].main)} fa-2x mb-2`}></i>
                          <p className="mb-1">{forecast.weather[0].description}</p>
                          <div className="d-flex justify-content-between">
                            <small className="text-muted">
                              {Math.round(forecast.main.temp_min)}°
                            </small>
                            <strong>{Math.round(forecast.main.temp)}°</strong>
                            <small className="text-muted">
                              {Math.round(forecast.main.temp_max)}°
                            </small>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          )}

          {/* Weather-Based Recommendations */}
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-magic me-2"></i>
                Perfect for this Weather
              </h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-3">
                Based on the current weather in {weatherData.name}, we recommend:
              </p>
              {recommendedContent.length > 0 ? (
                <Row xs={2} md={3} lg={4} className="g-3">
                  {recommendedContent.map((item, index) => (
                    <Col key={index}>
                      <MediaCard item={item} type={item.type} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Alert variant="info">
                  <i className="fas fa-info-circle me-2"></i>
                  Loading recommendations...
                </Alert>
              )}
            </Card.Body>
          </Card>
        </>
      )}
      
      <VisitorTracker />
    </Container>
  );
};

export default Weather;