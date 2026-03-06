'use client';
import Link from 'next/link';
import { useWishlist } from '@/hooks/useWishlist';
import ProductCard from '@/components/ui/ProductCard';
import products from '@/data/products.json';
import { Product } from '@/types';

export default function WishlistPage() {
    const { items, mounted, removeFromWishlist, clearWishlist } = useWishlist();
    const recommended = (products as Product[]).filter(p => p.trending && !items.some(w => w.id === p.id)).slice(0, 4);

    if (!mounted) return (
        <div style={{ padding: '80px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💖</div>
            <p style={{ color: '#6b7280', fontWeight: 600 }}>Loading your wishlist...</p>
        </div>
    );

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '32px', fontWeight: 900, color: '#1a1a2e' }}>
                        💖 My Wishlist
                    </h1>
                    <p style={{ color: '#6b7280' }}>{items.length} item{items.length !== 1 ? 's' : ''} saved</p>
                </div>
                {items.length > 0 && (
                    <button onClick={clearWishlist} style={{
                        background: '#fff0f0', color: '#FF6B6B', border: 'none', borderRadius: '50px',
                        padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                        fontFamily: "'Nunito', sans-serif",
                    }}>🗑️ Clear All</button>
                )}
            </div>

            {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <div style={{ fontSize: '80px', marginBottom: '20px', animation: 'float 3s ease-in-out infinite' }}>💖</div>
                    <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1a1a2e', marginBottom: '12px' }}>
                        Your Wishlist is Empty
                    </h2>
                    <p style={{ color: '#6b7280', marginBottom: '28px' }}>Save your favourite toys here and come back later!</p>
                    <Link href="/shop" style={{ textDecoration: 'none' }}>
                        <button className="btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>🛍️ Browse Toys</button>
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginBottom: '48px' }}>
                    {items.map(product => (
                        <div key={product.id} style={{ position: 'relative' }}>
                            <ProductCard product={product} />
                            <button onClick={() => removeFromWishlist(product.id)} style={{
                                position: 'absolute', top: '42px', right: '8px', zIndex: 10,
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: 'white', border: 'none', cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)', fontSize: '14px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>❌</button>
                        </div>
                    ))}
                </div>
            )}

            {recommended.length > 0 && (
                <div>
                    <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1a1a2e', marginBottom: '20px' }}>
                        🔥 You Might Love These
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                        {recommended.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                </div>
            )}
        </div>
    );
}
