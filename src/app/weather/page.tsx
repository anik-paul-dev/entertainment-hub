"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Cloud, CloudRain, CloudSun, Sun, Wind, Droplets, Eye, Thermometer, Search, MapPin } from "lucide-react"

interface WeatherData {
  location: string
  country: string
  temperature: number
  feelsLike: number
  description: string
  humidity: number
  windSpeed: number
  visibility: number
  pressure: number
  icon: string
  forecast: ForecastDay[]
}

interface ForecastDay {
  date: string
  maxTemp: number
  minTemp: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
}

interface RecommendedContent {
  type: string
  title: string
  description: string
  reason: string
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchLocation, setSearchLocation] = useState("")
  const [currentLocation, setCurrentLocation] = useState("")
  const [recommendedContent, setRecommendedContent] = useState<RecommendedContent[]>([])
  const [aiLoading, setAiLoading] = useState(false)
  const [aiRecommendation, setAiRecommendation] = useState("")

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes("01")) return <Sun className="w-8 h-8 text-yellow-500" />
    if (iconCode.includes("02") || iconCode.includes("03") || iconCode.includes("04")) return <Cloud className="w-8 h-8 text-gray-500" />
    if (iconCode.includes("09") || iconCode.includes("10")) return <CloudRain className="w-8 h-8 text-blue-500" />
    return <CloudSun className="w-8 h-8 text-orange-500" />
  }

  const detectLocation = async () => {
    try {
      // This will be replaced with actual IP detection API
      const mockLocation = "New York"
      setCurrentLocation(mockLocation)
      fetchWeather(mockLocation)
    } catch (error) {
      console.error("Error detecting location:", error)
    }
  }

  const fetchWeather = async (location: string) => {
    setLoading(true)
    try {
      // This will be replaced with actual OpenWeatherMap API call
      const mockWeather: WeatherData = {
        location: location,
        country: "United States",
        temperature: 22,
        feelsLike: 24,
        description: "Partly cloudy",
        humidity: 65,
        windSpeed: 12,
        visibility: 10,
        pressure: 1013,
        icon: "02d",
        forecast: [
          {
            date: "2024-01-15",
            maxTemp: 25,
            minTemp: 18,
            description: "Sunny",
            icon: "01d",
            humidity: 60,
            windSpeed: 10
          },
          {
            date: "2024-01-16",
            maxTemp: 23,
            minTemp: 17,
            description: "Cloudy",
            icon: "03d",
            humidity: 70,
            windSpeed: 15
          },
          {
            date: "2024-01-17",
            maxTemp: 20,
            minTemp: 15,
            description: "Rainy",
            icon: "10d",
            humidity: 85,
            windSpeed: 20
          },
          {
            date: "2024-01-18",
            maxTemp: 21,
            minTemp: 16,
            description: "Partly cloudy",
            icon: "02d",
            humidity: 68,
            windSpeed: 13
          },
          {
            date: "2024-01-19",
            maxTemp: 24,
            minTemp: 19,
            description: "Sunny",
            icon: "01d",
            humidity: 62,
            windSpeed: 11
          }
        ]
      }

      const mockRecommendations: RecommendedContent[] = [
        {
          type: "movie",
          title: "The Day After Tomorrow",
          description: "A climate disaster film",
          reason: "Perfect for a cloudy day indoors"
        },
        {
          type: "music",
          title: "Rainy Days and Mondays",
          description: "The Carpenters classic",
          reason: "Great for cloudy weather"
        },
        {
          type: "book",
          title: "The Weather Detective",
          description: "A book about weather patterns",
          reason: "Learn more about meteorology"
        }
      ]

      setTimeout(() => {
        setWeather(mockWeather)
        setRecommendedContent(mockRecommendations)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching weather:", error)
      setLoading(false)
    }
  }

  const getAIRecommendations = async () => {
    if (!weather) return
    
    setAiLoading(true)
    try {
      // This will be replaced with actual Gemini AI API call
      const mockRecommendation = `Based on the current weather in ${weather.location} (${weather.description}, ${weather.temperature}°C), here are my recommendations:

**Perfect Activities:**
- **Indoor Entertainment**: With ${weather.humidity}% humidity and partly cloudy skies, it's a great day for catching up on movies or reading books
- **Light Exercise**: The temperature of ${weather.temperature}°C feels comfortable for a walk or light outdoor activity
- **Photography**: The cloud cover provides nice diffused light for outdoor photography

**Content Recommendations:**
- **Movies**: Consider watching atmospheric films that match the current mood
- **Music**: Acoustic or ambient music would complement the current weather perfectly
- **Books**: This is ideal weather for cozy reading sessions

**Weather Insights:**
The current conditions suggest a stable weather pattern with moderate humidity. The ${weather.windSpeed} km/h wind speed keeps the air fresh while the cloud cover prevents overheating. This type of weather is often considered ideal for both indoor and outdoor activities.`
      
      setTimeout(() => {
        setAiRecommendation(mockRecommendation)
        setAiLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error getting AI recommendations:", error)
      setAiLoading(false)
    }
  }

  useEffect(() => {
    detectLocation()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchLocation.trim()) {
      fetchWeather(searchLocation)
    }
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center space-x-2">
            <Cloud className="w-10 h-10 text-cyan-600" />
            <span>Weather Forecast</span>
          </h1>
          <p className="text-xl text-gray-600">Get real-time weather updates for any location worldwide</p>
        </div>

        {/* Search and Location */}
        <div className="space-y-6">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter city name..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>
          
          <div className="text-center">
            <Button
              variant="outline"
              onClick={detectLocation}
              className="flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Use My Location</span>
            </Button>
            {currentLocation && (
              <p className="text-sm text-gray-600 mt-2">
                Current location: {currentLocation}
              </p>
            )}
          </div>
        </div>

        {/* Weather Display */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ) : weather ? (
          <div className="space-y-8">
            {/* Current Weather */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>{weather.location}, {weather.country}</span>
                  </span>
                  <Badge variant="outline">
                    {new Date().toLocaleDateString()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      {getWeatherIcon(weather.icon)}
                    </div>
                    <div className="text-4xl font-bold mb-2">{weather.temperature}°C</div>
                    <p className="text-gray-600">{weather.description}</p>
                    <p className="text-sm text-gray-500">Feels like {weather.feelsLike}°C</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Droplets className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Humidity</p>
                        <p className="text-gray-600">{weather.humidity}%</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Wind className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Wind Speed</p>
                        <p className="text-gray-600">{weather.windSpeed} km/h</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Visibility</p>
                        <p className="text-gray-600">{weather.visibility} km</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Thermometer className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium">Pressure</p>
                        <p className="text-gray-600">{weather.pressure} hPa</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Sun className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">UV Index</p>
                        <p className="text-gray-600">Moderate</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Cloud className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Cloud Cover</p>
                        <p className="text-gray-600">Partly Cloudy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5-Day Forecast */}
            <div>
              <h2 className="text-2xl font-bold mb-6">5-Day Forecast</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {weather.forecast.map((day, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-4">
                      <p className="font-medium mb-2">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                      <div className="flex justify-center mb-2">
                        {getWeatherIcon(day.icon)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{day.description}</p>
                      <div className="text-sm">
                        <p className="font-medium">{day.maxTemp}°C</p>
                        <p className="text-gray-500">{day.minTemp}°C</p>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <p>💧 {day.humidity}%</p>
                        <p>💨 {day.windSpeed} km/h</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recommended Content */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Weather-Based Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedContent.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Badge variant="outline">{item.type}</Badge>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <p className="text-sm text-gray-500 italic">"{item.reason}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cloud className="w-5 h-5 text-cyan-600" />
                  <span>AI Weather Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!aiRecommendation ? (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">Get personalized AI insights based on current weather</p>
                    <Button onClick={getAIRecommendations} disabled={aiLoading}>
                      {aiLoading ? "Analyzing..." : "Get AI Insights"}
                    </Button>
                  </div>
                ) : (
                  <div className="prose prose-gray max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {aiRecommendation}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Cloud className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">Search for a location to see weather information</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}