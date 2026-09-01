'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaPalette } from "react-icons/fa";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="flex items-center gap-2">

      <FaPalette/>

      <button
        onClick={() => setTheme('light')}
        className={`hover:text-footer-text/60 hover:cursor-pointer transition-colors ${theme === 'light' ? 'font-bold' : ''}`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`hover:text-footer-text/60 hover:cursor-pointer transition-colors ${theme === 'dark' ? 'font-bold' : ''}`}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme('umn')}
        className={`hover:text-footer-text/60 hover:cursor-pointer transition-colors ${theme === 'umn' ? 'font-bold' : ''}`}
      >
        UMN
      </button>



    </div>
  )
}