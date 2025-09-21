"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Clock, Calendar, Users, Goal, Cricket, Football, ArrowLeft, Sparkles } from "lucide-react"

interface Match {
  id: string
  sport: string
  league: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  status: string
  date: string
  time: string
  venue: string
  isLive: boolean
}

interface Player {
  id: string
  name: string
  sport: string
  team: string
  position: string
  age: number
  nationality: string
  matches: number
  goals?: number
  wickets?: number
  runs?: number
  average?: number
  image: string
}

interface LiveScore {
  matchId: string
  currentScore: string
  overs?: string
  time: string
  keyEvents: string[]
}

export default function SportsPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [liveScores, setLiveScores] = useState<LiveScore[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSport, setSelectedSport] = useState("all")
  const [aiInsights, setAiInsights] = useState("")
  const [aiLoading, setAiLoading] = useState(false)

  useEffect(() => {
    const fetchSportsData = async () => {
      setLoading(true)
      try {
        // This will be replaced with actual sports API calls
        const mockMatches: Match[] = [
          {
            id: "1",
            sport: "cricket",
            league: "IPL 2024",
            homeTeam: "Mumbai Indians",
            awayTeam: "Chennai Super Kings",
            homeScore: 189,
            awayScore: 178,
            status: "Completed",
            date: "2024-01-15",
            time: "19:30",
            venue: "Wankhede Stadium",
            isLive: false
          },
          {
            id: "2",
            sport: "football",
            league: "Premier League",
            homeTeam: "Manchester United",
            awayTeam: "Liverpool",
            homeScore: 2,
            awayScore: 1,
            status: "Live",
            date: "2024-01-15",
            time: "20:00",
            venue: "Old Trafford",
            isLive: true
          },
          {
            id: "3",
            sport: "cricket",
            league: "Test Match",
            homeTeam: "India",
            awayTeam: "Australia",
            homeScore: 256,
            awayScore: 189,
            status: "Day 3",
            date: "2024-01-15",
            time: "10:00",
            venue: "Melbourne Cricket Ground",
            isLive: true
          },
          {
            id: "4",
            sport: "football",
            league: "La Liga",
            homeTeam: "Real Madrid",
            awayTeam: "Barcelona",
            homeScore: 0,
            awayScore: 0,
            status: "Upcoming",
            date: "2024-01-16",
            time: "21:00",
            venue: "Santiago Bernabéu",
            isLive: false
          },
          {
            id: "5",
            sport: "cricket",
            league: "Big Bash",
            homeTeam: "Sydney Sixers",
            awayTeam: "Melbourne Stars",
            homeScore: 0,
            awayScore: 0,
            status: "Upcoming",
            date: "2024-01-16",
            time: "18:45",
            venue: "Sydney Cricket Ground",
            isLive: false
          }
        ]

        const mockPlayers: Player[] = [
          {
            id: "1",
            name: "Virat Kohli",
            sport: "cricket",
            team: "India",
            position: "Batsman",
            age: 35,
            nationality: "India",
            matches: 294,
            runs: 13848,
            average: 58.68,
            image: "https://via.placeholder.com/200x200"
          },
          {
            id: "2",
            name: "Lionel Messi",
            sport: "football",
            team: "Inter Miami",
            position: "Forward",
            age: 36,
            nationality: "Argentina",
            matches: 1000,
            goals: 821,
            image: "https://via.placeholder.com/200x200"
          },
          {
            id: "3",
            name: "Jasprit Bumrah",
            sport: "cricket",
            team: "India",
            position: "Bowler",
            age: 30,
            nationality: "India",
            matches: 145,
            wickets: 289,
            average: 21.67,
            image: "https://via.placeholder.com/200x200"
          },
          {
            id: "4",
            name: "Cristiano Ronaldo",
            sport: "football",
            team: "Al Nassr",
            position: "Forward",
            age: 38,
            nationality: "Portugal",
            matches: 1200,
            goals: 873,
            image: "https://via.placeholder.com/200x200"
          }
        ]

        const mockLiveScores: LiveScore[] = [
          {
            matchId: "2",
            currentScore: "2-1",
            time: "75'",
            keyEvents: ["Goal! Manchester United 1-0 (Rashford 23')", "Goal! Liverpool 1-1 (Salah 45')", "Goal! Manchester United 2-1 (Fernandes 67')"]
          },
          {
            matchId: "3",
            currentScore: "256-9",
            overs: "89.3",
            time: "Tea",
            keyEvents: ["Century! Kohli 100*", "Wicket! Smith c&b Bumrah", "Six! Jadeja hits massive six"]
          }
        ]

        setTimeout(() => {
          setMatches(mockMatches)
          setPlayers(mockPlayers)
          setLiveScores(mockLiveScores)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching sports data:", error)
        setLoading(false)
      }
    }

    fetchSportsData()
  }, [])

  const getAIInsights = async () => {
    setAiLoading(true)
    try {
      // This will be replaced with actual Gemini AI API call
      const mockInsights = `**Current Sports Analysis:**

**Football:** The Manchester United vs Liverpool match is showing intense competition with United leading 2-1. The key factors have been Rashford's early goal and Fernandes' late strike. Liverpool's Salah equalized just before halftime, keeping the match competitive.

**Cricket:** The India vs Australia Test match is evenly poised with India at 256-9. Virat Kohli's century has been the standout performance, providing stability to the Indian innings. The pitch is showing signs of turn, which could favor the spinners in the final two days.

**Key Player Performances:**
- **Virat Kohli**: Continuing his excellent form with another Test century
- **Lionel Messi**: Recently transferred to Inter Miami, showing good adaptation to MLS
- **Jasprit Bumrah**: Leading the Indian bowling attack with crucial wickets

**Upcoming Fixtures to Watch:**
- Real Madrid vs Barcelona in La Liga - Always a classic El Clásico
- Sydney Sixers vs Melbourne Stars in Big Bash - High-scoring T20 encounter

**Tactical Insights:**
The current matches demonstrate the importance of:
1. **Early breakthroughs** in cricket to put pressure on batting teams
2. **Midfield control** in football to dominate possession
3. **Set-piece execution** in football for crucial goals
4. **Partnership building** in cricket for substantial scores`

      setTimeout(() => {
        setAiInsights(mockInsights)
        setAiLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error getting AI insights:", error)
      setAiLoading(false)
    }
  }

  const filteredMatches = matches.filter(match => 
    selectedSport === "all" || match.sport === selectedSport
  )

  const filteredPlayers = players.filter(player => 
    selectedSport === "all" || player.sport === selectedSport
  )

  const MatchCard = ({ match }: { match: Match }) => {
    const liveScore = liveScores.find(score => score.matchId === match.id)
    
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Badge variant={match.isLive ? "destructive" : "outline"}>
              {match.isLive ? "LIVE" : match.status}
            </Badge>
            <span className="text-sm text-gray-500">{match.league}</span>
          </div>
          
          <div className="text-center mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-right flex-1">
                <h3 className="font-semibold">{match.homeTeam}</h3>
              </div>
              <div className="px-4">
                <div className="text-2xl font-bold">
                  {match.homeScore} - {match.awayScore}
                </div>
              </div>
              <div className="text-left flex-1">
                <h3 className="font-semibold">{match.awayTeam}</h3>
              </div>
            </div>
            
            {liveScore && (
              <div className="text-sm text-gray-600 mb-2">
                {liveScore.currentScore} {liveScore.overs && `(${liveScore.overs})`}
              </div>
            )}
            
            <div className="text-xs text-gray-500">
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="w-3 h-3" />
                <span>{match.date}</span>
                <Clock className="w-3 h-3" />
                <span>{match.time}</span>
              </div>
              <p className="mt-1">{match.venue}</p>
            </div>
          </div>
          
          {liveScore && liveScore.keyEvents.length > 0 && (
            <div className="border-t pt-3">
              <h4 className="text-sm font-medium mb-2">Key Events:</h4>
              <div className="space-y-1">
                {liveScore.keyEvents.slice(0, 2).map((event, index) => (
                  <p key={index} className="text-xs text-gray-600">• {event}</p>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const PlayerCard = ({ player }: { player: Player }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={player.image}
          alt={player.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {player.sport === "cricket" ? <Cricket className="w-3 h-3" /> : <Football className="w-3 h-3" />}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{player.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{player.team} • {player.position}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Age:</span>
            <span>{player.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Matches:</span>
            <span>{player.matches}</span>
          </div>
          {player.goals && (
            <div className="flex justify-between">
              <span className="text-gray-500">Goals:</span>
              <span>{player.goals}</span>
            </div>
          )}
          {player.wickets && (
            <div className="flex justify-between">
              <span className="text-gray-500">Wickets:</span>
              <span>{player.wickets}</span>
            </div>
          )}
          {player.runs && (
            <div className="flex justify-between">
              <span className="text-gray-500">Runs:</span>
              <span>{player.runs}</span>
            </div>
          )}
          {player.average && (
            <div className="flex justify-between">
              <span className="text-gray-500">Average:</span>
              <span>{player.average}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center space-x-2">
            <Trophy className="w-10 h-10 text-yellow-600" />
            <span>Sports</span>
          </h1>
          <p className="text-xl text-gray-600">Live scores, player stats, and match updates for cricket and football</p>
        </div>

        {/* Sport Filter */}
        <div className="flex justify-center">
          <Select value={selectedSport} onValueChange={setSelectedSport}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="cricket">Cricket</SelectItem>
              <SelectItem value="football">Football</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="matches">Live Matches</TabsTrigger>
            <TabsTrigger value="players">Top Players</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-48" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="players" className="space-y-6">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-600" />
              <span>AI Sports Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!aiInsights ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">Get AI-powered insights into current matches and player performances</p>
                <Button onClick={getAIInsights} disabled={aiLoading}>
                  {aiLoading ? "Analyzing..." : "Get AI Insights"}
                </Button>
              </div>
            ) : (
              <div className="prose prose-gray max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {aiInsights}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}