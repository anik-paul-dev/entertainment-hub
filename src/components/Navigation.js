import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';

const Navigation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: 'fas fa-home' },
    { path: '/movies', label: 'Movies', icon: 'fas fa-film' },
    { path: '/anime', label: 'Anime', icon: 'fas fa-dragon' },
    { path: '/cartoons', label: 'Cartoons', icon: 'fas fa-child' },
    { path: '/music', label: 'Music', icon: 'fas fa-music' },
    { path: '/books', label: 'Books', icon: 'fas fa-book' },
    { path: '/poems', label: 'Poems', icon: 'fas fa-feather' },
    { path: '/weather', label: 'Weather', icon: 'fas fa-cloud-sun' },
    { path: '/sports', label: 'Sports', icon: 'fas fa-football-ball' },
    { path: '/live-scores', label: 'Live Scores', icon: 'fas fa-trophy' },
    { path: '/trend-analyzer', label: 'Trend Analyzer', icon: 'fas fa-chart-line' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality will be implemented in the parent component
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-4">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <i className="fas fa-play-circle me-2"></i>
          Media Hub
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <i className={`${item.icon} me-1`}></i>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
          
          <Form className="d-flex" onSubmit={handleSearch}>
            <div className="search-container">
              <i className="fas fa-search search-icon"></i>
              <Form.Control
                type="search"
                placeholder="Search all content..."
                className="me-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;