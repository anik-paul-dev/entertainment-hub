"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import SearchBar from "@/components/search-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Music, Star, Calendar, Clock, Filter, Play, User } from "lucide-react"
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
  duration?: string
  preview?: string
  lyrics?: string
}

export default function MusicPage() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [currentPage, setCurrentPage] = useState(1)

  const genres = [
    "all",
    "Pop",
    "Rock",
    "Hip Hop",
    "Jazz",
    "Classical",
    "Electronic",
    "R&B",
    "Country",
    "Folk",
    "Blues",
    "Reggae",
    "Metal",
    "Punk",
    "Alternative",
    "Indie",
  ]

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true)
      try {
        // This will be replaced with actual API call to a free music API
        const mockSongs: Song[] = [
          {
            id: "1",
            title: "Bohemian Rhapsody",
            artist: "Queen",
            album: "A Night at the Opera",
            description: "A masterpiece that combines rock, ballad, and opera elements into one unforgettable song.",
            image: "https://via.placeholder.com/300x300",
            rating: 9.5,
            releaseDate: "1975",
            genre: ["Rock", "Progressive Rock"],
            duration: "5:55",
            preview: "https://example.com/preview1",
            lyrics: "Is this the real life? Is this just fantasy?"
          },
          {
            id: "2",
            title: "Imagine",
            artist: "John Lennon",
            album: "Imagine",
            description: "A song about peace and unity that has become an anthem for hope worldwide.",
            image: "https://via.placeholder.com/300x300",
            rating: 9.2,
            releaseDate: "1971",
            genre: ["Rock", "Pop"],
            duration: "3:07",
            preview: "https://example.com/preview2",
            lyrics: "Imagine there's no heaven, it's easy if you try"
          },
          {
            id: "3",
            title: "Hotel California",
            artist: "Eagles",
            album: "Hotel California",
            description: "A classic rock song with mysterious lyrics and one of the greatest guitar solos of all time.",
            image: "https://via.placeholder.com/300x300",
            rating: 9.0,
            releaseDate: "1976",
            genre: ["Rock", "Folk Rock"],
            duration: "6:30",
            preview: "https://example.com/preview3",
            lyrics: "On a dark desert highway, cool wind in my hair"
          },
          {
            id: "4",
            title: "Like a Rolling Stone",
            artist: "Bob Dylan",
            album: "Highway 61 Revisited",
            description: "A revolutionary song that changed the landscape of popular music forever.",
            image: "https://via.placeholder.com/300x300",
            rating: 9.3,
            releaseDate: "1965",
            genre: ["Folk Rock", "Rock"],
            duration: "6:13",
            preview: "https://example.com/preview4",
            lyrics: "Once upon a time you dressed so fine"
          },
          {
            id: "5",
            title: "Billie Jean",
            artist: "Michael Jackson",
            album: "Thriller",
            description: "The King of Pop's biggest hit that dominated charts worldwide.",
            image: "https://via.placeholder.com/300x300",
            rating: 9.1,
            releaseDate: "1982",
            genre: ["Pop", "R&B", "Funk"],
            duration: "4:54",
            preview: "https://example.com/preview5",
            lyrics: "She was more like a beauty queen from a movie scene"
          },
          {
            id: "6",
            title: "Smells Like Teen Spirit",
            artist: "Nirvana",
            album: "Nevermind",
            description: "The anthem of Generation X that defined the grunge movement.",
            image: "https://via.placeholder.com/300x300",
            rating: 8.9,
            releaseDate: "1991",
            genre: ["Grunge", "Alternative Rock"],
            duration: "5:01",
            preview: "https://example.com/preview6",
            lyrics: "Load up on guns, bring your friends"
          },
          {
            id: "7",
            title: "Purple Haze",
            artist: "Jimi Hendrix",
            album: "Are You Experienced",
            description: "A psychedelic rock masterpiece that showcases Hendrix's revolutionary guitar playing.",
            image: "https://via.placeholder.com/300x300",
            rating: 9.2,
            releaseDate: "1967",
            genre: ["Psychedelic Rock", "Acid Rock"],
            duration: "2:50",
            preview: "https://example.com/preview7",
            lyrics: "Purple haze all in my brain"
          },
          {
            id: "8",
            title: "Good Vibrations",
            artist: "The Beach Boys",
            album: "Smiley Smile",
            description: "A revolutionary pop song that pushed the boundaries of studio production.",
            image: "https://via.placeholder.com/300x300",
            rating: 8.8,
            releaseDate: "1966",
            genre: ["Pop", "Psychedelic Pop"],
            duration: "3:39",
            preview: "https://example.com/preview8",
            lyrics: "I, I love the colorful clothes she wears"
          }
        ]
        
        setTimeout(() => {
          setSongs(mockSongs)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching songs:", error)
        setLoading(false)
      }
    }

    fetchSongs()
  }, [])

  const filteredSongs = songs.filter(song => 
    selectedGenre === "all" || song.genre.includes(selectedGenre)
  )

  const sortedSongs = [...filteredSongs].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "date") {
      return parseInt(b.releaseDate) - parseInt(a.releaseDate)
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    } else if (sortBy === "artist") {
      return a.artist.localeCompare(b.artist)
    }
    return 0
  })

  const SongCard = ({ song }: { song: Song }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={song.image}
          alt={song.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
            {song.rating}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="sm" className="bg-white text-black hover:bg-gray-100">
            <Play className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{song.title}</h3>
        <p className="text-sm text-gray-600 mb-1 line-clamp-1">{song.artist}</p>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{song.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{song.releaseDate}</span>
          </div>
          {song.duration && (
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{song.duration}</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {song.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="outline" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>
        <Link href={`/music/${song.id}`}>
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
            <Music className="w-10 h-10 text-purple-600" />
            <span>Music</span>
          </h1>
          <p className="text-xl text-gray-600">Discover timeless songs and melodies from around the world</p>
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
                  <SelectItem value="artist">Artist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Songs Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedSongs.map((song) => (
              <SongCard key={song.id} song={song} />
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