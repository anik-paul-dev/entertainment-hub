"use client"

import { useState } from "react"
import { useSearch } from "@/hooks/use-search"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface SearchBarProps {
  onSearch?: (query: string, category: string) => void
  className?: string
}

export default function SearchBar({ onSearch, className }: SearchBarProps) {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    selectedCategory,
    setSelectedCategory,
  } = useSearch()

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "movies", label: "Movies" },
    { value: "anime", label: "Anime" },
    { value: "cartoon", label: "Cartoon" },
    { value: "music", label: "Music" },
    { value: "books", label: "Books" },
    { value: "poems", label: "Poems" },
  ]

  const handleResultClick = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search movies, music, books, and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search Results Dropdown */}
      {searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto mb-2"></div>
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <div className="p-2">
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  href={`/${result.type}s/${result.id}`}
                  onClick={handleResultClick}
                >
                  <Card className="mb-2 hover:bg-gray-50 cursor-pointer">
                    <CardContent className="p-3">
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{result.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{result.description}</p>
                          <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {result.type}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : searchQuery.length > 2 ? (
            <div className="p-4 text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}