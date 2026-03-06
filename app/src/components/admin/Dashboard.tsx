'use client';
import { useState } from 'react';
import products from '@/data/products.json';
import { Product } from '@/types';

const allProducts = products as Product[];

function StatCard({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
    return (
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', transition: 'transform 0.2s' }}
            onMouseEnter={e => (e.currentTarget).style.transform = 'translateY(-4px)'}
            onMouseLeave={e => (e.currentTarget).style.transform = 'none'}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</div>
            <div style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 900, color }}>{value}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>{label}</div>
        </div>
    );
}

export default function Dashboard() {
    const totalRevenue = allProducts.reduce((sum, p) => sum + p.price, 0);
    const avgRating = (allProducts.reduce((sum, p) => sum + p.rating, 0) / allProducts.length).toFixed(1);
    const lowStock = 2;

    return (
        <div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1a1a2e', marginBottom: '24px' }}>
                📊 Dashboard Overview
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <StatCard icon="📦" value={String(allProducts.length)} label="Total Products" color="#FF6B6B" />
                <StatCard icon="💰" value={`₹${totalRevenue.toLocaleString()}`} label="Total Value" color="#22c55e" />
                <StatCard icon="⭐" value={avgRating} label="Avg Rating" color="#FFD93D" />
                <StatCard icon="⚠️" value={String(lowStock)} label="Low Stock Items" color="#f59e0b" />
                <StatCard icon="📋" value="24" label="Pending Orders" color="#8b5cf6" />
                <StatCard icon="👥" value="1,250" label="Total Customers" color="#4ECDC4" />
            </div>

            {/* Recent orders preview */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontWeight: 800, color: '#1a1a2e', marginBottom: '16px' }}>📋 Recent Orders</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                                {['Order ID', 'Customer', 'Items', 'Total', 'Status'].map(h => (
                                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#6b7280', fontSize: '12px', textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { id: '#1001', customer: 'Priya Sharma', items: 3, total: '₹2,547', status: 'Delivered', color: '#22c55e' },
                                { id: '#1002', customer: 'Rahul Mehta', items: 1, total: '₹1,299', status: 'Shipped', color: '#3b82f6' },
                                { id: '#1003', customer: 'Anitha K.', items: 2, total: '₹1,648', status: 'Processing', color: '#f59e0b' },
                                { id: '#1004', customer: 'Suresh P.', items: 4, total: '₹3,246', status: 'Pending', color: '#8b5cf6' },
                            ].map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td style={{ padding: '14px 16px', fontWeight: 700 }}>{order.id}</td>
                                    <td style={{ padding: '14px 16px' }}>{order.customer}</td>
                                    <td style={{ padding: '14px 16px' }}>{order.items}</td>
                                    <td style={{ padding: '14px 16px', fontWeight: 700 }}>{order.total}</td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <span style={{ background: `${order.color}20`, color: order.color, padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 700 }}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
