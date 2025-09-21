"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Film, Star, Calendar, Clock, User, ArrowLeft, Sparkles, Play, Users } from "lucide-react"
import Link from "next/link"

interface Anime {
  id: string
  title: string
  description: string
  image: string
  rating: number
  releaseDate: string
  genre: string[]
  episodes: number
  duration: string
  studio: string
  status: string
  trailer?: string
  plot: string
  language: string
  country: string
  voiceActors?: string[]
  themes?: string[]
  awards?: string[]
}

interface RecommendedAnime {
  id: string
  title: string
  image: string
  rating: number
  genre: string[]
}

export default function AnimeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [anime, setAnime] = useState<Anime | null>(null)
  const [recommendedAnime, setRecommendedAnime] = useState<RecommendedAnime[]>([])
  const [loading, setLoading] = useState(true)
  const [aiExplanation, setAiExplanation] = useState("")
  const [aiLoading, setAiLoading] = useState(false)

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      setLoading(true)
      try {
        // This will be replaced with actual API call
        const mockAnime: Anime = {
          id: params.id as string,
          title: "Naruto",
          description: "A young ninja seeks recognition from his peers and dreams of becoming the village leader.",
          image: "https://via.placeholder.com/400x600",
          rating: 8.4,
          releaseDate: "2002",
          genre: ["Action", "Adventure", "Martial Arts"],
          episodes: 220,
          duration: "23 min",
          studio: "Studio Pierrot",
          status: "Completed",
          trailer: "https://www.youtube.com/watch?v=3j_q9iZ5QsA",
          plot: "Naruto Uzumaki is a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village. The story follows Naruto as he grows and matures, following his ninja training and his various adventures.",
          language: "Japanese",
          country: "Japan",
          voiceActors: ["Junko Takeuchi", "Maile Flanagan", "Kazuhiko Inoue"],
          themes: ["Ninja", "Martial Arts", "Coming of Age", "Friendship", "Perseverance"],
          awards: ["Won 'Best Anime' at Tokyo Anime Awards", "Nominated for 'Best Animation'"]
        }

        const mockRecommended: RecommendedAnime[] = [
          {
            id: "2",
            title: "Bleach",
            image: "https://via.placeholder.com/200x300",
            rating: 8.2,
            genre: ["Action", "Adventure", "Supernatural"]
          },
          {
            id: "3",
            title: "One Piece",
            image: "https://via.placeholder.com/200x300",
            rating: 8.9,
            genre: ["Action", "Adventure", "Comedy"]
          },
          {
            id: "4",
            title: "My Hero Academia",
            image: "https://via.placeholder.com/200x300",
            rating: 8.5,
            genre: ["Action", "Comedy", "Superhero"]
          },
          {
            id: "5",
            title: "Demon Slayer",
            image: "https://via.placeholder.com/200x300",
            rating: 8.7,
            genre: ["Action", "Historical", "Supernatural"]
          }
        ]

        setTimeout(() => {
          setAnime(mockAnime)
          setRecommendedAnime(mockRecommended)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching anime details:", error)
        setLoading(false)
      }
    }

    fetchAnimeDetails()
  }, [params.id])

  const getAIExplanation = async () => {
    if (!anime) return
    
    setAiLoading(true)
    try {
      // This will be replaced with actual Gemini AI API call
      const mockExplanation = `"Naruto" is one of the most influential and beloved anime series of all time, created by Masashi Kishimoto. The story follows Naruto Uzumaki, a young ninja with dreams of becoming the Hokage (the leader of his village) as he navigates the challenges of ninja training, friendship, and personal growth.

The series is renowned for its well-developed characters, complex storyline, and exploration of themes such as perseverance, friendship, redemption, and the cycle of hatred. Naruto's journey from an outcast to a hero resonates with audiences worldwide, making it a cultural phenomenon.

Naruto has had a significant impact on global pop culture, inspiring countless other works and introducing millions of viewers to Japanese animation. Its success has led to numerous sequels, movies, video games, and merchandise, solidifying its place as one of the "Big Three" shonen anime alongside "One Piece" and "Bleach."

The series' blend of action, comedy, drama, and emotional depth has made it appealing to audiences of all ages, while its exploration of universal themes has given it lasting relevance and cultural significance.`
      
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

  if (!anime) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Anime not found</h1>
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
          <span>Back to Anime</span>
        </Button>

        {/* Anime Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Anime Poster */}
          <div>
            <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
              <img
                src={anime.image}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                  {anime.rating}
                </Badge>
              </div>
              <div className="absolute top-4 left-4">
                <Badge variant="outline" className="bg-white/90">
                  {anime.status}
                </Badge>
              </div>
            </div>
            
            {anime.trailer && (
              <Button className="w-full mt-4" variant="outline">
                <Play className="w-4 h-4 mr-2" />
                Watch Trailer
              </Button>
            )}
          </div>

          {/* Anime Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{anime.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{anime.releaseDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{anime.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{anime.episodes} episodes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{anime.studio}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {anime.genre.map((g) => (
                  <Badge key={g} variant="outline">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-gray-700 leading-relaxed">{anime.plot}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Voice Actors</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {anime.voiceActors?.map((actor, index) => (
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
                    <span className="font-medium">Language:</span> {anime.language}
                  </div>
                  <div>
                    <span className="font-medium">Country:</span> {anime.country}
                  </div>
                  <div>
                    <span className="font-medium">Studio:</span> {anime.studio}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> {anime.status}
                  </div>
                  {anime.themes && anime.themes.length > 0 && (
                    <div>
                      <span className="font-medium">Themes:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {anime.themes.map((theme, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {theme}
                          </Badge>
                        ))}
                      </div>
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
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>AI Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!aiExplanation ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">Get an in-depth AI analysis of this anime</p>
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

        {/* Recommended Anime */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recommended Anime</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recommendedAnime.map((recAnime) => (
              <Card key={recAnime.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[2/3] relative overflow-hidden">
                  <img
                    src={recAnime.image}
                    alt={recAnime.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {recAnime.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-1">{recAnime.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {recAnime.genre.slice(0, 2).map((g) => (
                      <Badge key={g} variant="outline" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/anime/${recAnime.id}`} className="mt-2 block">
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