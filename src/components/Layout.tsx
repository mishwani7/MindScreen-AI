import { type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Brain, Moon, Sun, Menu, X } from 'lucide-react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { NavigationLoader } from './NavigationLoader'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useAppStore()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Navigation Loader */}
      <NavigationLoader />
      
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 sm:space-x-3 group transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 rounded-xl sm:rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl p-2 sm:p-3">
                  <Brain className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" />
                </div>
              </div>
              <div className="space-y-0.5">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400">
                  MindScreen
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  AI-Powered Mental Health
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { path: '/', label: 'Home' },
                { path: '/screeners', label: 'Screeners' },
                { path: '/about', label: 'About' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-1 py-4 text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-foreground hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  {item.label}
                  
                  {/* Simple bottom line for active state */}
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-muted/70 hover:scale-105"
              >
                <div className="relative">
                  {theme === 'light' ? (
                    <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/70 hover:text-foreground transition-all duration-300" />
                  ) : (
                    <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/70 hover:text-foreground transition-all duration-300" />
                  )}
                </div>
              </Button>
              
              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-muted/70"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/70 hover:text-foreground transition-colors duration-300" />
                ) : (
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/70 hover:text-foreground transition-colors duration-300" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation - Modern slide-in from left */}
      <>
        {/* Backdrop overlay */}
        <div 
          className={`lg:hidden fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Slide-in menu from left */}
        <div className={`lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] z-[9999] shadow-2xl transform transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } ${theme === 'light' ? 'bg-white border-r border-gray-200' : 'bg-gray-900 border-r border-gray-700'}`}>
          {/* Header */}
          <div className={`flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 border-b ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-700'}`}>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl p-1.5 sm:p-2">
                <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h2 className={`text-base sm:text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>MindScreen</h2>
                <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>AI Mental Health</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl transition-all duration-200 ${theme === 'light' ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-gray-800 text-gray-200'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
          
          {/* Navigation Menu */}
          <div className={`flex flex-col h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
            <nav className="flex-1 px-4 sm:px-6 py-6 sm:py-8">
              <div className="space-y-1">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/screeners', label: 'Screeners' },
                  { path: '/about', label: 'About' }
                ].map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`relative block px-4 py-4 text-base font-normal transition-all duration-200 rounded-xl animate-slide-up ${
                      isActive(item.path)
                        ? theme === 'light' 
                          ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' 
                          : 'text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/30'
                        : theme === 'light'
                          ? 'text-gray-900 hover:bg-gray-50 hover:text-emerald-600'
                          : 'text-gray-100 hover:bg-gray-800 hover:text-emerald-400'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.label}
                    
                    {/* Small bottom line for active state - left aligned */}
                    {isActive(item.path) && (
                      <div className={`absolute bottom-2 left-4 w-8 h-0.5 rounded-full transition-all duration-200 ${theme === 'light' ? 'bg-emerald-600' : 'bg-emerald-400'}`} />
                    )}
                  </Link>
                ))}
              </div>
              
              {/* Theme Toggle - No separator */}
              <div className="mt-8">
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className={`w-full justify-start px-4 py-4 h-auto text-base font-normal rounded-xl flex items-center space-x-3 transition-all duration-200 ${
                    theme === 'light' 
                      ? 'hover:bg-gray-50 text-gray-900 hover:text-emerald-600' 
                      : 'hover:bg-gray-800 text-gray-100 hover:text-emerald-400'
                  }`}
                >
                  {theme === 'light' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </nav>
            
            {/* Footer */}
            <div className={`px-4 sm:px-6 py-4 sm:py-6 border-t ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-700'}`}>
              <p className={`text-xs text-center ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                © 2025 MindScreen AI<br/>
                Professional Mental Health Screening
              </p>
            </div>
          </div>
        </div>
      </>

      {/* Main content with proper spacing */}
      <main className="flex-1 relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-2">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div className="text-center lg:text-left">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  © 2025 MindScreen AI. Built by <span className="font-semibold text-foreground">Abu Zar Mishwani</span>
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Professional mental health screening platform powered by AI
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
