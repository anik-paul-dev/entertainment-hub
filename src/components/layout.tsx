import Navigation from "@/components/navigation"
import VisitorTracker from "@/components/visitor-tracker"
import { Toaster } from "@/components/ui/toaster"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 MediaHub. All rights reserved.</p>
            <p className="mt-2 text-sm">Powered by free APIs from around the web</p>
          </div>
        </div>
      </footer>
      <Toaster />
      <VisitorTracker />
    </div>
  )
}