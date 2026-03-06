'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import { useSearch } from '@/hooks/useSearch';
import Link from 'next/link';

function SearchContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const { query, setQuery, results } = useSearch();

    // Set query from URL on mount
    useState(() => { if (initialQuery && !query) setQuery(initialQuery); });

    const displayQuery = query || initialQuery;
    const filteredResults = displayQuery
        ? results.filter(p =>
            p.name.toLowerCase().includes(displayQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(displayQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(displayQuery.toLowerCase())
        )
        : [];

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
            {/* Search header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>
                    🔍 Search Results
                </h1>
                {displayQuery && (
                    <p style={{ color: '#6b7280', fontSize: '15px' }}>
                        Showing <strong style={{ color: '#FF6B6B' }}>{filteredResults.length}</strong> result{filteredResults.length !== 1 ? 's' : ''} for &quot;<strong>{displayQuery}</strong>&quot;
                    </p>
                )}
            </div>

            {/* Inline search bar */}
            <div style={{ marginBottom: '28px' }}>
                <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: '8px', maxWidth: '500px' }}>
                    <div style={{ flex: 1, display: 'flex', background: '#f3f4f6', borderRadius: '50px', overflow: 'hidden', border: '2px solid #e5e7eb' }}>
                        <input type="text" value={query || initialQuery}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search toys..."
                            className="input"
                            style={{ flex: 1, background: 'transparent', border: 'none', borderRadius: 0 }}
                        />
                        {query && <button onClick={() => setQuery('')} style={{ padding: '0 12px', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '16px' }}>✕</button>}
                    </div>
                </form>
            </div>

            {/* Results */}
            {filteredResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                    <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>
                        No results found
                    </h2>
                    <p style={{ color: '#6b7280', marginBottom: '24px' }}>Try different keywords or browse our categories</p>
                    <Link href="/shop" style={{ textDecoration: 'none' }}>
                        <button className="btn-primary">🛍️ Browse All Toys</button>
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                    {filteredResults.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
            <SearchContent />
        </Suspense>
    );
}
