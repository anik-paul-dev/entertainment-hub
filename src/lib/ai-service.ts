import ZAI from 'z-ai-web-dev-sdk'

export class AIService {
  private static instance: AIService
  private zai: any = null

  private constructor() {}

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService()
    }
    return AIService.instance
  }

  private async initialize() {
    if (!this.zai) {
      try {
        this.zai = await ZAI.create()
      } catch (error) {
        console.error('Failed to initialize ZAI:', error)
        throw error
      }
    }
  }

  async getChatCompletion(messages: Array<{ role: string; content: string }>) {
    await this.initialize()
    
    try {
      const completion = await this.zai.chat.completions.create({
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      })

      return completion.choices[0]?.message?.content || ""
    } catch (error) {
      console.error('Error getting chat completion:', error)
      throw error
    }
  }

  async analyzeMovie(movieTitle: string, movieDescription: string) {
    const prompt = `Analyze the movie "${movieTitle}" with the following description: "${movieDescription}". 

Please provide:
1. A brief overview of the movie's themes and significance
2. Cultural impact and influence
3. Critical reception and legacy
4. Why this movie is important or memorable

Keep the analysis engaging and informative, suitable for a general audience.`

    return await this.getChatCompletion([
      {
        role: "system",
        content: "You are a knowledgeable film critic and historian. Provide insightful analysis of movies, focusing on their artistic merit, cultural significance, and impact on cinema."
      },
      {
        role: "user",
        content: prompt
      }
    ])
  }

  async analyzeAnime(animeTitle: string, animeDescription: string) {
    const prompt = `Analyze the anime "${animeTitle}" with the following description: "${animeDescription}".

Please provide:
1. Overview of the anime's plot and main themes
2. Cultural significance and impact on anime/manga culture
3. Animation style and artistic merits
4. Fan reception and legacy
5. Why this anime is notable or influential

Make the analysis engaging for both anime fans and newcomers.`

    return await this.getChatCompletion([
      {
        role: "system",
        content: "You are an expert on anime and Japanese pop culture. Provide detailed analysis of anime series, focusing on their artistic value, cultural impact, and significance in the medium."
      },
      {
        role: "user",
        content: prompt
      }
    ])
  }

  async analyzeSong(songTitle: string, artist: string, songDescription: string) {
    const prompt = `Analyze the song "${songTitle}" by ${artist} with the following description: "${songDescription}".

Please provide:
1. Musical analysis (style, composition, instrumentation)
2. Lyrical themes and meaning
3. Cultural impact and significance
4. Critical reception and legacy
5. Why this song is memorable or important

Make the analysis informative and engaging for music lovers.`

    return await this.getChatCompletion([
      {
        role: "system",
        content: "You are a music historian and critic. Provide insightful analysis of songs, covering their musical composition, lyrical content, cultural significance, and impact on the music industry."
      },
      {
        role: "user",
        content: prompt
      }
    ])
  }

  async analyzeWeather(location: string, temperature: number, description: string, humidity: number) {
    const prompt = `Provide weather-based recommendations for ${location} where it's currently ${temperature}°C with ${description} and ${humidity}% humidity.

Please suggest:
1. Perfect activities for this weather (both indoor and outdoor)
2. Entertainment recommendations (movies, music, books that match the mood)
3. Lifestyle tips for this weather
4. General insights about this type of weather

Make the suggestions practical and engaging.`

    return await this.getChatCompletion([
      {
        role: "system",
        content: "You are a weather and lifestyle expert. Provide practical recommendations based on current weather conditions, including activities, entertainment, and lifestyle tips."
      },
      {
        role: "user",
        content: prompt
      }
    ])
  }

  async analyzeSportsTrend(matches: any[], players: any[]) {
    const prompt = `Analyze the current sports trends based on this data:

Recent Matches: ${JSON.stringify(matches.slice(0, 3))}
Top Players: ${JSON.stringify(players.slice(0, 3))}

Please provide:
1. Current trends in sports performance
2. Notable player achievements and form
3. Tactical insights from recent matches
4. Predictions for upcoming fixtures
5. General sports analysis and commentary

Keep the analysis professional yet accessible to sports fans.`

    return await this.getChatCompletion([
      {
        role: "system",
        content: "You are a sports analyst and commentator. Provide expert analysis of current sports trends, player performances, and match insights."
      },
      {
        role: "user",
        content: prompt
      }
    ])
  }

  async analyzeTrend(topic: string, volume: number, growth: number, category: string) {
    const prompt = `Analyze the trending topic "${topic}" with the following metrics:
- Volume: ${volume}
- Growth: ${growth}%
- Category: ${category}

Please provide:
1. Overview of why this topic is trending
2. Key factors driving the trend
3. Potential impact and implications
4. Related topics and connections
5. Future predictions for this trend

Make the analysis insightful and forward-looking.`

    return await this.getChatCompletion([
      {
        role: "system",
        content: "You are a trend analyst and cultural commentator. Provide deep analysis of trending topics, their significance, and potential future impact."
      },
      {
        role: "user",
        content: prompt
      }
    ])
  }
}

export const aiService = AIService.getInstance()