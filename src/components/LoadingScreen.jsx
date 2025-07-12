'use client';

import { useEffect, useState } from 'react';

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Initializing portfolio...');
    const [fadeOut, setFadeOut] = useState(false);
    const [logoExit, setLogoExit] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [particles] = useState(() => {
        const generatedParticles = [...Array(10)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: `${Math.random() * 2 + 1.5}s`,
            delay: `${Math.random()}s`
        }));
        return generatedParticles;
    });

    const loadingMessages = [
        'Initializing portfolio...',
        'Optimizing experience...',
        'Almost ready...',
        'Welcome!'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = Math.min(prev + Math.random() * 10 + 5, 100);

                const msgIndex = Math.floor(
                    (next / 100) * loadingMessages.length
                );
                setLoadingText(
                    loadingMessages[msgIndex] || loadingMessages.at(-1)
                );

                if (next >= 100) {
                    clearInterval(interval);
                    setLogoExit(true); // Trigger logo scale-up

                    // Wait for logo animation before fading out everything
                    setTimeout(() => {
                        setIsDone(true);
                        setFadeOut(true);
                    }, 400);
                }

                return next;
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    if (isDone) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity h-screen overflow-hidden duration-500 ${
                fadeOut ? 'opacity-0' : 'opacity-100'
            }`}
        >
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((particle, i) => (
                    <div
                        key={i}
                        className="w-2 h-2 bg-primary/20 rounded-full animate-particle absolute"
                        style={{
                            top: particle.top,
                            left: particle.left,
                            animationDuration: particle.duration,
                            animationDelay: particle.delay
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 text-center">
                {/* Logo */}
                <div className="mb-6 transition-all duration-500 ease-out">
                    <div
                        className={`w-20 h-20 relative mx-auto transform transition-all duration-500 ${
                            logoExit
                                ? 'scale-[5] opacity-0'
                                : 'scale-100 opacity-100'
                        }`}
                    >
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-spin"></div>
                        <div className="absolute inset-2 border-4 border-primary/40 rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-primary">
                            MS
                        </div>
                        <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
                    </div>
                </div>

                {/* Progress */}
                <div className="w-72 mx-auto mb-3">
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span>Loading</span>
                        <span className="text-primary font-medium">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-200 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Loading Text */}
                <div className="text-muted-foreground text-sm font-medium transition-opacity duration-300">
                    {loadingText}
                </div>

                {/* Bouncing dots */}
                <div className="flex justify-center mt-3 space-x-1">
                    {[0, 1, 2].map(i => (
                        <div
                            key={i}
                            className="w-2 h-2 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
            </div>

            <style jsx="true">{`
                .animate-spin-slow {
                    animation: spin 3s linear infinite reverse;
                }

                @keyframes particle {
                    0% {
                        transform: translate(0, 0);
                        opacity: 0.5;
                    }
                    50% {
                        transform: translate(15px, -15px);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(0, 0);
                        opacity: 0.5;
                    }
                }

                .animate-particle {
                    animation-name: particle;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
