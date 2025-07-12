'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import React, { useRef } from 'react';

export default function Logo() {
    const taseem = useRef();
    useGSAP(() => {
        gsap.from(taseem.current, {
            autoAlpha: 0, // handles opacity + visibility
            y: 20,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });
    }, []);

    return (
        <Link
            className="fixed z-10 text-3xl font-semibold py-3 px-2 bg-cyan-500 text-white top-0 left-5"
            href="#"
        >
            <span>Mo3</span>
            <span ref={taseem} className="">
                taseem
            </span>
        </Link>
    );
}
