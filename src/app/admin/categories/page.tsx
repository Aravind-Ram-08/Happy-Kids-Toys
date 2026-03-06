'use client';
import { useState, useEffect } from 'react';
import AdminShell, { useDark, useToast } from '@/components/admin/AdminShell';
import { AdminStore, AdminCategory } from '@/lib/adminStore';

const ICONS = ['📚', '🎵', '🎮', '🍼', '⚽', '🚀', '🎨', '🧩', '🏎️', '🎯', '🧸', '🌈'];
const COLORS = ['#4ECDC4', '#8b5cf6', '#FF6B6B', '#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#06b6d4'];

function CategoriesContent() {
    const dark = useDark();
    const { show } = useToast();
    const card = dark ? '#1e1e35' : '#ffffff';
    const text = dark ? '#e2e8f0' : '#1e293b';
    const border = dark ? '#2d2d4e' : '#e2e8f0';
    const bg = dark ? '#12122a' : '#f8fafc';

    const [categories, setCategories] = useState<AdminCategory[]>([]);
    const [adding, setAdding] = useState(false);
    const [form, setForm] = useState({ name: '', icon: ICONS[0], color: COLORS[0] });

    useEffect(() => { setCategories(AdminStore.getCategories()); }, []);

    const handleAdd = () => {
        if (!form.name.trim()) return;
        const newCat: AdminCategory = { id: Date.now().toString(), name: form.name, icon: form.icon, color: form.color, productCount: 0 };
        const updated = [...categories, newCat];
        AdminStore.saveCategories(updated);
        setCategories(updated);
        setForm({ name: '', icon: ICONS[0], color: COLORS[0] });
        setAdding(false);
        show('Category added!');
    };

    const handleDelete = (id: string) => {
        const updated = categories.filter(c => c.id !== id);
        AdminStore.saveCategories(updated);
        setCategories(updated);
        show('Category deleted', 'error');
    };

    const inputStyle = { width: '100%', background: bg, border: `1px solid ${border}`, borderRadius: '10px', padding: '10px 14px', color: text, fontFamily: "'Nunito', sans-serif", fontSize: '14px', outline: 'none' };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <p style={{ color: '#94a3b8', fontSize: '14px' }}>Manage your toy store categories</p>
                </div>
                <button onClick={() => setAdding(true)} style={{ background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', border: 'none', borderRadius: '12px', padding: '10px 20px', color: 'white', fontWeight: 800, fontSize: '14px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
                    + Add Category
                </button>
            </div>

            {/* Add modal */}
            {adding && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <div style={{ background: card, borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                        <h3 style={{ fontWeight: 800, color: text, marginBottom: '24px', fontSize: '20px' }}>➕ New Category</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Category Name</label>
                                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Puzzle Toys" style={inputStyle} />
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Icon</label>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {ICONS.map(i => (
                                        <button key={i} onClick={() => setForm({ ...form, icon: i })} style={{ width: '40px', height: '40px', border: `2px solid ${form.icon === i ? '#FF6B6B' : border}`, borderRadius: '10px', background: form.icon === i ? '#FF6B6B22' : bg, fontSize: '20px', cursor: 'pointer', transition: 'all 0.2s' }}>{i}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Color</label>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {COLORS.map(c => (
                                        <button key={c} onClick={() => setForm({ ...form, color: c })} style={{ width: '32px', height: '32px', background: c, borderRadius: '50%', border: `3px solid ${form.color === c ? text : 'transparent'}`, cursor: 'pointer', transition: 'border 0.2s' }} />
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                <button onClick={() => setAdding(false)} style={{ flex: 1, background: 'none', border: `2px solid ${border}`, borderRadius: '12px', padding: '12px', color: '#94a3b8', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>Cancel</button>
                                <button onClick={handleAdd} style={{ flex: 2, background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', border: 'none', borderRadius: '12px', padding: '12px', color: 'white', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>Add Category</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Category cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                {categories.map(cat => (
                    <div key={cat.id} style={{ background: card, borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', borderLeft: `4px solid ${cat.color}`, transition: 'transform 0.2s', position: 'relative' }}
                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'}
                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'none'}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ width: '56px', height: '56px', background: `${cat.color}22`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>{cat.icon}</div>
                            <button onClick={() => handleDelete(cat.id)} style={{ background: '#FF6B6B22', border: 'none', borderRadius: '8px', padding: '6px 8px', color: '#FF6B6B', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                        </div>
                        <h3 style={{ fontWeight: 800, color: text, fontSize: '17px', marginTop: '16px', marginBottom: '6px' }}>{cat.name}</h3>
                        <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>{cat.productCount} products</div>
                        <div style={{ marginTop: '12px', height: '4px', background: `${cat.color}33`, borderRadius: '50px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${Math.min(((cat.productCount || 0) / 10) * 100, 100)}%`, background: cat.color, borderRadius: '50px', transition: 'width 0.5s ease' }} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default function CategoriesAdminPage() {
    return <AdminShell><CategoriesContent /></AdminShell>;
}
