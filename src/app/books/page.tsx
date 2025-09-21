"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import SearchBar from "@/components/search-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Book, Star, Calendar, User, Filter, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Book {
  id: string
  title: string
  author: string
  description: string
  image: string
  rating: number
  publishDate: string
  genre: string[]
  pages?: number
  publisher?: string
  language?: string
  isbn?: string
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [currentPage, setCurrentPage] = useState(1)

  const genres = [
    "all",
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Fantasy",
    "Thriller",
    "Biography",
    "History",
    "Self-Help",
    "Business",
    "Children's",
    "Young Adult",
    "Classic",
    "Poetry",
    "Drama",
    "Horror"
  ]

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      try {
        // This will be replaced with actual API call to a free books API
        const mockBooks: Book[] = [
          {
            id: "1",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            description: "A classic American novel about the Jazz Age and the American Dream.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.7,
            publishDate: "1925",
            genre: ["Classic", "Fiction"],
            pages: 180,
            publisher: "Charles Scribner's Sons",
            language: "English",
            isbn: "978-0-7432-7356-5"
          },
          {
            id: "2",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            description: "A gripping tale of racial injustice and childhood innocence in the American South.",
            image: "https://via.placeholder.com/300x450",
            rating: 9.0,
            publishDate: "1960",
            genre: ["Classic", "Fiction"],
            pages: 324,
            publisher: "J.B. Lippincott & Co.",
            language: "English",
            isbn: "978-0-06-112008-4"
          },
          {
            id: "3",
            title: "1984",
            author: "George Orwell",
            description: "A dystopian social science fiction novel about totalitarian control.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.8,
            publishDate: "1949",
            genre: ["Science Fiction", "Dystopian"],
            pages: 328,
            publisher: "Secker & Warburg",
            language: "English",
            isbn: "978-0-452-28423-4"
          },
          {
            id: "4",
            title: "Pride and Prejudice",
            author: "Jane Austen",
            description: "A romantic novel of manners that depicts the emotional development of protagonist Elizabeth Bennet.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.9,
            publishDate: "1813",
            genre: ["Classic", "Romance"],
            pages: 432,
            publisher: "T. Egerton",
            language: "English",
            isbn: "978-0-14-143951-8"
          },
          {
            id: "5",
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            description: "A controversial novel about teenage rebellion and alienation.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.3,
            publishDate: "1951",
            genre: ["Fiction", "Coming of Age"],
            pages: 277,
            publisher: "Little, Brown and Company",
            language: "English",
            isbn: "978-0-316-76948-0"
          },
          {
            id: "6",
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            description: "An epic high-fantasy novel and one of the best-selling books ever written.",
            image: "https://via.placeholder.com/300x450",
            rating: 9.2,
            publishDate: "1954",
            genre: ["Fantasy", "Adventure"],
            pages: 1178,
            publisher: "George Allen & Unwin",
            language: "English",
            isbn: "978-0-544-00341-5"
          },
          {
            id: "7",
            title: "Harry Potter and the Philosopher's Stone",
            author: "J.K. Rowling",
            description: "The first novel in the Harry Potter series about a young wizard.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.9,
            publishDate: "1997",
            genre: ["Fantasy", "Young Adult"],
            pages: 223,
            publisher: "Bloomsbury",
            language: "English",
            isbn: "978-0-7475-3269-9"
          },
          {
            id: "8",
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            description: "A fantasy novel about the adventures of hobbit Bilbo Baggins.",
            image: "https://via.placeholder.com/300x450",
            rating: 8.8,
            publishDate: "1937",
            genre: ["Fantasy", "Adventure"],
            pages: 310,
            publisher: "George Allen & Unwin",
            language: "English",
            isbn: "978-0-547-92822-7"
          }
        ]
        
        setTimeout(() => {
          setBooks(mockBooks)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching books:", error)
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const filteredBooks = books.filter(book => 
    selectedGenre === "all" || book.genre.includes(selectedGenre)
  )

  const sortedBooks = [...filteredBooks].sort((a, b) => {
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

  const BookCard = ({ book }: { book: Book }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
            {book.rating}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-1">{book.author}</p>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{book.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{book.publishDate}</span>
          </div>
          {book.pages && (
            <div className="flex items-center space-x-1">
              <Book className="w-3 h-3" />
              <span>{book.pages} pages</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {book.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="outline" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>
        <Link href={`/books/${book.id}`}>
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
            <Book className="w-10 h-10 text-orange-600" />
            <span>Books</span>
          </h1>
          <p className="text-xl text-gray-600">Discover timeless stories and knowledge from around the world</p>
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

        {/* Books Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
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