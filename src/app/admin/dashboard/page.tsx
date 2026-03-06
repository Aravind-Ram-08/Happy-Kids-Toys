'use client';
import { useState, useEffect } from 'react';
import AdminShell, { useDark } from '@/components/admin/AdminShell';
import { AdminStore, AdminProduct, AdminOrder } from '@/lib/adminStore';

function StatCard({ icon, label, value, sub, color, trend }: { icon: string; label: string; value: string | number; sub?: string; color: string; trend?: number }) {
    const dark = useDark();
    const card = dark ? '#1e1e35' : '#ffffff';
    const text = dark ? '#e2e8f0' : '#1e293b';
    const muted = dark ? '#94a3b8' : '#64748b';
    return (
        <div style={{ background: card, borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.14)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
        >
            <div style={{ position: 'absolute', top: '-16px', right: '-16px', width: '100px', height: '100px', background: `${color}18`, borderRadius: '50%' }} />
            <div style={{ width: '48px', height: '48px', background: `${color}22`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' }}>{icon}</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color, fontFamily: "'Baloo 2', sans-serif", lineHeight: 1, marginBottom: '6px' }}>{value}</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: text, marginBottom: '4px' }}>{label}</div>
            {sub && <div style={{ fontSize: '12px', color: muted }}>{sub}</div>}
            {trend !== undefined && (
                <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 700, color: trend >= 0 ? '#22c55e' : '#FF6B6B' }}>
                    {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last month
                </div>
            )}
        </div>
    );
}

function MiniBarChart({ data, color, label }: { data: number[]; color: string; label: string }) {
    const max = Math.max(...data);
    const dark = useDark();
    const card = dark ? '#1e1e35' : '#ffffff';
    const text = dark ? '#e2e8f0' : '#1e293b';
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
        <div style={{ background: card, borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontWeight: 800, color: text, marginBottom: '20px', fontSize: '16px' }}>{label}</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
                {data.map((v, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>{v}</div>
                        <div style={{ width: '100%', background: `${color}22`, borderRadius: '6px', height: `${(v / max) * 90}px`, position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: `linear-gradient(to top, ${color}, ${color}88)`, height: '100%', borderRadius: '6px', transition: 'height 0.5s ease' }} />
                        </div>
                        <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700 }}>{days[i]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RecentOrders({ orders }: { orders: AdminOrder[] }) {
    const dark = useDark();
    const card = dark ? '#1e1e35' : '#ffffff';
    const text = dark ? '#e2e8f0' : '#1e293b';
    const border = dark ? '#2d2d4e' : '#f1f5f9';
    const STATUS_COLORS: Record<string, string> = { pending: '#f59e0b', confirmed: '#3b82f6', shipped: '#8b5cf6', delivered: '#22c55e', cancelled: '#FF6B6B' };
    return (
        <div style={{ background: card, borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontWeight: 800, color: text, fontSize: '16px' }}>📦 Recent Orders</h3>
                <a href="/admin/orders" style={{ color: '#FF6B6B', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>View All →</a>
            </div>
            <div>
                {orders.slice(0, 6).map((o, i) => (
                    <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < 5 ? `1px solid ${border}` : 'none' }}>
                        <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #FF6B6B22, #ff8c4222)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🧸</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, color: text, fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.customerName}</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.productName}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontWeight: 800, color: '#FF6B6B', fontSize: '14px' }}>₹{o.price}</div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: STATUS_COLORS[o.status], background: `${STATUS_COLORS[o.status]}20`, padding: '2px 8px', borderRadius: '50px', marginTop: '2px', textTransform: 'capitalize' }}>{o.status}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function LowStock({ products }: { products: AdminProduct[] }) {
    const dark = useDark();
    const card = dark ? '#1e1e35' : '#ffffff';
    const text = dark ? '#e2e8f0' : '#1e293b';
    const low = products.filter(p => p.stock < 10).slice(0, 5);
    return (
        <div style={{ background: card, borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontWeight: 800, color: text, fontSize: '16px' }}>⚠️ Low Stock Alert</h3>
                <a href="/admin/products" style={{ color: '#FF6B6B', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>Manage →</a>
            </div>
            {low.length === 0 ? <p style={{ color: '#94a3b8', fontSize: '14px' }}>All products are well-stocked ✅</p> : low.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{p.category}</div>
                    </div>
                    <div style={{ background: p.stock < 5 ? '#FF6B6B' : '#f59e0b', color: 'white', borderRadius: '50px', padding: '2px 10px', fontSize: '12px', fontWeight: 800 }}>
                        {p.stock} left
                    </div>
                </div>
            ))}
        </div>
    );
}

function DashboardContent() {
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [orders, setOrders] = useState<AdminOrder[]>([]);
    useEffect(() => {
        setProducts(AdminStore.getProducts());
        setOrders(AdminStore.getOrders());
    }, []);

    const totalRevenue = orders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.price, 0);
    const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length;
    const salesData = [12, 19, 8, 24, 16, 31, 22];
    const ordersData = [5, 8, 3, 11, 7, 15, 9];

    return (
        <>
            {/* Welcome banner */}
            <div style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #ff8c42 50%, #FFD93D 100%)', borderRadius: '20px', padding: '24px 32px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', boxShadow: '0 8px 32px rgba(255,107,107,0.3)' }}>
                <div>
                    <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '24px', fontWeight: 900, color: 'white', marginBottom: '4px' }}>Good afternoon, Admin! 👋</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: 600 }}>Here's what's happening with your store today</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: '16px', padding: '16px 24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: 'white', fontFamily: "'Baloo 2', sans-serif" }}>{orders.filter(o => o.status === 'pending').length}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>Pending Orders</div>
                </div>
            </div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                <StatCard icon="🧸" label="Total Products" value={products.length} sub="Active in store" color="#FF6B6B" trend={8} />
                <StatCard icon="📦" label="Total Orders" value={orders.length} sub="All time" color="#8b5cf6" trend={15} />
                <StatCard icon="📅" label="Today's Orders" value={todayOrders} sub="Last updated now" color="#3b82f6" trend={12} />
                <StatCard icon="💰" label="Monthly Revenue" value={`₹${(totalRevenue / 1000).toFixed(1)}K`} sub="Delivered orders" color="#22c55e" trend={23} />
                <StatCard icon="⚠️" label="Low Stock" value={products.filter(p => p.stock < 10).length} sub="Need restocking" color="#f59e0b" />
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                <MiniBarChart data={salesData} color="#FF6B6B" label="📊 Weekly Sales (₹ hundreds)" />
                <MiniBarChart data={ordersData} color="#4ECDC4" label="📦 Weekly Orders" />
            </div>

            {/* Bottom row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <RecentOrders orders={orders} />
                <LowStock products={products} />
            </div>
        </>
    );
}

export default function DashboardPage() {
    return <AdminShell><DashboardContent /></AdminShell>;
}
