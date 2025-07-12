"use client"

import { useState, useEffect, useRef } from 'react'
import { Palette, Check, Droplet } from 'lucide-react'
import { gsap } from 'gsap'

const ColorThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('teal')
  const [customColor, setCustomColor] = useState('#10b981') // Default custom color
  const selectorRef = useRef(null)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)

  const themes = [
    {
      name: 'teal',
      label: 'Teal',
      primary: '#10b981',
      primaryRgb: '16, 185, 129',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'purple',
      label: 'Purple',
      primary: '#8b5cf6',
      primaryRgb: '139, 92, 246',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      name: 'blue',
      label: 'Blue',
      primary: '#3b82f6',
      primaryRgb: '59, 130, 246',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'orange',
      label: 'Orange',
      primary: '#f97316',
      primaryRgb: '249, 115, 22',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      name: 'pink',
      label: 'Pink',
      primary: '#ec4899',
      primaryRgb: '236, 72, 153',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      name: 'cyan',
      label: 'Cyan',
      primary: '#06b6d4',
      primaryRgb: '6, 182, 212',
      gradient: 'from-cyan-500 to-blue-500'
    }
  ]

  useEffect(() => {
    // Load saved theme from localStorage
    const savedThemeName = localStorage.getItem('portfolio-theme-name')
    const savedCustomColor = localStorage.getItem('portfolio-custom-color')

    if (savedThemeName === 'custom' && savedCustomColor) {
      setCustomColor(savedCustomColor)
      applyTheme({ name: 'custom', primary: savedCustomColor, primaryRgb: hexToRgb(savedCustomColor) })
      setCurrentTheme('custom')
    } else if (savedThemeName && themes.find(t => t.name === savedThemeName)) {
      setCurrentTheme(savedThemeName)
      applyTheme(themes.find(t => t.name === savedThemeName))
    } else {
      // Apply default theme if nothing saved
      applyTheme(themes.find(t => t.name === 'teal'))
    }

    // Animate button entrance
    gsap.from(buttonRef.current, {
      scale: 1,
      rotation: -180,
      duration: 1,
      delay: 2,
      ease: "back.out(1.7)"
    })
  }, [])

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `${r}, ${g}, ${b}`
  }

  const applyTheme = (theme) => {
    const root = document.documentElement
    
    // Apply CSS custom properties
    root.style.setProperty('--primary', theme.primary)
    root.style.setProperty('--primary-rgb', theme.primaryRgb)
    
    // Update Tailwind CSS variables
    root.style.setProperty('--color-primary', theme.primary)
    
    // Animate color transition
    gsap.to(root, {
      duration: 0.8,
      ease: "power2.inOut"
    })

    // Save to localStorage
    localStorage.setItem('portfolio-theme-name', theme.name)
    if (theme.name === 'custom') {
      localStorage.setItem('portfolio-custom-color', theme.primary)
    } else {
      localStorage.removeItem('portfolio-custom-color')
    }
    setCurrentTheme(theme.name)
  }

  const togglePanel = () => {
    setIsOpen(!isOpen)
    
    if (!isOpen) {
      // Open animation
      gsap.set(panelRef.current, { display: 'block' })
      gsap.fromTo(panelRef.current, 
        { 
          opacity: 0, 
          scale: 0.8, 
          y: 20 
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.3, 
          ease: "back.out(1.7)" 
        }
      )
    } else {
      // Close animation
      gsap.to(panelRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(panelRef.current, { display: 'none' })
        }
      })
    }
  }

  const selectTheme = (theme) => {
    if (theme.name === currentTheme) return

    // Animate theme change
    const tl = gsap.timeline()
    
    // Pulse effect on selection
    tl.to(selectorRef.current, {
      scale: 1.1,
      duration: 0.1,
      ease: "power2.out"
    })
    .to(selectorRef.current, {
      scale: 1,
      duration: 0.1,
      ease: "power2.out"
    })

    applyTheme(theme)
    
    // Close panel after selection
    setTimeout(() => {
      setIsOpen(false)
      gsap.to(panelRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(panelRef.current, { display: 'none' })
        }
      })
    }, 500)
  }

  const handleCustomColorChange = (e) => {
    const newColor = e.target.value
    setCustomColor(newColor)
    applyTheme({ name: 'custom', primary: newColor, primaryRgb: hexToRgb(newColor) })
  }

  return (
    <div 
      ref={selectorRef}
      className="fixed bottom-6 border-white -right-1 z-40"
    >
      {/* Theme Selection Panel */}
      <div
        ref={panelRef}
        className="absolute bottom-16 right-0 bg-card border border-border rounded-2xl p-4 shadow-2xl backdrop-blur-sm hidden"
        style={{ minWidth: '280px' }}
      >
        <h3 className="text-sm font-semibold text-foreground mb-3">Choose Theme Color</h3>
        
        <div className="grid grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => selectTheme(theme)}
              className="group relative p-3 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              {/* Color Preview */}
              <div 
                className="w-8 h-8 rounded-full mx-auto mb-2 relative overflow-hidden"
                style={{ backgroundColor: theme.primary }}
              >
                {/* Animated Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Check Icon for Current Theme */}
                {currentTheme === theme.name && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              
              {/* Theme Name */}
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {theme.label}
              </span>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>
        
        {/* Custom Color Option */}
        <div className="mt-4 pt-3 border-t border-border">
          <label htmlFor="custom-color-picker" className="flex items-center justify-between w-full p-2 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50 cursor-pointer">
            <span className="flex items-center">
              <Droplet className="w-4 h-4 mr-2" />
              Custom Color
            </span>
            <input
              type="color"
              id="custom-color-picker"
              value={customColor}
              onChange={handleCustomColorChange}
              className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer"
              title="Select a custom color"
            />
          </label>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        ref={buttonRef}
        onClick={togglePanel}
        className="size-10 md:size-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-r-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group relative overflow-hidden"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Icon */}
        <Palette 
          className={`size-5 md:size-6 relative z-10 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
        
        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-150"></div>
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-16 right-16 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Change Theme Color
      </div>
    </div>
  )
}

export default ColorThemeSelector