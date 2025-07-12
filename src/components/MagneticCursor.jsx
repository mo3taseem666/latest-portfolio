"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const MagneticCursor = () => {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const isMobile = useRef(false)

  useEffect(() => {
    // Check if device is mobile
    isMobile.current = window.innerWidth <= 768 || 'ontouchstart' in window

    if (isMobile.current) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Animate cursor
    const animateCursor = () => {
      const speed = 0.20
      cursorX += (mouseX - cursorX) * speed
      cursorY += (mouseY - cursorY) * speed

      gsap.set(cursor, {
        x: cursorX - 20,
        y: cursorY - 20,
      })

      gsap.set(cursorDot, {
        x: mouseX - 4,
        y: mouseY - 4,
      })

      requestAnimationFrame(animateCursor)
    }

    // Handle interactive elements
    const handleMouseEnter = (e) => {
      const target = e.target
      const isInteractive = target?.matches && target.matches('button, a, input, textarea, [role="button"], .cursor-pointer')
      
      if (isInteractive) {
        gsap.to(cursor, {
          scale: 1.5,
          duration: .3,
          ease: 'power2.out'
        })
        gsap.to(cursorDot, {
          scale: 0.5,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseLeave = (e) => {
      const target = e.target
      const isInteractive = target?.matches && target.matches('button, a, input, textarea, [role="button"], .cursor-pointer')
      
      // Only revert if the element was interactive and the mouse is truly leaving it
      if (isInteractive) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    // Use capture phase for mouseenter/mouseleave to ensure they fire before child elements
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    // Start animation
    animateCursor()

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  // Don't render on mobile
  if (typeof window !== 'undefined' && (window.innerWidth <= 768 || 'ontouchstart' in window)) {
    return null
  }

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed hidden sm:block top-0 left-0 w-10 h-10 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
          borderRadius: '50%',
          border: '1px solid rgba(var(--primary-rgb), 0.1)',
          backdropFilter: 'blur(0px)',
        }}
      />
      
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 hidden sm:block left-0 w-2 h-2 pointer-events-none z-[9999]"
        style={{
          backgroundColor: 'var(--primary)',
          borderRadius: '50%',
        }}
      />
      
      <style jsx>{`
        * {
          cursor: none !important;
        }
        
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  )
}

export default MagneticCursor