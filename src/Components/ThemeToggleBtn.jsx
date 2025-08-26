import React, { useEffect } from 'react'
import assets from '../assets/assets'

const ThemeToggleBtn = ({ theme, setTheme }) => {
  useEffect(() => {
    const preferSDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const saved = localStorage.getItem('theme')
    if (saved) {
      setTheme(saved)
    } else {
      setTheme(preferSDarkMode ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      aria-label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <img src={assets.sun_icon} alt="Switch to light mode" className="size-8.5 p-1.5 border border-gray-500 rounded-full" />
      ) : (
        <img src={assets.moon_icon} alt="Switch to dark mode" className="size-8.5 p-1.5 border border-gray-500 rounded-full" />
      )}
    </button>
  )
}

export default ThemeToggleBtn
