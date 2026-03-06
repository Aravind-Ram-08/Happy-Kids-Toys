'use client';
import Link from 'next/link';
import { useState } from 'react';

const megaCategories = [
    {
        name: 'Educational Toys', icon: '📚', color: '#4ECDC4',
        items: ['Learning Laptops', 'STEM Kits', 'Art & Craft', 'Puzzles', 'Science Lab'],
    },
    {
        name: 'Remote Control Toys', icon: '🎮', color: '#FF6B6B',
        items: ['RC Cars', 'RC Trucks', 'Drones', 'RC Boats', 'RC Helicopters'],
    },
    {
        name: 'Musical Toys', icon: '🎵', color: '#8b5cf6',
        items: ['Keyboards', 'Drums', 'Guitars', 'Microphones', 'Xylophones'],
    },
    {
        name: 'Baby Toys', icon: '🍼', color: '#f59e0b',
        items: ['Soft Toys', 'Play Mats', 'Rattles', 'Teethers', 'Stacking Rings'],
    },
    {
        name: 'Outdoor Toys', icon: '⚽', color: '#22c55e',
        items: ['Sports Sets', 'Splash Pools', 'Explorer Kits', 'Garden Toys', 'Ride-Ons'],
    },
];

export default function MegaMenu() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => { setIsVisible(false); setActiveCategory(null); }}
            style={{ position: 'relative' }}
        >
            <button
                style={{
                    background: 'none', border: 'none', padding: '8px 16px',
                    fontFamily: "'Nunito', sans-serif", fontWeight: 700,
                    fontSize: '13px', color: '#374151', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    borderRadius: '50px', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget).style.background = '#fff0f0'; (e.currentTarget).style.color = '#FF6B6B'; }}
                onMouseLeave={e => { if (!isVisible) { (e.currentTarget).style.background = 'none'; (e.currentTarget).style.color = '#374151'; } }}
            >
                ☰ All Categories ▾
            </button>

            {isVisible && (
                <div style={{
                    position: 'absolute', top: '100%', left: 0,
                    background: 'white', borderRadius: '20px',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
                    display: 'flex', minWidth: '600px', overflow: 'hidden',
                    animation: 'fadeInUp 0.2s ease', zIndex: 200,
                    border: '1px solid #f0f0f0',
                }}>
                    {/* Left: Categories */}
                    <div style={{ width: '220px', background: '#f9fafb', padding: '12px 0', borderRight: '1px solid #f0f0f0' }}>
                        {megaCategories.map(cat => (
                            <div
                                key={cat.name}
                                onMouseEnter={() => setActiveCategory(cat.name)}
                                style={{
                                    padding: '12px 20px',
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    cursor: 'pointer', transition: 'all 0.15s',
                                    background: activeCategory === cat.name ? 'white' : 'transparent',
                                    borderRight: activeCategory === cat.name ? `3px solid ${cat.color}` : '3px solid transparent',
                                    fontSize: '14px', fontWeight: 700, color: activeCategory === cat.name ? cat.color : '#374151',
                                }}
                            >
                                <span style={{ fontSize: '20px' }}>{cat.icon}</span>
                                {cat.name}
                            </div>
                        ))}
                    </div>

                    {/* Right: Sub-items */}
                    <div style={{ flex: 1, padding: '24px', minHeight: '260px' }}>
                        {activeCategory ? (
                            (() => {
                                const cat = megaCategories.find(c => c.name === activeCategory)!;
                                return (
                                    <div>
                                        <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '18px', fontWeight: 800, color: cat.color, marginBottom: '16px' }}>
                                            {cat.icon} {cat.name}
                                        </h3>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            {cat.items.map(item => (
                                                <Link key={item} href={`/shop?search=${encodeURIComponent(item)}`}
                                                    onClick={() => setIsVisible(false)}
                                                    style={{
                                                        textDecoration: 'none', color: '#374151', fontSize: '14px',
                                                        fontWeight: 600, padding: '10px 14px', borderRadius: '10px',
                                                        background: '#f9fafb', transition: 'all 0.15s',
                                                    }}
                                                    onMouseEnter={e => { (e.currentTarget).style.background = `${cat.color}15`; (e.currentTarget).style.color = cat.color; }}
                                                    onMouseLeave={e => { (e.currentTarget).style.background = '#f9fafb'; (e.currentTarget).style.color = '#374151'; }}
                                                >→ {item}</Link>
                                            ))}
                                        </div>
                                        <Link href={`/categories?cat=${encodeURIComponent(cat.name)}`}
                                            onClick={() => setIsVisible(false)}
                                            style={{ display: 'inline-block', marginTop: '20px', color: cat.color, fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
                                        >View all {cat.name} →</Link>
                                    </div>
                                );
                            })()
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af', fontSize: '14px', fontWeight: 600 }}>
                                👈 Hover a category to explore
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
