'use client';
import Link from 'next/link';
import { openWhatsAppGeneral } from '@/lib/whatsapp';

interface CartSummaryProps {
    subtotal: number;
    savings: number;
    delivery: number;
    total: number;
    totalItems: number;
    onCheckout?: () => void;
    onClear?: () => void;
}

export default function CartSummary({ subtotal, savings, delivery, total, totalItems, onCheckout, onClear }: CartSummaryProps) {
    const handleWhatsAppOrder = () => {
        const msg = `Hi! I'd like to place an order:\n• ${totalItems} items\n• Subtotal: ₹${subtotal}\n• Delivery: ₹${delivery === 0 ? 'FREE' : delivery}\n• Total: ₹${total}\n\nPlease confirm my order!`;
        const phone = '919876543210';
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <div style={{ background: 'white', borderRadius: '24px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'sticky', top: '90px' }}>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '22px', fontWeight: 800, color: '#1a1a2e', marginBottom: '24px' }}>
                🧾 Order Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                    <span style={{ color: '#6b7280', fontWeight: 600 }}>Subtotal ({totalItems} items)</span>
                    <span style={{ fontWeight: 700, color: '#1a1a2e' }}>₹{subtotal}</span>
                </div>
                {savings > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                        <span style={{ color: '#16a34a', fontWeight: 600 }}>🎉 You Save</span>
                        <span style={{ fontWeight: 700, color: '#16a34a' }}>−₹{savings}</span>
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                    <span style={{ color: '#6b7280', fontWeight: 600 }}>🚚 Delivery</span>
                    <span style={{ fontWeight: 700, color: delivery === 0 ? '#16a34a' : '#1a1a2e' }}>
                        {delivery === 0 ? 'FREE' : `₹${delivery}`}
                    </span>
                </div>
                {delivery > 0 && (
                    <div style={{ background: '#eff6ff', borderRadius: '12px', padding: '10px 14px', fontSize: '13px', color: '#2563eb', fontWeight: 600 }}>
                        🛍️ Add ₹{799 - subtotal} more for FREE delivery!
                    </div>
                )}
            </div>

            <div style={{ borderTop: '2px solid #f3f4f6', paddingTop: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '18px', color: '#1a1a2e' }}>Total</span>
                    <span style={{ fontWeight: 900, fontSize: '24px', color: '#FF6B6B', fontFamily: "'Baloo 2', sans-serif" }}>₹{total}</span>
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                    onClick={handleWhatsAppOrder}
                    className="btn-whatsapp"
                    style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '16px' }}
                >
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="white">
                        <path d="M16 0C7.164 0 0 7.164 0 16c0 2.82.732 5.47 2.016 7.773L0 32l8.484-2.016A15.94 15.94 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm7.307 19.243c-.4-.2-2.364-1.167-2.73-1.3-.367-.133-.634-.2-.9.2-.266.4-1.034 1.3-1.267 1.567-.233.267-.466.3-.866.1-.4-.2-1.69-.623-3.22-1.987-1.19-1.063-1.993-2.375-2.227-2.775-.233-.4-.025-.616.175-.815.18-.18.4-.466.6-.7.2-.233.266-.4.4-.666.133-.267.066-.5-.033-.7-.1-.2-.9-2.166-1.234-2.966-.325-.78-.656-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.333s1.433 3.867 1.633 4.133c.2.267 2.82 4.3 6.834 6.033.955.413 1.7.66 2.283.845.96.306 1.833.263 2.524.16.77-.115 2.364-.967 2.697-1.9.333-.934.333-1.734.233-1.9-.1-.167-.366-.267-.766-.467z" />
                    </svg>
                    Order via WhatsApp
                </button>

                <Link href="/checkout" style={{ textDecoration: 'none' }}>
                    <button
                        className="btn-primary"
                        style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}
                    >
                        💳 Proceed to Checkout
                    </button>
                </Link>

                <Link href="/shop" style={{ textDecoration: 'none' }}>
                    <button style={{
                        width: '100%', background: 'none', border: '2px solid #e5e7eb',
                        borderRadius: '50px', padding: '12px', color: '#6b7280',
                        fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                        fontFamily: "'Nunito', sans-serif", transition: 'all 0.2s',
                    }}
                        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#FF6B6B'}
                        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb'}
                    >
                        ← Continue Shopping
                    </button>
                </Link>

                {onClear && (
                    <button
                        onClick={onClear}
                        style={{
                            background: 'none', border: 'none', color: '#9ca3af',
                            fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                            textAlign: 'center', padding: '4px', fontFamily: "'Nunito', sans-serif",
                            textDecoration: 'underline',
                        }}
                    >
                        🗑️ Clear Cart
                    </button>
                )}
            </div>

            {/* Security badges */}
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['🔒 Secure', '📦 Safe Packaging', '⭐ 4.9 Rating'].map(b => (
                    <span key={b} style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700 }}>{b}</span>
                ))}
            </div>
        </div>
    );
}
