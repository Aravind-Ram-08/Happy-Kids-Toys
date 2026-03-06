'use client';
import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';

const WISHLIST_KEY = 'happykids_wishlist';

function getWishlistFromStorage(): Product[] {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    } catch { return []; }
}

function saveWishlist(items: Product[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('wishlist-updated'));
}

export function useWishlist() {
    const [items, setItems] = useState<Product[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setItems(getWishlistFromStorage());
        setMounted(true);
        const handler = () => setItems(getWishlistFromStorage());
        window.addEventListener('wishlist-updated', handler);
        window.addEventListener('storage', handler);
        return () => {
            window.removeEventListener('wishlist-updated', handler);
            window.removeEventListener('storage', handler);
        };
    }, []);

    const toggleWishlist = useCallback((product: Product) => {
        setItems(prev => {
            const exists = prev.find(p => p.id === product.id);
            const updated = exists ? prev.filter(p => p.id !== product.id) : [...prev, product];
            saveWishlist(updated);
            return updated;
        });
    }, []);

    const isInWishlist = useCallback((productId: number) => {
        return items.some(p => p.id === productId);
    }, [items]);

    const removeFromWishlist = useCallback((productId: number) => {
        setItems(prev => {
            const updated = prev.filter(p => p.id !== productId);
            saveWishlist(updated);
            return updated;
        });
    }, []);

    const clearWishlist = useCallback(() => {
        saveWishlist([]);
        setItems([]);
    }, []);

    return { items, mounted, toggleWishlist, isInWishlist, removeFromWishlist, clearWishlist, count: items.length };
}

export function getWishlistCount(): number {
    return getWishlistFromStorage().length;
}
