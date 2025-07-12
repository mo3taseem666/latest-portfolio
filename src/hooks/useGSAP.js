import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const useGSAP = () => {
  const ctx = useRef()

  useEffect(() => {
    ctx.current = gsap.context(() => {})
    return () => {
      if (ctx.current) {
        ctx.current.revert()
      }
    }
  }, [])

  return ctx.current
}

// Animation presets
export const animations = {
  fadeInUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
  },
  fadeInLeft: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
  },
  fadeInRight: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
  },
  slideInUp: {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
  }
}

// Utility functions
export const createScrollTriggerAnimation = (element, animation, trigger = element) => {
  if (!element) return null
  
  return gsap.fromTo(element, animation.from, {
    ...animation.to,
    scrollTrigger: {
      trigger: trigger,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  })
}

export const createStaggerAnimation = (elements, animation, stagger = 0.1) => {
  if (!elements || elements.length === 0) return null
  
  return gsap.fromTo(elements, animation.from, {
    ...animation.to,
    stagger: stagger
  })
}

