'use client';
import { useEffect, useState } from 'react';
import AdminShell, { useDark } from '@/components/admin/AdminShell';
import { AdminStore, AdminOrder } from '@/lib/adminStore';

function CustomersContent() {
    const dark = useDark();
    const card = dark ? '#1e1e35' : '#ffffff';
    const text = dark ? '#e2e8f0' : '#1e293b';
    const border = dark ? '#2d2d4e' : '#f1f5f9';
    const bg = dark ? '#12122a' : '#f8fafc';

    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => { setOrders(AdminStore.getOrders()); }, []);

    // Aggregate customers from orders
    const customerMap = orders.reduce((acc, o) => {
        if (!acc[o.customerName]) {
            acc[o.customerName] = { name: o.customerName, phone: o.phone, orders: 0, spent: 0, lastOrder: o.createdAt };
        }
        acc[o.customerName].orders++;
        acc[o.customerName].spent += o.price;
        if (o.createdAt > acc[o.customerName].lastOrder) acc[o.customerName].lastOrder = o.createdAt;
        return acc;
    }, {} as Record<string, { name: string; phone: string; orders: number; spent: number; lastOrder: string }>);

    const customers = Object.values(customerMap)
        .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search))
        .sort((a, b) => b.spent - a.spent);

    const totalCustomers = customers.length;
    const totalRevenue = customers.reduce((s, c) => s + c.spent, 0);
    const avgOrderValue = orders.length ? Math.round(orders.reduce((s, o) => s + o.price, 0) / orders.length) : 0;

    return (
        <>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {[
                    { icon: '👥', label: 'Total Customers', value: totalCustomers, color: '#FF6B6B' },
                    { icon: '💰', label: 'Total Revenue', value: `₹${(totalRevenue / 1000).toFixed(1)}K`, color: '#22c55e' },
                    { icon: '🛍️', label: 'Avg Order Value', value: `₹${avgOrderValue}`, color: '#8b5cf6' },
                    { icon: '⭐', label: 'Repeat Buyers', value: customers.filter(c => c.orders > 1).length, color: '#f59e0b' },
                ].map(s => (
                    <div key={s.label} style={{ background: card, borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
                        <div style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '24px', fontWeight: 900, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div style={{ display: 'flex', background: card, borderRadius: '12px', border: `1px solid ${border}`, overflow: 'hidden', marginBottom: '20px', maxWidth: '400px' }}>
                <span style={{ padding: '0 14px', display: 'flex', alignItems: 'center', color: '#94a3b8', fontSize: '16px' }}>🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..."
                    style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', padding: '10px 0', color: text, fontFamily: "'Nunito', sans-serif", fontSize: '14px' }} />
            </div>

            {/* Table */}
            <div style={{ background: card, borderRadius: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
                        <thead>
                            <tr style={{ background: bg }}>
                                {['Customer', 'Phone', 'Orders', 'Total Spent', 'Last Order', 'Action'].map(h => (
                                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((c, i) => (
                                <tr key={c.name} style={{ borderTop: `1px solid ${border}`, transition: 'background 0.15s' }}
                                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = dark ? '#252545' : '#f9fafb'}
                                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                                >
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '36px', height: '36px', background: `hsl(${(i * 67) % 360}, 70%, 60%)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '14px', flexShrink: 0 }}>
                                                {c.name[0]}
                                            </div>
                                            <div style={{ fontWeight: 700, color: text, fontSize: '14px' }}>{c.name}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#94a3b8' }}>{c.phone}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{ background: '#FF6B6B22', color: '#FF6B6B', borderRadius: '50px', padding: '3px 12px', fontSize: '13px', fontWeight: 800 }}>{c.orders}</span>
                                    </td>
                                    <td style={{ padding: '12px 16px', fontWeight: 800, color: '#22c55e', fontSize: '15px' }}>₹{c.spent.toLocaleString('en-IN')}</td>
                                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#94a3b8' }}>{new Date(c.lastOrder).toLocaleDateString('en-IN')}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <a href={`https://wa.me/${c.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ background: '#22c55e22', color: '#22c55e', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>💬 WhatsApp</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default function CustomersPage() {
    return <AdminShell><CustomersContent /></AdminShell>;
}
