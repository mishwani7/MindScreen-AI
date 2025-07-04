import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAppStore } from '@/store/app-store'
import { useEffect } from 'react'

// Pages
import HomePage from '@/pages/HomePage'
import ScreenersPage from '@/pages/ScreenersPage'
import AboutPage from '@/pages/AboutPage'
import PHQ9ScreenerPage from '@/pages/PHQ9ScreenerPage'

// Layout
import Layout from '@/components/Layout'

function App() {
  const { theme } = useAppStore()

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <Router>
      <div className={`min-h-screen font-sans ${theme === 'dark' ? 'dark' : ''}`}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/screeners" element={<ScreenersPage />} />
            <Route path="/screeners/phq9" element={<PHQ9ScreenerPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  )
}

export default App
