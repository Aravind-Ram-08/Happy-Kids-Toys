'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface TimeLeft {
    h: number; m: number; s: number;
}

export default function OffersBanner() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ h: 11, m: 59, s: 59 });

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(prev => {
            let { h, m, s } = prev;
            s--;
            if (s < 0) { s = 59; m--; }
            if (m < 0) { m = 59; h--; }
            if (h < 0) { h = 23; }
            return { h, m, s };
        }), 1000);
        return () => clearInterval(timer);
    }, []);

    const pad = (n: number) => String(n).padStart(2, '0');

    return (
        <section style={{ padding: '0 16px 56px', maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #ff8c42 30%, #FFD93D 70%, #4ECDC4 100%)',
                borderRadius: '28px', padding: '44px 36px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: '28px', position: 'relative', overflow: 'hidden',
            }}>
                {/* Decorative elements */}
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '220px', height: '220px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-30px', left: '30%', width: '120px', height: '120px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%', pointerEvents: 'none' }} />

                <div style={{ position: 'relative' }}>
                    <div style={{
                        background: 'white', color: '#FF6B6B', borderRadius: '50px',
                        display: 'inline-block', padding: '5px 18px',
                        fontSize: '12px', fontWeight: 800, marginBottom: '14px', letterSpacing: '1px',
                    }}>
                        🎊 FESTIVAL SEASON SALE
                    </div>
                    <h2 style={{
                        fontFamily: "'Baloo 2', sans-serif",
                        fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 900,
                        color: 'white', lineHeight: 1.2, marginBottom: '10px',
                        textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    }}>
                        Upto 50% OFF on All Toys!
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '16px', fontWeight: 600, marginBottom: '28px' }}>
                        Limited time offer • Fast Delivery Across India 🚀
                    </p>
                    <Link href="/offers" style={{ textDecoration: 'none' }}>
                        <button style={{
                            background: 'white', color: '#FF6B6B', border: 'none', borderRadius: '50px',
                            padding: '14px 36px', fontSize: '16px', fontWeight: 800,
                            cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)', transition: 'all 0.3s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'; }}
                        >
                            🛍️ Shop Offers Now
                        </button>
                    </Link>
                </div>

                {/* Countdown */}
                <div style={{ textAlign: 'center', position: 'relative' }}>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700, fontSize: '13px', marginBottom: '14px', letterSpacing: '1px' }}>
                        ⏰ OFFER ENDS IN
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {[['h', timeLeft.h, 'HRS'], ['m', timeLeft.m, 'MIN'], ['s', timeLeft.s, 'SEC']].map(([key, val, label]) => (
                            <div key={String(key)} style={{
                                background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(10px)',
                                borderRadius: '18px', padding: '14px 18px', textAlign: 'center', minWidth: '70px',
                            }}>
                                <div style={{ fontSize: '34px', fontWeight: 900, color: 'white', fontFamily: "'Baloo 2', sans-serif", lineHeight: 1 }}>
                                    {pad(Number(val))}
                                </div>
                                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', fontWeight: 700, marginTop: '4px' }}>
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
