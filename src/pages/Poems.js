import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { booksApi, debounce, handleApiError } from '../services/api';
import MediaCard from '../components/MediaCard';
import VisitorTracker from '../components/VisitorTracker';

const Poems = () => {
  const [poems, setPoems] = useState([]);
  const [filteredPoems, setFilteredPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  
  const navigate = useNavigate();

  // Poetry categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'love', name: 'Love Poetry' },
    { id: 'nature', name: 'Nature Poetry' },
    { id: 'war', name: 'War Poetry' },
    { id: 'romantic', name: 'Romantic Poetry' },
    { id: 'modern', name: 'Modern Poetry' },
    { id: 'classical', name: 'Classical Poetry' },
    { id: 'haiku', name: 'Haiku' },
    { id: 'sonnet', name: 'Sonnets' },
    { id: 'free-verse', name: 'Free Verse' }
  ];

  // Literary eras
  const eras = [
    { id: 'all', name: 'All Eras' },
    { id: 'ancient', name: 'Ancient' },
    { id: 'medieval', name: 'Medieval' },
    { id: 'renaissance', name: 'Renaissance' },
    { id: 'romantic', name: 'Romantic Era' },
    { id: 'victorian', name: 'Victorian' },
    { id: 'modern', name: 'Modern' },
    { id: 'contemporary', name: 'Contemporary' }
  ];

  // Sort options
  const sortOptions = [
    { id: 'relevance', name: 'Most Relevant' },
    { id: 'title', name: 'Title (A-Z)' },
    { id: 'author', name: 'Author (A-Z)' },
    { id: 'popularity', name: 'Most Popular' },
    { id: 'date', name: 'Publication Date' }
  ];

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        setLoading(true);
        // Search for poetry books
        const poemsData = await booksApi.searchBooks('poetry collection', 20);
        setPoems(poemsData || []);
        setFilteredPoems(poemsData || []);
        setError(null);
      } catch (err) {
        setError(handleApiError(err));
        console.error('Error fetching poems:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  // Debounced search
  const debouncedSearch = debounce(async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredPoems(poems);
      return;
    }

    try {
      const searchResults = await booksApi.searchBooks(`poetry ${searchTerm}`, 20);
      setFilteredPoems(searchResults || []);
    } catch (err) {
      console.error('Error searching poems:', err);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  // Filter and sort poems
  useEffect(() => {
    let filtered = [...poems];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => {
        const title = book.volumeInfo?.title?.toLowerCase() || '';
        const description = book.volumeInfo?.description?.toLowerCase() || '';
        const categories = book.volumeInfo?.categories || [];
        
        const categoryKeywords = {
          'love': ['love', 'romance', 'heart', 'passion'],
          'nature': ['nature', 'natural', 'environment', 'earth'],
          'war': ['war', 'battle', 'conflict', 'soldier'],
          'romantic': ['romantic', 'romance', 'emotion', 'feeling'],
          'modern': ['modern', 'contemporary', 'current'],
          'classical': ['classical', 'classic', 'traditional'],
          'haiku': ['haiku', 'japanese', 'short poem'],
          'sonnet': ['sonnet', '14 line', 'shakespeare'],
          'free-verse': ['free verse', 'modern poetry', 'experimental']
        };
        
        const keywords = categoryKeywords[selectedCategory] || [];
        return keywords.some(keyword => 
          title.includes(keyword) || 
          description.includes(keyword) ||
          categories.some(cat => cat.toLowerCase().includes(keyword))
        );
      });
    }

    // Filter by era (simplified)
    if (selectedEra !== 'all') {
      filtered = filtered.filter(book => {
        const publishedDate = book.volumeInfo?.publishedDate || '';
        const description = book.volumeInfo?.description?.toLowerCase() || '';
        
        const eraKeywords = {
          'ancient': ['ancient', 'classical', 'antique'],
          'medieval': ['medieval', 'middle age'],
          'renaissance': ['renaissance', '16th century', '17th century'],
          'romantic': ['romantic era', '19th century'],
          'victorian': ['victorian', '19th century'],
          'modern': ['modern', '20th century'],
          'contemporary': ['contemporary', '21st century', 'recent']
        };
        
        const keywords = eraKeywords[selectedEra] || [];
        return keywords.some(keyword => 
          publishedDate.includes(keyword) || 
          description.includes(keyword)
        );
      });
    }

    // Sort poems
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return (a.volumeInfo?.title || '').localeCompare(b.volumeInfo?.title || '');
        case 'author':
          return (a.volumeInfo?.authors?.[0] || '').localeCompare(b.volumeInfo?.authors?.[0] || '');
        case 'date':
          return (b.volumeInfo?.publishedDate || '').localeCompare(a.volumeInfo?.publishedDate || '');
        default:
          return 0;
      }
    });

    setFilteredPoems(filtered);
  }, [selectedCategory, selectedEra, sortBy, poems]);

  const handlePoemClick = (poemId) => {
    navigate(`/poems/${poemId}`);
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading poetry collection...</p>
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
          <i className="fas fa-feather me-2"></i>
          Poetry Collection
        </h1>
        <div className="text-muted">
          {filteredPoems.length} poems found
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search Poems</Form.Label>
                <div className="search-container">
                  <i className="fas fa-search search-icon"></i>
                  <Form.Control
                    type="text"
                    placeholder="Search by title, author, or theme..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Col>
            
            <Col md={3}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={3}>
              <Form.Group>
                <Form.Label>Literary Era</Form.Label>
                <Form.Select 
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                >
                  {eras.map(era => (
                    <option key={era.id} value={era.id}>
                      {era.name}
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

      {/* Featured Poetry Types */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">Explore Poetry Types</h5>
          <Row xs={2} md={4} className="g-3">
            {categories.slice(1, 5).map(category => (
              <Col key={category.id}>
                <Card className="text-center h-100">
                  <Card.Body>
                    <i className="fas fa-feather-alt fa-2x text-primary mb-2"></i>
                    <Card.Title className="h6">{category.name}</Card.Title>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      Explore
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Poems Grid */}
      {filteredPoems.length > 0 ? (
        <Row xs={2} md={3} lg={4} xl={5} className="g-3">
          {filteredPoems.map((poem) => (
            <Col key={poem.id}>
              <div onClick={() => handlePoemClick(poem.id)}>
                <MediaCard item={poem} type="book" />
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">
          <i className="fas fa-info-circle me-2"></i>
          No poems found matching your criteria.
        </Alert>
      )}
      
      <VisitorTracker />
    </Container>
  );
};

export default Poems;