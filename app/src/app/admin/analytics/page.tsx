'use client';
import { useState, useEffect } from 'react';
import AdminShell, { useDark } from '@/components/admin/AdminShell';
import { AdminStore, AdminProduct, AdminOrder } from '@/lib/adminStore';

function AnalyticsContent() {
    const dark = useDark();
    const card = dark ? '#1e1e35' : '#ffffff';
    const text = dark ? '#e2e8f0' : '#1e293b';
    const border = dark ? '#2d2d4e' : '#f1f5f9';
    const bg = dark ? '#12122a' : '#f8fafc';

    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [orders, setOrders] = useState<AdminOrder[]>([]);
    useEffect(() => { setProducts(AdminStore.getProducts()); setOrders(AdminStore.getOrders()); }, []);

    // Top selling (by reviews as proxy)
    const topSelling = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);

    // Orders by status
    const statusCounts = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(s => ({
        status: s, count: orders.filter(o => o.status === s).length,
        color: s === 'delivered' ? '#22c55e' : s === 'pending' ? '#f59e0b' : s === 'cancelled' ? '#FF6B6B' : s === 'shipped' ? '#8b5cf6' : '#3b82f6',
    }));

    // Fake weekly traffic
    const trafficData = [120, 189, 98, 243, 167, 312, 221];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxTraffic = Math.max(...trafficData);

    // Revenue by category
    const catRevenue = products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + (p.price * Math.floor(Math.random() * 10 + 1));
        return acc;
    }, {} as Record<string, number>);
    const maxRev = Math.max(...Object.values(catRevenue));

    return (
        <>
            {/* KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {[
                    { icon: '💰', label: 'Total Revenue', value: `₹${(orders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.price, 0) / 1000).toFixed(1)}K`, color: '#22c55e' },
                    { icon: '📦', label: 'Total Orders', value: orders.length, color: '#3b82f6' },
                    { icon: '🔄', label: 'Avg Order Value', value: `₹${orders.length ? Math.round(orders.reduce((s, o) => s + o.price, 0) / orders.length) : 0}`, color: '#8b5cf6' },
                    { icon: '👥', label: 'Unique Customers', value: new Set(orders.map(o => o.customerName)).size, color: '#FF6B6B' },
                ].map(kpi => (
                    <div key={kpi.label} style={{ background: card, borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                        <div style={{ fontSize: '24px', marginBottom: '10px' }}>{kpi.icon}</div>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: kpi.color, fontFamily: "'Baloo 2', sans-serif" }}>{kpi.value}</div>
                        <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>{kpi.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                {/* Traffic chart */}
                <div style={{ background: card, borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                    <h3 style={{ fontWeight: 800, color: text, marginBottom: '20px', fontSize: '16px' }}>📈 Daily Traffic (This Week)</h3>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '140px' }}>
                        {trafficData.map((v, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>{v}</div>
                                <div style={{ width: '100%', height: `${(v / maxTraffic) * 110}px`, background: `linear-gradient(to top, #4ECDC4, #4ECDC488)`, borderRadius: '6px', transition: 'height 0.5s' }} />
                                <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700 }}>{days[i]}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Orders by status */}
                <div style={{ background: card, borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                    <h3 style={{ fontWeight: 800, color: text, marginBottom: '20px', fontSize: '16px' }}>📊 Orders by Status</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {statusCounts.map(({ status, count, color }) => (
                            <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '80px', fontSize: '13px', fontWeight: 700, color, textTransform: 'capitalize' }}>{status}</div>
                                <div style={{ flex: 1, height: '8px', background: `${color}22`, borderRadius: '50px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${orders.length ? (count / orders.length) * 100 : 0}%`, background: `linear-gradient(to right, ${color}, ${color}88)`, borderRadius: '50px', transition: 'width 0.5s' }} />
                                </div>
                                <span style={{ fontSize: '13px', fontWeight: 800, color, minWidth: '28px', textAlign: 'right' }}>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {/* Top selling */}
                <div style={{ background: card, borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                    <h3 style={{ fontWeight: 800, color: text, marginBottom: '20px', fontSize: '16px' }}>🏆 Top Selling Toys</h3>
                    {topSelling.map((p, i) => (
                        <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 4 ? `1px solid ${border}` : 'none' }}>
                            <div style={{ width: '28px', height: '28px', background: i === 0 ? '#FFD93D' : i === 1 ? '#e5e7eb' : i === 2 ? '#CD7F32' : bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: i < 3 ? '#1a1a2e' : '#94a3b8', flexShrink: 0 }}>{i + 1}</div>
                            <img src={p.image} alt={p.name} style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 700, color: text, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{p.reviews} reviews</div>
                            </div>
                            <div style={{ fontWeight: 800, color: '#FF6B6B', fontSize: '14px', flexShrink: 0 }}>₹{p.price}</div>
                        </div>
                    ))}
                </div>

                {/* Revenue by category */}
                <div style={{ background: card, borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                    <h3 style={{ fontWeight: 800, color: text, marginBottom: '20px', fontSize: '16px' }}>💰 Revenue by Category</h3>
                    {Object.entries(catRevenue).sort(([, a], [, b]) => b - a).map(([cat, rev]) => (
                        <div key={cat} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontSize: '13px', fontWeight: 700, color: text }}>{cat}</span>
                                <span style={{ fontSize: '13px', fontWeight: 800, color: '#22c55e' }}>₹{rev.toLocaleString('en-IN')}</span>
                            </div>
                            <div style={{ height: '8px', background: '#22c55e22', borderRadius: '50px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${(rev / maxRev) * 100}%`, background: 'linear-gradient(to right, #22c55e, #4ECDC4)', borderRadius: '50px' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default function AnalyticsPage() {
    return <AdminShell><AnalyticsContent /></AdminShell>;
}
