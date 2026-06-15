import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Main from './components/Main.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import './App.css'

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('cv-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('cv-theme', theme)
  }, [theme])

  useEffect(() => {
    fetch('./cv-data.json')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(err => { console.error('Erreur chargement cv-data.json:', err); setLoading(false) })
  }, [])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  if (loading) return (
    <div className="loading-screen">
      <div className="loading-dot" />
    </div>
  )

  if (!data) return <div className="loading-screen">Erreur de chargement des données.</div>

  return (
    <div className="layout">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <Sidebar identity={data.identity} skills={data.skills} extras={data.extras} />
      <Main
        experiences={data.experiences}
        formations={data.formations}
        headerTitle={data.identity.mainHeaderTitle}
        headerSub={data.identity.headline}
      />
    </div>
  )
}
