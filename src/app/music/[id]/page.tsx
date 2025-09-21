"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Music, Star, Calendar, Clock, User, ArrowLeft, Sparkles, Play, Heart } from "lucide-react"
import Link from "next/link"

interface Song {
  id: string
  title: string
  artist: string
  album: string
  description: string
  image: string
  rating: number
  releaseDate: string
  genre: string[]
  duration: string
  preview?: string
  lyrics?: string
  writers?: string[]
  producers?: string[]
  recordLabel?: string
  awards?: string[]
  chartPositions?: { chart: string; position: number }[]
}

interface RecommendedSong {
  id: string
  title: string
  artist: string
  image: string
  rating: number
  genre: string[]
}

export default function MusicDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [song, setSong] = useState<Song | null>(null)
  const [recommendedSongs, setRecommendedSongs] = useState<RecommendedSong[]>([])
  const [loading, setLoading] = useState(true)
  const [aiExplanation, setAiExplanation] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [showLyrics, setShowLyrics] = useState(false)

  useEffect(() => {
    const fetchSongDetails = async () => {
      setLoading(true)
      try {
        // This will be replaced with actual API call
        const mockSong: Song = {
          id: params.id as string,
          title: "Bohemian Rhapsody",
          artist: "Queen",
          album: "A Night at the Opera",
          description: "A masterpiece that combines rock, ballad, and opera elements into one unforgettable song.",
          image: "https://via.placeholder.com/400x400",
          rating: 9.5,
          releaseDate: "1975",
          genre: ["Rock", "Progressive Rock"],
          duration: "5:55",
          preview: "https://example.com/preview1",
          lyrics: `Is this the real life?
Is this just fantasy?
Caught in a landslide
No escape from reality

Open your eyes
Look up to the skies and see
I'm just a poor boy, I need no sympathy
Because I'm easy come, easy go
A little high, little low
Anyway the wind blows, doesn't really matter to me, to me`,
          writers: ["Freddie Mercury"],
          producers: ["Queen", "Roy Thomas Baker"],
          recordLabel: "EMI",
          awards: ["Grammy Hall of Fame", "UK Singles Chart #1", "Billboard Hot 100 #9"],
          chartPositions: [
            { chart: "UK Singles Chart", position: 1 },
            { chart: "Billboard Hot 100", position: 9 },
            { chart: "Australian Singles Chart", position: 1 }
          ]
        }

        const mockRecommended: RecommendedSong[] = [
          {
            id: "2",
            title: "We Will Rock You",
            artist: "Queen",
            image: "https://via.placeholder.com/200x200",
            rating: 8.8,
            genre: ["Rock", "Arena Rock"]
          },
          {
            id: "3",
            title: "Don't Stop Me Now",
            artist: "Queen",
            image: "https://via.placeholder.com/200x200",
            rating: 9.0,
            genre: ["Rock", "Pop Rock"]
          },
          {
            id: "4",
            title: "Another One Bites the Dust",
            artist: "Queen",
            image: "https://via.placeholder.com/200x200",
            rating: 8.7,
            genre: ["Rock", "Funk Rock"]
          },
          {
            id: "5",
            title: "Somebody to Love",
            artist: "Queen",
            image: "https://via.placeholder.com/200x200",
            rating: 8.9,
            genre: ["Rock", "Gospel Rock"]
          }
        ]

        setTimeout(() => {
          setSong(mockSong)
          setRecommendedSongs(mockRecommended)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching song details:", error)
        setLoading(false)
      }
    }

    fetchSongDetails()
  }, [params.id])

  const getAIExplanation = async () => {
    if (!song) return
    
    setAiLoading(true)
    try {
      // This will be replaced with actual Gemini AI API call
      const mockExplanation = `"Bohemian Rhapsody" is widely regarded as one of the greatest songs ever recorded and a masterpiece of rock music. Written by Freddie Mercury, the song defies conventional song structure, blending elements of rock, ballad, and opera into a unique and unforgettable composition.

The song's structure is revolutionary, consisting of several distinct sections: an intro, a ballad segment, a guitar solo, an operatic passage, a hard rock part, and a reflective coda. This complexity was unprecedented in popular music at the time and showcased Queen's musical innovation and ambition.

Lyrically, the song touches on themes of life, death, and existential crisis, with Mercury drawing from personal experiences and literary influences. The title itself suggests a rhapsody (an epic poem) with bohemian (unconventional) themes.

"Bohemian Rhapsody" was a commercial success, topping charts worldwide and becoming one of the best-selling singles of all time. Its cultural impact extends beyond music, influencing countless artists and appearing in numerous films, TV shows, and commercials. The song's enduring popularity is a testament to its artistic merit and emotional resonance.`
      
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
              <Skeleton className="aspect-square w-full" />
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

  if (!song) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Song not found</h1>
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
          <span>Back to Music</span>
        </Button>

        {/* Song Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Album Cover */}
          <div>
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src={song.image}
                alt={song.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                  {song.rating}
                </Badge>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Button className="w-full bg-white text-black hover:bg-gray-100">
                  <Play className="w-4 h-4 mr-2" />
                  Play Song
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1">
                <Heart className="w-4 h-4 mr-2" />
                Favorite
              </Button>
              <Button variant="outline" className="flex-1">
                Share
              </Button>
            </div>
          </div>

          {/* Song Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{song.title}</h1>
              <h2 className="text-2xl text-gray-600 mb-4">{song.artist}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{song.releaseDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{song.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Music className="w-4 h-4" />
                  <span>{song.album}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {song.genre.map((g) => (
                  <Badge key={g} variant="outline">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">About</h3>
              <p className="text-gray-700 leading-relaxed">{song.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Credits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-medium">Written by:</span>
                    <ul className="mt-1 space-y-1">
                      {song.writers?.map((writer, index) => (
                        <li key={index} className="text-sm">• {writer}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium">Produced by:</span>
                    <ul className="mt-1 space-y-1">
                      {song.producers?.map((producer, index) => (
                        <li key={index} className="text-sm">• {producer}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium">Record Label:</span> {song.recordLabel}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Chart Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {song.chartPositions?.map((chart, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">{chart.chart}:</span> #{chart.position}
                      </li>
                    ))}
                  </ul>
                  {song.awards && song.awards.length > 0 && (
                    <div className="mt-3">
                      <span className="font-medium">Awards:</span>
                      <ul className="mt-1 space-y-1">
                        {song.awards.map((award, index) => (
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

        {/* Lyrics Section */}
        {song.lyrics && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Lyrics</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLyrics(!showLyrics)}
                >
                  {showLyrics ? "Hide" : "Show"} Lyrics
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showLyrics && (
                <div className="prose prose-gray max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700">{song.lyrics}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        )}

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
                <p className="text-gray-600 mb-4">Get an in-depth AI analysis of this song</p>
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

        {/* Recommended Songs */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recommended Songs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recommendedSongs.map((recSong) => (
              <Card key={recSong.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={recSong.image}
                    alt={recSong.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {recSong.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{recSong.title}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-1">{recSong.artist}</p>
                  <div className="flex flex-wrap gap-1">
                    {recSong.genre.slice(0, 2).map((g) => (
                      <Badge key={g} variant="outline" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/music/${recSong.id}`} className="mt-2 block">
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