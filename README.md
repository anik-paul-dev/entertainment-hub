# Media & Entertainment Hub

A comprehensive React-based web application that brings together movies, music, books, weather forecasts, sports, and AI-powered trend analysis in one platform. Built with React, JavaScript, Bootstrap, and CSS.

## Features

### 🎬 Entertainment Content
- **Movies**: Browse and search through thousands of movies with detailed information, ratings, and reviews
- **Anime**: Dedicated section for anime movies and shows
- **Cartoons**: Family-friendly animated content
- **Music**: Discover trending tracks, albums, and artists with audio previews
- **Books**: Extensive library with search and categorization
- **Poems**: Curated poetry collection from various eras and styles

### 🌤️ Weather & Sports
- **Weather**: Real-time weather forecasts with location detection and 5-day predictions
- **Live Scores**: Live sports scores and match updates with AI-powered analysis
- **Sports Directory**: Comprehensive sports teams and players database

### 🤖 AI-Powered Features
- **Trend Analyzer**: Analyze any topic with AI insights and demographic data
- **Content Analysis**: AI-powered explanations and recommendations for movies, music, and books
- **Weather-Based Recommendations**: Smart content suggestions based on current weather

### 🔍 Advanced Search & Filtering
- **Global Search**: Search across all content types with debouncing
- **Advanced Filters**: Filter by genre, year, category, and more
- **Real-time Updates**: Live data refresh for sports and weather

### 📱 User Experience
- **Responsive Design**: Works perfectly on all device sizes
- **Visitor Tracking**: Page visit counter and analytics
- **Professional UI**: Clean, modern interface with Bootstrap components
- **Fast Navigation**: Seamless routing between different sections

## Technology Stack

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM 6.8.0
- **UI Framework**: Bootstrap 5.2.3
- **HTTP Client**: Axios 1.3.0
- **Build Tool**: React Scripts 5.0.1
- **Icons**: Font Awesome 6.0.0

## APIs Used

The application integrates with multiple free APIs:

- **Movies**: The Movie Database (TMDB) API
- **Music**: Deezer API
- **Books**: Google Books API
- **Weather**: OpenWeatherMap API (requires API key)
- **Sports**: TheSportsDB API
- **Location**: IPify API
- **AI Services**: Simulated AI analysis (ready for real AI integration)

## Installation

1. **Clone or download the project files**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
media-entertainment-website/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navigation.js
│   │   ├── MediaCard.js
│   │   └── VisitorTracker.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Movies.js
│   │   ├── MovieDetails.js
│   │   ├── Anime.js
│   │   ├── Cartoons.js
│   │   ├── Music.js
│   │   ├── MusicDetails.js
│   │   ├── Books.js
│   │   ├── Poems.js
│   │   ├── Weather.js
│   │   ├── Sports.js
│   │   ├── LiveScores.js
│   │   └── TrendAnalyzer.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Configuration

### API Keys

To use the weather API, you'll need to:
1. Sign up at [OpenWeatherMap](https://home.openweathermap.org/)
2. Get your free API key
3. Replace `your_openweather_api_key` in `src/services/api.js` with your actual key

### TMDB API

The project uses a read-access API key for The Movie Database. For production use:
1. Sign up at [TMDB](https://www.themoviedb.org/)
2. Get your API key
3. Replace the existing key in `src/services/api.js`

## Usage

### Navigation
- Use the navigation bar to switch between different sections
- Each section has its own search and filtering options
- Click on any content item to view detailed information

### Search
- The global search bar in the navigation searches across all content types
- Each section has dedicated search with debouncing for better performance
- Use filters to narrow down results by category, year, genre, etc.

### AI Features
- Click "Generate AI Analysis" buttons to get AI-powered insights
- The Trend Analyzer provides comprehensive analysis of any topic
- Weather-based recommendations suggest content based on current conditions

### Live Features
- Sports scores update automatically every 30 seconds
- Weather data refreshes when searching new locations
- Visitor counter tracks page visits in real-time

## Features in Detail

### Movies & Anime
- Browse popular and trending movies
- Filter by genre, year, and rating
- Detailed movie pages with cast, crew, and similar movies
- AI-powered movie analysis and recommendations

### Music
- Discover trending tracks and artists
- Audio previews for available tracks
- Album and artist information
- Detailed music pages with AI insights

### Books & Poetry
- Search through extensive book database
- Categorize by genre and literary era
- Detailed book information with author details
- Poetry collection organized by type and era

### Weather
- Current weather conditions for any city
- 5-day weather forecasts
- Location detection using IP
- Weather-based content recommendations

### Sports
- Live scores and match updates
- Team and player directories
- AI-powered match analysis
- Historical match data

### Trend Analyzer
- Analyze any trending topic
- Demographic and regional data
- Sentiment analysis and growth trends
- AI-powered insights and predictions

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance

- Debounced search for better performance
- Lazy loading of images
- Optimized API calls
- Responsive design for all devices

## Contributing

This project is built as a demonstration of modern web development capabilities. Feel free to extend and customize it according to your needs.

## License

This project is for educational and demonstration purposes. Please ensure you comply with the terms of service of all APIs used.

## Support

For any questions or issues, please refer to the API documentation of the respective services:
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Deezer API Documentation](https://developers.deezer.com/)
- [Google Books API Documentation](https://developers.google.com/books)
- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [TheSportsDB API Documentation](https://www.thesportsdb.com/api.php)