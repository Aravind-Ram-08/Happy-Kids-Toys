'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { openWhatsAppGeneral } from '@/lib/whatsapp';

function getCartCount() {
    if (typeof window === 'undefined') return 0;
    try {
        const cart = JSON.parse(localStorage.getItem('happykids_cart') || '[]');
        return cart.reduce((sum: number, i: { quantity: number }) => sum + i.quantity, 0);
    } catch { return 0; }
}

export default function MobileBottomNav() {
    const pathname = usePathname();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        setCartCount(getCartCount());
        const onUpdate = () => setCartCount(getCartCount());
        window.addEventListener('cart-updated', onUpdate);
        window.addEventListener('storage', onUpdate);
        return () => {
            window.removeEventListener('cart-updated', onUpdate);
            window.removeEventListener('storage', onUpdate);
        };
    }, []);

    const tabs = [
        { href: '/', icon: '🏠', label: 'Home' },
        { href: '/shop', icon: '🛍️', label: 'Shop' },
        { href: '/categories', icon: '📂', label: 'Categories' },
        { href: '/offers', icon: '🎉', label: 'Offers' },
    ];

    return (
        <nav className="mobile-bottom-nav">
            {tabs.map(tab => {
                const active = pathname === tab.href;
                return (
                    <Link key={tab.href} href={tab.href} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        gap: '2px', textDecoration: 'none', flex: 1, transition: 'all 0.2s',
                    }}>
                        <span style={{ fontSize: '22px', lineHeight: 1 }}>{tab.icon}</span>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: active ? '#FF6B6B' : '#9ca3af', transition: 'color 0.2s' }}>
                            {tab.label}
                        </span>
                        {active && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#FF6B6B', marginTop: '1px' }} />}
                    </Link>
                );
            })}

            {/* WhatsApp center button */}
            <button onClick={openWhatsAppGeneral} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                border: 'none', background: 'none', cursor: 'pointer', flex: 1,
            }}>
                <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #25d366, #128C7E)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', boxShadow: '0 4px 12px rgba(37,211,102,0.35)',
                    marginTop: '-16px',
                }}>💬</div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#25d366' }}>WhatsApp</span>
            </button>

            {/* Cart tab with count */}
            <Link href="/cart" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textDecoration: 'none', flex: 1, position: 'relative' }}>
                <span style={{ fontSize: '22px', lineHeight: 1, position: 'relative', display: 'inline-block' }}>
                    🛒
                    {cartCount > 0 && (
                        <span style={{
                            position: 'absolute', top: '-6px', right: '-8px',
                            background: '#FF6B6B', color: 'white', borderRadius: '50%',
                            width: '16px', height: '16px', fontSize: '9px', fontWeight: 900,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {cartCount > 9 ? '9+' : cartCount}
                        </span>
                    )}
                </span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: pathname === '/cart' ? '#FF6B6B' : '#9ca3af' }}>
                    Cart
                </span>
                {pathname === '/cart' && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#FF6B6B', marginTop: '1px' }} />}
            </Link>
        </nav>
    );
}
