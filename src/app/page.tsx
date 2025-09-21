"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Film, Music, Book, Cloud, Trophy, TrendingUp, Star, Calendar } from "lucide-react"
import Link from "next/link"

interface ContentItem {
  id: string
  title: string
  description: string
  image: string
  rating?: number
  releaseDate?: string
  genre?: string[]
  type: string
}

export default function Home() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data from APIs
    const fetchContent = async () => {
      setLoading(true)
      // This will be replaced with actual API calls
      const mockContent: ContentItem[] = [
        {
          id: "1",
          title: "The Matrix",
          description: "A computer hacker learns from mysterious rebels about the true nature of his reality.",
          image: "https://via.placeholder.com/300x450",
          rating: 8.7,
          releaseDate: "1999",
          genre: ["Action", "Sci-Fi"],
          type: "movie"
        },
        {
          id: "2",
          title: "Naruto",
          description: "A young ninja seeks recognition from his peers and dreams of becoming the village leader.",
          image: "https://via.placeholder.com/300x450",
          rating: 8.4,
          releaseDate: "2002",
          genre: ["Action", "Adventure"],
          type: "anime"
        },
        {
          id: "3",
          title: "Tom and Jerry",
          description: "The classic cat and mouse cartoon series.",
          image: "https://via.placeholder.com/300x450",
          rating: 8.1,
          releaseDate: "1940",
          genre: ["Comedy", "Animation"],
          type: "cartoon"
        },
        {
          id: "4",
          title: "Bohemian Rhapsody",
          description: "The story of the legendary rock band Queen and lead singer Freddie Mercury.",
          image: "https://via.placeholder.com/300x450",
          rating: 8.0,
          releaseDate: "2018",
          genre: ["Biography", "Drama", "Music"],
          type: "music"
        },
        {
          id: "5",
          title: "The Great Gatsby",
          description: "A classic American novel about the Jazz Age.",
          image: "https://via.placeholder.com/300x450",
          rating: 8.2,
          releaseDate: "1925",
          genre: ["Classic", "Fiction"],
          type: "book"
        },
        {
          id: "6",
          title: "The Road Not Taken",
          description: "A famous poem by Robert Frost about choices in life.",
          image: "https://via.placeholder.com/300x450",
          rating: 8.5,
          releaseDate: "1916",
          genre: ["Poetry"],
          type: "poem"
        }
      ]
      
      setTimeout(() => {
        setContent(mockContent)
        setLoading(false)
      }, 1000)
    }

    fetchContent()
  }, [])

  const ContentCard = ({ item }: { item: ContentItem }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {item.type}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          {item.rating && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{item.rating}</span>
            </div>
          )}
          {item.releaseDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{item.releaseDate}</span>
            </div>
          )}
        </div>
        {item.genre && item.genre.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.genre.slice(0, 2).map((g) => (
              <Badge key={g} variant="outline" className="text-xs">
                {g}
              </Badge>
            ))}
          </div>
        )}
        <Link href={`/${item.type}s/${item.id}`}>
          <Button size="sm" className="w-full">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  )

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center py-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to MediaHub</h1>
          <p className="text-xl md:text-2xl mb-8">Your one-stop destination for movies, music, books, and more</p>
          <p className="text-lg opacity-90">Discover content from around the world, powered by free APIs</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Movies Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center space-x-2">
                <Film className="w-8 h-8 text-purple-600" />
                <span>Movies</span>
              </h2>
              <Link href="/movies">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="aspect-[2/3]" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {content.filter(item => item.type === "movie").slice(0, 5).map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>

          {/* Anime Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center space-x-2">
                <Film className="w-8 h-8 text-blue-600" />
                <span>Anime</span>
              </h2>
              <Link href="/anime">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="aspect-[2/3]" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {content.filter(item => item.type === "anime").slice(0, 5).map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>

          {/* Music Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center space-x-2">
                <Music className="w-8 h-8 text-green-600" />
                <span>Music</span>
              </h2>
              <Link href="/music">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="aspect-[2/3]" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {content.filter(item => item.type === "music").slice(0, 5).map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>

          {/* Books Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center space-x-2">
                <Book className="w-8 h-8 text-orange-600" />
                <span>Books</span>
              </h2>
              <Link href="/books">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="aspect-[2/3]" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {content.filter(item => item.type === "book").slice(0, 5).map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>

          {/* Weather Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center space-x-2">
                <Cloud className="w-8 h-8 text-cyan-600" />
                <span>Weather</span>
              </h2>
              <Link href="/weather">
                <Button variant="outline">View Details</Button>
              </Link>
            </div>
            <Card className="p-6">
              <div className="text-center">
                <Cloud className="w-16 h-16 mx-auto mb-4 text-cyan-600" />
                <h3 className="text-xl font-semibold mb-2">Check Weather Forecast</h3>
                <p className="text-gray-600 mb-4">Get real-time weather updates for any location</p>
                <Link href="/weather">
                  <Button>Check Weather</Button>
                </Link>
              </div>
            </Card>
          </section>

          {/* Sports Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center space-x-2">
                <Trophy className="w-8 h-8 text-yellow-600" />
                <span>Sports</span>
              </h2>
              <Link href="/sports">
                <Button variant="outline">View Scores</Button>
              </Link>
            </div>
            <Card className="p-6">
              <div className="text-center">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
                <h3 className="text-xl font-semibold mb-2">Live Sports Scores</h3>
                <p className="text-gray-600 mb-4">Get live scores and updates for cricket and football</p>
                <Link href="/sports">
                  <Button>View Scores</Button>
                </Link>
              </div>
            </Card>
          </section>

          {/* AI Trends Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-pink-600" />
                <span>AI Trend Analyzer</span>
              </h2>
              <Link href="/trends">
                <Button variant="outline">Analyze Trends</Button>
              </Link>
            </div>
            <Card className="p-6">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-pink-600" />
                <h3 className="text-xl font-semibold mb-2">Discover Trends</h3>
                <p className="text-gray-600 mb-4">Analyze trends and get insights powered by AI</p>
                <Link href="/trends">
                  <Button>Analyze Now</Button>
                </Link>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  )
}