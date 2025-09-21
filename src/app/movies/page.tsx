"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import SearchBar from "@/components/search-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Film, Star, Calendar, Clock, Filter } from "lucide-react"
import Link from "next/link"

interface Movie {
  id: string
  title: string
  description: string
  image: string
  rating: number
  releaseDate: string
  genre: string[]
  duration?: string
  director?: string
  cast?: string[]
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [currentPage, setCurrentPage] = useState(1)

  const genres = [
    "all",
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Fantasy",
    "Animation",
    "Crime",
    "Mystery",
  ]

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        // This will be replaced with actual API call to a free movie API
        const mockMovies: Movie[] = [
          {
            id: "1",
            title: "The Matrix",
            description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.7,
            releaseDate: "1999",
            genre: ["Action", "Sci-Fi"],
            duration: "136 min",
            director: "The Wachowskis",
            cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
          },
          {
            id: "2",
            title: "Inception",
            description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.8,
            releaseDate: "2010",
            genre: ["Action", "Sci-Fi", "Thriller"],
            duration: "148 min",
            director: "Christopher Nolan",
            cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
          },
          {
            id: "3",
            title: "The Dark Knight",
            description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
            image: "https://via.placeholder.com/300x450",
            rating: 9.0,
            releaseDate: "2008",
            genre: ["Action", "Crime", "Drama"],
            duration: "152 min",
            director: "Christopher Nolan",
            cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
          },
          {
            id: "4",
            title: "Pulp Fiction",
            description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.9,
            releaseDate: "1994",
            genre: ["Crime", "Drama"],
            duration: "154 min",
            director: "Quentin Tarantino",
            cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
          },
          {
            id: "5",
            title: "Forrest Gump",
            description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.8,
            releaseDate: "1994",
            genre: ["Drama", "Romance"],
            duration: "142 min",
            director: "Robert Zemeckis",
            cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"]
          },
          {
            id: "6",
            title: "The Godfather",
            description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            image: "https://via.placeholder.com/300x450",
            rating: 9.2,
            releaseDate: "1972",
            genre: ["Crime", "Drama"],
            duration: "175 min",
            director: "Francis Ford Coppola",
            cast: ["Marlon Brando", "Al Pacino", "James Caan"]
          },
          {
            id: "7",
            title: "Fight Club",
            description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.8,
            releaseDate: "1999",
            genre: ["Drama", "Thriller"],
            duration: "139 min",
            director: "David Fincher",
            cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"]
          },
          {
            id: "8",
            title: "The Shawshank Redemption",
            description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            image: "https://via.placeholder.com/300x450",
            rating: 9.3,
            releaseDate: "1994",
            genre: ["Drama"],
            duration: "142 min",
            director: "Frank Darabont",
            cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
          }
        ]
        
        setTimeout(() => {
          setMovies(mockMovies)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching movies:", error)
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const filteredMovies = movies.filter(movie => 
    selectedGenre === "all" || movie.genre.includes(selectedGenre)
  )

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "date") {
      return parseInt(b.releaseDate) - parseInt(a.releaseDate)
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  const MovieCard = ({ movie }: { movie: Movie }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
            {movie.rating}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{movie.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{movie.releaseDate}</span>
          </div>
          {movie.duration && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{movie.duration}</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="outline" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>
        <Link href={`/movies/${movie.id}`}>
          <Button size="sm" className="w-full">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  )

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center space-x-2">
            <Film className="w-10 h-10 text-purple-600" />
            <span>Movies</span>
          </h1>
          <p className="text-xl text-gray-600">Discover the best movies from around the world</p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6">
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Genre:</span>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <Button variant="outline">Page {currentPage}</Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </Layout>
  )
}