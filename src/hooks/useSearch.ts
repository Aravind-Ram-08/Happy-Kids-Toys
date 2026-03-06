'use client';
import { useState, useMemo, useCallback } from 'react';
import products from '@/data/products.json';
import { Product } from '@/types';

export function useSearch() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const allProducts = products as Product[];

    const suggestions = useMemo(() => {
        if (!query.trim() || query.length < 2) return [];
        const q = query.toLowerCase();
        return allProducts
            .filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
            )
            .slice(0, 6);
    }, [query, allProducts]);

    const results = useMemo(() => {
        if (!query.trim()) return allProducts;
        const q = query.toLowerCase();
        return allProducts.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
    }, [query, allProducts]);

    const highlightMatch = useCallback((text: string) => {
        if (!query.trim()) return text;
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '**$1**');
    }, [query]);

    return { query, setQuery, suggestions, results, isOpen, setIsOpen, highlightMatch };
}
