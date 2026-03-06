'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import products from '@/data/products.json';
import { Product } from '@/types';

const CATEGORIES = ['All', 'Educational Toys', 'Musical Toys', 'Remote Control Toys', 'Baby Toys', 'Outdoor Toys'];
const AGE_GROUPS = ['All Ages', '0-2 years', '2-8 years', '3-6 years', '3-10 years', '4-10 years', '4-12 years', '5-12 years', '6-12 years', '10+ years'];
const SORT_OPTIONS = [
    { value: 'popular', label: '⭐ Most Popular' },
    { value: 'price_asc', label: '💰 Price: Low to High' },
    { value: 'price_desc', label: '💎 Price: High to Low' },
    { value: 'rating', label: '🌟 Best Rated' },
];

function ShopContent() {
    const searchParams = useSearchParams();
    const [category, setCategory] = useState('All');
    const [ageGroup, setAgeGroup] = useState('All Ages');
    const [sort, setSort] = useState('popular');
    const [priceMax, setPriceMax] = useState(3500);
    const [searchQuery, setSearchQuery] = useState('');
    const [filtersOpen, setFiltersOpen] = useState(false);

    useEffect(() => {
        const q = searchParams.get('search');
        const cat = searchParams.get('cat');
        const badge = searchParams.get('badge');
        const s = searchParams.get('sort');
        if (q) setSearchQuery(q);
        if (cat) setCategory(cat);
        if (badge) { }
        if (s) setSort(s);
    }, [searchParams]);

    const filtered = (products as Product[])
        .filter(p => category === 'All' || p.category === category)
        .filter(p => ageGroup === 'All Ages' || p.ageGroup === ageGroup)
        .filter(p => p.price <= priceMax)
        .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sort === 'price_asc') return a.price - b.price;
            if (sort === 'price_desc') return b.price - a.price;
            if (sort === 'rating') return b.rating - a.rating;
            return b.reviews - a.reviews;
        });

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
            <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1a1a2e', marginBottom: '4px' }}>
                🛍️ All Toys
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>{filtered.length} products found</p>

            {/* Search */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', background: '#f3f4f6', borderRadius: '50px', overflow: 'hidden', border: '2px solid #e5e7eb' }}>
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search toys..." className="input"
                        style={{ flex: 1, background: 'transparent', border: 'none', borderRadius: 0 }} />
                    {searchQuery && <button onClick={() => setSearchQuery('')} style={{ padding: '0 16px', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '18px' }}>×</button>}
                </div>
                <select value={sort} onChange={e => setSort(e.target.value)} className="input" style={{ width: 'auto', borderRadius: '50px', fontWeight: 700, cursor: 'pointer' }}>
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <button onClick={() => setFiltersOpen(!filtersOpen)} style={{
                    background: filtersOpen ? '#FF6B6B' : 'white', color: filtersOpen ? 'white' : '#374151',
                    border: '2px solid #e5e7eb', borderRadius: '50px', padding: '10px 20px',
                    fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
                    transition: 'all 0.2s',
                }}>🔧 Filters</button>
            </div>

            {/* Filters panel */}
            {filtersOpen && (
                <div style={{ background: 'white', borderRadius: '20px', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', animation: 'fadeInUp 0.3s ease' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
                        {/* Category */}
                        <div>
                            <label style={{ fontWeight: 800, color: '#1a1a2e', display: 'block', marginBottom: '10px' }}>📂 Category</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {CATEGORIES.map(c => (
                                    <button key={c} onClick={() => setCategory(c)} style={{
                                        background: category === c ? '#FF6B6B' : '#f3f4f6',
                                        color: category === c ? 'white' : '#374151',
                                        border: 'none', borderRadius: '50px', padding: '6px 14px',
                                        fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                                        fontFamily: "'Nunito', sans-serif", transition: 'all 0.2s',
                                    }}>{c}</button>
                                ))}
                            </div>
                        </div>
                        {/* Age group */}
                        <div>
                            <label style={{ fontWeight: 800, color: '#1a1a2e', display: 'block', marginBottom: '10px' }}>🎂 Age Group</label>
                            <select value={ageGroup} onChange={e => setAgeGroup(e.target.value)} className="input" style={{ cursor: 'pointer' }}>
                                {AGE_GROUPS.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </div>
                        {/* Price range */}
                        <div>
                            <label style={{ fontWeight: 800, color: '#1a1a2e', display: 'block', marginBottom: '10px' }}>
                                💰 Max Price: ₹{priceMax}
                            </label>
                            <input type="range" min="200" max="3500" step="100" value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} style={{ width: '100%' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                                <span>₹200</span><span>₹3500</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => { setCategory('All'); setAgeGroup('All Ages'); setPriceMax(3500); setSearchQuery(''); }} style={{
                        marginTop: '16px', background: 'none', border: '2px solid #e5e7eb', borderRadius: '50px',
                        padding: '8px 20px', color: '#6b7280', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: "'Nunito', sans-serif",
                    }}>Reset Filters</button>
                </div>
            )}

            {/* Category pills */}
            <div className="horizontal-scroll" style={{ marginBottom: '24px' }}>
                {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setCategory(c)} style={{
                        background: category === c ? 'linear-gradient(135deg, #FF6B6B, #ff8c42)' : 'white',
                        color: category === c ? 'white' : '#374151',
                        border: category === c ? 'none' : '2px solid #e5e7eb',
                        borderRadius: '50px', padding: '8px 20px', fontSize: '13px', fontWeight: 700,
                        cursor: 'pointer', fontFamily: "'Nunito', sans-serif", transition: 'all 0.2s',
                        flexShrink: 0, whiteSpace: 'nowrap',
                        boxShadow: category === c ? '0 4px 12px rgba(255,107,107,0.35)' : 'none',
                    }}>{c}</button>
                ))}
            </div>

            {/* Products grid */}
            {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                    <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>No toys found</h2>
                    <p style={{ color: '#6b7280' }}>Try adjusting your filters or search term</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                    {filtered.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
            )}
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', fontSize: '24px' }}>Loading...</div>}>
            <ShopContent />
        </Suspense>
    );
}
