'use client';
import Link from 'next/link';

const categories = [
    { name: 'Educational Toys', icon: '📚', color: '#4ECDC4', bg: '#e0faf8', desc: 'Learn & grow' },
    { name: 'Musical Toys', icon: '🎵', color: '#8b5cf6', bg: '#f3e8ff', desc: 'Spark creativity' },
    { name: 'Remote Control Toys', icon: '🎮', color: '#FF6B6B', bg: '#fff0f0', desc: 'Thrilling fun' },
    { name: 'Baby Toys', icon: '🍼', color: '#f59e0b', bg: '#fef9c3', desc: 'Safe & gentle' },
    { name: 'Outdoor Toys', icon: '⚽', color: '#22c55e', bg: '#dcfce7', desc: 'Active play' },
];

export default function Categories() {
    return (
        <section style={{ padding: '56px 16px', maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1a1a2e' }}>
                        🎯 Shop by Category
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>Find the perfect toy for every child</p>
                </div>
                <Link href="/categories" style={{ textDecoration: 'none', color: '#FF6B6B', fontWeight: 700, fontSize: '14px' }}>
                    View All →
                </Link>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '16px',
            }}>
                {categories.map((cat, i) => (
                    <Link key={cat.name} href={`/categories?cat=${encodeURIComponent(cat.name)}`} style={{ textDecoration: 'none' }}>
                        <div className="card-hover" style={{
                            background: cat.bg, borderRadius: '20px', padding: '28px 16px',
                            textAlign: 'center', cursor: 'pointer',
                            border: `2px solid ${cat.color}22`,
                            animationDelay: `${i * 100}ms`,
                        }}>
                            <div style={{ fontSize: '44px', marginBottom: '12px' }}>{cat.icon}</div>
                            <div style={{ fontSize: '13px', fontWeight: 800, color: cat.color, lineHeight: 1.3, marginBottom: '4px' }}>
                                {cat.name}
                            </div>
                            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600 }}>{cat.desc}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
