'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import products from '@/data/products.json';
import { Product } from '@/types';

const categories = [
    { name: 'Educational Toys', icon: '📚', color: '#4ECDC4', bg: 'linear-gradient(135deg, #e0faf8, #b8f2ee)', description: 'Fun learning toys that develop cognitive skills', count: 3 },
    { name: 'Musical Toys', icon: '🎵', color: '#8b5cf6', bg: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)', description: 'Instruments and musical toys to spark creativity', count: 3 },
    { name: 'Remote Control Toys', icon: '🎮', color: '#FF6B6B', bg: 'linear-gradient(135deg, #fff0f0, #ffd5d5)', description: 'RC cars, drones & trucks for thrilling adventures', count: 2 },
    { name: 'Baby Toys', icon: '🍼', color: '#f59e0b', bg: 'linear-gradient(135deg, #fef9c3, #fef08a)', description: 'Safe & gentle toys designed for babies', count: 2 },
    { name: 'Outdoor Toys', icon: '⚽', color: '#22c55e', bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', description: 'Active outdoor play for healthy growing kids', count: 2 },
];

function CategoriesContent() {
    const searchParams = useSearchParams();
    const initialCat = searchParams.get('cat') || '';
    const [selectedCat, setSelectedCat] = useState(initialCat);

    const catProducts = selectedCat
        ? (products as Product[]).filter(p => p.category === selectedCat)
        : [];

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
            <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '32px', fontWeight: 900, color: '#1a1a2e', marginBottom: '8px' }}>
                📂 Toy Categories
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '32px' }}>Discover the perfect toy for every child</p>

            {/* Category cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {categories.map(cat => (
                    <button key={cat.name} onClick={() => setSelectedCat(selectedCat === cat.name ? '' : cat.name)} style={{
                        background: cat.bg, borderRadius: '20px', padding: '28px 24px',
                        cursor: 'pointer', border: `3px solid ${selectedCat === cat.name ? cat.color : 'transparent'}`,
                        textAlign: 'left', transition: 'all 0.3s', fontFamily: "'Nunito', sans-serif",
                        boxShadow: selectedCat === cat.name ? `0 8px 24px ${cat.color}44` : '0 4px 12px rgba(0,0,0,0.06)',
                        transform: selectedCat === cat.name ? 'translateY(-4px)' : 'none',
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{cat.icon}</div>
                        <div style={{ fontSize: '17px', fontWeight: 800, color: cat.color, marginBottom: '8px' }}>{cat.name}</div>
                        <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, marginBottom: '12px' }}>{cat.description}</div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: cat.color }}>{cat.count} Products →</div>
                    </button>
                ))}
            </div>

            {/* Products for selected category */}
            {selectedCat && (
                <div style={{ animation: 'fadeInUp 0.3s ease' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                        <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1a1a2e' }}>
                            {categories.find(c => c.name === selectedCat)?.icon} {selectedCat}
                        </h2>
                        <span style={{ background: '#f3f4f6', color: '#6b7280', borderRadius: '50px', padding: '4px 12px', fontSize: '13px', fontWeight: 700 }}>
                            {catProducts.length} items
                        </span>
                        <button onClick={() => setSelectedCat('')} style={{ marginLeft: 'auto', background: 'none', border: '2px solid #e5e7eb', borderRadius: '50px', padding: '6px 16px', cursor: 'pointer', color: '#6b7280', fontSize: '13px', fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>✕ Clear</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                        {catProducts.map(product => <ProductCard key={product.id} product={product} />)}
                    </div>
                </div>
            )}

            {!selectedCat && (
                <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>👆</div>
                    <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '22px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>Select a Category</h2>
                    <p style={{ color: '#6b7280' }}>Click any category above to browse its toys</p>
                </div>
            )}
        </div>
    );
}

export default function CategoriesPage() {
    return (
        <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', fontSize: '24px' }}>Loading...</div>}>
            <CategoriesContent />
        </Suspense>
    );
}
