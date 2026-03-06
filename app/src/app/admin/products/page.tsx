'use client';
import { useState, useEffect, useRef } from 'react';
import AdminShell, { useDark, useToast } from '@/components/admin/AdminShell';
import { AdminStore, AdminProduct } from '@/lib/adminStore';

const CATEGORIES = ['Educational Toys', 'Musical Toys', 'Remote Control Toys', 'Baby Toys', 'Outdoor Toys'];
const AGE_GROUPS = ['0-2 years', '2-8 years', '3-6 years', '3-10 years', '4-10 years', '4-12 years', '5-12 years', '6-12 years', '10+ years'];
const BADGES = ['Best Seller', 'Hot Selling', 'Trending', 'New Arrival'];

const EMPTY_FORM = {
    name: '', category: CATEGORIES[0], price: 0, originalPrice: 0, stock: 0,
    status: 'active' as const, description: '', image: '', tags: [] as string[],
    badge: BADGES[0], ageGroup: AGE_GROUPS[0], rating: 4.5, reviews: 0,
};

function ProductModal({ product, onSave, onClose }: {
    product?: AdminProduct; onSave: (p: Omit<AdminProduct, 'id' | 'createdAt'>) => void; onClose: () => void;
}) {
    const dark = useDark();
    const card = dark ? '#1e1e35' : '#ffffff';
    const text = dark ? '#e2e8f0' : '#1e293b';
    const bg = dark ? '#12122a' : '#f8fafc';
    const border = dark ? 'rgba(255,255,255,0.1)' : '#e2e8f0';
    const [form, setForm] = useState<Omit<AdminProduct, 'id' | 'createdAt'>>(product ? {
        name: product.name, category: product.category, price: product.price,
        originalPrice: product.originalPrice, stock: product.stock, status: product.status,
        description: product.description, image: product.image, tags: product.tags,
        badge: product.badge, ageGroup: product.ageGroup, rating: product.rating, reviews: product.reviews,
    } : EMPTY_FORM);
    const [tagInput, setTagInput] = useState('');

    const inputStyle = { width: '100%', background: bg, border: `1px solid ${border}`, borderRadius: '10px', padding: '10px 14px', color: text, fontFamily: "'Nunito', sans-serif", fontSize: '14px', outline: 'none' };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ background: card, borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontWeight: 800, color: text, fontSize: '20px' }}>{product ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ gridColumn: '1/-1' }}>
                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Product Name *</label>
                        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. RC Monster Truck" style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Category</label>
                        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Age Group</label>
                        <select value={form.ageGroup} onChange={e => setForm({ ...form, ageGroup: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                            {AGE_GROUPS.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Sale Price (₹) *</label>
                        <input type="number" value={form.price || ''} onChange={e => setForm({ ...form, price: +e.target.value })} placeholder="999" style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Original Price (₹)</label>
                        <input type="number" value={form.originalPrice || ''} onChange={e => setForm({ ...form, originalPrice: +e.target.value })} placeholder="1499" style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Stock Quantity</label>
                        <input type="number" value={form.stock || ''} onChange={e => setForm({ ...form, stock: +e.target.value })} placeholder="50" style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Badge</label>
                        <select value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                            {BADGES.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Status</label>
                        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as AdminProduct['status'] })} style={{ ...inputStyle, cursor: 'pointer' }}>
                            <option value="active">✅ Active</option>
                            <option value="draft">📝 Draft</option>
                            <option value="out_of_stock">❌ Out of Stock</option>
                        </select>
                    </div>
                    <div style={{ gridColumn: '1/-1' }}>
                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Image URL</label>
                        <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://images.unsplash.com/..." style={inputStyle} />
                        {form.image && <img src={form.image} alt="Preview" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px', marginTop: '8px' }} onError={e => (e.currentTarget as HTMLImageElement).style.display = 'none'} />}
                    </div>
                    <div style={{ gridColumn: '1/-1' }}>
                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Description</label>
                        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                            placeholder="Describe the product..." style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <div style={{ gridColumn: '1/-1' }}>
                        <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Tags / Features</label>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                            {form.tags.map(t => (
                                <span key={t} style={{ background: '#FF6B6B22', color: '#FF6B6B', borderRadius: '50px', padding: '4px 12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    {t} <button onClick={() => setForm({ ...form, tags: form.tags.filter(x => x !== t) })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF6B6B', fontSize: '14px', lineHeight: 1 }}>×</button>
                                </span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && tagInput.trim()) { setForm({ ...form, tags: [...form.tags, tagInput.trim()] }); setTagInput(''); } }}
                                placeholder="Type a tag and press Enter" style={{ ...inputStyle, flex: 1 }} />
                            <button onClick={() => { if (tagInput.trim()) { setForm({ ...form, tags: [...form.tags, tagInput.trim()] }); setTagInput(''); } }}
                                style={{ background: '#FF6B6B', border: 'none', borderRadius: '10px', padding: '10px 16px', color: 'white', cursor: 'pointer', fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>Add</button>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button onClick={onClose} style={{ flex: 1, background: 'none', border: `2px solid ${border}`, borderRadius: '12px', padding: '12px', color: '#94a3b8', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>Cancel</button>
                    <button onClick={() => { if (form.name && form.price > 0) onSave(form); }}
                        style={{ flex: 2, background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', border: 'none', borderRadius: '12px', padding: '12px', color: 'white', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", fontSize: '15px' }}>
                        {product ? '💾 Save Changes' : '➕ Add Product'}
                    </button>
                </div>
            </div>
        </div>
    );
}

const STATUS_COLORS: Record<string, string> = { active: '#22c55e', draft: '#f59e0b', out_of_stock: '#FF6B6B' };

function ProductsContent() {
    const dark = useDark();
    const { show } = useToast();
    const card = dark ? '#1e1e35' : '#ffffff';
    const text = dark ? '#e2e8f0' : '#1e293b';
    const border = dark ? '#2d2d4e' : '#f1f5f9';
    const bg = dark ? '#12122a' : '#f8fafc';

    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('All');
    const [modal, setModal] = useState<{ open: boolean; product?: AdminProduct }>({ open: false });

    useEffect(() => { setProducts(AdminStore.getProducts()); }, []);

    const refresh = () => setProducts(AdminStore.getProducts());

    const handleSave = (form: Omit<AdminProduct, 'id' | 'createdAt'>) => {
        if (modal.product) {
            AdminStore.updateProduct(modal.product.id, form);
            show('Product updated successfully!');
        } else {
            AdminStore.addProduct(form);
            show('Product added successfully!');
        }
        refresh();
        setModal({ open: false });
    };

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Delete "${name}"?`)) {
            AdminStore.deleteProduct(id);
            refresh();
            show(`"${name}" deleted`, 'error');
        }
    };

    const filtered = products
        .filter(p => catFilter === 'All' || p.category === catFilter)
        .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            {modal.open && <ProductModal product={modal.product} onSave={handleSave} onClose={() => setModal({ open: false })} />}

            {/* Header bar */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', background: card, borderRadius: '12px', border: `1px solid ${border}`, overflow: 'hidden' }}>
                    <span style={{ padding: '0 14px', fontSize: '16px', display: 'flex', alignItems: 'center', color: '#94a3b8' }}>🔍</span>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
                        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', padding: '10px 0', color: text, fontFamily: "'Nunito', sans-serif", fontSize: '14px' }} />
                </div>
                <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ background: card, border: `1px solid ${border}`, borderRadius: '12px', padding: '10px 14px', color: text, fontFamily: "'Nunito', sans-serif", fontSize: '14px', cursor: 'pointer' }}>
                    <option value="All">All Categories</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button onClick={() => setModal({ open: true })} style={{
                    background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', border: 'none', borderRadius: '12px',
                    padding: '10px 20px', color: 'white', fontWeight: 800, fontSize: '14px', cursor: 'pointer',
                    fontFamily: "'Nunito', sans-serif", boxShadow: '0 4px 12px rgba(255,107,107,0.3)',
                    display: 'flex', alignItems: 'center', gap: '6px',
                }}>+ Add Product</button>
            </div>

            {/* Table */}
            <div style={{ background: card, borderRadius: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '680px' }}>
                        <thead>
                            <tr style={{ background: bg }}>
                                {['Image', 'Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(h => (
                                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((p, i) => (
                                <tr key={p.id} style={{ borderTop: `1px solid ${border}`, transition: 'background 0.15s' }}
                                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = dark ? '#252545' : '#f9fafb'}
                                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                                >
                                    <td style={{ padding: '12px 16px' }}>
                                        <img src={p.image} alt={p.name} style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }} />
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ fontWeight: 700, color: text, fontSize: '14px', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{p.badge}</div>
                                    </td>
                                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{p.category}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ fontWeight: 800, color: '#FF6B6B', fontSize: '15px' }}>₹{p.price}</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', textDecoration: 'line-through' }}>₹{p.originalPrice}</div>
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{ fontWeight: 800, color: p.stock < 5 ? '#FF6B6B' : p.stock < 10 ? '#f59e0b' : '#22c55e', fontSize: '14px' }}>{p.stock}</span>
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{ background: `${STATUS_COLORS[p.status]}22`, color: STATUS_COLORS[p.status], borderRadius: '50px', padding: '3px 10px', fontSize: '11px', fontWeight: 800, textTransform: 'capitalize' }}>{p.status.replace('_', ' ')}</span>
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button onClick={() => setModal({ open: true, product: p })} style={{ background: '#3b82f622', border: 'none', borderRadius: '8px', padding: '6px 12px', color: '#3b82f6', fontWeight: 700, cursor: 'pointer', fontSize: '12px', fontFamily: "'Nunito', sans-serif" }}>✏️ Edit</button>
                                            <button onClick={() => handleDelete(p.id, p.name)} style={{ background: '#FF6B6B22', border: 'none', borderRadius: '8px', padding: '6px 12px', color: '#FF6B6B', fontWeight: 700, cursor: 'pointer', fontSize: '12px', fontFamily: "'Nunito', sans-serif" }}>🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
                        <div style={{ fontWeight: 700 }}>No products found</div>
                    </div>
                )}
                <div style={{ padding: '14px 20px', borderTop: `1px solid ${border}`, color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>
                    Showing {filtered.length} of {products.length} products
                </div>
            </div>
        </>
    );
}

export default function ProductsPage() {
    return <AdminShell><ProductsContent /></AdminShell>;
}
