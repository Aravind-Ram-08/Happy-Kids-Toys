'use client';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import products from '@/data/products.json';
import { Product } from '@/types';

interface FeaturedProductsProps {
    title?: string;
    emoji?: string;
    subtitle?: string;
    filter?: 'trending' | 'bestSeller' | 'all';
    limit?: number;
    showViewAll?: boolean;
    viewAllHref?: string;
    scrollable?: boolean;
}

export default function FeaturedProducts({
    title = 'Featured Products',
    emoji = '⭐',
    subtitle = 'Handpicked favorites for kids',
    filter = 'all',
    limit = 8,
    showViewAll = true,
    viewAllHref = '/shop',
    scrollable = false,
}: FeaturedProductsProps) {
    let filtered = products as Product[];
    if (filter === 'trending') filtered = filtered.filter(p => p.trending);
    if (filter === 'bestSeller') filtered = filtered.filter(p => p.badge === 'Best Seller');
    filtered = filtered.slice(0, limit);

    return (
        <section style={{ padding: '0 0 56px' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                        <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1a1a2e' }}>
                            {emoji} {title}
                        </h2>
                        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>{subtitle}</p>
                    </div>
                    {showViewAll && (
                        <Link href={viewAllHref} style={{ textDecoration: 'none', color: '#FF6B6B', fontWeight: 700, fontSize: '14px' }}>
                            See All →
                        </Link>
                    )}
                </div>

                {scrollable ? (
                    <div className="horizontal-scroll">
                        {filtered.map(product => (
                            <div key={product.id} style={{ minWidth: '200px', maxWidth: '220px', flexShrink: 0 }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '20px',
                    }}>
                        {filtered.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
