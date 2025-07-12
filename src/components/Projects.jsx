"use client"

import { useRef, useEffect, useState } from 'react'
import { ExternalLink, Github, Filter, Grid, List } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const filterRef = useRef(null)
  const gridRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      featured: true,
      description: "A modern e-commerce platform built with React and Tailwind CSS, featuring smooth animations and responsive design.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Tailwind CSS", "GSAP", "Node.js"],
      liveUrl: "https://example.com",
      codeUrl: "https://github.com",
      color: "from-blue-500 to-purple-500"
    },
    {
      id: 2,
      title: "Portfolio Website",
      category: "web",
      featured: true,
      description: "A creative portfolio website with advanced GSAP animations and interactive elements.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "GSAP", "Three.js", "Tailwind CSS"],
      liveUrl: "https://example.com",
      codeUrl: "https://github.com",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      title: "Task Management App",
      category: "app",
      featured: false,
      description: "A collaborative task management application with real-time updates and beautiful UI.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://example.com",
      codeUrl: "https://github.com",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 4,
      title: "Weather Dashboard",
      category: "app",
      featured: false,
      description: "An interactive weather dashboard with data visualization and location-based forecasts.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Chart.js", "API Integration", "CSS3"],
      liveUrl: "https://example.com",
      codeUrl: "https://github.com",
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 5,
      title: "Restaurant Website",
      category: "web",
      featured: false,
      description: "A modern restaurant website with online ordering system and smooth scrolling effects.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "GSAP", "Tailwind CSS", "Stripe"],
      liveUrl: "https://example.com",
      codeUrl: "https://github.com",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 6,
      title: "Fitness Tracker",
      category: "app",
      featured: false,
      description: "A comprehensive fitness tracking application with progress visualization and goal setting.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "D3.js", "Tailwind CSS", "PWA"],
      liveUrl: "https://example.com",
      codeUrl: "https://github.com",
      color: "from-emerald-500 to-green-500"
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'web', label: 'Websites', count: projects.filter(p => p.category === 'web').length },
    { id: 'app', label: 'Applications', count: projects.filter(p => p.category === 'app').length },
    { id: 'featured', label: 'Featured', count: projects.filter(p => p.featured).length },
  ]

  useEffect(() => {
    setupScrollAnimations()
    setupProjectAnimations()
  }, [])

  const setupScrollAnimations = () => {
    // Header animation
    gsap.fromTo(headerRef.current, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: .5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1
        }
      }
    )

    // Filter animation
    gsap.fromTo(filterRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: filterRef.current,
          start: "top 85%"
        }
      }
    )
  }

  const setupProjectAnimations = () => {
    const cards = gridRef.current?.children
    if (!cards) return

    Array.from(cards).forEach((card, index) => {
      // Entrance animation
      gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%"
          }
        }
      )

      // 3D hover effect
      const setupCardHover = () => {
        const cardElement = card
        const imageElement = card.querySelector('.project-image')
        const contentElement = card.querySelector('.project-content')

        cardElement.addEventListener('mouseenter', () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          })

          gsap.to(imageElement, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          })

          gsap.to(contentElement, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          })
        })

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          })

          gsap.to(imageElement, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          })

          gsap.to(contentElement, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          })
        })
      }

      setupCardHover()
    })
  }

  const filterProjects = (filterId) => {
    setActiveFilter(filterId)
    
    const cards = Array.from(gridRef.current?.children || [])
    
    // Animate out
    gsap.to(cards, {
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        // Filter and animate in
        setTimeout(() => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out"
          })
        }, 100)
      }
    })
  }

  const getFilteredProjects = () => {
    switch (activeFilter) {
      case 'web':
        return projects.filter(p => p.category === 'web')
      case 'app':
        return projects.filter(p => p.category === 'app')
      case 'featured':
        return projects.filter(p => p.featured)
      default:
        return projects
    }
  }

  const ProjectCard = ({ project }) => (
    <div className="project-card flex flex-col group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
      {/* Project Image */}
      <div className="project-image relative h-48 sm:h-56 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-6xl font-bold opacity-20">
            {project.title.charAt(0)}
          </div>
        </div>
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="project-content p-6 flex flex-col flex-1 justify-between">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-lg transition-colors duration-300 text-center"
          >
            Live Demo
          </a>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 border border-border hover:border-primary text-foreground hover:text-primary text-sm font-medium rounded-lg transition-colors duration-300 text-center"
          >
            Code
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-20 lg:py-32 bg-secondary/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Here are some of my recent projects that showcase my skills in frontend development, 
            UI/UX design, and modern web technologies. Each project represents a unique challenge and solution.
          </p>
        </div>

        {/* Filter Controls */}
        <div ref={filterRef} className="flex flex-col sm:flex-row justify-between sm:items-start mb-12 gap-4">
          {/* Filter Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => filterProjects(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground hover:text-foreground'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex gap-2 bg-secondary rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-300 ${
                viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-300 ${
                viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div 
          ref={gridRef}
          className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1  mx-auto'
          }`}
        >
          {getFilteredProjects().map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <button className="group px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 relative overflow-hidden">
            <span className="relative z-10">View All Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Projects

