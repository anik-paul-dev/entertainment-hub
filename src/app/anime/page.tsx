"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import SearchBar from "@/components/search-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Film, Star, Calendar, Clock, Filter, Play } from "lucide-react"
import Link from "next/link"

interface Anime {
  id: string
  title: string
  description: string
  image: string
  rating: number
  releaseDate: string
  genre: string[]
  episodes?: number
  duration?: string
  studio?: string
  status?: string
}

export default function AnimePage() {
  const [anime, setAnime] = useState<Anime[]>([])
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
    "Fantasy",
    "Horror",
    "Mystery",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Thriller",
  ]

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true)
      try {
        // This will be replaced with actual API call to a free anime API
        const mockAnime: Anime[] = [
          {
            id: "1",
            title: "Naruto",
            description: "A young ninja seeks recognition from his peers and dreams of becoming the village leader.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.4,
            releaseDate: "2002",
            genre: ["Action", "Adventure", "Martial Arts"],
            episodes: 220,
            duration: "23 min",
            studio: "Studio Pierrot",
            status: "Completed"
          },
          {
            id: "2",
            title: "Death Note",
            description: "A high school student discovers a supernatural notebook that allows him to kill anyone by writing their name in it.",
            image: "https://via.placeholder.com/300x450",
            rating: 9.0,
            releaseDate: "2006",
            genre: ["Thriller", "Mystery", "Supernatural"],
            episodes: 37,
            duration: "23 min",
            studio: "Madhouse",
            status: "Completed"
          },
          {
            id: "3",
            title: "Attack on Titan",
            description: "Humanity fights for survival against giant humanoid Titans that devour humans.",
            image: "https://via.placeholder.com/300x450",
            rating: 9.0,
            releaseDate: "2013",
            genre: ["Action", "Drama", "Fantasy"],
            episodes: 75,
            duration: "24 min",
            studio: "Wit Studio",
            status: "Completed"
          },
          {
            id: "4",
            title: "One Piece",
            description: "Follows the adventures of Monkey D. Luffy and his pirate crew in search of the greatest treasure known as One Piece.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.9,
            releaseDate: "1999",
            genre: ["Action", "Adventure", "Comedy"],
            episodes: 1000,
            duration: "24 min",
            studio: "Toei Animation",
            status: "Ongoing"
          },
          {
            id: "5",
            title: "Dragon Ball Z",
            description: "Goku and his friends defend the Earth against various villains, including aliens, androids, and magical creatures.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.8,
            releaseDate: "1989",
            genre: ["Action", "Adventure", "Martial Arts"],
            episodes: 291,
            duration: "24 min",
            studio: "Toei Animation",
            status: "Completed"
          },
          {
            id: "6",
            title: "My Hero Academia",
            description: "In a world where people with superpowers known as 'Quirks' are the norm, Izuku Midoriya dreams of becoming a Hero.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.5,
            releaseDate: "2016",
            genre: ["Action", "Comedy", "Superhero"],
            episodes: 138,
            duration: "24 min",
            studio: "Bones",
            status: "Ongoing"
          },
          {
            id: "7",
            title: "Demon Slayer",
            description: "A boy becomes a demon slayer after his family is slaughtered and his sister turned into a demon.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.7,
            releaseDate: "2019",
            genre: ["Action", "Historical", "Supernatural"],
            episodes: 44,
            duration: "24 min",
            studio: "Ufotable",
            status: "Completed"
          },
          {
            id: "8",
            title: "Spirited Away",
            description: "A young girl enters a world ruled by gods, witches, and spirits where humans are changed into beasts.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.6,
            releaseDate: "2001",
            genre: ["Adventure", "Family", "Supernatural"],
            duration: "125 min",
            studio: "Studio Ghibli",
            status: "Movie"
          }
        ]
        
        setTimeout(() => {
          setAnime(mockAnime)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching anime:", error)
        setLoading(false)
      }
    }

    fetchAnime()
  }, [])

  const filteredAnime = anime.filter(item => 
    selectedGenre === "all" || item.genre.includes(selectedGenre)
  )

  const sortedAnime = [...filteredAnime].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "date") {
      return parseInt(b.releaseDate) - parseInt(a.releaseDate)
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  const AnimeCard = ({ item }: { item: Anime }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
            {item.rating}
          </Badge>
        </div>
        {item.status === "Ongoing" && (
          <div className="absolute top-2 left-2">
            <Badge variant="destructive" className="text-xs">
              Ongoing
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{item.releaseDate}</span>
          </div>
          {item.episodes && (
            <div className="flex items-center space-x-1">
              <Play className="w-4 h-4" />
              <span>{item.episodes} eps</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {item.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="outline" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>
        <Link href={`/anime/${item.id}`}>
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
            <Film className="w-10 h-10 text-blue-600" />
            <span>Anime</span>
          </h1>
          <p className="text-xl text-gray-600">Discover the best anime from Japan and around the world</p>
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

        {/* Anime Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedAnime.map((item) => (
              <AnimeCard key={item.id} item={item} />
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