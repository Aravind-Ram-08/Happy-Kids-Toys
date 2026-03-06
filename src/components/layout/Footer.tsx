'use client';
import Link from 'next/link';
import { useState } from 'react';

const categories = [
    { name: 'Educational Toys', icon: '📚', color: '#4ECDC4' },
    { name: 'Musical Toys', icon: '🎵', color: '#8b5cf6' },
    { name: 'Remote Control Toys', icon: '🎮', color: '#FF6B6B' },
    { name: 'Baby Toys', icon: '🍼', color: '#f59e0b' },
    { name: 'Outdoor Toys', icon: '⚽', color: '#22c55e' },
];

const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop All' },
    { href: '/categories', label: 'Categories' },
    { href: '/offers', label: 'Offers' },
    { href: '/about-us', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/cart', label: 'Cart' },
];

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <footer style={{ background: '#1a1a2e', color: 'white', padding: '56px 16px 88px' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

                {/* Trust bar */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '16px',
                    padding: '24px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '20px',
                    marginBottom: '48px',
                }}>
                    {[
                        { icon: '🚚', title: 'Free Delivery', desc: 'Orders above ₹799' },
                        { icon: '🔄', title: 'Easy Returns', desc: '7-day return policy' },
                        { icon: '🔒', title: 'Secure Payment', desc: '100% safe checkout' },
                        { icon: '💬', title: 'WhatsApp Support', desc: '9 AM – 7 PM daily' },
                    ].map(item => (
                        <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ fontSize: '28px' }}>{item.icon}</div>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '14px', color: 'white' }}>{item.title}</div>
                                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '40px', marginBottom: '48px' }}>

                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🧸</div>
                            <div>
                                <div style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '20px', fontWeight: 800, color: '#FF6B6B' }}>Happy Kids</div>
                                <div style={{ fontSize: '10px', color: '#4ECDC4', fontWeight: 700, letterSpacing: '1px' }}>TOYS</div>
                            </div>
                        </div>
                        <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
                            Bringing joy to children across India with safe, educational, and fun toys. Trusted by 10,000+ families! 🧸
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {[
                                { icon: '📘', label: 'Facebook' },
                                { icon: '📷', label: 'Instagram' },
                                { icon: '🐦', label: 'Twitter' },
                                { icon: '▶️', label: 'YouTube' },
                            ].map(s => (
                                <a key={s.label} href="#" aria-label={s.label} style={{
                                    width: '38px', height: '38px',
                                    background: 'rgba(255,255,255,0.08)',
                                    borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '18px', cursor: 'pointer',
                                    transition: 'background 0.2s', textDecoration: 'none',
                                }}
                                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,107,107,0.3)'}
                                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)'}
                                >{s.icon}</a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#FFD93D', marginBottom: '20px', letterSpacing: '0.5px' }}>
                            QUICK LINKS
                        </h3>
                        {quickLinks.map(link => (
                            <Link key={link.href} href={link.href} style={{
                                display: 'block', color: '#9ca3af', textDecoration: 'none',
                                marginBottom: '12px', fontSize: '14px', fontWeight: 600,
                                transition: 'color 0.2s',
                            }}
                                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#FF6B6B'}
                                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#9ca3af'}
                            >
                                → {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#FFD93D', marginBottom: '20px', letterSpacing: '0.5px' }}>
                            CATEGORIES
                        </h3>
                        {categories.map(c => (
                            <Link key={c.name} href={`/categories?cat=${encodeURIComponent(c.name)}`} style={{
                                display: 'block', color: '#9ca3af', textDecoration: 'none',
                                marginBottom: '12px', fontSize: '14px', fontWeight: 600,
                                transition: 'color 0.2s',
                            }}
                                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#4ECDC4'}
                                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#9ca3af'}
                            >
                                {c.icon} {c.name}
                            </Link>
                        ))}
                    </div>

                    {/* Contact + Newsletter */}
                    <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#FFD93D', marginBottom: '20px', letterSpacing: '0.5px' }}>
                            CONTACT US
                        </h3>
                        <div style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 2.2 }}>
                            <div>📞 +91 98765 43210</div>
                            <div>✉️ hello@happykidstoys.in</div>
                            <div>📍 Mumbai, Maharashtra, India</div>
                            <div>⏰ Mon–Sat: 9 AM – 7 PM</div>
                        </div>

                        {/* Newsletter */}
                        <div style={{ marginTop: '24px' }}>
                            <p style={{ color: '#d1d5db', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>
                                📧 Subscribe for exclusive deals!
                            </p>
                            {subscribed ? (
                                <div style={{ background: '#dcfce7', color: '#16a34a', borderRadius: '12px', padding: '10px 14px', fontSize: '13px', fontWeight: 700 }}>
                                    ✅ Subscribed! Thanks!
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        style={{
                                            flex: 1, background: 'rgba(255,255,255,0.1)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '10px', padding: '10px 14px',
                                            color: 'white', fontFamily: "'Nunito', sans-serif",
                                            fontSize: '13px', outline: 'none',
                                        }}
                                    />
                                    <button type="submit" style={{
                                        background: '#FF6B6B', border: 'none', borderRadius: '10px',
                                        padding: '10px 14px', color: 'white', cursor: 'pointer',
                                        fontWeight: 700, fontSize: '13px', fontFamily: "'Nunito', sans-serif",
                                        transition: 'background 0.2s',
                                        flexShrink: 0,
                                    }}>Go!</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: '12px',
                }}>
                    <p style={{ color: '#6b7280', fontSize: '13px' }}>
                        © 2026 Happy Kids Toys. All rights reserved. Made with ❤️ in India
                    </p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        {['Privacy Policy', 'Terms of Service', 'Shipping Policy', 'Refund Policy'].map(t => (
                            <a key={t} href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '12px', fontWeight: 600, transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#FF6B6B'}
                                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#6b7280'}
                            >{t}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
