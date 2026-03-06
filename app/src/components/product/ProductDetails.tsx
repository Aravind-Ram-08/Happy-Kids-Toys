'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { openWhatsApp } from '@/lib/whatsapp';
import RatingStars from '@/components/ui/RatingStars';
import { useCart } from '@/hooks/useCart';

interface ProductDetailsProps {
    product: Product;
}

const BADGE_COLORS: Record<string, string> = {
    'Best Seller': '#FF6B6B',
    'Hot Selling': '#ff8c42',
    'Trending': '#8b5cf6',
    'New Arrival': '#4ECDC4',
};

export default function ProductDetails({ product }: ProductDetailsProps) {
    const [selectedImg, setSelectedImg] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'features' | 'delivery'>('description');
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
                {[['Home', '/'], ['Shop', '/shop'], [product.category, `/categories?cat=${encodeURIComponent(product.category)}`]].map(([label, href], i) => (
                    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {i > 0 && <span style={{ color: '#d1d5db' }}>›</span>}
                        <Link href={href as string} style={{ color: '#6b7280', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>{label}</Link>
                    </span>
                ))}
                <span style={{ color: '#d1d5db' }}>›</span>
                <span style={{ color: '#1a1a2e', fontSize: '13px', fontWeight: 700 }}>{product.name}</span>
            </div>

            {/* Product layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', marginBottom: '48px' }}>
                {/* Image gallery */}
                <div>
                    <div style={{ borderRadius: '24px', overflow: 'hidden', marginBottom: '14px', background: '#f9fafb', aspectRatio: '1', position: 'relative' }}>
                        {discount > 0 && (
                            <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#22c55e', color: 'white', borderRadius: '50px', padding: '4px 12px', fontSize: '13px', fontWeight: 800, zIndex: 2 }}>
                                {discount}% OFF
                            </div>
                        )}
                        <img
                            src={product.images[selectedImg] || product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {product.images.map((img, i) => (
                            <div key={i} onClick={() => setSelectedImg(i)} style={{
                                width: '76px', height: '76px', borderRadius: '14px', overflow: 'hidden',
                                cursor: 'pointer', border: `3px solid ${selectedImg === i ? '#FF6B6B' : 'transparent'}`,
                                transition: 'border 0.2s', background: '#f9fafb',
                            }}>
                                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div>
                    <div style={{ display: 'inline-block', background: BADGE_COLORS[product.badge] || '#FF6B6B', color: 'white', borderRadius: '50px', padding: '4px 14px', fontSize: '12px', fontWeight: 800, marginBottom: '14px' }}>
                        {product.badge}
                    </div>
                    <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 900, color: '#1a1a2e', lineHeight: 1.2, marginBottom: '14px' }}>
                        {product.name}
                    </h1>
                    <RatingStars rating={product.rating} reviews={product.reviews} size="md" style={{ marginBottom: '20px' }} />

                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '38px', fontWeight: 900, color: '#FF6B6B', fontFamily: "'Baloo 2', sans-serif", lineHeight: 1 }}>
                            ₹{product.price}
                        </span>
                        <span style={{ fontSize: '20px', color: '#9ca3af', textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
                        {discount > 0 && (
                            <span style={{ background: '#dcfce7', color: '#16a34a', borderRadius: '50px', padding: '4px 12px', fontSize: '14px', fontWeight: 800 }}>
                                Save ₹{product.originalPrice - product.price}
                            </span>
                        )}
                    </div>

                    {/* Info tags */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                        <div style={{ background: '#f0fdf4', color: '#16a34a', borderRadius: '12px', padding: '8px 14px', fontSize: '13px', fontWeight: 700 }}>
                            ✅ {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                        <div style={{ background: '#eff6ff', color: '#2563eb', borderRadius: '12px', padding: '8px 14px', fontSize: '13px', fontWeight: 700 }}>
                            🚚 Free Delivery ≥₹799
                        </div>
                        <div style={{ background: '#faf5ff', color: '#7c3aed', borderRadius: '12px', padding: '8px 14px', fontSize: '13px', fontWeight: 700 }}>
                            🎂 Age: {product.ageGroup}
                        </div>
                    </div>

                    {/* Features */}
                    <div style={{ background: '#f9fafb', borderRadius: '18px', padding: '18px', marginBottom: '24px' }}>
                        <div style={{ fontWeight: 800, color: '#1a1a2e', marginBottom: '12px', fontSize: '15px' }}>✨ Key Features</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {product.features.map((f, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151', fontWeight: 600 }}>
                                    <span style={{ color: '#22c55e', fontSize: '16px', flexShrink: 0 }}>✓</span> {f}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <span style={{ fontWeight: 700, color: '#374151', fontSize: '15px' }}>Qty:</span>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: '50px', overflow: 'hidden' }}>
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                style={{ width: '40px', height: '40px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#374151', fontWeight: 700 }}
                            >−</button>
                            <span style={{ minWidth: '36px', textAlign: 'center', fontWeight: 800, fontSize: '16px' }}>{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                style={{ width: '40px', height: '40px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#374151', fontWeight: 700 }}
                            >+</button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button
                            onClick={handleAddToCart}
                            style={{
                                background: added ? '#22c55e' : 'linear-gradient(135deg, #FF6B6B, #ff8c42)',
                                color: 'white', border: 'none', borderRadius: '50px',
                                padding: '16px 24px', fontSize: '16px', fontWeight: 800,
                                cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
                                transition: 'all 0.3s', boxShadow: '0 6px 20px rgba(255,107,107,0.3)',
                            }}
                        >
                            {added ? '✅ Added to Cart!' : '🛒 Add to Cart'}
                        </button>
                        <Link href="/cart" style={{ textDecoration: 'none' }}>
                            <button style={{
                                width: '100%', background: 'white', color: '#FF6B6B',
                                border: '2px solid #FF6B6B', borderRadius: '50px',
                                padding: '14px 24px', fontSize: '15px', fontWeight: 800,
                                cursor: 'pointer', fontFamily: "'Nunito', sans-serif", transition: 'all 0.3s',
                            }}>
                                👜 View Cart
                            </button>
                        </Link>
                        <button
                            onClick={() => openWhatsApp(product.name, product.price)}
                            className="btn-whatsapp"
                            style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '14px 16px' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 32 32" fill="white">
                                <path d="M16 0C7.164 0 0 7.164 0 16c0 2.82.732 5.47 2.016 7.773L0 32l8.484-2.016A15.94 15.94 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm7.307 19.243c-.4-.2-2.364-1.167-2.73-1.3-.367-.133-.634-.2-.9.2-.266.4-1.034 1.3-1.267 1.567-.233.267-.466.3-.866.1-.4-.2-1.69-.623-3.22-1.987-1.19-1.063-1.993-2.375-2.227-2.775-.233-.4-.025-.616.175-.815.18-.18.4-.466.6-.7.2-.233.266-.4.4-.666.133-.267.066-.5-.033-.7-.1-.2-.9-2.166-1.234-2.966-.325-.78-.656-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.333s1.433 3.867 1.633 4.133c.2.267 2.82 4.3 6.834 6.033.955.413 1.7.66 2.283.845.96.306 1.833.263 2.524.16.77-.115 2.364-.967 2.697-1.9.333-.934.333-1.734.233-1.9-.1-.167-.366-.267-.766-.467z" />
                            </svg>
                            Order on WhatsApp
                        </button>
                    </div>
                    <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '12px', marginTop: '12px' }}>
                        💬 Quick order confirmation via WhatsApp
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: '48px' }}>
                <div style={{ display: 'flex', borderBottom: '2px solid #f3f4f6' }}>
                    {(['description', 'features', 'delivery'] as const).map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            padding: '16px 24px', background: 'none', border: 'none',
                            borderBottom: `3px solid ${activeTab === tab ? '#FF6B6B' : 'transparent'}`,
                            color: activeTab === tab ? '#FF6B6B' : '#6b7280',
                            fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                            fontFamily: "'Nunito', sans-serif", textTransform: 'capitalize',
                            transition: 'all 0.2s', marginBottom: '-2px',
                        }}>{tab}</button>
                    ))}
                </div>
                <div style={{ padding: '24px' }}>
                    {activeTab === 'description' && <p style={{ color: '#374151', lineHeight: 1.8, fontSize: '15px' }}>{product.description}</p>}
                    {activeTab === 'features' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                            {product.features.map((f, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f9fafb', borderRadius: '12px', padding: '12px 16px' }}>
                                    <span style={{ color: '#22c55e', fontSize: '18px' }}>✓</span>
                                    <span style={{ fontWeight: 700, color: '#374151', fontSize: '14px' }}>{f}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'delivery' && (
                        <div style={{ display: 'grid', gap: '12px' }}>
                            {[
                                ['🚚', 'Standard Delivery', '5-7 business days • Free above ₹799'],
                                ['⚡', 'Express Delivery', '2-3 business days • ₹99 charge'],
                                ['📦', 'Packaging', 'Safe & secure packaging for all toys'],
                                ['🔄', 'Easy Returns', '7-day hassle-free return policy'],
                            ].map(([icon, title, desc]) => (
                                <div key={String(title)} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px', background: '#f9fafb', borderRadius: '14px' }}>
                                    <span style={{ fontSize: '24px' }}>{icon}</span>
                                    <div>
                                        <div style={{ fontWeight: 800, color: '#1a1a2e', marginBottom: '4px' }}>{title}</div>
                                        <div style={{ color: '#6b7280', fontSize: '14px' }}>{desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
