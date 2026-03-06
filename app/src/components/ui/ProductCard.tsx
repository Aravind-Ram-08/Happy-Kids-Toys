'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/types';
import { openWhatsApp } from '@/lib/whatsapp';

interface ProductCardProps {
    product: Product;
    style?: React.CSSProperties;
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i} style={{ fontSize: '13px', color: i <= Math.round(rating) ? '#FFD93D' : '#d1d5db' }}>★</span>
            ))}
            <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '2px', fontWeight: 600 }}>({rating})</span>
        </div>
    );
}

const BADGE_COLORS: Record<string, string> = {
    'Best Seller': '#FF6B6B', 'Hot Selling': '#ff8c42', 'Trending': '#8b5cf6', 'New Arrival': '#4ECDC4',
};

function addToCartStorage(product: Product) {
    if (typeof window === 'undefined') return;
    try {
        const cart = JSON.parse(localStorage.getItem('happykids_cart') || '[]');
        const existing = cart.find((i: { product: Product }) => i.product.id === product.id);
        if (existing) existing.quantity += 1;
        else cart.push({ product, quantity: 1 });
        localStorage.setItem('happykids_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    } catch { /* noop */ }
}

function toggleWishlistStorage(product: Product): boolean {
    if (typeof window === 'undefined') return false;
    try {
        const list = JSON.parse(localStorage.getItem('happykids_wishlist') || '[]');
        const exists = list.find((p: Product) => p.id === product.id);
        const updated = exists ? list.filter((p: Product) => p.id !== product.id) : [...list, product];
        localStorage.setItem('happykids_wishlist', JSON.stringify(updated));
        window.dispatchEvent(new Event('wishlist-updated'));
        return !exists;
    } catch { return false; }
}

function isInWishlistStorage(productId: number): boolean {
    if (typeof window === 'undefined') return false;
    try {
        return JSON.parse(localStorage.getItem('happykids_wishlist') || '[]').some((p: Product) => p.id === productId);
    } catch { return false; }
}

export default function ProductCard({ product, style }: ProductCardProps) {
    const [added, setAdded] = useState(false);
    const [wishlisted, setWishlisted] = useState(() => isInWishlistStorage(product.id));
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); e.stopPropagation();
        addToCartStorage(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault(); e.stopPropagation();
        const isNowWishlisted = toggleWishlistStorage(product);
        setWishlisted(isNowWishlisted);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
        setTilt({ x, y });
    };

    return (
        <div className="product-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            style={{
                ...style,
                transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.15s ease, box-shadow 0.3s ease',
            }}
        >
            {/* Badge */}
            <div style={{
                position: 'absolute', top: '10px', left: '10px',
                background: BADGE_COLORS[product.badge] || '#FF6B6B',
                color: 'white', borderRadius: '50px',
                padding: '3px 10px', fontSize: '10px', fontWeight: 800, zIndex: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}>{product.badge}</div>

            {/* Discount badge */}
            {discount > 0 && (
                <div style={{
                    position: 'absolute', top: '10px', right: '10px',
                    background: '#22c55e', color: 'white', borderRadius: '50px',
                    padding: '3px 8px', fontSize: '10px', fontWeight: 800, zIndex: 2,
                }}>{discount}% OFF</div>
            )}

            {/* Wishlist heart */}
            <button onClick={handleToggleWishlist} style={{
                position: 'absolute', top: '36px', right: '10px', zIndex: 10,
                width: '32px', height: '32px', borderRadius: '50%',
                background: wishlisted ? '#FF6B6B' : 'rgba(255,255,255,0.9)',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '16px', transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}>{wishlisted ? '❤️' : '🤍'}</button>

            {/* Image */}
            <Link href={`/product/${product.id}`}>
                <div style={{ overflow: 'hidden', aspectRatio: '1', background: '#f9fafb' }}>
                    <img src={product.image} alt={product.name} className="product-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
            </Link>

            {/* Content */}
            <div style={{ padding: '12px' }}>
                <div style={{ fontSize: '11px', color: '#4ECDC4', fontWeight: 700, marginBottom: '4px' }}>{product.category}</div>
                <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{
                        fontSize: '14px', fontWeight: 800, color: '#1a1a2e',
                        marginBottom: '6px', lineHeight: 1.3,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>{product.name}</h3>
                </Link>

                <StarRating rating={product.rating} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#FF6B6B' }}>₹{product.price}</span>
                    <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
                </div>

                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', fontWeight: 600 }}>Age: {product.ageGroup}</div>

                <button onClick={handleAddToCart} style={{
                    width: '100%', marginTop: '10px', padding: '9px 14px', fontSize: '13px',
                    background: added ? '#22c55e' : 'linear-gradient(135deg, #FF6B6B, #ff8c42)',
                    color: 'white', border: 'none', borderRadius: '50px',
                    fontFamily: "'Nunito', sans-serif", fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.3s',
                    boxShadow: '0 4px 12px rgba(255,107,107,0.25)',
                }}>{added ? '✅ Added!' : '🛒 Add to Cart'}</button>

                <button onClick={() => openWhatsApp(product.name, product.price)}
                    className="btn-whatsapp"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '6px', padding: '8px 16px', fontSize: '12px' }}>
                    <svg width="14" height="14" viewBox="0 0 32 32" fill="white">
                        <path d="M16 0C7.164 0 0 7.164 0 16c0 2.82.732 5.47 2.016 7.773L0 32l8.484-2.016A15.94 15.94 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm7.307 19.243c-.4-.2-2.364-1.167-2.73-1.3-.367-.133-.634-.2-.9.2-.266.4-1.034 1.3-1.267 1.567-.233.267-.466.3-.866.1-.4-.2-1.69-.623-3.22-1.987-1.19-1.063-1.993-2.375-2.227-2.775-.233-.4-.025-.616.175-.815.18-.18.4-.466.6-.7.2-.233.266-.4.4-.666.133-.267.066-.5-.033-.7-.1-.2-.9-2.166-1.234-2.966-.325-.78-.656-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.333s1.433 3.867 1.633 4.133c.2.267 2.82 4.3 6.834 6.033.955.413 1.7.66 2.283.845.96.306 1.833.263 2.524.16.77-.115 2.364-.967 2.697-1.9.333-.934.333-1.734.233-1.9-.1-.167-.366-.267-.766-.467z" />
                    </svg>
                    Order via WhatsApp
                </button>
            </div>
        </div>
    );
}
