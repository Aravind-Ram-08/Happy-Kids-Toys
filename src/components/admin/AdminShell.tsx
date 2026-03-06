'use client';
import { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AdminStore } from '@/lib/adminStore';

// ─── Toast Context ───────────────────────────────────────────────────────────
interface Toast { id: number; message: string; type: 'success' | 'error' | 'info'; }
const ToastCtx = createContext<{ show: (msg: string, type?: Toast['type']) => void }>({ show: () => { } });
export const useToast = () => useContext(ToastCtx);

// ─── Dark Mode Context ───────────────────────────────────────────────────────
const DarkCtx = createContext(false);
export const useDark = () => useContext(DarkCtx);

// ─── Sidebar nav items ───────────────────────────────────────────────────────
const NAV = [
    { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { href: '/admin/products', icon: '🧸', label: 'Products' },
    { href: '/admin/orders', icon: '📦', label: 'Orders' },
    { href: '/admin/customers', icon: '👥', label: 'Customers' },
    { href: '/admin/categories', icon: '📂', label: 'Categories' },
    { href: '/admin/offers', icon: '🎉', label: 'Offers' },
    { href: '/admin/analytics', icon: '📈', label: 'Analytics' },
    { href: '/admin/settings', icon: '⚙️', label: 'Settings' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [dark, setDark] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!AdminStore.isLoggedIn()) { router.push('/admin'); return; }
        const s = AdminStore.getSettings();
        setDark(s.darkMode);
    }, []);

    const showToast = (message: string, type: Toast['type'] = 'success') => {
        const id = Date.now();
        setToasts(p => [...p, { id, message, type }]);
        setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
    };

    const handleLogout = () => {
        AdminStore.setAuth(false);
        router.push('/admin');
    };

    const bg = dark ? '#0f0f1a' : '#f8fafc';
    const sidebar = dark ? '#1a1a2e' : '#1e293b';
    const card = dark ? '#1e1e35' : '#ffffff';
    const text = dark ? '#e2e8f0' : '#1e293b';
    const border = dark ? '#2d2d4e' : '#e2e8f0';

    return (
        <ToastCtx.Provider value={{ show: showToast }}>
            <DarkCtx.Provider value={dark}>
                <div style={{ display: 'flex', minHeight: '100vh', background: bg, fontFamily: "'Nunito', sans-serif", color: text, transition: 'all 0.3s' }}>

                    {/* Sidebar overlay (mobile) */}
                    {sidebarOpen && (
                        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 49, backdropFilter: 'blur(4px)' }} />
                    )}

                    {/* ─── Sidebar ─── */}
                    <aside style={{
                        width: '240px', background: sidebar, flexShrink: 0,
                        display: 'flex', flexDirection: 'column',
                        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
                        transition: 'transform 0.3s ease',
                        transform: sidebarOpen ? 'translateX(0)' : undefined,
                        boxShadow: '4px 0 20px rgba(0,0,0,0.2)',
                    }} className="admin-sidebar">
                        {/* Brand */}
                        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>🧸</div>
                                <div>
                                    <div style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '15px', fontWeight: 800, color: '#FF6B6B', lineHeight: 1.1 }}>Happy Kids</div>
                                    <div style={{ fontSize: '9px', color: '#4ECDC4', fontWeight: 700, letterSpacing: '1.5px' }}>ADMIN PANEL</div>
                                </div>
                            </div>
                        </div>

                        {/* Nav */}
                        <nav style={{ flex: 1, padding: '12px 12px', overflowY: 'auto' }}>
                            {NAV.map(item => {
                                const active = pathname === item.href;
                                return (
                                    <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} style={{
                                        display: 'flex', alignItems: 'center', gap: '10px',
                                        padding: '10px 12px', borderRadius: '12px', marginBottom: '2px',
                                        textDecoration: 'none', transition: 'all 0.2s',
                                        background: active ? 'linear-gradient(135deg, #FF6B6B22, #ff8c4222)' : 'transparent',
                                        color: active ? '#FF6B6B' : 'rgba(255,255,255,0.65)',
                                        borderLeft: active ? '3px solid #FF6B6B' : '3px solid transparent',
                                        fontWeight: active ? 800 : 600, fontSize: '14px',
                                    }}>
                                        <span style={{ fontSize: '18px', width: '22px', textAlign: 'center' }}>{item.icon}</span>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Dark mode + Logout */}
                        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                            <button onClick={() => {
                                const newDark = !dark;
                                setDark(newDark);
                                const s = AdminStore.getSettings();
                                AdminStore.saveSettings({ ...s, darkMode: newDark });
                            }} style={{
                                display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                                background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '10px',
                                padding: '10px 12px', color: 'rgba(255,255,255,0.7)', fontWeight: 700,
                                fontSize: '13px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif", marginBottom: '8px',
                                transition: 'background 0.2s',
                            }}>{dark ? '☀️' : '🌙'} {dark ? 'Light Mode' : 'Dark Mode'}</button>
                            <button onClick={handleLogout} style={{
                                display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                                background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.2)',
                                borderRadius: '10px', padding: '10px 12px', color: '#FF6B6B',
                                fontWeight: 700, fontSize: '13px', cursor: 'pointer',
                                fontFamily: "'Nunito', sans-serif", transition: 'all 0.2s',
                            }}>🚪 Logout</button>
                        </div>
                    </aside>

                    {/* ─── Main Content ─── */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }} className="admin-main">
                        {/* Top bar */}
                        <header style={{
                            background: card, borderBottom: `1px solid ${border}`,
                            padding: '12px 24px', display: 'flex', alignItems: 'center',
                            gap: '16px', position: 'sticky', top: 0, zIndex: 40,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        }}>
                            <button onClick={() => setSidebarOpen(true)} className="admin-hamburger" style={{
                                background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer',
                                display: 'none', padding: '4px',
                            }}>☰</button>
                            <h1 style={{ fontWeight: 800, fontSize: '18px', color: text, flex: 1 }}>
                                {NAV.find(n => n.href === pathname)?.icon} {NAV.find(n => n.href === pathname)?.label || 'Admin'}
                            </h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Link href="/admin/products?action=add" style={{ textDecoration: 'none' }}>
                                    <button style={{
                                        background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)',
                                        border: 'none', borderRadius: '10px', padding: '9px 18px',
                                        color: 'white', fontWeight: 800, fontSize: '13px',
                                        cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
                                        boxShadow: '0 4px 12px rgba(255,107,107,0.3)',
                                        display: 'flex', alignItems: 'center', gap: '6px',
                                    }}>+ Add Product</button>
                                </Link>
                                <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', cursor: 'pointer' }}>👨‍💼</div>
                            </div>
                        </header>

                        {/* Page */}
                        <main style={{ flex: 1, padding: '24px', overflowX: 'hidden' }}>
                            {children}
                        </main>
                    </div>

                    {/* ─── Toasts ─── */}
                    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {toasts.map(t => (
                            <div key={t.id} style={{
                                background: t.type === 'success' ? '#22c55e' : t.type === 'error' ? '#FF6B6B' : '#3b82f6',
                                color: 'white', borderRadius: '12px', padding: '12px 20px',
                                fontWeight: 700, fontSize: '14px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                                animation: 'fadeInUp 0.3s ease', minWidth: '240px',
                                display: 'flex', alignItems: 'center', gap: '8px',
                            }}>
                                {t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : 'ℹ️'} {t.message}
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx global>{`
          @media (max-width: 768px) {
            .admin-sidebar { transform: translateX(-100%) !important; }
            .admin-sidebar.open { transform: translateX(0) !important; }
            .admin-main { margin-left: 0 !important; }
            .admin-hamburger { display: flex !important; }
          }
          @media (min-width: 769px) {
            .admin-main { margin-left: 240px; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
            </DarkCtx.Provider>
        </ToastCtx.Provider>
    );
}
