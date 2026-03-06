'use client';
import { useState } from 'react';
import products from '@/data/products.json';
import { Product } from '@/types';
import Modal from '@/components/ui/Modal';

export default function ProductManager() {
    const [allProducts] = useState<Product[]>(products as Product[]);
    const [search, setSearch] = useState('');
    const [editProduct, setEditProduct] = useState<Product | null>(null);

    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1a1a2e' }}>
                    📦 Manage Products ({allProducts.length})
                </h2>
                <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
                    ➕ Add Product
                </button>
            </div>

            {/* Search */}
            <div style={{ marginBottom: '20px' }}>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search products..." className="input" style={{ maxWidth: '400px' }} />
            </div>

            {/* Products table */}
            <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '2px solid #f3f4f6' }}>
                                {['', 'Product', 'Category', 'Price', 'Rating', 'Status', 'Actions'].map(h => (
                                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 700, color: '#6b7280', fontSize: '12px', textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.15s' }}
                                    onMouseEnter={e => (e.currentTarget).style.background = '#fafafa'}
                                    onMouseLeave={e => (e.currentTarget).style.background = 'transparent'}>
                                    <td style={{ padding: '12px 16px' }}>
                                        <img src={p.image} alt="" style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }} />
                                    </td>
                                    <td style={{ padding: '12px 16px', fontWeight: 700, maxWidth: '200px' }}>
                                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                                    </td>
                                    <td style={{ padding: '12px 16px', color: '#6b7280' }}>{p.category}</td>
                                    <td style={{ padding: '12px 16px', fontWeight: 800, color: '#FF6B6B' }}>₹{p.price}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{ color: '#FFD93D' }}>★</span> {p.rating}
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{
                                            background: p.inStock ? '#dcfce7' : '#fee2e2',
                                            color: p.inStock ? '#16a34a' : '#dc2626',
                                            padding: '4px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 700,
                                        }}>{p.inStock ? 'In Stock' : 'Out'}</span>
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button onClick={() => setEditProduct(p)} style={{
                                                background: '#eff6ff', border: 'none', borderRadius: '8px',
                                                padding: '6px 12px', fontSize: '12px', fontWeight: 700,
                                                color: '#2563eb', cursor: 'pointer',
                                            }}>✏️ Edit</button>
                                            <button style={{
                                                background: '#fee2e2', border: 'none', borderRadius: '8px',
                                                padding: '6px 12px', fontSize: '12px', fontWeight: 700,
                                                color: '#dc2626', cursor: 'pointer',
                                            }}>🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal isOpen={!!editProduct} onClose={() => setEditProduct(null)} title="Edit Product">
                {editProduct && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                            <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '4px' }}>Name</label>
                            <input defaultValue={editProduct.name} className="input" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '4px' }}>Price</label>
                                <input type="number" defaultValue={editProduct.price} className="input" />
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '4px' }}>Original Price</label>
                                <input type="number" defaultValue={editProduct.originalPrice} className="input" />
                            </div>
                        </div>
                        <div>
                            <label style={{ fontWeight: 700, fontSize: '13px', color: '#374151', display: 'block', marginBottom: '4px' }}>Category</label>
                            <input defaultValue={editProduct.category} className="input" />
                        </div>
                        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                            onClick={() => setEditProduct(null)}>
                            💾 Save Changes
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}
