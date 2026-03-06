'use client';
import { useState } from 'react';
import { openWhatsAppGeneral } from '@/lib/whatsapp';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    return (
        <div>
            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #06b6d4 50%, #0ea5e9 100%)', padding: '48px 16px', textAlign: 'center' }}>
                <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: 'white', marginBottom: '12px' }}>📞 Contact Us</h1>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', fontWeight: 600 }}>We'd love to hear from you! Reach out for orders, queries or feedback.</p>
            </div>

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    {/* Contact form */}
                    <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>Send a Message</h2>
                        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>Fill in the form and we'll get back to you shortly</p>

                        {sent && (
                            <div style={{ background: '#dcfce7', color: '#16a34a', borderRadius: '12px', padding: '14px 20px', marginBottom: '20px', fontWeight: 700, fontSize: '15px', animation: 'fadeIn 0.3s ease' }}>
                                ✅ Message sent! We'll reply within 24 hours.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Your Name *</label>
                                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Priya Sharma" className="input" />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Phone Number</label>
                                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" className="input" />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="input" />
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Subject</label>
                                <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input" style={{ cursor: 'pointer' }}>
                                    <option value="">Select a topic...</option>
                                    <option value="order">Place an Order</option>
                                    <option value="delivery">Delivery Query</option>
                                    <option value="return">Return/Refund</option>
                                    <option value="product">Product Inquiry</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Message *</label>
                                <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Write your message here..." rows={5}
                                    style={{ fontFamily: "'Nunito', sans-serif", border: '2px solid #e5e7eb', borderRadius: '12px', padding: '12px 16px', fontSize: '15px', width: '100%', resize: 'vertical', outline: 'none' }} />
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '16px' }}>
                                📩 Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {[
                            { icon: '📞', title: 'Call Us', lines: ['+91 98765 43210', 'Mon–Sat: 9 AM – 7 PM'], color: '#4ECDC4', bg: '#e0faf8' },
                            { icon: '💬', title: 'WhatsApp', lines: ['Click to chat now!', 'Quick order support'], color: '#25d366', bg: '#dcfce7', action: openWhatsAppGeneral },
                            { icon: '✉️', title: 'Email', lines: ['hello@happykidstoys.in', 'Reply within 24 hours'], color: '#FF6B6B', bg: '#fff0f0' },
                            { icon: '📍', title: 'Location', lines: ['Mumbai, Maharashtra', 'Ships Across India'], color: '#8b5cf6', bg: '#f3e8ff' },
                        ].map(item => (
                            <div key={item.title} onClick={item.action} style={{ background: item.bg, borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '16px', cursor: item.action ? 'pointer' : 'default', transition: 'transform 0.2s', border: `2px solid ${item.color}22` }}
                                onMouseEnter={e => { if (item.action) (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
                            >
                                <div style={{ width: '52px', height: '52px', background: item.color, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{item.icon}</div>
                                <div>
                                    <div style={{ fontWeight: 800, color: '#1a1a2e', fontSize: '16px', marginBottom: '4px' }}>{item.title}</div>
                                    {item.lines.map(l => <div key={l} style={{ color: '#374151', fontSize: '14px', fontWeight: 600 }}>{l}</div>)}
                                </div>
                            </div>
                        ))}

                        {/* Delivery info */}
                        <div style={{ background: 'linear-gradient(135deg, #FF6B6B22, #FFD93D22)', borderRadius: '20px', padding: '24px', border: '2px solid #FF6B6B22' }}>
                            <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '18px', fontWeight: 800, color: '#1a1a2e', marginBottom: '16px' }}>🚚 Delivery Information</h3>
                            {[
                                ['Standard Delivery', '5–7 business days • Free above ₹799'],
                                ['Express Delivery', '2–3 business days • ₹99 charge'],
                                ['Coverage', 'All major cities across India'],
                                ['Returns', '7-day easy return policy'],
                            ].map(([title, desc]) => (
                                <div key={String(title)} style={{ marginBottom: '12px' }}>
                                    <span style={{ fontWeight: 800, color: '#1a1a2e' }}>✓ {title}: </span>
                                    <span style={{ color: '#6b7280', fontSize: '14px' }}>{desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
