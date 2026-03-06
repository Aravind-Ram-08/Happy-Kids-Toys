'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import MegaMenu from './MegaMenu';
import SearchBar from '@/components/search/SearchBar';

function getCartCount() {
    if (typeof window === 'undefined') return 0;
    try {
        const cart = JSON.parse(localStorage.getItem('happykids_cart') || '[]');
        return cart.reduce((sum: number, i: { quantity: number }) => sum + i.quantity, 0);
    } catch { return 0; }
}
function getWishlistCount() {
    if (typeof window === 'undefined') return 0;
    try { return JSON.parse(localStorage.getItem('happykids_wishlist') || '[]').length; } catch { return 0; }
}

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [wishCount, setWishCount] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const sync = () => { setCartCount(getCartCount()); setWishCount(getWishlistCount()); };
        sync();
        window.addEventListener('cart-updated', sync);
        window.addEventListener('wishlist-updated', sync);
        window.addEventListener('storage', sync);
        return () => { window.removeEventListener('cart-updated', sync); window.removeEventListener('wishlist-updated', sync); window.removeEventListener('storage', sync); };
    }, []);

    const navLinks = [
        { href: '/', label: '🏠 Home' },
        { href: '/shop', label: '🛍️ Shop' },
        { href: '/offers', label: '🎉 Offers' },
        { href: '/about-us', label: 'ℹ️ About' },
        { href: '/contact', label: '📞 Contact' },
    ];

    const IconBtn = ({ href, icon, count, label }: { href: string; icon: string; count: number; label: string }) => (
        <Link href={href} aria-label={label} style={{ textDecoration: 'none', position: 'relative' }}>
            <div style={{
                width: '42px', height: '42px',
                background: count > 0 ? 'linear-gradient(135deg, #FF6B6B, #ff8c42)' : '#f3f4f6',
                borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: count > 0 ? '0 4px 12px rgba(255,107,107,0.3)' : 'none',
            }}>{icon}</div>
            {count > 0 && (
                <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    background: '#22c55e', color: 'white', borderRadius: '50%',
                    width: '19px', height: '19px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: 900,
                }}>{count > 99 ? '99+' : count}</div>
            )}
        </Link>
    );

    return (
        <>
            <header style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: scrolled ? 'rgba(255,255,255,0.97)' : 'white',
                backdropFilter: 'blur(12px)',
                boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
            }}>
                {/* Announcement bar */}
                <div style={{
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #ff8c42 100%)',
                    padding: '7px 0', textAlign: 'center',
                    fontSize: '13px', fontWeight: 700, color: 'white', letterSpacing: '0.3px',
                }}>
                    🎁 Free delivery on orders above ₹799 | 🚀 Fast Delivery Across India
                </div>

                {/* Main header */}
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '42px', height: '42px',
                                background: 'linear-gradient(135deg, #FF6B6B 0%, #ff8c42 100%)',
                                borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '22px', boxShadow: '0 4px 12px rgba(255,107,107,0.3)',
                            }}>🧸</div>
                            <div>
                                <div style={{
                                    fontFamily: "'Baloo 2', sans-serif", fontSize: '18px', fontWeight: 800,
                                    background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    lineHeight: 1.1,
                                }}>Happy Kids</div>
                                <div style={{ fontSize: '10px', fontWeight: 700, color: '#4ECDC4', letterSpacing: '1px' }}>TOYS</div>
                            </div>
                        </div>
                    </Link>

                    {/* Search */}
                    <div className="hidden-mobile" style={{ flex: 1 }}>
                        <SearchBar />
                    </div>

                    {/* Desktop nav */}
                    <nav className="hidden-mobile" style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} style={{
                                textDecoration: 'none', padding: '8px 10px', borderRadius: '50px',
                                color: pathname === link.href ? '#FF6B6B' : '#374151',
                                background: pathname === link.href ? '#fff0f0' : 'transparent',
                                fontSize: '13px', fontWeight: 700, transition: 'all 0.2s', whiteSpace: 'nowrap',
                            }}
                                onMouseEnter={e => { if (pathname !== link.href) { (e.target as HTMLElement).style.background = '#fff0f0'; (e.target as HTMLElement).style.color = '#FF6B6B'; } }}
                                onMouseLeave={e => { if (pathname !== link.href) { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.color = '#374151'; } }}
                            >{link.label}</Link>
                        ))}
                    </nav>

                    {/* Icons */}
                    <div className="hidden-mobile" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <IconBtn href="/wishlist" icon="💖" count={wishCount} label="Wishlist" />
                        <IconBtn href="/cart" icon="🛒" count={cartCount} label="Cart" />
                        <Link href="/admin" aria-label="Admin" style={{ textDecoration: 'none' }}>
                            <div style={{ width: '42px', height: '42px', background: '#f3f4f6', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', cursor: 'pointer' }}>👤</div>
                        </Link>
                    </div>

                    {/* Mobile icons */}
                    <div className="show-mobile" style={{ display: 'none', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
                        <Link href="/wishlist" style={{ textDecoration: 'none', position: 'relative' }}>
                            <div style={{ width: '38px', height: '38px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px' }}>💖</div>
                            {wishCount > 0 && <div style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#FF6B6B', color: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 900 }}>{wishCount}</div>}
                        </Link>
                        <Link href="/cart" style={{ textDecoration: 'none', position: 'relative' }}>
                            <div style={{ width: '38px', height: '38px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px' }}>🛒</div>
                            {cartCount > 0 && <div style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#FF6B6B', color: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 900 }}>{cartCount}</div>}
                        </Link>
                        <button onClick={() => setMobileMenuOpen(true)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', padding: '4px' }}>☰</button>
                    </div>
                </div>

                {/* Desktop MegaMenu row */}
                <div className="hidden-mobile" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px 6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MegaMenu />
                </div>

                <style jsx>{`
                    @media (max-width: 768px) {
                        .hidden-mobile { display: none !important; }
                        .show-mobile { display: flex !important; }
                    }
                    @media (min-width: 769px) {
                        .show-mobile { display: none !important; }
                    }
                `}</style>
            </header>
            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </>
    );
}
