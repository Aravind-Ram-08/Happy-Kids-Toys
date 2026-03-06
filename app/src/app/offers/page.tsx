'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import products from '@/data/products.json';
import { Product } from '@/types';

function CountdownTimer() {
    const [time, setTime] = useState({ d: 2, h: 14, m: 30, s: 0 });
    useEffect(() => {
        const timer = setInterval(() => setTime(prev => {
            let { d, h, m, s } = prev;
            s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; d--; }
            if (d < 0) { d = 0; h = 0; m = 0; s = 0; }
            return { d, h, m, s };
        }), 1000);
        return () => clearInterval(timer);
    }, []);
    const pad = (n: number) => String(n).padStart(2, '0');
    return (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
            {[['d', time.d, 'Days'], ['h', time.h, 'Hours'], ['m', time.m, 'Mins'], ['s', time.s, 'Secs']].map(([k, val, label]) => (
                <div key={String(k)} style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: '16px', padding: '12px', textAlign: 'center', minWidth: '64px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: 'white', fontFamily: "'Baloo 2', sans-serif", lineHeight: 1 }}>{pad(Number(val))}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontWeight: 700, textTransform: 'uppercase' }}>{label}</div>
                </div>
            ))}
        </div>
    );
}

export default function OffersPage() {
    const offers = (products as Product[]).filter(p => {
        const disc = ((p.originalPrice - p.price) / p.originalPrice) * 100;
        return disc >= 30;
    });

    const featuredOffers = [
        { title: '🎊 Holi Special', subtitle: 'Up to 50% OFF on all toys!', bg: 'linear-gradient(135deg, #8b5cf6, #ec4899, #FF6B6B)', emoji: '🌈' },
        { title: '🌟 Weekend Sale', subtitle: 'Extra 10% off with WhatsApp order!', bg: 'linear-gradient(135deg, #FF6B6B, #ff8c42, #FFD93D)', emoji: '⚡' },
        { title: '📦 Bundle Deal', subtitle: 'Buy 2 Get 1 Free on selected toys', bg: 'linear-gradient(135deg, #4ECDC4, #06b6d4, #0ea5e9)', emoji: '🎁' },
    ];

    return (
        <div>
            {/* Hero banner */}
            <div style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #ff8c42 40%, #FFD93D 100%)', padding: '48px 16px', textAlign: 'center' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: '50px', padding: '8px 24px', color: 'white', fontWeight: 800, fontSize: '14px', marginBottom: '16px', letterSpacing: '1px' }}>
                        🎉 FESTIVAL SEASON SALE
                    </div>
                    <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: 'white', marginBottom: '8px', lineHeight: 1.2 }}>
                        Mega Toy Sale!
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>
                        Up to 50% off • Fast Delivery • Order via WhatsApp
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>⏰ SALE ENDS IN</p>
                    <CountdownTimer />
                    <Link href="/shop" style={{ textDecoration: 'none' }}>
                        <button style={{ background: 'white', color: '#FF6B6B', border: 'none', borderRadius: '50px', padding: '16px 40px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}>
                            🛍️ Shop All Deals
                        </button>
                    </Link>
                </div>
            </div>

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px' }}>
                {/* Featured offer cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>
                    {featuredOffers.map((offer, i) => (
                        <div key={i} style={{ background: offer.bg, borderRadius: '24px', padding: '32px 24px', cursor: 'pointer', transition: 'transform 0.3s', position: 'relative', overflow: 'hidden' }}
                            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'}
                            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'none'}
                        >
                            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '80px', opacity: 0.15 }}>{offer.emoji}</div>
                            <div style={{ fontSize: '36px', marginBottom: '12px' }}>{offer.emoji}</div>
                            <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>{offer.title}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontWeight: 600 }}>{offer.subtitle}</p>
                        </div>
                    ))}
                </div>

                {/* Offer products */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1a1a2e' }}>🔥 Best Deals Today</h2>
                    <span style={{ background: '#FF6B6B', color: 'white', borderRadius: '50px', padding: '4px 12px', fontSize: '13px', fontWeight: 800 }}>
                        {offers.length} deals
                    </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                    {offers.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </div>
        </div>
    );
}
