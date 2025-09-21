import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { booksApi, debounce, handleApiError } from '../services/api';
import MediaCard from '../components/MediaCard';
import VisitorTracker from '../components/VisitorTracker';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  
  const navigate = useNavigate();

  // Book categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'fiction', name: 'Fiction' },
    { id: 'non-fiction', name: 'Non-Fiction' },
    { id: 'science', name: 'Science' },
    { id: 'biography', name: 'Biography' },
    { id: 'history', name: 'History' },
    { id: 'romance', name: 'Romance' },
    { id: 'mystery', name: 'Mystery' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'self-help', name: 'Self Help' },
    { id: 'business', name: 'Business' },
    { id: 'children', name: 'Children' }
  ];

  // Sort options
  const sortOptions = [
    { id: 'relevance', name: 'Most Relevant' },
    { id: 'newest', name: 'Newest First' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'title', name: 'Title (A-Z)' },
    { id: 'author', name: 'Author (A-Z)' }
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // Search for bestselling books
        const booksData = await booksApi.searchBooks('bestsellers', 20);
        setBooks(booksData || []);
        setFilteredBooks(booksData || []);
        setError(null);
      } catch (err) {
        setError(handleApiError(err));
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Debounced search
  const debouncedSearch = debounce(async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredBooks(books);
      return;
    }

    try {
      const searchResults = await booksApi.searchBooks(searchTerm, 20);
      setFilteredBooks(searchResults || []);
    } catch (err) {
      console.error('Error searching books:', err);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  // Filter and sort books
  useEffect(() => {
    let filtered = [...books];

    // Filter by category (simplified - in real app, this would use Google Books categories)
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => {
        const title = book.volumeInfo?.title?.toLowerCase() || '';
        const description = book.volumeInfo?.description?.toLowerCase() || '';
        const categories = book.volumeInfo?.categories || [];
        
        // Simple keyword matching for category filtering
        const categoryKeywords = {
          'fiction': ['fiction', 'novel', 'story'],
          'non-fiction': ['non-fiction', 'biography', 'history', 'science'],
          'science': ['science', 'physics', 'chemistry', 'biology'],
          'biography': ['biography', 'autobiography', 'memoir'],
          'history': ['history', 'historical', 'past'],
          'romance': ['romance', 'love', 'romantic'],
          'mystery': ['mystery', 'detective', 'crime'],
          'fantasy': ['fantasy', 'magic', 'mythical'],
          'self-help': ['self-help', 'personal', 'improvement'],
          'business': ['business', 'management', 'entrepreneur'],
          'children': ['children', 'kids', 'childhood']
        };
        
        const keywords = categoryKeywords[selectedCategory] || [];
        return keywords.some(keyword => 
          title.includes(keyword) || 
          description.includes(keyword) ||
          categories.some(cat => cat.toLowerCase().includes(keyword))
        );
      });
    }

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.volumeInfo?.publishedDate || '').localeCompare(a.volumeInfo?.publishedDate || '');
        case 'rating':
          return (b.volumeInfo?.averageRating || 0) - (a.volumeInfo?.averageRating || 0);
        case 'title':
          return (a.volumeInfo?.title || '').localeCompare(b.volumeInfo?.title || '');
        case 'author':
          return (a.volumeInfo?.authors?.[0] || '').localeCompare(b.volumeInfo?.authors?.[0] || '');
        default:
          return 0;
      }
    });

    setFilteredBooks(filtered);
  }, [selectedCategory, sortBy, books]);

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading books...</p>
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
          <i className="fas fa-book me-2"></i>
          Books Library
        </h1>
        <div className="text-muted">
          {filteredBooks.length} books found
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Search Books</Form.Label>
                <div className="search-container">
                  <i className="fas fa-search search-icon"></i>
                  <Form.Control
                    type="text"
                    placeholder="Search by title, author, or keyword..."
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

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <Row xs={2} md={3} lg={4} xl={5} className="g-3">
          {filteredBooks.map((book) => (
            <Col key={book.id}>
              <div onClick={() => handleBookClick(book.id)}>
                <MediaCard item={book} type="book" />
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">
          <i className="fas fa-info-circle me-2"></i>
          No books found matching your criteria.
        </Alert>
      )}
      
      <VisitorTracker />
    </Container>
  );
};

export default Books;