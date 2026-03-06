'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminStore } from '@/lib/adminStore';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        await new Promise(r => setTimeout(r, 600)); // simulate
        if (AdminStore.login(email, password)) {
            AdminStore.setAuth(true);
            router.push('/admin/dashboard');
        } else {
            setError('Invalid email or password. Try admin@happykidstoys.in / admin123');
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px', fontFamily: "'Nunito', sans-serif",
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Decorative shapes */}
            {[{ top: '-80px', right: '-80px', size: '300px', bg: 'rgba(255,107,107,0.1)' }, { bottom: '-100px', left: '-100px', size: '400px', bg: 'rgba(78,205,196,0.08)' }, { top: '40%', left: '10%', size: '160px', bg: 'rgba(255,217,61,0.06)' }].map((s, i) => (
                <div key={i} style={{ position: 'absolute', width: s.size, height: s.size, borderRadius: '50%', background: s.bg, ...(s.top ? { top: s.top } : {}), ...(s.bottom ? { bottom: s.bottom } : {}), ...(s.left ? { left: s.left } : {}), ...(s.right ? { right: s.right } : {}) }} />
            ))}

            <div style={{ width: '100%', maxWidth: '420px', position: 'relative' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', margin: '0 auto 16px', boxShadow: '0 8px 32px rgba(255,107,107,0.4)', animation: 'float 3s ease-in-out infinite' }}>🧸</div>
                    <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '28px', fontWeight: 900, color: 'white', marginBottom: '6px' }}>Happy Kids Toys</h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600 }}>Admin Control Panel</p>
                </div>

                {/* Card */}
                <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '36px 32px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                    <h2 style={{ color: 'white', fontWeight: 800, fontSize: '22px', marginBottom: '6px' }}>Welcome back 👋</h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '28px' }}>Sign in to your admin panel</p>

                    {error && (
                        <div style={{ background: 'rgba(255,107,107,0.15)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '12px', padding: '12px 16px', marginBottom: '20px', color: '#FF6B6B', fontSize: '13px', fontWeight: 600 }}>
                            ❌ {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Email Address</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@happykidstoys.in"
                                style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '13px 16px', color: 'white', fontFamily: "'Nunito', sans-serif", fontSize: '14px', outline: 'none', transition: 'border 0.2s' }}
                                onFocus={e => e.target.style.borderColor = '#FF6B6B'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                            />
                        </div>
                        <div>
                            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '13px 48px 13px 16px', color: 'white', fontFamily: "'Nunito', sans-serif", fontSize: '14px', outline: 'none', transition: 'border 0.2s' }}
                                    onFocus={e => e.target.style.borderColor = '#FF6B6B'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                                />
                                <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '16px' }}>
                                    {showPwd ? '🙈' : '👁'}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} style={{
                            background: loading ? 'rgba(255,107,107,0.5)' : 'linear-gradient(135deg, #FF6B6B, #ff8c42)',
                            border: 'none', borderRadius: '12px', padding: '14px', color: 'white',
                            fontFamily: "'Nunito', sans-serif", fontSize: '16px', fontWeight: 800,
                            cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px',
                            boxShadow: '0 8px 24px rgba(255,107,107,0.35)',
                            transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        }}>
                            {loading ? <><span style={{ animation: 'spin-slow 1s linear infinite', display: 'inline-block' }}>⏳</span> Signing in...</> : '🔐 Sign In to Admin'}
                        </button>
                    </form>

                    <div style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(78,205,196,0.1)', borderRadius: '10px', border: '1px solid rgba(78,205,196,0.2)' }}>
                        <p style={{ color: '#4ECDC4', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>📋 Demo Credentials</p>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Email: admin@happykidstoys.in</p>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Password: admin123</p>
                    </div>
                </div>

                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '20px' }}>
                    © 2026 Happy Kids Toys • All rights reserved
                </p>
            </div>

            <style jsx global>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        input::placeholder { color: rgba(255,255,255,0.3) !important; }
      `}</style>
        </div>
    );
}
