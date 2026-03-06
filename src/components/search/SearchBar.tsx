'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';
import Link from 'next/link';

export default function SearchBar() {
    const { query, setQuery, suggestions, setIsOpen, isOpen } = useSearch();
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [setIsOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setIsOpen(false);
        }
    };

    return (
        <div ref={ref} style={{ position: 'relative', flex: 1, maxWidth: '560px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                <div style={{
                    display: 'flex', width: '100%', background: '#f3f4f6',
                    borderRadius: '50px', overflow: 'hidden',
                    border: isOpen && suggestions.length > 0 ? '2px solid #FF6B6B' : '2px solid transparent',
                    transition: 'border-color 0.2s',
                }}>
                    <input
                        type="text" value={query}
                        onChange={e => { setQuery(e.target.value); setIsOpen(true); }}
                        onFocus={() => setIsOpen(true)}
                        placeholder="Search for toys, games, gifts..."
                        style={{
                            flex: 1, border: 'none', outline: 'none', background: 'transparent',
                            padding: '11px 18px', fontFamily: "'Nunito', sans-serif",
                            fontSize: '14px', fontWeight: 600,
                        }}
                    />
                    {query && (
                        <button type="button" onClick={() => { setQuery(''); setIsOpen(false); }}
                            style={{ padding: '0 12px', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '16px' }}>
                            ✕
                        </button>
                    )}
                    <button type="submit" style={{
                        background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)',
                        border: 'none', color: 'white', padding: '11px 22px',
                        cursor: 'pointer', fontSize: '16px', flexShrink: 0,
                    }}>🔍</button>
                </div>
            </form>

            {/* Suggestions dropdown */}
            {isOpen && suggestions.length > 0 && (
                <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
                    background: 'white', borderRadius: '16px',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    overflow: 'hidden', zIndex: 300,
                    animation: 'fadeInUp 0.15s ease',
                    border: '1px solid #f0f0f0',
                }}>
                    {suggestions.map(product => (
                        <Link key={product.id} href={`/product/${product.id}`}
                            onClick={() => { setIsOpen(false); setQuery(''); }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '10px 16px', textDecoration: 'none',
                                transition: 'background 0.1s', cursor: 'pointer',
                            }}
                            onMouseEnter={e => (e.currentTarget).style.background = '#fff8f8'}
                            onMouseLeave={e => (e.currentTarget).style.background = 'transparent'}
                        >
                            <img src={product.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {product.name}
                                </div>
                                <div style={{ fontSize: '12px', color: '#6b7280' }}>{product.category}</div>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 800, color: '#FF6B6B', flexShrink: 0 }}>₹{product.price}</span>
                        </Link>
                    ))}
                    <Link href={`/search?q=${encodeURIComponent(query)}`}
                        onClick={() => setIsOpen(false)}
                        style={{
                            display: 'block', textAlign: 'center', padding: '12px',
                            fontWeight: 700, fontSize: '13px', color: '#FF6B6B',
                            textDecoration: 'none', borderTop: '1px solid #f3f4f6',
                            background: '#fafafa',
                        }}>
                        🔍 View all results for &quot;{query}&quot;
                    </Link>
                </div>
            )}
        </div>
    );
}
