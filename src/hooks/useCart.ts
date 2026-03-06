'use client';
import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';

export interface CartItem {
    product: Product;
    quantity: number;
}

const CART_KEY = 'happykids_cart';

function getCartFromStorage(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveCartToStorage(items: CartItem[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setItems(getCartFromStorage());
        setMounted(true);
    }, []);

    const syncAndSet = useCallback((newItems: CartItem[]) => {
        setItems(newItems);
        saveCartToStorage(newItems);
        window.dispatchEvent(new Event('cart-updated'));
    }, []);

    const addToCart = useCallback((product: Product, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(i => i.product.id === product.id);
            const updated = existing
                ? prev.map(i => i.product.id === product.id
                    ? { ...i, quantity: i.quantity + quantity }
                    : i)
                : [...prev, { product, quantity }];
            saveCartToStorage(updated);
            window.dispatchEvent(new Event('cart-updated'));
            return updated;
        });
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setItems(prev => {
            const updated = prev.filter(i => i.product.id !== productId);
            saveCartToStorage(updated);
            window.dispatchEvent(new Event('cart-updated'));
            return updated;
        });
    }, []);

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity <= 0) {
            setItems(prev => {
                const updated = prev.filter(i => i.product.id !== productId);
                saveCartToStorage(updated);
                window.dispatchEvent(new Event('cart-updated'));
                return updated;
            });
        } else {
            setItems(prev => {
                const updated = prev.map(i =>
                    i.product.id === productId ? { ...i, quantity } : i
                );
                saveCartToStorage(updated);
                window.dispatchEvent(new Event('cart-updated'));
                return updated;
            });
        }
    }, []);

    const clearCart = useCallback(() => {
        syncAndSet([]);
    }, [syncAndSet]);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const savings = items.reduce((sum, i) => sum + (i.product.originalPrice - i.product.price) * i.quantity, 0);
    const delivery = subtotal >= 799 ? 0 : 49;
    const total = subtotal + delivery;

    return {
        items,
        mounted,
        totalItems,
        subtotal,
        savings,
        delivery,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };
}
