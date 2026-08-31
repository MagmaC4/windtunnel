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

      <FaPalette className=""/>

      <button
        onClick={() => setTheme('light')}
        className={theme === 'light' ? 'font-bold' : ''}
      >
        Light
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={theme === 'dark' ? 'font-bold' : ''}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme('umn')}
        className={theme === 'umn' ? 'font-bold' : ''}
      >
        UMN
      </button>



    </div>
  )
}