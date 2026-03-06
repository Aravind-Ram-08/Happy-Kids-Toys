'use client';
import { useState, useEffect } from 'react';
import AdminShell, { useDark, useToast } from '@/components/admin/AdminShell';
import { AdminStore, AdminOffer } from '@/lib/adminStore';

function OffersContent() {
    const dark = useDark();
    const { show } = useToast();
    const card = dark ? '#1e1e35' : '#ffffff';
    const text = dark ? '#e2e8f0' : '#1e293b';
    const border = dark ? '#2d2d4e' : '#e2e8f0';
    const bg = dark ? '#12122a' : '#f8fafc';

    const [offers, setOffers] = useState<AdminOffer[]>([]);
    const [adding, setAdding] = useState(false);
    const [form, setForm] = useState<Omit<AdminOffer, 'id'>>({
        title: '', type: 'coupon', discount: 10, code: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        active: true,
    });

    useEffect(() => { setOffers(AdminStore.getOffers()); }, []);

    const handleAdd = () => {
        if (!form.title.trim()) return;
        const newOffer: AdminOffer = { ...form, id: Date.now().toString() };
        const updated = [...offers, newOffer];
        AdminStore.saveOffers(updated);
        setOffers(updated);
        setAdding(false);
        show('Offer added!');
    };

    const toggleActive = (id: string) => {
        const updated = offers.map(o => o.id === id ? { ...o, active: !o.active } : o);
        AdminStore.saveOffers(updated);
        setOffers(updated);
        show('Offer updated!');
    };

    const handleDelete = (id: string) => {
        const updated = offers.filter(o => o.id !== id);
        AdminStore.saveOffers(updated);
        setOffers(updated);
        show('Offer deleted', 'error');
    };

    const TYPE_COLORS: Record<string, { color: string; icon: string; label: string }> = {
        coupon: { color: '#8b5cf6', icon: '🎟️', label: 'Coupon Code' },
        banner: { color: '#3b82f6', icon: '🖼️', label: 'Banner Offer' },
        festival: { color: '#FF6B6B', icon: '🎊', label: 'Festival Sale' },
    };

    const inputStyle = { width: '100%', background: bg, border: `1px solid ${border}`, borderRadius: '10px', padding: '10px 14px', color: text, fontFamily: "'Nunito', sans-serif", fontSize: '14px', outline: 'none' };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>Manage discounts, coupons, and festival offers</p>
                <button onClick={() => setAdding(true)} style={{ background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', border: 'none', borderRadius: '12px', padding: '10px 20px', color: 'white', fontWeight: 800, fontSize: '14px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
                    + Create Offer
                </button>
            </div>

            {/* Add modal */}
            {adding && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <div style={{ background: card, borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                        <h3 style={{ fontWeight: 800, color: text, marginBottom: '24px' }}>🎉 Create New Offer</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div>
                                <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Offer Title</label>
                                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Holi Special - 40% OFF" style={inputStyle} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Type</label>
                                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as AdminOffer['type'] })} style={{ ...inputStyle, cursor: 'pointer' }}>
                                        <option value="coupon">🎟️ Coupon</option>
                                        <option value="banner">🖼️ Banner</option>
                                        <option value="festival">🎊 Festival</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Discount %</label>
                                    <input type="number" value={form.discount} onChange={e => setForm({ ...form, discount: +e.target.value })} min="1" max="99" style={inputStyle} />
                                </div>
                            </div>
                            {form.type === 'coupon' && (
                                <div>
                                    <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Coupon Code</label>
                                    <input value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="e.g. HOLI30" style={{ ...inputStyle, textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1px' }} />
                                </div>
                            )}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Start Date</label>
                                    <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} style={inputStyle} />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>End Date</label>
                                    <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} style={inputStyle} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                <button onClick={() => setAdding(false)} style={{ flex: 1, background: 'none', border: `2px solid ${border}`, borderRadius: '12px', padding: '12px', color: '#94a3b8', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>Cancel</button>
                                <button onClick={handleAdd} style={{ flex: 2, background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', border: 'none', borderRadius: '12px', padding: '12px', color: 'white', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>Create Offer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Offers grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {offers.map(offer => {
                    const cfg = TYPE_COLORS[offer.type];
                    return (
                        <div key={offer.id} style={{ background: card, borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', opacity: offer.active ? 1 : 0.6, transition: 'all 0.3s', position: 'relative', overflow: 'hidden', border: `2px solid ${offer.active ? cfg.color + '44' : border}` }}>
                            <div style={{ position: 'absolute', top: '-24px', right: '-24px', width: '100px', height: '100px', background: `${cfg.color}11`, borderRadius: '50%' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <span style={{ background: `${cfg.color}22`, color: cfg.color, borderRadius: '50px', padding: '4px 12px', fontSize: '12px', fontWeight: 800 }}>{cfg.icon} {cfg.label}</span>
                                <button onClick={() => handleDelete(offer.id)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                            </div>
                            <h3 style={{ fontWeight: 800, color: text, fontSize: '17px', marginBottom: '8px' }}>{offer.title}</h3>
                            <div style={{ fontSize: '36px', fontWeight: 900, color: cfg.color, fontFamily: "'Baloo 2', sans-serif", marginBottom: '12px' }}>{offer.discount}% OFF</div>
                            {offer.code && (
                                <div style={{ background: bg, borderRadius: '10px', padding: '10px 14px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: 900, color: text, fontSize: '16px', letterSpacing: '2px' }}>{offer.code}</span>
                                    <button onClick={() => navigator.clipboard.writeText(offer.code || '')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>📋</button>
                                </div>
                            )}
                            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px', fontWeight: 600 }}>
                                📅 {offer.startDate} → {offer.endDate}
                            </div>
                            <button onClick={() => toggleActive(offer.id)} style={{
                                width: '100%', border: 'none', borderRadius: '10px', padding: '10px',
                                background: offer.active ? '#22c55e22' : '#94a3b822',
                                color: offer.active ? '#22c55e' : '#94a3b8',
                                fontWeight: 800, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif",
                            }}>{offer.active ? '✅ Active — Click to Pause' : '⏸️ Paused — Click to Activate'}</button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default function OffersAdminPage() {
    return <AdminShell><OffersContent /></AdminShell>;
}
