"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Film, Star, Calendar, Clock, User, ArrowLeft, Sparkles, Play } from "lucide-react"
import Link from "next/link"

interface Movie {
  id: string
  title: string
  description: string
  image: string
  rating: number
  releaseDate: string
  genre: string[]
  duration: string
  director: string
  cast: string[]
  trailer?: string
  plot: string
  language: string
  country: string
  awards?: string[]
}

interface RecommendedMovie {
  id: string
  title: string
  image: string
  rating: number
  genre: string[]
}

export default function MovieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [recommendedMovies, setRecommendedMovies] = useState<RecommendedMovie[]>([])
  const [loading, setLoading] = useState(true)
  const [aiExplanation, setAiExplanation] = useState("")
  const [aiLoading, setAiLoading] = useState(false)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true)
      try {
        // This will be replaced with actual API call
        const mockMovie: Movie = {
          id: params.id as string,
          title: "The Matrix",
          description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
          image: "https://via.placeholder.com/400x600",
          rating: 8.7,
          releaseDate: "1999",
          genre: ["Action", "Sci-Fi"],
          duration: "136 min",
          director: "The Wachowskis",
          cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving", "Joe Pantoliano"],
          trailer: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
          plot: "Thomas Anderson, a computer programmer, is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
          language: "English",
          country: "United States",
          awards: ["Won 4 Oscars", "Won 2 BAFTA Awards", "Won 1 Golden Globe"]
        }

        const mockRecommended: RecommendedMovie[] = [
          {
            id: "2",
            title: "Inception",
            image: "https://via.placeholder.com/200x300",
            rating: 8.8,
            genre: ["Action", "Sci-Fi", "Thriller"]
          },
          {
            id: "3",
            title: "The Dark Knight",
            image: "https://via.placeholder.com/200x300",
            rating: 9.0,
            genre: ["Action", "Crime", "Drama"]
          },
          {
            id: "4",
            title: "Interstellar",
            image: "https://via.placeholder.com/200x300",
            rating: 8.6,
            genre: ["Adventure", "Drama", "Sci-Fi"]
          },
          {
            id: "5",
            title: "Blade Runner 2049",
            image: "https://via.placeholder.com/200x300",
            rating: 8.0,
            genre: ["Action", "Drama", "Mystery"]
          }
        ]

        setTimeout(() => {
          setMovie(mockMovie)
          setRecommendedMovies(mockRecommended)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching movie details:", error)
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [params.id])

  const getAIExplanation = async () => {
    if (!movie) return
    
    setAiLoading(true)
    try {
      // This will be replaced with actual Gemini AI API call
      const mockExplanation = `"The Matrix" is a groundbreaking science fiction film that explores philosophical themes of reality, consciousness, and freedom. The movie follows Neo, a computer hacker who discovers that the world he knows is actually a simulated reality created by machines to subdue humanity. 

The film is renowned for its innovative visual effects, particularly the "bullet time" photography, and its deep philosophical underpinnings drawing from concepts in Plato's Republic, Jean Baudrillard's simulacra, and Eastern philosophy. It questions the nature of reality and what it means to be human in an increasingly technological world.

The Matrix has had a profound influence on popular culture and filmmaking, inspiring countless works in cinema, literature, and other media. Its themes remain relevant today as we grapple with virtual reality, artificial intelligence, and the boundaries between the digital and physical worlds.`
      
      setTimeout(() => {
        setAiExplanation(mockExplanation)
        setAiLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error getting AI explanation:", error)
      setAiLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="space-y-8">
          <div className="flex items-center space-x-4 mb-6">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Skeleton className="aspect-[2/3] w-full" />
            </div>
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (!movie) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Movies</span>
        </Button>

        {/* Movie Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div>
            <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                  {movie.rating}
                </Badge>
              </div>
            </div>
            
            {movie.trailer && (
              <Button className="w-full mt-4" variant="outline">
                <Play className="w-4 h-4 mr-2" />
                Watch Trailer
              </Button>
            )}
          </div>

          {/* Movie Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.releaseDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{movie.director}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((g) => (
                  <Badge key={g} variant="outline">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-gray-700 leading-relaxed">{movie.plot}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cast</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {movie.cast.map((actor, index) => (
                      <li key={index} className="text-sm">• {actor}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-medium">Language:</span> {movie.language}
                  </div>
                  <div>
                    <span className="font-medium">Country:</span> {movie.country}
                  </div>
                  {movie.awards && movie.awards.length > 0 && (
                    <div>
                      <span className="font-medium">Awards:</span>
                      <ul className="mt-1 space-y-1">
                        {movie.awards.map((award, index) => (
                          <li key={index} className="text-sm">• {award}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* AI Explanation Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>AI Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!aiExplanation ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">Get an in-depth AI analysis of this movie</p>
                <Button onClick={getAIExplanation} disabled={aiLoading}>
                  {aiLoading ? "Analyzing..." : "Get AI Explanation"}
                </Button>
              </div>
            ) : (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">{aiExplanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Movies */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recommended Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recommendedMovies.map((recMovie) => (
              <Card key={recMovie.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[2/3] relative overflow-hidden">
                  <img
                    src={recMovie.image}
                    alt={recMovie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {recMovie.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-1">{recMovie.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {recMovie.genre.slice(0, 2).map((g) => (
                      <Badge key={g} variant="outline" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/movies/${recMovie.id}`} className="mt-2 block">
                    <Button size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}