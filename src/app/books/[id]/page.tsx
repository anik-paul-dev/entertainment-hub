"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Book, Star, Calendar, User, ArrowLeft, Sparkles, ExternalLink, Bookmark } from "lucide-react"
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
  pages: number
  publisher: string
  language: string
  isbn: string
  plot: string
  themes?: string[]
  awards?: string[]
  characters?: string[]
  setting?: string
  similarBooks?: string[]
}

interface RecommendedBook {
  id: string
  title: string
  author: string
  image: string
  rating: number
  genre: string[]
}

export default function BookDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null)
  const [recommendedBooks, setRecommendedBooks] = useState<RecommendedBook[]>([])
  const [loading, setLoading] = useState(true)
  const [aiExplanation, setAiExplanation] = useState("")
  const [aiLoading, setAiLoading] = useState(false)

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true)
      try {
        // This will be replaced with actual API call
        const mockBook: Book = {
          id: params.id as string,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          description: "A classic American novel about the Jazz Age and the American Dream.",
          image: "https://via.placeholder.com/400x600",
          rating: 8.7,
          publishDate: "1925",
          genre: ["Classic", "Fiction"],
          pages: 180,
          publisher: "Charles Scribner's Sons",
          language: "English",
          isbn: "978-0-7432-7356-5",
          plot: "The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan. Considered to be Fitzgerald's magnum opus, The Great Gatsby explores themes of decadence, idealism, resistance to change, social upheaval, and excess.",
          themes: ["The American Dream", "Social Class", "Wealth", "Love", "Idealism", "Moral Decay"],
          awards: ["Modern Library's 100 Best Novels", "BBC's Big Read", "Time's 100 Best Novels"],
          characters: ["Jay Gatsby", "Nick Carraway", "Daisy Buchanan", "Tom Buchanan", "Jordan Baker"],
          setting: "West Egg, Long Island, New York - Summer 1922",
          similarBooks: ["Tender Is the Night", "This Side of Paradise", "The Beautiful and Damned"]
        }

        const mockRecommended: RecommendedBook[] = [
          {
            id: "2",
            title: "Tender Is the Night",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/200x300",
            rating: 8.2,
            genre: ["Classic", "Fiction"]
          },
          {
            id: "3",
            title: "This Side of Paradise",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/200x300",
            rating: 8.0,
            genre: ["Classic", "Fiction"]
          },
          {
            id: "4",
            title: "The Sun Also Rises",
            author: "Ernest Hemingway",
            image: "https://via.placeholder.com/200x300",
            rating: 8.5,
            genre: ["Classic", "Fiction"]
          },
          {
            id: "5",
            title: "Mrs. Dalloway",
            author: "Virginia Woolf",
            image: "https://via.placeholder.com/200x300",
            rating: 8.3,
            genre: ["Classic", "Fiction"]
          }
        ]

        setTimeout(() => {
          setBook(mockBook)
          setRecommendedBooks(mockRecommended)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching book details:", error)
        setLoading(false)
      }
    }

    fetchBookDetails()
  }, [params.id])

  const getAIExplanation = async () => {
    if (!book) return
    
    setAiLoading(true)
    try {
      // This will be replaced with actual Gemini AI API call
      const mockExplanation = `"The Great Gatsby" stands as one of the most important American novels of the 20th century, capturing the essence of the Jazz Age and exploring timeless themes that continue to resonate with readers today.

Set in the summer of 1922, the novel follows Nick Carraway as he becomes entangled in the world of his mysterious neighbor, Jay Gatsby, and his obsession with the beautiful Daisy Buchanan. Through Gatsby's pursuit of the American Dream and his tragic love for Daisy, Fitzgerald masterfully explores themes of wealth, class, love, and the corruption of idealism.

The novel is celebrated for its beautiful prose, complex symbolism, and deep psychological insights. Fitzgerald's use of imagery - particularly the green light at the end of Daisy's dock, the eyes of Doctor T.J. Eckleburg, and the Valley of Ashes - creates a rich tapestry of meaning that continues to inspire literary analysis.

What makes "The Great Gatsby" so enduring is its exploration of universal human experiences: the desire for reinvention, the pursuit of dreams, the pain of lost love, and the hollowness of materialism. These themes, combined with Fitzgerald's lyrical writing style, have cemented the novel's place as a cornerstone of American literature.

The novel's critique of the American Dream - suggesting that it has been corrupted by materialism and moral decay - remains particularly relevant in contemporary discussions about wealth inequality and the pursuit of happiness. Gatsby's tragic fate serves as a cautionary tale about the dangers of living in the past and the emptiness of a life built on illusion rather than authenticity.`
      
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

  if (!book) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Book not found</h1>
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
          <span>Back to Books</span>
        </Button>

        {/* Book Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div>
            <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                  {book.rating}
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                Find Book
              </Button>
            </div>
          </div>

          {/* Book Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
              <h2 className="text-2xl text-gray-600 mb-4">{book.author}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{book.publishDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Book className="w-4 h-4" />
                  <span>{book.pages} pages</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{book.publisher}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {book.genre.map((g) => (
                  <Badge key={g} variant="outline">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-gray-700 leading-relaxed">{book.plot}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Book Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-medium">Language:</span> {book.language}
                  </div>
                  <div>
                    <span className="font-medium">Publisher:</span> {book.publisher}
                  </div>
                  <div>
                    <span className="font-medium">Pages:</span> {book.pages}
                  </div>
                  <div>
                    <span className="font-medium">ISBN:</span> {book.isbn}
                  </div>
                  {book.setting && (
                    <div>
                      <span className="font-medium">Setting:</span> {book.setting}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Literary Elements</CardTitle>
                </CardHeader>
                <CardContent>
                  {book.themes && book.themes.length > 0 && (
                    <div className="mb-3">
                      <span className="font-medium">Themes:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {book.themes.map((theme, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {book.characters && book.characters.length > 0 && (
                    <div>
                      <span className="font-medium">Main Characters:</span>
                      <ul className="mt-1 space-y-1">
                        {book.characters.slice(0, 4).map((character, index) => (
                          <li key={index} className="text-sm">• {character}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {book.awards && book.awards.length > 0 && (
                    <div className="mt-3">
                      <span className="font-medium">Awards:</span>
                      <ul className="mt-1 space-y-1">
                        {book.awards.map((award, index) => (
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
              <Sparkles className="w-5 h-5 text-orange-600" />
              <span>AI Literary Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!aiExplanation ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">Get an in-depth AI analysis of this literary masterpiece</p>
                <Button onClick={getAIExplanation} disabled={aiLoading}>
                  {aiLoading ? "Analyzing..." : "Get AI Analysis"}
                </Button>
              </div>
            ) : (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">{aiExplanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Books */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recommended Books</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recommendedBooks.map((recBook) => (
              <Card key={recBook.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[2/3] relative overflow-hidden">
                  <img
                    src={recBook.image}
                    alt={recBook.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {recBook.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{recBook.title}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-1">{recBook.author}</p>
                  <div className="flex flex-wrap gap-1">
                    {recBook.genre.slice(0, 2).map((g) => (
                      <Badge key={g} variant="outline" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/books/${recBook.id}`} className="mt-2 block">
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