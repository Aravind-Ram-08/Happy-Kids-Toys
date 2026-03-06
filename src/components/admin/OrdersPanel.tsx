'use client';
import { useState } from 'react';

const MOCK_ORDERS = [
    { id: '#1001', customer: 'Priya Sharma', phone: '+91 98765 11111', items: ['Super Learning Laptop', 'STEM Building Blocks'], total: 1898, date: '2026-03-06', status: 'Delivered' },
    { id: '#1002', customer: 'Rahul Mehta', phone: '+91 98765 22222', items: ['RC Monster Truck'], total: 1299, date: '2026-03-05', status: 'Shipped' },
    { id: '#1003', customer: 'Anitha Krishnan', phone: '+91 98765 33333', items: ['Baby Sensory Play Mat', 'Soft Bunny Plush Set'], total: 1098, date: '2026-03-05', status: 'Processing' },
    { id: '#1004', customer: 'Suresh Patel', phone: '+91 98765 44444', items: ['Flying Drone Camera', 'RC Monster Truck', 'Garden Explorer Kit'], total: 4447, date: '2026-03-04', status: 'Delivered' },
    { id: '#1005', customer: 'Lakshmi R.', phone: '+91 98765 55555', items: ['Rainbow Piano Keyboard'], total: 749, date: '2026-03-04', status: 'Pending' },
];

const STATUS_COLORS: Record<string, string> = {
    Delivered: '#22c55e', Shipped: '#3b82f6', Processing: '#f59e0b', Pending: '#8b5cf6', Cancelled: '#dc2626',
};

export default function OrdersPanel() {
    const [filter, setFilter] = useState('All');
    const filtered = filter === 'All' ? MOCK_ORDERS : MOCK_ORDERS.filter(o => o.status === filter);

    return (
        <div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1a1a2e', marginBottom: '20px' }}>
                📋 Order Management
            </h2>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(s => (
                    <button key={s} onClick={() => setFilter(s)} style={{
                        background: filter === s ? '#FF6B6B' : '#f3f4f6',
                        color: filter === s ? 'white' : '#374151',
                        border: 'none', borderRadius: '50px', padding: '8px 18px',
                        fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                        fontFamily: "'Nunito', sans-serif",
                    }}>{s}</button>
                ))}
            </div>

            {/* Orders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filtered.map(order => (
                    <div key={order.id} style={{
                        background: 'white', borderRadius: '20px', padding: '20px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex',
                        alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap',
                    }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <span style={{ fontWeight: 800, color: '#1a1a2e', fontSize: '16px' }}>{order.id}</span>
                                <span style={{
                                    background: `${STATUS_COLORS[order.status]}20`, color: STATUS_COLORS[order.status],
                                    padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 800,
                                }}>{order.status}</span>
                            </div>
                            <div style={{ fontSize: '14px', color: '#374151', fontWeight: 600, marginBottom: '4px' }}>
                                👤 {order.customer} • 📞 {order.phone}
                            </div>
                            <div style={{ fontSize: '13px', color: '#6b7280' }}>
                                📦 {order.items.join(', ')}
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 900, fontSize: '18px', color: '#FF6B6B' }}>₹{order.total.toLocaleString()}</div>
                            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>📅 {order.date}</div>
                            <select defaultValue={order.status} style={{
                                marginTop: '8px', padding: '6px 12px', borderRadius: '8px',
                                border: '2px solid #e5e7eb', fontSize: '12px', fontWeight: 700,
                                cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
                            }}>
                                <option>Pending</option>
                                <option>Processing</option>
                                <option>Shipped</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
