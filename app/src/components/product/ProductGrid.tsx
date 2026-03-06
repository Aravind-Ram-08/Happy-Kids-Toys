'use client';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
    products: Product[];
    emptyMessage?: string;
    emptyEmoji?: string;
}

export default function ProductGrid({ products, emptyMessage = 'No toys found', emptyEmoji = '🔍' }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>{emptyEmoji}</div>
                <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>
                    {emptyMessage}
                </h2>
                <p style={{ color: '#6b7280' }}>Try adjusting your filters or search term</p>
            </div>
        );
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
        }}>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
