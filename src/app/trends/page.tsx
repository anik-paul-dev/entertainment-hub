"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Search, Globe, Calendar, Hash, ExternalLink, Sparkles, BarChart3, PieChart, Activity } from "lucide-react"

interface TrendData {
  topic: string
  volume: number
  growth: number
  category: string
  sentiment: string
  sources: string[]
  keywords: string[]
  summary: string
  relatedTopics: string[]
  timeline: { date: string; volume: number }[]
}

interface AnalysisResult {
  topic: string
  overview: string
  keyPoints: string[]
  sentiment: string
  popularity: number
  categories: string[]
  sources: { name: string; url: string; relevance: number }[]
  relatedTrends: string[]
  predictions: string[]
}

export default function TrendsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [trendData, setTrendData] = useState<TrendData[]>([])
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [currentTrend, setCurrentTrend] = useState<TrendData | null>(null)

  const categories = [
    "all",
    "technology",
    "entertainment",
    "sports",
    "politics",
    "business",
    "health",
    "science",
    "environment",
    "lifestyle"
  ]

  useEffect(() => {
    fetchTrendingTopics()
  }, [])

  const fetchTrendingTopics = async () => {
    setLoading(true)
    try {
      // This will be replaced with actual trend API calls
      const mockTrends: TrendData[] = [
        {
          topic: "Artificial Intelligence",
          volume: 95000,
          growth: 45,
          category: "technology",
          sentiment: "positive",
          sources: ["TechCrunch", "Wired", "MIT Technology Review"],
          keywords: ["AI", "Machine Learning", "ChatGPT", "Automation"],
          summary: "AI continues to dominate tech discussions with breakthroughs in generative AI and machine learning applications.",
          relatedTopics: ["Machine Learning", "ChatGPT", "Automation", "Robotics"],
          timeline: [
            { date: "2024-01-10", volume: 75000 },
            { date: "2024-01-11", volume: 82000 },
            { date: "2024-01-12", volume: 89000 },
            { date: "2024-01-13", volume: 95000 }
          ]
        },
        {
          topic: "Climate Change",
          volume: 78000,
          growth: 32,
          category: "environment",
          sentiment: "concerned",
          sources: ["BBC", "The Guardian", "National Geographic"],
          keywords: ["Global Warming", "Carbon Emissions", "Renewable Energy"],
          summary: "Climate change discussions intensify with new reports on extreme weather patterns and policy changes.",
          relatedTopics: ["Global Warming", "Renewable Energy", "Sustainability"],
          timeline: [
            { date: "2024-01-10", volume: 65000 },
            { date: "2024-01-11", volume: 70000 },
            { date: "2024-01-12", volume: 74000 },
            { date: "2024-01-13", volume: 78000 }
          ]
        },
        {
          topic: "Cryptocurrency",
          volume: 62000,
          growth: -15,
          category: "business",
          sentiment: "neutral",
          sources: ["CoinDesk", "Bloomberg", "Reuters"],
          keywords: ["Bitcoin", "Ethereum", "Blockchain", "DeFi"],
          summary: "Cryptocurrency market shows mixed signals with regulatory developments and market volatility.",
          relatedTopics: ["Bitcoin", "Blockchain", "DeFi", "NFTs"],
          timeline: [
            { date: "2024-01-10", volume: 73000 },
            { date: "2024-01-11", volume: 68000 },
            { date: "2024-01-12", volume: 65000 },
            { date: "2024-01-13", volume: 62000 }
          ]
        },
        {
          topic: "Space Exploration",
          volume: 55000,
          growth: 28,
          category: "science",
          sentiment: "excited",
          sources: ["NASA", "SpaceX", "ESA"],
          keywords: ["Mars", "Moon Mission", "SpaceX", "James Webb"],
          summary: "Space exploration gains momentum with new missions and discoveries in our solar system.",
          relatedTopics: ["Mars Mission", "SpaceX", "NASA", "Astronomy"],
          timeline: [
            { date: "2024-01-10", volume: 45000 },
            { date: "2024-01-11", volume: 48000 },
            { date: "2024-01-12", volume: 52000 },
            { date: "2024-01-13", volume: 55000 }
          ]
        },
        {
          topic: "Electric Vehicles",
          volume: 48000,
          growth: 38,
          category: "technology",
          sentiment: "positive",
          sources: ["Tesla", "Reuters", "Automotive News"],
          keywords: ["Tesla", "EV", "Battery", "Charging"],
          summary: "Electric vehicle adoption accelerates with new models and improved infrastructure.",
          relatedTopics: ["Tesla", "Battery Technology", "Sustainable Transport"],
          timeline: [
            { date: "2024-01-10", volume: 35000 },
            { date: "2024-01-11", volume: 39000 },
            { date: "2024-01-12", volume: 43000 },
            { date: "2024-01-13", volume: 48000 }
          ]
        }
      ]

      setTimeout(() => {
        setTrendData(mockTrends)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching trends:", error)
      setLoading(false)
    }
  }

  const analyzeTrend = async (topic: string) => {
    setAnalyzing(true)
    try {
      // This will be replaced with actual Gemini AI API call
      const mockAnalysis: AnalysisResult = {
        topic: topic,
        overview: `${topic} is currently trending across multiple platforms with significant public interest and media coverage. This trend reflects broader societal shifts and technological developments.`,
        keyPoints: [
          "High engagement across social media platforms",
          "Increased media coverage in mainstream news",
          "Growing public interest and discussion",
          "Potential long-term impact on industry and society",
          "Regulatory and policy developments underway"
        ],
        sentiment: "positive",
        popularity: 85,
        categories: ["technology", "innovation", "business"],
        sources: [
          { name: "TechCrunch", url: "https://techcrunch.com", relevance: 95 },
          { name: "Wired", url: "https://wired.com", relevance: 92 },
          { name: "Reuters", url: "https://reuters.com", relevance: 88 },
          { name: "BBC", url: "https://bbc.com", relevance: 85 }
        ],
        relatedTrends: ["Digital Transformation", "Innovation", "Future Technology", "Automation"],
        predictions: [
          "Continued growth in public interest over next 6 months",
          "Increased investment and development in related technologies",
          "New regulatory frameworks expected to emerge",
          "Mainstream adoption likely within 2-3 years",
          "Potential for industry disruption and transformation"
        ]
      }

      setTimeout(() => {
        setAnalysisResult(mockAnalysis)
        setAnalyzing(false)
      }, 2000)
    } catch (error) {
      console.error("Error analyzing trend:", error)
      setAnalyzing(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      analyzeTrend(searchQuery)
    }
  }

  const filteredTrends = trendData.filter(trend => 
    selectedCategory === "all" || trend.category === selectedCategory
  )

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "bg-green-100 text-green-800"
      case "negative": return "bg-red-100 text-red-800"
      case "neutral": return "bg-gray-100 text-gray-800"
      case "concerned": return "bg-orange-100 text-orange-800"
      case "excited": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (growth < 0) return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
    return <Activity className="w-4 h-4 text-gray-600" />
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center space-x-2">
            <TrendingUp className="w-10 h-10 text-pink-600" />
            <span>AI Trend Analyzer</span>
          </h1>
          <p className="text-xl text-gray-600">Discover and analyze trending topics with AI-powered insights</p>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Analyze a Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter a topic or trend to analyze..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={analyzing}>
                {analyzing ? "Analyzing..." : "Analyze Trend"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="trends">Trending Topics</TabsTrigger>
            <TabsTrigger value="analysis">Analysis Results</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            {/* Category Filter */}
            <div className="flex justify-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Trending Topics Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-48" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrends.map((trend) => (
                  <Card key={trend.topic} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => {
                          setCurrentTrend(trend)
                          analyzeTrend(trend.topic)
                        }}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className={getSentimentColor(trend.sentiment)}>
                          {trend.sentiment}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {getGrowthIcon(trend.growth)}
                          <span className={`text-sm font-medium ${trend.growth > 0 ? 'text-green-600' : trend.growth < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                            {trend.growth > 0 ? '+' : ''}{trend.growth}%
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">{trend.topic}</h3>
                      <p className="text-sm text-gray-600 mb-4">{trend.summary}</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Volume:</span>
                          <span className="font-medium">{trend.volume.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Category:</span>
                          <Badge variant="secondary" className="text-xs">
                            {trend.category}
                          </Badge>
                        </div>
                        
                        <div>
                          <span className="text-xs text-gray-500">Keywords:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {trend.keywords.slice(0, 3).map((keyword) => (
                              <Badge key={keyword} variant="outline" className="text-xs">
                                <Hash className="w-2 h-2 mr-1" />
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        Analyze This Trend
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {analyzing ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing trend with AI...</p>
              </div>
            ) : analysisResult ? (
              <div className="space-y-6">
                {/* Analysis Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>{analysisResult.topic} - Trend Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600">{analysisResult.popularity}%</div>
                        <p className="text-sm text-gray-600">Popularity Score</p>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getSentimentColor(analysisResult.sentiment).split(' ')[1]}`}>
                          {analysisResult.sentiment}
                        </div>
                        <p className="text-sm text-gray-600">Sentiment</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{analysisResult.categories.length}</div>
                        <p className="text-sm text-gray-600">Categories</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">{analysisResult.overview}</p>
                  </CardContent>
                </Card>

                {/* Key Points */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysisResult.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Sources */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysisResult.sources.map((source, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{source.name}</h4>
                            <p className="text-sm text-gray-600">Relevance: {source.relevance}%</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Predictions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>AI Predictions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.predictions.map((prediction, index) => (
                        <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{prediction}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">Search for a trend to see detailed analysis</p>
                  <p className="text-sm text-gray-500">Enter a topic in the search box above to get AI-powered insights</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}