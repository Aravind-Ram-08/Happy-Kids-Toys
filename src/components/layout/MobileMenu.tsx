'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const navLinks = [
    { href: '/', label: '🏠 Home' },
    { href: '/shop', label: '🛍️ Shop' },
    { href: '/categories', label: '📂 Categories' },
    { href: '/offers', label: '🎉 Offers' },
    { href: '/about-us', label: 'ℹ️ About Us' },
    { href: '/contact', label: '📞 Contact' },
    { href: '/cart', label: '🛒 Cart' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const pathname = usePathname();

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0,
                    background: 'rgba(0,0,0,0.4)',
                    zIndex: 199,
                    backdropFilter: 'blur(4px)',
                }}
            />

            {/* Drawer */}
            <div style={{
                position: 'fixed', top: 0, left: 0, bottom: 0,
                width: '280px',
                background: 'white',
                zIndex: 200,
                boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
                display: 'flex', flexDirection: 'column',
                animation: 'slideInLeft 0.3s ease',
            }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)',
                    padding: '20px 20px 16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🧸</div>
                        <div>
                            <div style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '16px', fontWeight: 800, color: 'white' }}>Happy Kids</div>
                            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', fontWeight: 700, letterSpacing: '1px' }}>TOYS</div>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '10px',
                        width: '36px', height: '36px', color: 'white', fontSize: '18px',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>✕</button>
                </div>

                {/* Nav Links */}
                <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
                    {navLinks.map(link => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={onClose}
                                style={{
                                    textDecoration: 'none',
                                    padding: '14px 16px',
                                    borderRadius: '14px',
                                    color: active ? '#FF6B6B' : '#374151',
                                    fontSize: '15px', fontWeight: 700,
                                    background: active ? '#fff0f0' : 'transparent',
                                    display: 'block',
                                    transition: 'all 0.2s',
                                    borderLeft: active ? '4px solid #FF6B6B' : '4px solid transparent',
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom section */}
                <div style={{ padding: '16px 20px', borderTop: '1px solid #f3f4f6' }}>
                    <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', fontWeight: 600 }}>
                        📞 +91 98765 43210
                    </p>
                    <p style={{ fontSize: '11px', color: '#d1d5db', textAlign: 'center', marginTop: '4px' }}>
                        © 2026 Happy Kids Toys
                    </p>
                </div>
            </div>
        </>
    );
}
