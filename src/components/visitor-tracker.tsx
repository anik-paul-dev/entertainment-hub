"use client"

import { useState, useEffect } from "react"

interface VisitorStats {
  totalVisitors: number
  currentVisitors: number
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgTimeOnPage: string
}

export default function VisitorTracker() {
  const [stats, setStats] = useState<VisitorStats>({
    totalVisitors: 0,
    currentVisitors: 0,
    pageViews: 0,
    uniqueVisitors: 0,
    bounceRate: 0,
    avgTimeOnPage: "0:00"
  })

  useEffect(() => {
    // Simulate visitor tracking - in a real app, this would connect to analytics
    const updateStats = () => {
      setStats(prev => ({
        totalVisitors: prev.totalVisitors + Math.floor(Math.random() * 3),
        currentVisitors: Math.floor(Math.random() * 50) + 10,
        pageViews: prev.pageViews + 1,
        uniqueVisitors: prev.uniqueVisitors + (Math.random() > 0.7 ? 1 : 0),
        bounceRate: Math.max(20, Math.min(80, prev.bounceRate + (Math.random() - 0.5) * 5)),
        avgTimeOnPage: `${Math.floor(Math.random() * 5) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
      }))
    }

    // Initial update
    updateStats()

    // Update every 30 seconds
    const interval = setInterval(updateStats, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs space-y-1">
        <div className="flex items-center space-x-2 font-medium text-gray-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Visitors</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-gray-600">
          <div>
            <span className="font-medium">Total:</span> {stats.totalVisitors.toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Current:</span> {stats.currentVisitors}
          </div>
          <div>
            <span className="font-medium">Views:</span> {stats.pageViews.toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Unique:</span> {stats.uniqueVisitors.toLocaleString()}
          </div>
        </div>
        <div className="text-gray-500 text-xs border-t pt-1">
          Avg time: {stats.avgTimeOnPage} • Bounce: {stats.bounceRate.toFixed(1)}%
        </div>
      </div>
    </div>
  )
}