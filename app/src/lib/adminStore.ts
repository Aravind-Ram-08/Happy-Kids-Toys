// ─── Admin Store (localStorage-backed JSON database) ───────────────────────

export interface AdminProduct {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    stock: number;
    status: 'active' | 'draft' | 'out_of_stock';
    description: string;
    image: string;
    tags: string[];
    badge: string;
    ageGroup: string;
    rating: number;
    reviews: number;
    createdAt: string;
}

export interface AdminOrder {
    id: string;
    customerName: string;
    phone: string;
    productName: string;
    productId: string;
    price: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    deliveryStatus: string;
    address: string;
    createdAt: string;
}

export interface AdminCategory {
    id: string;
    name: string;
    icon: string;
    color: string;
    productCount: number;
}

export interface AdminOffer {
    id: string;
    title: string;
    type: 'coupon' | 'banner' | 'festival';
    discount: number;
    code?: string;
    startDate: string;
    endDate: string;
    active: boolean;
}

export interface StoreSettings {
    storeName: string;
    whatsapp: string;
    email: string;
    address: string;
    deliveryInfo: string;
    freeDeliveryAbove: number;
    currency: string;
    darkMode: boolean;
}

// ─── Default seed data ──────────────────────────────────────────────────────
import productsJson from '@/data/products.json';

function seedProducts(): AdminProduct[] {
    return (productsJson as any[]).map(p => ({
        id: String(p.id),
        name: p.name,
        category: p.category,
        price: p.price,
        originalPrice: p.originalPrice,
        stock: Math.floor(Math.random() * 50) + 5,
        status: 'active' as const,
        description: p.description,
        image: p.image,
        tags: p.features,
        badge: p.badge,
        ageGroup: p.ageGroup,
        rating: p.rating,
        reviews: p.reviews,
        createdAt: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString(),
    }));
}

function seedOrders(): AdminOrder[] {
    const names = ['Priya Sharma', 'Rahul Mehta', 'Anitha K', 'Suresh Patel', 'Kavya Nair', 'Arun Singh', 'Deepa Iyer', 'Ramesh Rao'];
    const statuses: AdminOrder['status'][] = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    const products = seedProducts();
    return Array.from({ length: 18 }, (_, i) => {
        const prod = products[i % products.length];
        return {
            id: `ORD-${1000 + i}`,
            customerName: names[i % names.length],
            phone: `+91 9${String(876543210 + i).slice(0, 9)}`,
            productName: prod.name,
            productId: prod.id,
            price: prod.price,
            status: statuses[i % statuses.length],
            deliveryStatus: i % 2 === 0 ? 'Processing' : 'Out for Delivery',
            address: `${100 + i}, Main Street, ${['Mumbai', 'Delhi', 'Chennai', 'Bangalore'][i % 4]}`,
            createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        };
    });
}

// ─── Storage helpers ────────────────────────────────────────────────────────
function getItem<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
}
function setItem(key: string, value: unknown) {
    if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
}

// ─── Public API ──────────────────────────────────────────────────────────────
export const AdminStore = {
    // Auth
    login(email: string, password: string): boolean {
        return email === 'admin@happykidstoys.in' && password === 'admin123';
    },
    isLoggedIn(): boolean {
        return getItem('admin_auth', false);
    },
    setAuth(val: boolean) { setItem('admin_auth', val); },

    // Products
    getProducts(): AdminProduct[] {
        const stored = getItem<AdminProduct[] | null>('admin_products', null);
        if (!stored) {
            const seeded = seedProducts();
            setItem('admin_products', seeded);
            return seeded;
        }
        return stored;
    },
    saveProducts(products: AdminProduct[]) { setItem('admin_products', products); },
    addProduct(p: Omit<AdminProduct, 'id' | 'createdAt'>): AdminProduct {
        const products = AdminStore.getProducts();
        const newP: AdminProduct = { ...p, id: Date.now().toString(), createdAt: new Date().toISOString() };
        products.unshift(newP);
        setItem('admin_products', products);
        return newP;
    },
    updateProduct(id: string, updates: Partial<AdminProduct>) {
        const products = AdminStore.getProducts().map(p => p.id === id ? { ...p, ...updates } : p);
        setItem('admin_products', products);
    },
    deleteProduct(id: string) {
        const products = AdminStore.getProducts().filter(p => p.id !== id);
        setItem('admin_products', products);
    },

    // Orders
    getOrders(): AdminOrder[] {
        const stored = getItem<AdminOrder[] | null>('admin_orders', null);
        if (!stored) {
            const seeded = seedOrders();
            setItem('admin_orders', seeded);
            return seeded;
        }
        return stored;
    },
    updateOrderStatus(id: string, status: AdminOrder['status']) {
        const orders = AdminStore.getOrders().map(o => o.id === id ? { ...o, status } : o);
        setItem('admin_orders', orders);
    },
    addOrder(o: Omit<AdminOrder, 'id' | 'createdAt'>) {
        const orders = AdminStore.getOrders();
        const newO: AdminOrder = { ...o, id: `ORD-${Date.now()}`, createdAt: new Date().toISOString() };
        orders.unshift(newO);
        setItem('admin_orders', orders);
    },

    // Categories
    getCategories(): AdminCategory[] {
        return getItem('admin_categories', [
            { id: '1', name: 'Educational Toys', icon: '📚', color: '#4ECDC4', productCount: 4 },
            { id: '2', name: 'Musical Toys', icon: '🎵', color: '#8b5cf6', productCount: 3 },
            { id: '3', name: 'Remote Control Toys', icon: '🎮', color: '#FF6B6B', productCount: 2 },
            { id: '4', name: 'Baby Toys', icon: '🍼', color: '#f59e0b', productCount: 2 },
            { id: '5', name: 'Outdoor Toys', icon: '⚽', color: '#22c55e', productCount: 2 },
        ]);
    },
    saveCategories(cats: AdminCategory[]) { setItem('admin_categories', cats); },

    // Offers
    getOffers(): AdminOffer[] {
        return getItem('admin_offers', [
            { id: '1', title: 'Holi Special Sale', type: 'festival', discount: 30, startDate: '2026-03-10', endDate: '2026-03-15', active: true },
            { id: '2', title: 'WELCOME10', type: 'coupon', discount: 10, code: 'WELCOME10', startDate: '2026-01-01', endDate: '2026-12-31', active: true },
            { id: '3', title: 'Weekend Flash Sale', type: 'banner', discount: 20, startDate: '2026-03-06', endDate: '2026-03-08', active: true },
        ]);
    },
    saveOffers(offers: AdminOffer[]) { setItem('admin_offers', offers); },

    // Settings
    getSettings(): StoreSettings {
        return getItem('admin_settings', {
            storeName: 'Happy Kids Toys',
            whatsapp: '+919876543210',
            email: 'hello@happykidstoys.in',
            address: 'Mumbai, Maharashtra, India',
            deliveryInfo: 'Free delivery on orders above ₹799. Standard 5-7 days.',
            freeDeliveryAbove: 799,
            currency: '₹',
            darkMode: false,
        });
    },
    saveSettings(s: StoreSettings) { setItem('admin_settings', s); },
};
