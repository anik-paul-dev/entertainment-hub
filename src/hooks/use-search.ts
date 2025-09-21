import { useState, useEffect, useCallback } from "react"

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const searchContent = useCallback(async (query: string, category: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    try {
      // This will be replaced with actual API calls
      const mockResults = [
        { id: "1", title: "The Matrix", type: "movie", description: "A computer hacker learns from mysterious rebels..." },
        { id: "2", title: "Naruto", type: "anime", description: "A young ninja seeks recognition..." },
        { id: "3", title: "Bohemian Rhapsody", type: "music", description: "The story of Queen..." },
      ]
      
      setSearchResults(mockResults)
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  useEffect(() => {
    searchContent(debouncedSearchQuery, selectedCategory)
  }, [debouncedSearchQuery, selectedCategory, searchContent])

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    selectedCategory,
    setSelectedCategory,
  }
}