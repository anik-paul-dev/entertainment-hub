"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import SearchBar from "@/components/search-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Book, Star, Calendar, User, Filter, Feather } from "lucide-react"
import Link from "next/link"

interface Poem {
  id: string
  title: string
  author: string
  description: string
  image: string
  rating: number
  publishDate: string
  genre: string[]
  lines?: number
  period?: string
  themes?: string[]
  fullText?: string
}

export default function PoemsPage() {
  const [poems, setPoems] = useState<Poem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [currentPage, setCurrentPage] = useState(1)

  const genres = [
    "all",
    "Romantic",
    "Modern",
    "Classical",
    "Haiku",
    "Sonnet",
    "Free Verse",
    "Epic",
    "Lyrical",
    "Narrative",
    "Dramatic",
    "Pastoral",
    "Elegy",
    "Ode",
    "Ballad"
  ]

  useEffect(() => {
    const fetchPoems = async () => {
      setLoading(true)
      try {
        // This will be replaced with actual API call to a free poetry API
        const mockPoems: Poem[] = [
          {
            id: "1",
            title: "The Road Not Taken",
            author: "Robert Frost",
            description: "A poem about choices and their consequences in life's journey.",
            image: "https://via.placeholder.com/300x450",
            rating: 9.2,
            publishDate: "1916",
            genre: ["Modern", "Narrative"],
            lines: 20,
            period: "Modernist",
            themes: ["Choice", "Life Journey", "Decision Making"],
            fullText: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth..."
          },
          {
            id: "2",
            title: "Sonnet 18",
            author: "William Shakespeare",
            description: "One of Shakespeare's most famous sonnets about the beauty of love.",
            image: "https://via.placeholder.com/300x450",
            rating: 9.5,
            publishDate: "1609",
            genre: ["Sonnet", "Classical"],
            lines: 14,
            period: "Renaissance",
            themes: ["Love", "Beauty", "Immortality"],
            fullText: "Shall I compare thee to a summer's day?\nThou art more lovely and more temperate:\nRough winds do shake the darling buds of May,\nAnd summer's lease hath all too short a date..."
          },
          {
            id: "3",
            title: "If—",
            author: "Rudyard Kipling",
            description: "An inspirational poem about virtue and moral strength.",
            image: "https://via.placeholder.com/300x450",
            rating: 9.0,
            publishDate: "1895",
            genre: ["Victorian", "Inspirational"],
            lines: 32,
            period: "Victorian",
            themes: ["Virtue", "Wisdom", "Character"],
            fullText: "If you can keep your head when all about you\nAre losing theirs and blaming it on you,\nIf you can trust yourself when all men doubt you,\nBut make allowance for their doubting too..."
          },
          {
            id: "4",
            title: "The Raven",
            author: "Edgar Allan Poe",
            description: "A narrative poem of mysterious and supernatural atmosphere.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.8,
            publishDate: "1845",
            genre: ["Gothic", "Narrative"],
            lines: 108,
            period: "Romantic",
            themes: ["Loss", "Mystery", "Death"],
            fullText: "Once upon a midnight dreary, while I pondered, weak and weary,\nOver many a quaint and curious volume of forgotten lore—\nWhile I nodded, nearly napping, suddenly there came a tapping,\nAs of some one gently rapping, rapping at my chamber door..."
          },
          {
            id: "5",
            title: "Daffodils",
            author: "William Wordsworth",
            description: "A celebration of nature's beauty and its effect on the human spirit.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.7,
            publishDate: "1807",
            genre: ["Romantic", "Nature"],
            lines: 24,
            period: "Romantic",
            themes: ["Nature", "Beauty", "Memory"],
            fullText: "I wandered lonely as a cloud\nThat floats on high o'er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils..."
          },
          {
            id: "6",
            title: "Still I Rise",
            author: "Maya Angelou",
            description: "A powerful poem about resilience and overcoming oppression.",
            image: "https://via.placeholder.com/300x450",
            rating: 9.3,
            publishDate: "1978",
            genre: ["Modern", "Civil Rights"],
            lines: 43,
            period: "Contemporary",
            themes: ["Resilience", "Empowerment", "Freedom"],
            fullText: "You may write me down in history\nWith your bitter, twisted lies,\nYou may tread me in the very dirt\nBut still, like dust, I'll rise..."
          },
          {
            id: "7",
            title: "The Love Song of J. Alfred Prufrock",
            author: "T.S. Eliot",
            description: "A modernist poem exploring consciousness and modern anxiety.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.5,
            publishDate: "1915",
            genre: ["Modernist", "Dramatic Monologue"],
            lines: 132,
            period: "Modernist",
            themes: ["Anxiety", "Modern Life", "Time"],
            fullText: "Let us go then, you and I,\nWhen the evening is spread out against the sky\nLike a patient etherized upon a table;\nLet us go, through certain half-deserted streets..."
          },
          {
            id: "8",
            title: "Haiku: Old Pond",
            author: "Matsuo Bashō",
            description: "A classic haiku capturing a moment of natural tranquility.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.9,
            publishDate: "1686",
            genre: ["Haiku", "Zen"],
            lines: 3,
            period: "Edo Period",
            themes: ["Nature", "Tranquility", "Moment"],
            fullText: "An old silent pond\nA frog jumps into the pond—\nSplash! Silence again."
          }
        ]
        
        setTimeout(() => {
          setPoems(mockPoems)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching poems:", error)
        setLoading(false)
      }
    }

    fetchPoems()
  }, [])

  const filteredPoems = poems.filter(poem => 
    selectedGenre === "all" || poem.genre.includes(selectedGenre)
  )

  const sortedPoems = [...filteredPoems].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "date") {
      return parseInt(b.publishDate) - parseInt(a.publishDate)
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    } else if (sortBy === "author") {
      return a.author.localeCompare(b.author)
    }
    return 0
  })

  const PoemCard = ({ poem }: { poem: Poem }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={poem.image}
          alt={poem.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
            {poem.rating}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge variant="outline" className="bg-white/90">
            <Feather className="w-3 h-3 mr-1" />
            {poem.lines} lines
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{poem.title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-1">{poem.author}</p>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{poem.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{poem.publishDate}</span>
          </div>
          {poem.period && (
            <div className="text-xs">
              {poem.period}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {poem.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="outline" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>
        <Link href={`/poems/${poem.id}`}>
          <Button size="sm" className="w-full">
            Read Poem
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
            <Feather className="w-10 h-10 text-purple-600" />
            <span>Poems</span>
          </h1>
          <p className="text-xl text-gray-600">Discover beautiful poetry from classical to contemporary</p>
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
                  <SelectItem value="author">Author</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Poems Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedPoems.map((poem) => (
              <PoemCard key={poem.id} poem={poem} />
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