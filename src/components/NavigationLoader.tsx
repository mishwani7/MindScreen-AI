import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LoadingSpinner } from './LoadingSpinner'

export function NavigationLoader() {
  const [isNavigating, setIsNavigating] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsNavigating(true)
    const timer = setTimeout(() => {
      setIsNavigating(false)
    }, 300) // Short delay to show loading animation

    return () => clearTimeout(timer)
  }, [location.pathname])

  if (!isNavigating) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-[100] transition-opacity duration-200">
      <div className="bg-background/90 backdrop-blur border-2 border-primary/20 rounded-3xl p-8 shadow-2xl">
        <LoadingSpinner variant="brain" size="lg" text="Loading..." />
      </div>
    </div>
  )
}
