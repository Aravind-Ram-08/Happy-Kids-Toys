'use client';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/hooks/useCart';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const { product, quantity } = item;
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const lineTotal = product.price * quantity;

    return (
        <div style={{
            background: 'white', borderRadius: '20px', padding: '16px',
            display: 'flex', gap: '16px', alignItems: 'flex-start',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            transition: 'box-shadow 0.2s',
            animation: 'fadeInUp 0.3s ease',
        }}>
            {/* Image */}
            <Link href={`/product/${product.id}`} style={{ flexShrink: 0 }}>
                <div style={{ width: '90px', height: '90px', borderRadius: '14px', overflow: 'hidden', background: '#f9fafb' }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </Link>

            {/* Details */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11px', color: '#4ECDC4', fontWeight: 700, marginBottom: '4px' }}>
                    {product.category}
                </div>
                <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{
                        fontSize: '15px', fontWeight: 800, color: '#1a1a2e',
                        marginBottom: '8px', lineHeight: 1.3,
                        whiteSpace: 'normal',
                    }}>
                        {product.name}
                    </h3>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#FF6B6B' }}>₹{product.price}</span>
                    <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
                    {discount > 0 && (
                        <span style={{ background: '#dcfce7', color: '#16a34a', borderRadius: '50px', padding: '2px 8px', fontSize: '11px', fontWeight: 800 }}>
                            {discount}% OFF
                        </span>
                    )}
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    {/* Qty control */}
                    <div style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: '50px', overflow: 'hidden' }}>
                        <button
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            style={{ width: '34px', height: '34px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#374151', fontWeight: 700, flexShrink: 0 }}
                        >
                            −
                        </button>
                        <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: 800, fontSize: '14px' }}>{quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            style={{ width: '34px', height: '34px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#374151', fontWeight: 700, flexShrink: 0 }}
                        >
                            +
                        </button>
                    </div>

                    {/* Line total */}
                    <span style={{ fontWeight: 800, color: '#1a1a2e', fontSize: '15px' }}>= ₹{lineTotal}</span>

                    {/* Remove */}
                    <button
                        onClick={() => onRemove(product.id)}
                        style={{
                            marginLeft: 'auto', background: '#fff0f0', color: '#FF6B6B',
                            border: 'none', borderRadius: '10px', padding: '8px 14px',
                            fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                            fontFamily: "'Nunito', sans-serif", transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#FF6B6B'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#fff0f0'; e.currentTarget.style.color = '#FF6B6B'; }}
                    >
                        🗑️ Remove
                    </button>
                </div>
            </div>
        </div>
    );
}
