'use client';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import CartItemComponent from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import ProductCard from '@/components/ui/ProductCard';
import products from '@/data/products.json';
import { Product } from '@/types';

export default function CartPage() {
    const { items, mounted, totalItems, subtotal, savings, delivery, total, updateQuantity, removeFromCart, clearCart } = useCart();

    // Recommended products (items not already in cart)
    const cartIds = items.map(i => i.product.id);
    const recommended = (products as Product[]).filter(p => !cartIds.includes(p.id) && p.trending).slice(0, 4);

    if (!mounted) {
        return (
            <div style={{ padding: '80px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
                <p style={{ color: '#6b7280', fontWeight: 600 }}>Loading your cart...</p>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
                {/* Empty cart hero */}
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <div style={{ fontSize: '100px', marginBottom: '24px', animation: 'float 3s ease-in-out infinite' }}>🛒</div>
                    <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '32px', fontWeight: 900, color: '#1a1a2e', marginBottom: '12px' }}>
                        Your Cart is Empty!
                    </h1>
                    <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '32px' }}>
                        Looks like you haven't added any toys yet. Let's fix that! 🧸
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/shop" style={{ textDecoration: 'none' }}>
                            <button className="btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
                                🛍️ Start Shopping
                            </button>
                        </Link>
                        <Link href="/offers" style={{ textDecoration: 'none' }}>
                            <button style={{
                                background: 'white', color: '#FF6B6B', border: '2px solid #FF6B6B',
                                borderRadius: '50px', padding: '14px 28px', fontSize: '16px', fontWeight: 700,
                                cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
                            }}>
                                🎉 View Offers
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Trending products */}
                {recommended.length > 0 && (
                    <div>
                        <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1a1a2e', marginBottom: '20px', textAlign: 'center' }}>
                            🔥 Trending Picks for You
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                            {recommended.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '32px', fontWeight: 900, color: '#1a1a2e', marginBottom: '4px' }}>
                    🛒 My Cart
                </h1>
                <p style={{ color: '#6b7280' }}>{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
            </div>

            {/* Progress bar for free delivery */}
            {subtotal < 799 && (
                <div style={{ background: 'white', borderRadius: '16px', padding: '16px 20px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>
                            🚚 Add <strong style={{ color: '#FF6B6B' }}>₹{799 - subtotal}</strong> more for FREE delivery!
                        </span>
                        <span style={{ fontSize: '13px', color: '#9ca3af' }}>₹{subtotal}/₹799</span>
                    </div>
                    <div style={{ background: '#f3f4f6', borderRadius: '50px', height: '8px', overflow: 'hidden' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)',
                            height: '100%', borderRadius: '50px',
                            width: `${Math.min((subtotal / 799) * 100, 100)}%`,
                            transition: 'width 0.5s ease',
                        }} />
                    </div>
                </div>
            )}

            {subtotal >= 799 && (
                <div style={{ background: '#dcfce7', borderRadius: '14px', padding: '12px 20px', marginBottom: '24px', color: '#16a34a', fontWeight: 700, fontSize: '14px' }}>
                    🎉 You qualify for FREE delivery!
                </div>
            )}

            {/* Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: '28px', alignItems: 'start' }}>
                {/* Cart items */}
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {items.map(item => (
                            <CartItemComponent
                                key={item.product.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeFromCart}
                            />
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <CartSummary
                    subtotal={subtotal}
                    savings={savings}
                    delivery={delivery}
                    total={total}
                    totalItems={totalItems}
                    onClear={clearCart}
                />
            </div>

            {/* Mobile sticky summary */}
            <style jsx>{`
                @media (max-width: 768px) {
                    div[style*="minmax(0, 1fr) 360px"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>

            {/* You might also like */}
            {recommended.length > 0 && (
                <div style={{ marginTop: '56px' }}>
                    <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1a1a2e', marginBottom: '20px' }}>
                        💡 You Might Also Like
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                        {recommended.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                </div>
            )}
        </div>
    );
}
