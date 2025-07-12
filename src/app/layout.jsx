import { Montserrat } from 'next/font/google';
import './globals.css';
import { metadata as md } from '@/common/constants/metadata';
import MagneticCursor from '@/components/MagneticCursor';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import ColorThemeSelector from '@/components/ColorThemeSelector ';
import Navigation from '@/components/Navigation';
import LoadingScreen from '@/components/LoadingScreen';
import Script from 'next/script';

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap'
});

export const metadata = md;

export default function RootLayout() {
    return (
        <html lang="en">
            <body className={`${montserrat.className} font-sans antialiased`}>
                <MagneticCursor />
                <Navigation />
                <ColorThemeSelector />
                <main className="overflow-x-hidden">
                    <Hero />
                    <About />
                    <Projects />
                    <Skills />
                    <Contact />
                </main>
                <LoadingScreen />
            </body>
            <Script
                async
                defer
                data-domain="your-domain.com"
                src="https://plausible.io/js/script.js"
            />
        </html>
    );
}
