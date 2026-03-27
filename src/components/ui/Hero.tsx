'use client';

import CanvasWrapper from '@/components/3d/CanvasWrapper';
import FloatingParticles from '@/components/3d/FloatingParticles';

import { useEffect, useRef } from 'react';
import { HeroSection } from '@/types';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
    data: HeroSection;
}

export default function Hero({ data }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Effect
            gsap.to(bgRef.current, {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-transparent"
        >
            {/* Parallax Background */}
            <div
                ref={bgRef}
                className="absolute inset-0 w-full h-[120%] -top-[10%] -z-10"
            >
                {data.type === 'video' ? (
                    <video
                        ref={videoRef}
                        src={data.src}
                        poster={data.poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                    />
                ) : (
                    <img
                        src={data.src}
                        alt="Pinnacle Quran Academy Campus and Students"
                        className="w-full h-full object-cover opacity-60"
                    />
                )}
                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-black/40" />

                {/* 3D Scene Layer (Floating Stars) */}
                <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen pointer-events-none">
                    <CanvasWrapper fov={35} cameraPosition={[0, 0, 12]}>
                        <FloatingParticles count={300} />
                    </CanvasWrapper>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-accent/20 border border-accent/50 text-accent text-sm font-semibold tracking-wider mb-4 uppercase">
                        Welcome to Pinnacle
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight drop-shadow-lg"
                >
                    {data.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-sans font-light leading-relaxed"
                >
                    {data.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        href={data.ctaPrimary.link}
                        className="group bg-primary hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-emerald-500/40 flex items-center gap-2"
                    >
                        {data.ctaPrimary.text}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href={data.ctaSecondary.link}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all hover:border-white/40"
                    >
                        {data.ctaSecondary.text}
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-50" />
            </motion.div>
        </div>
    );
}
