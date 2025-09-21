import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MediaCard = ({ item, type }) => {
  const getImageUrl = (item, type) => {
    switch (type) {
      case 'movie':
        return item.poster_path 
          ? `https://image.tmdb.org/t/p/w300${item.poster_path}` 
          : 'https://via.placeholder.com/300x450?text=No+Image';
      case 'music':
        return item.album?.cover_medium || 'https://via.placeholder.com/300x300?text=No+Image';
      case 'book':
        return item.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/300x450?text=No+Image';
      default:
        return 'https://via.placeholder.com/300x300?text=No+Image';
    }
  };

  const getTitle = (item, type) => {
    switch (type) {
      case 'movie':
        return item.title;
      case 'music':
        return item.title;
      case 'book':
        return item.volumeInfo?.title;
      default:
        return 'Untitled';
    }
  };

  const getSubtitle = (item, type) => {
    switch (type) {
      case 'movie':
        return new Date(item.release_date).getFullYear();
      case 'music':
        return item.artist?.name;
      case 'book':
        return item.volumeInfo?.authors?.[0] || 'Unknown Author';
      default:
        return '';
    }
  };

  const getRating = (item, type) => {
    switch (type) {
      case 'movie':
        return item.vote_average ? `${item.vote_average.toFixed(1)}/10` : 'N/A';
      case 'music':
        return ''; // Music doesn't have ratings in this API
      case 'book':
        return item.volumeInfo?.averageRating 
          ? `${item.volumeInfo.averageRating.toFixed(1)}/5` 
          : 'N/A';
      default:
        return 'N/A';
    }
  };

  const getLink = (item, type) => {
    switch (type) {
      case 'movie':
        return `/movies/${item.id}`;
      case 'music':
        return `/music/${item.id}`;
      case 'book':
        return `/books/${item.id}`;
      default:
        return '#';
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'movie':
        return 'primary';
      case 'music':
        return 'success';
      case 'book':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="media-card h-100">
      <div style={{ position: 'relative' }}>
        <Card.Img 
          variant="top" 
          src={getImageUrl(item, type)} 
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
        <Badge 
          bg={getBadgeColor(type)} 
          className="position-absolute top-0 end-0 m-2"
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate" title={getTitle(item, type)}>
          {getTitle(item, type)}
        </Card.Title>
        
        <Card.Subtitle className="mb-2 text-muted">
          {getSubtitle(item, type)}
        </Card.Subtitle>
        
        {getRating(item, type) && (
          <div className="mb-2">
            <i className="fas fa-star text-warning"></i>
            <span className="ms-1">{getRating(item, type)}</span>
          </div>
        )}
        
        <Card.Text className="small text-muted flex-grow-1">
          {type === 'movie' && item.overview && (
            <span className="d-block line-clamp-3">
              {item.overview.substring(0, 100)}...
            </span>
          )}
          {type === 'music' && item.album?.title && (
            <span className="d-block">
              Album: {item.album.title}
            </span>
          )}
          {type === 'book' && item.volumeInfo?.description && (
            <span className="d-block line-clamp-3">
              {item.volumeInfo.description.substring(0, 100)}...
            </span>
          )}
        </Card.Text>
        
        <Link 
          to={getLink(item, type)} 
          className="btn btn-primary btn-sm mt-auto"
        >
          View Details <i className="fas fa-arrow-right ms-1"></i>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default MediaCard;