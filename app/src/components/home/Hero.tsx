'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const slides = [
    {
        bg: 'linear-gradient(135deg, #FF6B6B 0%, #ff8c42 50%, #FFD93D 100%)',
        emoji: '🧸',
        title: 'Discover Amazing Toys for Kids',
        subtitle: 'Quality toys that inspire learning & endless fun',
        cta: 'Shop Now',
        ctaHref: '/shop',
    },
    {
        bg: 'linear-gradient(135deg, #4ECDC4 0%, #06b6d4 50%, #8b5cf6 100%)',
        emoji: '🎮',
        title: 'Remote Control Thrills',
        subtitle: 'Up to 40% OFF on RC Cars, Trucks & Drones',
        cta: 'Explore RC Toys',
        ctaHref: '/categories?cat=Remote%20Control%20Toys',
    },
    {
        bg: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #FF6B6B 100%)',
        emoji: '📚',
        title: 'Learn While You Play',
        subtitle: 'STEM & Educational toys for curious minds',
        cta: 'View Educational',
        ctaHref: '/categories?cat=Educational%20Toys',
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 4500);
        return () => clearInterval(timer);
    }, []);

    const slide = slides[currentSlide];

    return (
        <section style={{
            background: slide.bg,
            minHeight: '400px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
            transition: 'background 0.9s ease',
        }}>
            {/* Decorative circles */}
            {[0, 1, 2].map(i => (
                <div key={i} style={{
                    position: 'absolute', borderRadius: '50%',
                    background: `rgba(255,255,255,${0.08 - i * 0.02})`,
                    width: `${300 + i * 140}px`, height: `${300 + i * 140}px`,
                    top: `${-80 - i * 40}px`, right: `${-80 - i * 40}px`,
                    pointerEvents: 'none',
                }} />
            ))}

            <div style={{
                maxWidth: '1280px', width: '100%', padding: '56px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: '32px', position: 'relative',
            }}>
                <div style={{ maxWidth: '600px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700, fontSize: '13px', marginBottom: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        ✨ Welcome to Happy Kids Toys
                    </p>
                    <h1 style={{
                        fontFamily: "'Baloo 2', sans-serif",
                        fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 900,
                        color: 'white', lineHeight: 1.15, marginBottom: '16px',
                        textShadow: '0 2px 20px rgba(0,0,0,0.15)',
                    }}>
                        {slide.title}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '18px', fontWeight: 600, marginBottom: '32px', lineHeight: 1.5 }}>
                        🚀 {slide.subtitle}
                    </p>
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                        <Link href={slide.ctaHref} style={{ textDecoration: 'none' }}>
                            <button style={{
                                background: 'white', color: '#FF6B6B', border: 'none', borderRadius: '50px',
                                padding: '16px 36px', fontSize: '16px', fontWeight: 800, cursor: 'pointer',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.18)', transition: 'all 0.3s',
                                fontFamily: "'Nunito', sans-serif",
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.25)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(0,0,0,0.18)'; }}
                            >
                                🛍️ {slide.cta}
                            </button>
                        </Link>
                        <Link href="/offers" style={{ textDecoration: 'none' }}>
                            <button style={{
                                background: 'rgba(255,255,255,0.2)', color: 'white',
                                border: '2px solid rgba(255,255,255,0.5)',
                                borderRadius: '50px', padding: '16px 30px', fontSize: '16px', fontWeight: 800,
                                cursor: 'pointer', fontFamily: "'Nunito', sans-serif", transition: 'all 0.3s',
                                backdropFilter: 'blur(8px)',
                            }}
                                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.3)'}
                                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)'}
                            >
                                🎉 View Offers
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Floating emoji */}
                <div className="hero-emoji" style={{ fontSize: 'clamp(80px, 12vw, 150px)', animation: 'float 3s ease-in-out infinite', flexShrink: 0, display: 'none' }}>
                    {slide.emoji}
                </div>
            </div>

            {/* Slide indicators */}
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                {slides.map((_, i) => (
                    <button key={i} onClick={() => setCurrentSlide(i)} style={{
                        width: i === currentSlide ? '28px' : '8px', height: '8px',
                        borderRadius: '50px', background: i === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                        border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0,
                    }} />
                ))}
            </div>

            <style jsx>{`
                @media (min-width: 640px) { .hero-emoji { display: block !important; } }
            `}</style>
        </section>
    );
}
