import axios from 'axios';

// API Configuration
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'; // TMDB API Key (free tier)

// Music API (Deezer)
const MUSIC_API_URL = 'https://api.deezer.com';

// Weather API (OpenWeatherMap)
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = 'your_openweather_api_key'; // Users need to get their own

// Sports API (TheSportsDB)
const SPORTS_API_URL = 'https://www.thesportsdb.com/api/v1/json/3';

// Book API (Google Books)
const BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

// Create axios instance
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Movies API
export const movieApi = {
  getPopularMovies: async (page = 1) => {
    const response = await api.get(`${API_BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page: page,
        language: 'en-US'
      }
    });
    return response.data.results;
  },

  getMovieDetails: async (movieId) => {
    const response = await api.get(`${API_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        append_to_response: 'credits,reviews,similar'
      }
    });
    return response.data;
  },

  searchMovies: async (query, page = 1) => {
    const response = await api.get(`${API_BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        page: page,
        language: 'en-US'
      }
    });
    return response.data.results;
  },

  getAnimeMovies: async (page = 1) => {
    const response = await api.get(`${API_BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: '16', // Animation genre
        page: page,
        language: 'en-US'
      }
    });
    return response.data.results;
  }
};

// Music API
export const musicApi = {
  getPopularTracks: async (limit = 10) => {
    const response = await api.get(`${MUSIC_API_URL}/chart/0/tracks`, {
      params: {
        limit: limit
      }
    });
    return response.data.data;
  },

  searchTracks: async (query) => {
    const response = await api.get(`${MUSIC_API_URL}/search/track`, {
      params: {
        q: query
      }
    });
    return response.data.data;
  },

  getTrackDetails: async (trackId) => {
    const response = await api.get(`${MUSIC_API_URL}/track/${trackId}`);
    return response.data;
  }
};

// Weather API
export const weatherApi = {
  getCurrentWeather: async (city) => {
    const response = await api.get(`${WEATHER_API_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  },

  getWeatherForecast: async (city) => {
    const response = await api.get(`${WEATHER_API_URL}/forecast`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  }
};

// Sports API
export const sportsApi = {
  getLiveScores: async () => {
    const response = await api.get(`${SPORTS_API_URL}/livescore.php`);
    return response.data;
  },

  getTeamDetails: async (teamId) => {
    const response = await api.get(`${SPORTS_API_URL}/lookupteam.php`, {
      params: {
        id: teamId
      }
    });
    return response.data;
  }
};

// Books API
export const booksApi = {
  searchBooks: async (query, maxResults = 10) => {
    const response = await api.get(BOOKS_API_URL, {
      params: {
        q: query,
        maxResults: maxResults
      }
    });
    return response.data.items;
  },

  getBookDetails: async (bookId) => {
    const response = await api.get(`${BOOKS_API_URL}/${bookId}`);
    return response.data;
  }
};

// Utility function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    console.error('API Error:', error.response.data);
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // Request was made but no response received
    console.error('Network Error:', error.request);
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    console.error('Error:', error.message);
    return 'An unexpected error occurred';
  }
};

// Debounce utility
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};