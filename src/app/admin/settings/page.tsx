'use client';
import { useState, useEffect } from 'react';
import AdminShell, { useDark, useToast } from '@/components/admin/AdminShell';
import { AdminStore, StoreSettings } from '@/lib/adminStore';

function SettingsContent() {
    const dark = useDark();
    const { show } = useToast();
    const card = dark ? '#1e1e35' : '#ffffff';
    const text = dark ? '#e2e8f0' : '#1e293b';
    const border = dark ? '#2d2d4e' : '#e2e8f0';
    const bg = dark ? '#12122a' : '#f8fafc';
    const muted = dark ? '#94a3b8' : '#64748b';

    const [settings, setSettings] = useState<StoreSettings>(AdminStore.getSettings());
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => { setSettings(AdminStore.getSettings()); }, []);

    const handleSave = () => {
        AdminStore.saveSettings(settings);
        show('Settings saved successfully!');
    };

    const inputStyle = { width: '100%', background: bg, border: `1px solid ${border}`, borderRadius: '10px', padding: '11px 14px', color: text, fontFamily: "'Nunito', sans-serif", fontSize: '14px', outline: 'none', transition: 'border 0.2s' };
    const labelStyle = { fontWeight: 700, fontSize: '13px', color: muted, display: 'block', marginBottom: '6px' };

    const TABS = [
        { id: 'general', label: '🏪 General', icon: '🏪' },
        { id: 'contact', label: '📞 Contact', icon: '📞' },
        { id: 'delivery', label: '🚚 Delivery', icon: '🚚' },
        { id: 'account', label: '🔐 Account', icon: '🔐' },
    ];

    return (
        <div style={{ maxWidth: '720px' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: card, borderRadius: '14px', padding: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', marginBottom: '24px', flexWrap: 'wrap' }}>
                {TABS.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                        flex: 1, padding: '10px 16px', background: activeTab === tab.id ? 'linear-gradient(135deg, #FF6B6B, #ff8c42)' : 'none',
                        border: 'none', borderRadius: '10px', color: activeTab === tab.id ? 'white' : '#94a3b8',
                        fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif',",
                        transition: 'all 0.2s', whiteSpace: 'nowrap',
                    }}>{tab.label}</button>
                ))}
            </div>

            {activeTab === 'general' && (
                <div style={{ background: card, borderRadius: '20px', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                    <h3 style={{ fontWeight: 800, color: text, fontSize: '18px', marginBottom: '24px' }}>🏪 Store Information</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={labelStyle}>Store Name</label>
                            <input value={settings.storeName} onChange={e => setSettings({ ...settings, storeName: e.target.value })} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Currency Symbol</label>
                            <input value={settings.currency} onChange={e => setSettings({ ...settings, currency: e.target.value })} style={{ ...inputStyle, maxWidth: '100px' }} />
                        </div>
                        <div>
                            <label style={labelStyle}>Store Logo</label>
                            <div style={{ border: `2px dashed ${border}`, borderRadius: '12px', padding: '24px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🧸</div>
                                <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>Click to upload logo</div>
                                <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>PNG, SVG recommended • Max 2MB</div>
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Homepage Banner</label>
                            <div style={{ border: `2px dashed ${border}`, borderRadius: '12px', padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
                                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🖼️</div>
                                <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>Upload homepage banner</div>
                                <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>1200×400px recommended • Max 5MB</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'contact' && (
                <div style={{ background: card, borderRadius: '20px', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                    <h3 style={{ fontWeight: 800, color: text, fontSize: '18px', marginBottom: '24px' }}>📞 Contact & WhatsApp</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={labelStyle}>WhatsApp Number (with country code)</label>
                            <input value={settings.whatsapp} onChange={e => setSettings({ ...settings, whatsapp: e.target.value })} placeholder="+919876543210" style={inputStyle} />
                            <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px', fontWeight: 600 }}>💡 This number will be used for all "Order on WhatsApp" buttons</p>
                        </div>
                        <div>
                            <label style={labelStyle}>Email Address</label>
                            <input value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })} placeholder="hello@happykidstoys.in" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Store Address</label>
                            <textarea value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} rows={3}
                                style={{ ...inputStyle, resize: 'vertical' }} placeholder="Mumbai, Maharashtra, India" />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'delivery' && (
                <div style={{ background: card, borderRadius: '20px', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                    <h3 style={{ fontWeight: 800, color: text, fontSize: '18px', marginBottom: '24px' }}>🚚 Delivery Settings</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={labelStyle}>Free Delivery Above (₹)</label>
                            <input type="number" value={settings.freeDeliveryAbove} onChange={e => setSettings({ ...settings, freeDeliveryAbove: +e.target.value })} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Delivery Information (shown on product pages)</label>
                            <textarea value={settings.deliveryInfo} onChange={e => setSettings({ ...settings, deliveryInfo: e.target.value })} rows={4}
                                style={{ ...inputStyle, resize: 'vertical' }} />
                        </div>
                        <div style={{ background: bg, borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <span style={{ fontSize: '24px' }}>💡</span>
                            <div>
                                <div style={{ fontWeight: 800, color: text, marginBottom: '4px' }}>Delivery Tips</div>
                                <ul style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.6, paddingLeft: '16px' }}>
                                    <li>Standard delivery: 5–7 business days</li>
                                    <li>Express delivery: 2–3 business days</li>
                                    <li>Use WhatsApp for same-day delivery coordination</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'account' && (
                <div style={{ background: card, borderRadius: '20px', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                    <h3 style={{ fontWeight: 800, color: text, fontSize: '18px', marginBottom: '24px' }}>🔐 Account Security</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ background: '#FFD93D22', border: '2px solid #FFD93D44', borderRadius: '12px', padding: '16px' }}>
                            <div style={{ fontWeight: 800, color: '#f59e0b', marginBottom: '4px' }}>⚠️ Demo Mode</div>
                            <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.6 }}>This is a demo admin panel. In production, connect to a real backend with hashed passwords and JWT authentication.</p>
                        </div>
                        <div>
                            <label style={labelStyle}>Admin Email</label>
                            <input type="email" defaultValue="admin@happykidstoys.in" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Current Password</label>
                            <input type="password" placeholder="••••••••" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>New Password</label>
                            <input type="password" placeholder="••••••••" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Confirm New Password</label>
                            <input type="password" placeholder="••••••••" style={inputStyle} />
                        </div>
                    </div>
                </div>
            )}

            {/* Save button */}
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                <button onClick={handleSave} style={{
                    background: 'linear-gradient(135deg, #FF6B6B, #ff8c42)', border: 'none', borderRadius: '12px',
                    padding: '14px 32px', color: 'white', fontWeight: 800, fontSize: '16px',
                    cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
                    boxShadow: '0 8px 24px rgba(255,107,107,0.3)',
                }}>💾 Save Settings</button>
                <button onClick={() => setSettings(AdminStore.getSettings())} style={{
                    background: 'none', border: `2px solid ${border}`, borderRadius: '12px',
                    padding: '14px 24px', color: muted, fontWeight: 700, fontSize: '14px',
                    cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
                }}>Reset</button>
            </div>
        </div>
    );
}

export default function SettingsPage() {
    return <AdminShell><SettingsContent /></AdminShell>;
}
