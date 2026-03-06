'use client';
import { useState, useEffect } from 'react';
import AdminShell, { useDark, useToast } from '@/components/admin/AdminShell';
import { AdminStore, AdminOrder } from '@/lib/adminStore';

const ALL_STATUSES: AdminOrder['status'][] = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: string }> = {
    pending: { color: '#f59e0b', bg: '#fef9c3', icon: '⏳' },
    confirmed: { color: '#3b82f6', bg: '#dbeafe', icon: '✅' },
    shipped: { color: '#8b5cf6', bg: '#ede9fe', icon: '🚚' },
    delivered: { color: '#22c55e', bg: '#dcfce7', icon: '🎉' },
    cancelled: { color: '#FF6B6B', bg: '#fff0f0', icon: '❌' },
};

function OrdersContent() {
    const dark = useDark();
    const { show } = useToast();
    const card = dark ? '#1e1e35' : '#ffffff';
    const text = dark ? '#e2e8f0' : '#1e293b';
    const border = dark ? '#2d2d4e' : '#f1f5f9';
    const bg = dark ? '#12122a' : '#f8fafc';

    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => { setOrders(AdminStore.getOrders()); }, []);

    const handleStatus = (id: string, status: AdminOrder['status']) => {
        AdminStore.updateOrderStatus(id, status);
        setOrders(AdminStore.getOrders());
        show(`Order status updated to ${status}!`);
    };

    const filtered = orders
        .filter(o => statusFilter === 'all' || o.status === statusFilter)
        .filter(o => !search || o.customerName.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()) || o.productName.toLowerCase().includes(search.toLowerCase()));

    const counts = ALL_STATUSES.reduce((acc, s) => ({ ...acc, [s]: orders.filter(o => o.status === s).length }), {} as Record<string, number>);

    return (
        <>
            {/* Status overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                {ALL_STATUSES.map(s => {
                    const cfg = STATUS_CONFIG[s];
                    return (
                        <button key={s} onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)} style={{
                            background: statusFilter === s ? cfg.color : card,
                            border: `2px solid ${statusFilter === s ? cfg.color : border}`,
                            borderRadius: '14px', padding: '14px', cursor: 'pointer',
                            textAlign: 'center', fontFamily: "'Nunito', sans-serif",
                            transition: 'all 0.2s',
                        }}>
                            <div style={{ fontSize: '22px', marginBottom: '4px' }}>{cfg.icon}</div>
                            <div style={{ fontSize: '20px', fontWeight: 900, color: statusFilter === s ? 'white' : cfg.color, fontFamily: "'Baloo 2', sans-serif" }}>{counts[s] || 0}</div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: statusFilter === s ? 'rgba(255,255,255,0.8)' : '#94a3b8', textTransform: 'capitalize' }}>{s}</div>
                        </button>
                    );
                })}
            </div>

            {/* Search bar */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', background: card, borderRadius: '12px', border: `1px solid ${border}`, overflow: 'hidden' }}>
                    <span style={{ padding: '0 14px', fontSize: '16px', display: 'flex', alignItems: 'center', color: '#94a3b8' }}>🔍</span>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID, customer, or product..."
                        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', padding: '10px 0', color: text, fontFamily: "'Nunito', sans-serif", fontSize: '14px' }} />
                </div>
            </div>

            {/* Table */}
            <div style={{ background: card, borderRadius: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ background: bg }}>
                                {['Order ID', 'Customer', 'Product', 'Price', 'Status', 'Delivery', 'Created', 'Change Status'].map(h => (
                                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((o) => {
                                const cfg = STATUS_CONFIG[o.status];
                                return (
                                    <tr key={o.id} style={{ borderTop: `1px solid ${border}`, transition: 'background 0.15s' }}
                                        onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = dark ? '#252545' : '#f9fafb'}
                                        onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                                    >
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{ fontWeight: 800, color: '#FF6B6B', fontSize: '13px' }}>{o.id}</span>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ fontWeight: 700, color: text, fontSize: '14px', whiteSpace: 'nowrap' }}>{o.customerName}</div>
                                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{o.phone}</div>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ fontWeight: 600, color: text, fontSize: '13px', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.productName}</div>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{ fontWeight: 800, color: '#FF6B6B', fontSize: '15px' }}>₹{o.price}</span>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{ background: cfg.bg, color: cfg.color, borderRadius: '50px', padding: '4px 12px', fontSize: '12px', fontWeight: 800, whiteSpace: 'nowrap' }}>
                                                {cfg.icon} {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 16px', fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{o.deliveryStatus}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                                            {new Date(o.createdAt).toLocaleDateString('en-IN')}
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <select value={o.status} onChange={e => handleStatus(o.id, e.target.value as AdminOrder['status'])}
                                                style={{ background: bg, border: `1px solid ${border}`, borderRadius: '8px', padding: '6px 10px', color: text, fontFamily: "'Nunito', sans-serif", fontSize: '12px', cursor: 'pointer' }}>
                                                {ALL_STATUSES.map(s => <option key={s} value={s}>{STATUS_CONFIG[s].icon} {s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                                            </select>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
                        <div style={{ fontWeight: 700 }}>No orders found</div>
                    </div>
                )}
                <div style={{ padding: '14px 20px', borderTop: `1px solid ${border}`, color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>
                    Showing {filtered.length} of {orders.length} orders
                </div>
            </div>
        </>
    );
}

export default function OrdersPage() {
    return <AdminShell><OrdersContent /></AdminShell>;
}
