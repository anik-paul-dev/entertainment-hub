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

interface Cartoon {
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
  network?: string
  creator?: string
}

export default function CartoonPage() {
  const [cartoons, setCartoons] = useState<Cartoon[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [currentPage, setCurrentPage] = useState(1)

  const genres = [
    "all",
    "Comedy",
    "Adventure",
    "Action",
    "Fantasy",
    "Educational",
    "Musical",
    "Superhero",
    "Science Fiction",
    "Mystery",
    "Horror",
    "Romance",
    "Drama",
  ]

  useEffect(() => {
    const fetchCartoons = async () => {
      setLoading(true)
      try {
        // This will be replaced with actual API call to a free cartoon API
        const mockCartoons: Cartoon[] = [
          {
            id: "1",
            title: "Tom and Jerry",
            description: "The classic cat and mouse cartoon series featuring the eternal rivalry between Tom Cat and Jerry Mouse.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.1,
            releaseDate: "1940",
            genre: ["Comedy", "Adventure"],
            episodes: 164,
            duration: "7-10 min",
            studio: "MGM",
            network: "CBS",
            creator: "William Hanna, Joseph Barbera"
          },
          {
            id: "2",
            title: "Scooby-Doo, Where Are You!",
            description: "Four teenagers and their dog solve mysteries involving supposedly supernatural creatures.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.3,
            releaseDate: "1969",
            genre: ["Mystery", "Comedy", "Adventure"],
            episodes: 41,
            duration: "22 min",
            studio: "Hanna-Barbera",
            network: "CBS",
            creator: "Joe Ruby, Ken Spears"
          },
          {
            id: "3",
            title: "Looney Tunes",
            description: "A series of animated short films featuring characters like Bugs Bunny, Daffy Duck, and Porky Pig.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.7,
            releaseDate: "1930",
            genre: ["Comedy", "Adventure"],
            episodes: 1000,
            duration: "6-10 min",
            studio: "Warner Bros.",
            network: "Various",
            creator: "Various"
          },
          {
            id: "4",
            title: "The Simpsons",
            description: "The satirical parody of a middle class American lifestyle epitomized by its family of the same name.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.6,
            releaseDate: "1989",
            genre: ["Comedy", "Satire"],
            episodes: 700,
            duration: "22 min",
            studio: "20th Television",
            network: "Fox",
            creator: "Matt Groening"
          },
          {
            id: "5",
            title: "Avatar: The Last Airbender",
            description: "In a war-torn world, a young boy with the power to control air embarks on a quest to bring peace.",
            image: "https://via.placeholder.com/300x450",
            rating: 9.3,
            releaseDate: "2005",
            genre: ["Action", "Adventure", "Fantasy"],
            episodes: 61,
            duration: "23 min",
            studio: "Nickelodeon",
            network: "Nickelodeon",
            creator: "Michael Dante DiMartino, Bryan Konietzko"
          },
          {
            id: "6",
            title: "Rick and Morty",
            description: "An alcoholic scientist and his grandson go on interdimensional adventures.",
            image: "https://via.placeholder.com/300x450",
            rating: 9.2,
            releaseDate: "2013",
            genre: ["Comedy", "Science Fiction", "Adventure"],
            episodes: 61,
            duration: "22 min",
            studio: "Adult Swim",
            network: "Adult Swim",
            creator: "Justin Roiland, Dan Harmon"
          },
          {
            id: "7",
            title: "South Park",
            description: "Four boys and their exploits in and around the fictional Colorado town of South Park.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.7,
            releaseDate: "1997",
            genre: ["Comedy", "Satire", "Adventure"],
            episodes: 325,
            duration: "22 min",
            studio: "South Park Studios",
            network: "Comedy Central",
            creator: "Trey Parker, Matt Stone"
          },
          {
            id: "8",
            title: "Phineas and Ferb",
            description: "Two stepbrothers create incredible inventions while their sister tries to bust them.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.4,
            releaseDate: "2007",
            genre: ["Comedy", "Adventure", "Musical"],
            episodes: 222,
            duration: "22 min",
            studio: "Disney Television Animation",
            network: "Disney Channel",
            creator: "Dan Povenmire, Jeff Marsh"
          }
        ]
        
        setTimeout(() => {
          setCartoons(mockCartoons)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching cartoons:", error)
        setLoading(false)
      }
    }

    fetchCartoons()
  }, [])

  const filteredCartoons = cartoons.filter(item => 
    selectedGenre === "all" || item.genre.includes(selectedGenre)
  )

  const sortedCartoons = [...filteredCartoons].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "date") {
      return parseInt(b.releaseDate) - parseInt(a.releaseDate)
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  const CartoonCard = ({ item }: { item: Cartoon }) => (
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
        <Link href={`/cartoon/${item.id}`}>
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
            <Film className="w-10 h-10 text-green-600" />
            <span>Cartoons</span>
          </h1>
          <p className="text-xl text-gray-600">Enjoy classic and modern cartoons from around the world</p>
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

        {/* Cartoons Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedCartoons.map((item) => (
              <CartoonCard key={item.id} item={item} />
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