'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export default function CheckoutPage() {
    const { items, totalItems, subtotal, savings, delivery, total, clearCart, mounted } = useCart();
    const [step, setStep] = useState<'shipping' | 'payment' | 'confirm'>('shipping');
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '', notes: '' });
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [orderPlaced, setOrderPlaced] = useState(false);

    if (!mounted) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>;

    if (items.length === 0 && !orderPlaced) {
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: '80px', marginBottom: '20px' }}>🛒</div>
                <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1a1a2e', marginBottom: '12px' }}>Cart is Empty</h1>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>Add some toys before checkout!</p>
                <Link href="/shop" style={{ textDecoration: 'none' }}>
                    <button className="btn-primary" style={{ padding: '14px 32px' }}>🛍️ Shop Now</button>
                </Link>
            </div>
        );
    }

    if (orderPlaced) {
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: '100px', marginBottom: '20px', animation: 'bounce-in 0.5s ease' }}>🎉</div>
                <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '36px', fontWeight: 900, color: '#22c55e', marginBottom: '12px' }}>
                    Order Confirmed!
                </h1>
                <p style={{ color: '#374151', fontSize: '16px', marginBottom: '8px' }}>
                    Thank you, <strong>{form.name}</strong>! Your order has been placed.
                </p>
                <div style={{ background: '#f0fdf4', borderRadius: '16px', padding: '20px', margin: '24px 0', textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, color: '#16a34a', marginBottom: '8px' }}>📦 Order Details</div>
                    <div style={{ color: '#374151', fontSize: '14px', lineHeight: 2 }}>
                        <div>Items: {totalItems}</div>
                        <div>Total: ₹{total}</div>
                        <div>Delivery: {delivery === 0 ? 'FREE' : `₹${delivery}`}</div>
                        <div>Payment: {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI' : 'Card'}</div>
                        <div>📍 {form.address}, {form.city}, {form.state} - {form.pincode}</div>
                    </div>
                </div>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '28px' }}>
                    📱 You'll receive a WhatsApp confirmation shortly at {form.phone}
                </p>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <button className="btn-primary" style={{ padding: '14px 32px' }}>🏠 Back to Home</button>
                </Link>
            </div>
        );
    }

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        clearCart();
    };

    const shippingValid = form.name && form.phone && form.address && form.city && form.state && form.pincode;

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
            <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '32px', fontWeight: 900, color: '#1a1a2e', marginBottom: '8px' }}>
                🛒 Checkout
            </h1>

            {/* Progress */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                {[
                    { key: 'shipping', label: '📍 Shipping', num: 1 },
                    { key: 'payment', label: '💳 Payment', num: 2 },
                    { key: 'confirm', label: '✅ Confirm', num: 3 },
                ].map(s => (
                    <div key={s.key} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 20px', borderRadius: '50px',
                        background: step === s.key ? 'linear-gradient(135deg, #FF6B6B, #ff8c42)' :
                            (s.num < (['shipping', 'payment', 'confirm'].indexOf(step) + 1) ? '#dcfce7' : '#f3f4f6'),
                        color: step === s.key ? 'white' : (s.num < (['shipping', 'payment', 'confirm'].indexOf(step) + 1) ? '#16a34a' : '#6b7280'),
                        fontWeight: 700, fontSize: '13px',
                    }}>
                        {s.label}
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: '32px', alignItems: 'start' }}>
                {/* Main area */}
                <div style={{ background: 'white', borderRadius: '24px', padding: '28px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                    {step === 'shipping' && (
                        <div>
                            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '22px', fontWeight: 800, color: '#1a1a2e', marginBottom: '24px' }}>📍 Shipping Address</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                                        <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name" className="input" />
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Phone *</label>
                                        <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" className="input" />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Email</label>
                                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className="input" />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Address *</label>
                                    <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="House/Flat, Street, Landmark"
                                        rows={3} style={{ fontFamily: "'Nunito', sans-serif", border: '2px solid #e5e7eb', borderRadius: '12px', padding: '12px 16px', fontSize: '15px', width: '100%', resize: 'vertical', outline: 'none' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>City *</label>
                                        <input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Mumbai" className="input" />
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>State *</label>
                                        <input required value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} placeholder="Maharashtra" className="input" />
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>PIN Code *</label>
                                        <input required value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} placeholder="400001" className="input" />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Order Notes</label>
                                    <input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any special instructions..." className="input" />
                                </div>
                                <button onClick={() => { if (shippingValid) setStep('payment'); }}
                                    className="btn-primary"
                                    style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '16px', opacity: shippingValid ? 1 : 0.5 }}
                                >Continue to Payment →</button>
                            </div>
                        </div>
                    )}

                    {step === 'payment' && (
                        <div>
                            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '22px', fontWeight: 800, color: '#1a1a2e', marginBottom: '24px' }}>💳 Payment Method</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                                {[
                                    { value: 'cod', label: '💵 Cash on Delivery', desc: 'Pay when you receive' },
                                    { value: 'upi', label: '📱 UPI Payment', desc: 'GPay, PhonePe, Paytm' },
                                    { value: 'card', label: '💳 Credit/Debit Card', desc: 'Visa, Mastercard, RuPay' },
                                ].map(pm => (
                                    <button key={pm.value} onClick={() => setPaymentMethod(pm.value)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px',
                                            borderRadius: '16px', cursor: 'pointer', textAlign: 'left',
                                            border: `2px solid ${paymentMethod === pm.value ? '#FF6B6B' : '#e5e7eb'}`,
                                            background: paymentMethod === pm.value ? '#fff8f8' : 'white',
                                            fontFamily: "'Nunito', sans-serif", transition: 'all 0.2s',
                                        }}>
                                        <div style={{
                                            width: '20px', height: '20px', borderRadius: '50%',
                                            border: `2px solid ${paymentMethod === pm.value ? '#FF6B6B' : '#d1d5db'}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                        }}>
                                            {paymentMethod === pm.value && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF6B6B' }} />}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 800, color: '#1a1a2e', fontSize: '15px' }}>{pm.label}</div>
                                            <div style={{ fontSize: '13px', color: '#6b7280' }}>{pm.desc}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button onClick={() => setStep('shipping')}
                                    style={{ background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '50px', padding: '14px 28px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", fontSize: '15px' }}>
                                    ← Back
                                </button>
                                <button onClick={() => setStep('confirm')} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '16px' }}>
                                    Review Order →
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'confirm' && (
                        <div>
                            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '22px', fontWeight: 800, color: '#1a1a2e', marginBottom: '24px' }}>✅ Confirm Order</h2>

                            <div style={{ background: '#f9fafb', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
                                <h3 style={{ fontWeight: 800, color: '#1a1a2e', marginBottom: '10px', fontSize: '15px' }}>📍 Shipping to:</h3>
                                <div style={{ color: '#374151', fontSize: '14px', lineHeight: 1.8 }}>
                                    <div><strong>{form.name}</strong></div>
                                    <div>{form.address}</div>
                                    <div>{form.city}, {form.state} - {form.pincode}</div>
                                    <div>📞 {form.phone}</div>
                                </div>
                            </div>

                            <div style={{ background: '#f9fafb', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
                                <h3 style={{ fontWeight: 800, color: '#1a1a2e', marginBottom: '10px', fontSize: '15px' }}>💳 Payment:</h3>
                                <p style={{ color: '#374151', fontWeight: 600 }}>{paymentMethod === 'cod' ? '💵 Cash on Delivery' : paymentMethod === 'upi' ? '📱 UPI' : '💳 Card'}</p>
                            </div>

                            <div style={{ background: '#f9fafb', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
                                <h3 style={{ fontWeight: 800, color: '#1a1a2e', marginBottom: '10px', fontSize: '15px' }}>📦 Items ({totalItems}):</h3>
                                {items.map(item => (
                                    <div key={item.product.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                        <img src={item.product.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                                        <span style={{ flex: 1, fontSize: '14px', fontWeight: 600, color: '#374151' }}>{item.product.name} ×{item.quantity}</span>
                                        <span style={{ fontWeight: 800, color: '#FF6B6B' }}>₹{item.product.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button onClick={() => setStep('payment')}
                                    style={{ background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '50px', padding: '14px 28px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", fontSize: '15px' }}>
                                    ← Back
                                </button>
                                <button onClick={handlePlaceOrder} style={{
                                    flex: 1, background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white',
                                    border: 'none', borderRadius: '50px', padding: '16px', fontSize: '17px',
                                    fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
                                    boxShadow: '0 6px 20px rgba(34,197,94,0.35)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', gap: '8px',
                                }}>
                                    🎉 Place Order — ₹{total}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Summary sidebar */}
                <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', position: 'sticky', top: '90px' }}>
                    <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '18px', fontWeight: 800, color: '#1a1a2e', marginBottom: '20px' }}>🧾 Order Summary</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6b7280' }}>Subtotal ({totalItems})</span>
                            <span style={{ fontWeight: 700 }}>₹{subtotal}</span>
                        </div>
                        {savings > 0 && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#16a34a' }}>Savings</span>
                            <span style={{ fontWeight: 700, color: '#16a34a' }}>−₹{savings}</span>
                        </div>}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6b7280' }}>Delivery</span>
                            <span style={{ fontWeight: 700, color: delivery === 0 ? '#16a34a' : '#1a1a2e' }}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
                        </div>
                    </div>
                    <div style={{ borderTop: '2px solid #f3f4f6', paddingTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 800, fontSize: '16px' }}>Total</span>
                            <span style={{ fontWeight: 900, fontSize: '22px', color: '#FF6B6B', fontFamily: "'Baloo 2', sans-serif" }}>₹{total}</span>
                        </div>
                    </div>
                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {['🔒 Secure checkout', '📦 Safe packaging', '🔄 Easy returns'].map(t => (
                            <span key={t} style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600 }}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    div[style*="minmax(0, 1fr) 360px"] { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
