'use client';

import { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Sparkles,Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EnhancedHero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descriptionRef = useRef(null);
    const buttonsRef = useRef(null);
    const socialRef = useRef(null);
    const floatingElementsRef = useRef([]);
    const particlesRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial setup - hide elements
            gsap.set(
                [
                    titleRef.current,
                    subtitleRef.current,
                    descriptionRef.current,
                    buttonsRef.current,
                    socialRef.current
                ],
                {
                    opacity: 0,
                    y: 50
                }
            );

            gsap.set(floatingElementsRef.current, {
                opacity: 0,
                scale: 0,
                rotation: 45
            });

            gsap.set(particlesRef.current, {
                opacity: 0,
                scale: 0
            });

            // Main entrance animation timeline
            const tl = gsap.timeline({ delay: 0.5 });

            // Animate floating elements first
            tl.to(floatingElementsRef.current, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: 'back.out(1.7)'
            })

                // Animate particles
                .to(
                    particlesRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out'
                    },
                    '-=1'
                )

                // Animate text elements
                .to(
                    titleRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: 'power3.out'
                    },
                    '-=0.8'
                )

                .to(
                    subtitleRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: 'power3.out'
                    },
                    '-=0.6'
                )

                .to(
                    descriptionRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'power3.out'
                    },
                    '-=0.4'
                )

                .to(
                    buttonsRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    },
                    '-=0.2'
                )

                .to(
                    socialRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    },
                    '-=0.4'
                );

            // Continuous floating animations
            gsap.to('.floating-1', {
                y: -20,
                rotation: 360,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            gsap.to('.floating-2', {
                y: -30,
                rotation: -360,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            gsap.to('.floating-3', {
                y: -25,
                x: 15,
                rotation: 180,
                duration: 7,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            // Particle floating animation
            gsap.to('.particle', {
                y: -40,
                x: 'random(-20, 20)',
                rotation: 'random(-180, 180)',
                duration: 'random(3, 6)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: {
                    each: 0.5,
                    from: 'random'
                }
            });

            // Mouse parallax effect
            const handleMouseMove = e => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;

                const xPos = (clientX / innerWidth - 0.5) * 2;
                const yPos = (clientY / innerHeight - 0.5) * 2;

                gsap.to('.parallax-1', {
                    x: xPos * 30,
                    y: yPos * 30,
                    duration: 1,
                    ease: 'power2.out'
                });

                gsap.to('.parallax-2', {
                    x: xPos * -20,
                    y: yPos * -20,
                    duration: 1.2,
                    ease: 'power2.out'
                });

                gsap.to('.parallax-3', {
                    x: xPos * 40,
                    y: yPos * 40,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToSection = href => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="hero"
            ref={heroRef}
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50"></div>

            <div className="absolute opacity-50 sm:opacity-100 inset-0 pointer-events-none">
                <div
                    ref={el => (floatingElementsRef.current[0] = el)}
                    className="floating-1 parallax-1 absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-xl"
                ></div>
                <div
                    ref={el => (floatingElementsRef.current[1] = el)}
                    className="floating-2 parallax-2 absolute bottom-32 left-16 w-24 h-24 bg-primary/15 rotate-45 blur-lg"
                ></div>
                <div
                    ref={el => (floatingElementsRef.current[2] = el)}
                    className="floating-3 parallax-3 absolute top-1/3 left-1/4 w-16 h-16 bg-primary/20 rounded-lg rotate-12 blur-sm"
                ></div>
                <div
                    ref={el => (floatingElementsRef.current[3] = el)}
                    className="floating-1 parallax-1 absolute bottom-20 right-1/3 w-20 h-20 bg-primary/12 rounded-full blur-md"
                ></div>
            </div>

            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        ref={el => (particlesRef.current[i] = el)}
                        className="particle absolute w-2 h-2 bg-primary/30 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-20 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <div className="mb-8">
                        <span className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm md:text-base font-medium backdrop-blur-sm border border-primary/20">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Hi, I am
                        </span>
                    </div>

                    <div className="mb-8">
                        <h1
                            ref={titleRef}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold font-poppins mb-6 relative group"
                        >
                            <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent hover:from-primary hover:via-foreground hover:to-primary transition-all duration-500">
                                MOATASEEM
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse">
                                MOATASEEM
                            </span>
                        </h1>
                        <h2
                            ref={subtitleRef}
                            className="text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground mb-8"
                        >
                            Web Developer
                        </h2>
                    </div>

                    <p
                        ref={descriptionRef}
                        className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-loose"
                    >
                        I specialize in creating{' '}
                        <span className="text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                            clean, modern, and elegant
                        </span>{' '}
                        user interfaces with{' '}
                        <span className="text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                            React, NextJs, Tailwind CSS, and more
                        </span>
                        . Whether it's just the{' '}
                        <span className="text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                            {' '}
                            frontend{' '}
                        </span>{' '}
                        or a{' '}
                        <span className="text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                            {' '}
                            full-stack{' '}
                        </span>{' '}
                        application, I can handle both with precision and
                        creativity.
                    </p>

                    <div
                        ref={buttonsRef}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    >
                        <Button
                            onClick={() => scrollToSection('#projects')}
                            size="lg"
                            className="bg-primary min-w-[200px] hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 relative overflow-hidden group"
                        >
                            <span className="relative z-10">View My Work</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </Button>
                        <Button
                            onClick={() => scrollToSection('#contact')}
                            variant="outline"
                            size="lg"
                            className="border-primary min-w-[200px] text-primary hover:bg-primary hover:text-black px-8 py-6 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                        >
                            <span className="relative z-10">Get In Touch</span>
                            <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </Button>
                    </div>

                    <div
                        ref={socialRef}
                        className="flex justify-center space-x-6 mb-16"
                    >
                        <a
                            href="tel:+201150998560"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 transform p-3 rounded-full hover:bg-primary/10"
                        >
                            <Phone size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/moataseem-shaaban-093b29317"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 transform p-3 rounded-full hover:bg-primary/10"
                        >
                            <Linkedin size={24} />
                        </a>
                        <a
                            href="mailto:mo3data@gmail.com"
                            className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 transform p-3 rounded-full hover:bg-primary/10"
                        >
                            <Mail size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnhancedHero;
